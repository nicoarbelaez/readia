"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { createClient } from "@/utils/supabase/client";
import { getBusinesses } from "@/app/actions/business/business-profile-actions";
import { DbBusiness } from "@/types/database/entities";

export interface Business {
  id: number;
  companyName: string;
  description: string | null;
  sector: string;
  employeeCount: number;
}

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
  const supabase = createClient();

  // Carga inicial
  useEffect(() => {
    const loadInitialBusinesses = async () => {
      try {
        setIsLoading(true);
        const initialBusinesses = await getBusinesses();
        setBusinesses(initialBusinesses);

        if (initialBusinesses.length > 0 && !activeBusiness) {
          setActiveBusiness(initialBusinesses[0]);
        }
      } catch (error) {
        console.error("Error loading businesses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialBusinesses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Quitamos activeBusiness de dependencias para evitar loops infinitos en carga inicial

  // Lógica de actualización local (Optimizada)
  const handleInsert = useCallback((newRow: DbBusiness) => {
    const newBusiness: Business = {
      id: newRow.id,
      companyName: newRow.company_name,
      description: newRow.description,
      sector: newRow.sector || "N/A",
      employeeCount: newRow.employee_count || 0,
    };

    setBusinesses((prev) => {
      if (prev.some((b) => b.id === newBusiness.id)) return prev;
      const newList = [newBusiness, ...prev];
      if (prev.length === 0) setActiveBusiness(newBusiness);
      return newList;
    });
  }, []);

  const handleUpdate = useCallback((newRow: DbBusiness) => {
    const updatedBusiness: Business = {
      id: newRow.id,
      companyName: newRow.company_name,
      description: newRow.description,
      sector: newRow.sector || "N/A",
      employeeCount: newRow.employee_count || 0,
    };

    setBusinesses((prev) =>
      prev.map((b) => (b.id === updatedBusiness.id ? updatedBusiness : b)),
    );

    setActiveBusiness((prev) =>
      prev?.id === updatedBusiness.id ? updatedBusiness : prev,
    );
  }, []);

  const handleDelete = useCallback((oldRow: DbBusiness) => {
    const deletedId = oldRow.id;
    setBusinesses((prev) => {
      const newList = prev.filter((b) => b.id !== deletedId);
      // Usamos functional update para activeBusiness dentro de este scope si fuera necesario,
      // pero como es otro estado, lo manejamos con un efecto o lógica separada.
      // Aquí simplificamos para no complicar el contexto:
      return newList;
    });
  }, []);

  // Efecto para sincronizar activeBusiness si se borra
  useEffect(() => {
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
      setBusinesses(updatedBusinesses);
      // La lógica de actualizar el activo se maneja en el useEffect de arriba
    } catch (error) {
      console.error("Error refreshing:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Suscripción Realtime (SOLO UNA VEZ)
  useEffect(() => {
    const channel = supabase
      .channel("global-businesses-channel") // Nombre único global
      .on(
        "postgres_changes",
        { event: "*", schema: "public_web", table: "businesses" },
        (payload) => {
          const { eventType, new: newData, old: oldData } = payload;

          const newRow = newData as DbBusiness;
          const oldRow = oldData as DbBusiness;

          if (eventType === "INSERT" && newRow) handleInsert(newRow);
          if (eventType === "UPDATE" && newRow) handleUpdate(newRow);
          if (eventType === "DELETE" && oldRow) handleDelete(oldRow);
        },
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR") refreshBusinesses();
      });

    return () => {
      supabase.removeChannel(channel);
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
