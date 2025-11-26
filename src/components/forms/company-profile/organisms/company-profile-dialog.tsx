"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CompanyFormProvider } from "@/components/forms/company-profile/context/company-form-provider";
import { StepIndicator } from "@/components/forms/company-profile/components/step-indicator";
import { useCompanyForm } from "@/components/forms/company-profile/context/company-form-context";
import { CompanyFormData } from "@/components/forms/company-profile/schemas/company-form-schemas";
import { toast } from "sonner";
import { CompanyGeneralInfoStep } from "@/components/forms/company-profile/organisms/company-general-info-step";
import { CompanyQuestionsStep } from "@/components/forms/company-profile/organisms/company-questions-step";
import { CompanyAdditionalInfoStep } from "@/components/forms/company-profile/organisms/company-additional-info-step";
import { useEffect, useState } from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { createBusinessProfile } from "@/app/actions/business/business-profile-actions";
import { Spinner } from "@/components/ui/spinner";

interface CompanyProfileDialogProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialData?: Partial<CompanyFormData>;
  onSubmit?: (data: CompanyFormData) => Promise<void>;
}

function StepContent() {
  const { currentStep, totalSteps } = useCompanyForm();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CompanyGeneralInfoStep />;
      case 2:
        return <CompanyQuestionsStep />;
      case 3:
        return <CompanyAdditionalInfoStep />;
      default:
        return null;
    }
  };

  return (
    <>
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      {renderStep()}
    </>
  );
}

function AlertCloseDialog({
  isOpen = false,
  onConfirm,
  onCancel,
}: {
  isOpen?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const { currentStep, totalSteps, formData } = useCompanyForm();
  const shouldConfirmImmediately =
    currentStep > totalSteps || !!formData.extraQuestions;

  // Efecto para llamar onConfirm después del render, si aplica
  useEffect(() => {
    if (shouldConfirmImmediately) {
      onConfirm();
    }
    // Solo depende de los valores que determinan la condición
  }, [shouldConfirmImmediately, onConfirm]);

  if (shouldConfirmImmediately) {
    // No renderizamos el dialog si ya decidimos confirmar
    return null;
  }

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Deseas abandonar el formulario?</AlertDialogTitle>
          <AlertDialogDescription>
            Todos los datos ingresados se perderán y no podrás deshacer esta
            acción.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            No, mantener los cambios
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Sí, cerrar sin guardar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function LoadingOverlay() {
  return (
    <div className="bg-background/80 absolute -inset-4 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <Spinner className="text-primary size-5" />
          <span className="text-foreground text-sm font-medium">
            Guardando perfil de empresa...
          </span>
        </div>
        <p className="text-muted-foreground max-w-xs text-center text-xs">
          Esto puede tomar unos segundos. Por favor, no cierres esta ventana.
        </p>
      </div>
    </div>
  );
}

export function CompanyProfileDialog({
  isOpen = false,
  onOpenChange,
  initialData,
  onSubmit,
}: CompanyProfileDialogProps) {
  const [pendingClose, setPendingClose] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    if (isSubmitting) {
      // Prevenir el cierre mientras se está enviando
      return;
    }

    if (!newOpen) {
      setPendingClose(true);
    } else {
      onOpenChange?.(true);
    }
  };

  const handleConfirm = () => {
    setPendingClose(false);
    onOpenChange?.(false);
  };

  const handleCancel = () => {
    setPendingClose(false);
  };

  const handleStepComplete = (
    stepData: Partial<CompanyFormData>,
    step: number,
  ) => {
    toast.success(`Paso ${step} completado`);
  };

  const handleFormComplete = async (formData: CompanyFormData) => {
    setIsSubmitting(true);

    try {
      // Si se proporciona un onSubmit personalizado, usarlo
      if (onSubmit) {
        await onSubmit(formData);
        toast.success("Formulario completado con éxito");
        handleOpenChange(false);
        return;
      }

      // Usar la acción por defecto
      const response = await createBusinessProfile(formData);

      if (!response.success) {
        throw new Error(
          response.message || "Error al guardar el perfil de empresa",
        );
      }

      toast.success("Perfil de empresa creado exitosamente");
      handleOpenChange(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Error inesperado al guardar el formulario",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-2xl"
        onPointerDownOutside={(e) => {
          // Prevenir el cierre al hacer clic fuera mientras se envía
          if (isSubmitting) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={(e) => {
          // Prevenir el cierre con ESC mientras se envía
          if (isSubmitting) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Crear perfil de empresa</DialogTitle>
          <DialogDescription>
            Completa la información solicitada para crear el perfil de tu
            empresa.
          </DialogDescription>
        </DialogHeader>

        <CompanyFormProvider
          initialData={initialData}
          onStepComplete={handleStepComplete}
          onFormComplete={handleFormComplete}
        >
          {pendingClose && (
            <AlertCloseDialog
              isOpen={pendingClose}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          )}
          <div className="relative space-y-6">
            <StepContent />
            {isSubmitting && <LoadingOverlay />}
          </div>
        </CompanyFormProvider>
      </DialogContent>
    </Dialog>
  );
}
