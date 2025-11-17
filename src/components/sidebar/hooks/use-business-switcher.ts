import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { getBusinesses } from "@/app/actions/business-profile-actions";

export interface Business {
  id: number;
  companyName: string;
  description: string | null;
  sector: string;
  employeeCount: number;
}

export function useBusinessSwitcher() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [activeBusiness, setActiveBusiness] = useState<Business | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const loadInitialBusinesses = async () => {
      try {
        setIsLoading(true);
        const initialBusinesses = await getBusinesses();
        setBusinesses(initialBusinesses);

        // Establecer el primer negocio como activo si existe
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
  }, [activeBusiness]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInsert = useCallback((newRow: any) => {
    const newBusiness: Business = {
      id: newRow.id,
      companyName: newRow.company_name,
      description: newRow.description,
      sector: newRow.sector,
      employeeCount: newRow.employee_count,
    };

    setBusinesses((prev) => {
      // Evitar duplicados
      if (prev.some((business) => business.id === newBusiness.id)) {
        return prev;
      }

      const newBusinesses = [newBusiness, ...prev];

      // Si era el primer negocio, establecer como activo
      if (prev.length === 0) {
        setActiveBusiness(newBusiness);
      }

      return newBusinesses;
    });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdate = useCallback((newRow: any) => {
    const updatedBusiness: Business = {
      id: newRow.id,
      companyName: newRow.company_name,
      description: newRow.description,
      sector: newRow.sector,
      employeeCount: newRow.employee_count,
    };

    setBusinesses((prev) =>
      prev.map((business) =>
        business.id === updatedBusiness.id ? updatedBusiness : business,
      ),
    );

    // Si el negocio actualizado es el activo, actualizarlo también
    setActiveBusiness((prev) =>
      prev?.id === updatedBusiness.id ? updatedBusiness : prev,
    );
  }, []);

  const handleDelete = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (oldRow: any) => {
      const deletedBusinessId = oldRow.id;

      setBusinesses((prev) => {
        const newBusinesses = prev.filter(
          (business) => business.id !== deletedBusinessId,
        );

        // Si el negocio eliminado era el activo, cambiar el activo
        if (activeBusiness?.id === deletedBusinessId) {
          setActiveBusiness(newBusinesses.length > 0 ? newBusinesses[0] : null);
        }

        return newBusinesses;
      });
    },
    [activeBusiness],
  );

  // Función para refrescar manualmente (útil para sincronización)
  const refreshBusinesses = useCallback(async () => {
    try {
      setIsLoading(true);
      const updatedBusinesses = await getBusinesses();
      setBusinesses(updatedBusinesses);

      // Si el activeBusiness actual no existe en la nueva lista, actualizarlo
      if (
        activeBusiness &&
        !updatedBusinesses.some((b) => b.id === activeBusiness.id)
      ) {
        setActiveBusiness(
          updatedBusinesses.length > 0 ? updatedBusinesses[0] : null,
        );
      }
    } catch (error) {
      console.error("Error refreshing businesses:", error);
    } finally {
      setIsLoading(false);
    }
  }, [activeBusiness]);

  // Suscripción a eventos en tiempo real
  useEffect(() => {
    const channel = supabase
      .channel("businesses-switcher-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public_web",
          table: "businesses",
        },
        (payload) => {
          const { eventType, new: newRow, old: oldRow } = payload;

          switch (eventType) {
            case "INSERT":
              handleInsert(newRow);
              break;

            case "UPDATE":
              handleUpdate(newRow);
              break;

            case "DELETE":
              handleDelete(oldRow);
              break;

            default:
              console.warn("Evento no manejado:", eventType);
              refreshBusinesses();
          }
        },
      )
      .subscribe((status, error) => {
        if (error) {
          console.error("Channel error:", error);
        }

        // Si hay error en la suscripción, hacer refresh manual
        if (status === "CHANNEL_ERROR") {
          refreshBusinesses();
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, handleInsert, handleUpdate, handleDelete, refreshBusinesses]);

  return {
    businesses,
    activeBusiness,
    setActiveBusiness,
    isLoading,
    refreshBusinesses,
  };
}
