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
import { RealtimeChannel } from "@supabase/supabase-js";
import { Business } from "@/types/business/type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useBusinessStore } from "@/stores/use-business-store";
import { DbBusiness } from "@/types/database/entities";

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

const EMPTY_BUSINESSES: Business[] = [];

export function BusinessProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [activeBusinessId, setActiveBusinessId] = useState<number | null>(null);

  // supabase client (singleton per provider instance)
  const [supabase] = useState(() => createClient());

  // Refs para gestionar el canal y el estado montado
  const channelRef = useRef<RealtimeChannel | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const isMountedRef = useRef(true);

  // React Query query for businesses
  const { data: businesses = EMPTY_BUSINESSES, isLoading } = useQuery<Business[]>({
    queryKey: ["businesses"],
    queryFn: getBusinesses,
  });

  // Derived activeBusiness
  const activeBusiness =
    businesses.find((b) => b.id === activeBusinessId) ||
    businesses[0] ||
    null;

  // Sync activeBusinessId if it hasn't been set yet
  useEffect(() => {
    if (businesses.length > 0 && !activeBusinessId) {
      setActiveBusinessId(businesses[0].id);
    }
  }, [businesses, activeBusinessId]);

  // Synchronize state with useBusinessStore (Zustand) using selectors to avoid subscribing to state updates
  const setStoreBusinesses = useBusinessStore((state) => state.setBusinesses);
  const setStoreActiveBusiness = useBusinessStore((state) => state.setActiveBusiness);

  useEffect(() => {
    setStoreBusinesses(businesses);
  }, [businesses, setStoreBusinesses]);

  useEffect(() => {
    setStoreActiveBusiness(activeBusiness);
  }, [activeBusiness, setStoreActiveBusiness]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const setActiveBusiness = useCallback((business: Business | null) => {
    setActiveBusinessId(business ? business.id : null);
  }, []);

  const refreshBusinesses = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ["businesses"] });
  }, [queryClient]);

  // --- Suscripción Realtime compartida ---
  useEffect(() => {
    if (channelRef.current) {
      return;
    }

    let stopped = false;

    const createAndSubscribe = () => {
      if (stopped) return;

      const channel = supabase
        .channel("businesses-switcher-channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public_web", table: "businesses" },
          (payload) => {
            const { eventType, new: newData, old: oldData } = payload;
            const newRow = newData as DbBusiness;
            const oldRow = oldData as DbBusiness;


            try {
              if (eventType === "INSERT" && newRow) {
                queryClient.invalidateQueries({ queryKey: ["businesses"] });
                if (newRow.id) {
                  setActiveBusinessId(newRow.id);
                }
              } else if (eventType === "UPDATE") {
                queryClient.invalidateQueries({ queryKey: ["businesses"] });
              } else if (eventType === "DELETE" && oldRow) {
                queryClient.invalidateQueries({ queryKey: ["businesses"] });
                if (activeBusinessId === oldRow.id) {
                  setActiveBusinessId(null);
                }
              }
            } catch (err) {
              console.error("Error handling realtime payload:", err);
            }
          },
        )
        .subscribe((status, err) => {
          if (err) {
            console.error("Realtime subscription error:", err);
          }

          if (status === "SUBSCRIBED") {
            reconnectAttemptsRef.current = 0;
          }

          if (status === "CHANNEL_ERROR") {
            reconnectAttemptsRef.current++;
            const attempts = reconnectAttemptsRef.current;
            const delay = Math.min(30000, 1000 * 2 ** attempts);

            setTimeout(() => {
              try {
                supabase.removeChannel(channel);
              } catch (err) {
                console.warn(
                  "Error removing channel during reconnect attempt",
                  err,
                );
              }
              if (!stopped) {
                channelRef.current = null;
                createAndSubscribe();
              }
            }, delay);
          }
        });

      channelRef.current = channel;
    };

    createAndSubscribe();

    return () => {
      stopped = true;
      if (channelRef.current) {
        try {
          supabase.removeChannel(channelRef.current);
        } catch (err) {
          console.warn("Error removing realtime channel on cleanup", err);
        } finally {
          channelRef.current = null;
        }
      }
    };
  }, [supabase, activeBusinessId, queryClient]);

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

export function useBusinessSwitcher() {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error(
      "useBusinessSwitcher must be used within a BusinessProvider",
    );
  }
  return context;
}

