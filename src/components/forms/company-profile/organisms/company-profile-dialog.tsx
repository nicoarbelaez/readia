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
import { useState } from "react";
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
  if (currentStep > totalSteps || formData.extraQuestions) {
    onConfirm();
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

export function CompanyProfileDialog({
  isOpen = false,
  onOpenChange,
  initialData,
  onSubmit,
}: CompanyProfileDialogProps) {
  const [pendingClose, setPendingClose] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    console.log("handleOpenChange", newOpen, pendingClose);
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
    try {
      await onSubmit?.(formData);
      toast.success("Formulario completado con éxito");
      handleOpenChange(false);
    } catch (error) {
      toast.error("Error al guardar el formulario");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-2xl"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Crear perfil de empresa</DialogTitle>
          <DialogDescription>
            Por favor completa la información solicitada.
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
          <div className="space-y-6">
            <StepContent />
          </div>
        </CompanyFormProvider>
      </DialogContent>
    </Dialog>
  );
}
