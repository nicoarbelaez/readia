"use client";

import React from "react";
import { toast } from "sonner";
import { Trash2, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteBusiness } from "@/app/actions/business/business-profile-actions";
import { useBusinessStore } from "@/stores/use-business-store";
import { useRouter } from "next/navigation";

interface DeleteBusinessDialogProps {
  businessId: number;
  companyName: string;
}

export function DeleteBusinessDialog({
  businessId,
  companyName,
}: DeleteBusinessDialogProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const { setActiveBusiness, setBusinesses, businesses } = useBusinessStore();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDeleting(true);
    try {
      const result = await deleteBusiness(businessId);
      if (result.success) {
        // 1. Limpiar el estado global (Zustand)
        setActiveBusiness(null);
        setBusinesses(businesses.filter((b) => b.id !== businessId));

        // 2. Limpiar el estado de generación de localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem(`generation_status_${businessId}`);
        }

        toast.success(`La empresa "${companyName}" ha sido eliminada.`);
        setIsOpen(false);

        // 3. Redirigir al home
        router.push("/home");
      } else {
        toast.error(result.message || "No se pudo eliminar la empresa.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error inesperado al eliminar la empresa.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="flex items-center gap-2 shadow-sm cursor-pointer"
          disabled={isDeleting}
        >
          <Trash2 className="size-4" />
          Eliminar empresa
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-destructive flex items-center gap-2">
            <Trash2 className="size-5" />
            ¿Eliminar esta empresa?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground mt-2">
            Esta acción eliminará de forma permanente la empresa <strong>{companyName}</strong>, 
            junto con todas sus respuestas, diagnósticos y hojas de ruta generadas. Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 gap-2">
          <AlertDialogCancel disabled={isDeleting} className="cursor-pointer">Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Eliminando...
              </>
            ) : (
              "Confirmar eliminación"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
