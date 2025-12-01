"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { createClient } from "@/utils/supabase/client";
import { getBusinesses } from "@/app/actions/business/business-profile-actions";
import { DbBusiness } from "@/types/database/entities";
import { RealtimeChannel } from "@supabase/supabase-js";
import { Business } from "@/types/business/type";

interface BusinessContextType {
  businesses: Business[];
  activeBusiness: Business | null;
  setActiveBusiness: (business: Business | null) => void;
  isLoading: boolean;
  refreshBusinesses: () => Promise<void>;
}

const BusinessContext = createContext<BusinessContextType | undefined>(
  undefined,
);

export function BusinessProvider({ children }: { children: React.ReactNode }) {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [activeBusiness, setActiveBusiness] = useState<Business | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // supabase client (singleton per provider instance)
  const [supabase] = useState(() => createClient());

  // Refs para gestionar el canal y el estado montado
  const channelRef = useRef<RealtimeChannel | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Carga inicial
  useEffect(() => {
    const loadInitialBusinesses = async () => {
      console.log("1. useEffect: Loading initial businesses");
      try {
        setIsLoading(true);
        const initialBusinesses = await getBusinesses();
        if (!isMountedRef.current) return;
        setBusinesses(initialBusinesses);

        if (initialBusinesses.length > 0 && !activeBusiness) {
          setActiveBusiness(initialBusinesses[0]);
        }
      } catch (error) {
        console.error("Error loading businesses:", error);
      } finally {
        if (isMountedRef.current) setIsLoading(false);
      }
    };
    loadInitialBusinesses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // dependencia intencionalmente vacía para carga una vez

  // Transformaciones helpers
  const mapDbBusinessToBusiness = (row: DbBusiness): Business => ({
    id: row.id,
    companyName: row.company_name,
    description: row.description || "N/A",
    sector: row.sector || "N/A",
    employeeCount: row.employee_count || 0,
    netEarnings: row.net_earnings || 0,
    category: row.category || "N/A",
  });

  // Lógica de actualización local (Optimizada)
  const handleInsert = useCallback((newRow: DbBusiness) => {
    if (!newRow) return;
    const newBusiness = mapDbBusinessToBusiness(newRow);

    setBusinesses((prev) => {
      if (prev.some((b) => b.id === newBusiness.id)) return prev;
      const newList = [newBusiness, ...prev];
      // Si no existe activo, lo seteo al primero
      if (prev.length === 0) {
        setActiveBusiness(newBusiness);
      }
      return newList;
    });
  }, []);

  const handleUpdate = useCallback((newRow: DbBusiness) => {
    if (!newRow) return;
    const updatedBusiness = mapDbBusinessToBusiness(newRow);

    setBusinesses((prev) =>
      prev.map((b) => (b.id === updatedBusiness.id ? updatedBusiness : b)),
    );

    setActiveBusiness((prev) =>
      prev?.id === updatedBusiness.id ? updatedBusiness : prev,
    );
  }, []);

  const handleDelete = useCallback((oldRow: DbBusiness) => {
    if (!oldRow) return;
    const deletedId = oldRow.id;
    setBusinesses((prev) => prev.filter((b) => b.id !== deletedId));
  }, []);

  // Efecto para sincronizar activeBusiness si se borra
  useEffect(() => {
    console.log("2. useEffect: Syncing activeBusiness with businesses");
    if (
      activeBusiness &&
      !businesses.find((b) => b.id === activeBusiness.id) &&
      businesses.length > 0
    ) {
      setActiveBusiness(businesses[0]);
    } else if (businesses.length === 0 && activeBusiness) {
      setActiveBusiness(null);
    }
  }, [businesses, activeBusiness]);

  const refreshBusinesses = useCallback(async () => {
    try {
      setIsLoading(true);
      const updatedBusinesses = await getBusinesses();
      if (!isMountedRef.current) return;
      setBusinesses(updatedBusinesses);
      // activeBusiness syncado en el useEffect anterior
    } catch (error) {
      console.error("Error refreshing:", error);
    } finally {
      if (isMountedRef.current) setIsLoading(false);
    }
  }, []);

  // --- Suscripción Realtime compartida (mejorada) ---
  useEffect(() => {
    console.log(
      "3. useEffect: Setting up Realtime subscription (shared channel)",
    );

    // Si ya hay un canal creado por este provider, no volvemos a crear
    if (channelRef.current) {
      console.log("Realtime channel already exists, skipping creation.");
      return;
    }

    let stopped = false;

    const createAndSubscribe = () => {
      if (stopped) return;

      console.log("Creating channel: businesses-switcher-channel");
      const channel = supabase
        .channel("businesses-switcher-channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public_web", table: "businesses" },
          (payload) => {
            console.debug("Realtime raw payload:", payload);
            const { eventType, new: newData, old: oldData } = payload;

            const newRow = newData as DbBusiness;
            const oldRow = oldData as DbBusiness;

            // Si llega un DELETE y no hay oldRow, puede ser REPLICA IDENTITY not FULL
            if (eventType === "DELETE" && !oldRow) {
              console.warn(
                "[Realtime] DELETE received but payload.old is empty. " +
                  "If you need full old row, set REPLICA IDENTITY FULL on the table.",
              );
            }

            try {
              if (eventType === "INSERT" && newRow) {
                handleInsert(newRow);
              } else if (eventType === "UPDATE" && newRow) {
                handleUpdate(newRow);
              } else if (eventType === "DELETE" && oldRow) {
                handleDelete(oldRow);
              } else {
                // fallback: intenta deducir si hay un record con id
                if (eventType && (newRow || oldRow)) {
                  // si es update pero no reconocemos el eventType, intenta apply
                  if (newRow) handleUpdate(newRow);
                }
              }
            } catch (err) {
              console.error("Error handling realtime payload:", err);
            }

            console.log(
              "4. Realtime event processed:",
              eventType,
              newRow ?? oldRow,
            );
          },
        )
        .subscribe((status, err) => {
          console.log("5. Realtime subscription status:", status);
          if (err) {
            console.error("6. Realtime subscription error:", err);
          }

          // Reset attempts when subscribed
          if (status === "SUBSCRIBED") {
            reconnectAttemptsRef.current = 0;
          }

          // Si hay un CHANNEL_ERROR intentamos re-subscribe con backoff
          if (status === "CHANNEL_ERROR") {
            reconnectAttemptsRef.current++;
            const attempts = reconnectAttemptsRef.current;
            const delay = Math.min(30000, 1000 * 2 ** attempts); // exponencial hasta 30s
            console.warn(
              `[Realtime] CHANNEL_ERROR detected. Reconnect attempt ${attempts}. Retrying in ${delay}ms`,
            );

            // limpiamos y reintentamos
            setTimeout(() => {
              try {
                supabase.removeChannel(channel);
              } catch (e) {
                console.warn(
                  "Error removing channel during reconnect attempt",
                  e,
                );
              }
              // solo si aún estamos montados y no hemos detenido el efecto
              if (!stopped) {
                channelRef.current = null;
                createAndSubscribe();
              }
            }, delay);
          }
        });

      channelRef.current = channel;

      // Logging de canales actuales
      try {
        const chs = supabase.getChannels?.() ?? [];
        console.debug("Supabase active channels:", chs);
      } catch (e) {
        // algunos entornos / versiones no exponen getChannels
      }
    };

    createAndSubscribe();

    return () => {
      stopped = true;
      if (channelRef.current) {
        try {
          console.log("Cleaning up realtime channel");
          supabase.removeChannel(channelRef.current);
        } catch (e) {
          console.warn("Error removing realtime channel on cleanup", e);
        } finally {
          channelRef.current = null;
        }
      }
    };
  }, [supabase, handleInsert, handleUpdate, handleDelete, refreshBusinesses]);

  return (
    <BusinessContext.Provider
      value={{
        businesses,
        activeBusiness,
        setActiveBusiness,
        isLoading,
        refreshBusinesses,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
}

// Hook simplificado que solo consume el contexto
export function useBusinessSwitcher() {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error(
      "useBusinessSwitcher must be used within a BusinessProvider",
    );
  }
  return context;
}
