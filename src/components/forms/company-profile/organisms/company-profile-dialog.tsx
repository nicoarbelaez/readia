"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { StepIndicator } from "@/components/forms/company-profile/components/step-indicator";
import { useCompanyFormStore } from "@/stores/use-company-form-store";
import { CompanyFormData } from "@/components/forms/company-profile/schemas/company-form-schemas";
import { CompanyGeneralInfoStep } from "@/components/forms/company-profile/organisms/company-general-info-step";
import { QuestionCarouselStep } from "@/components/forms/company-profile/organisms/question-carousel-step";
import { useEffect, useState, useCallback } from "react";
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
import { Spinner } from "@/components/ui/spinner";
import { useGenerateQuestions } from "@/hooks/use-generate-questions";
import { useCreateBusinessProfile } from "@/hooks/use-create-business-profile";
import { QuestionsList } from "@/types/question";
import type { Question } from "@/types/question";
import type { CompanyQuestion } from "@/components/forms/company-profile/schemas/company-form-schemas";
import { toast } from "sonner";
import { Building2, Sparkles } from "lucide-react";

function toCompanyQuestion(q: Question): CompanyQuestion {
  if (q.type === "multiple") {
    return { label: q.label, type: "multiple", answer: [], originalQuestion: q };
  } else if (q.type === "single") {
    return { label: q.label, type: "single", answer: "", originalQuestion: q };
  } else {
    return { label: q.label, type: "open", answer: "", originalQuestion: q };
  }
}

// ─────────────────────────────────────────────────────────────────
// Preguntas base (movidas aquí para cohesión)
// ─────────────────────────────────────────────────────────────────

const BASE_QUESTIONS: QuestionsList = [
  { id: "q1", type: "open", label: "¿Cuál es el principal desafío que enfrenta tu empresa actualmente?" },
  {
    id: "q2",
    type: "multiple",
    label: "¿En qué etapa de madurez digital consideras que está tu empresa?",
    options: [
      { value: "inicial", label: "Inicial - Procesos principalmente manuales" },
      { value: "desarrollo", label: "En desarrollo - Algunos procesos digitalizados" },
      { value: "avanzado", label: "Avanzado - Mayoría de procesos digitales" },
      { value: "optimizado", label: "Optimizado - Completamente digital" },
    ],
  },
  { id: "q3", type: "open", label: "¿Cuáles son tus objetivos de crecimiento para el próximo año?" },
  {
    id: "q4",
    type: "single",
    label: "¿Tienes un plan de transformación digital?",
    options: [
      { value: "si", label: "Sí" },
      { value: "no", label: "No" },
      { value: "en_proceso", label: "En proceso de desarrollo" },
    ],
  },
  { id: "q5", type: "open", label: "¿Qué recursos necesitarías para alcanzar tus objetivos empresariales?" },
];

// ─────────────────────────────────────────────────────────────────
// Sub-componentes
// ─────────────────────────────────────────────────────────────────

/**
 * StepContent renderiza el paso actual del formulario.
 * Recibe `onFormComplete` para llamarlo directamente cuando el usuario
 * termina el último paso — evita el patrón frágil de currentStep > totalSteps.
 */
function StepContent({ onFormComplete }: { onFormComplete: () => void }) {
  const store = useCompanyFormStore();
  const generateQuestions = useGenerateQuestions();

  // Inicializar preguntas base en el store si está vacío
  useEffect(() => {
    if (store.questionsAnswers.length === 0) {
      store.setQuestionsAnswers(BASE_QUESTIONS.map(toCompanyQuestion));
    }
    // Solo inicializar una vez
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBaseQuestionsComplete = () => {
    generateQuestions.mutate(
      {
        questionsAnswered: store.questionsAnswers,
        generalInfo: store.generalInfo,
        existingQuestions: BASE_QUESTIONS,
      },
      {
        onSuccess: (data) => {
          store.setAiQuestions(data);
          store.setExtraQuestionsAnswers(data.map(toCompanyQuestion));
          store.goToNextStep();
        },
        onError: (e) => {
          toast.error("Error al generar preguntas: " + e.message);
        },
      }
    );
  };

  const renderStep = () => {
    switch (store.currentStep) {
      case 1:
        return <CompanyGeneralInfoStep />;

      case 2:
        return (
          <QuestionCarouselStep
            questions={BASE_QUESTIONS}
            stepKey="questionsAnswers"
            onComplete={handleBaseQuestionsComplete}
            onBack={() => store.goToPreviousStep()}
            isLoading={generateQuestions.isPending}
          />
        );

      case 3:
        return (
          <QuestionCarouselStep
            questions={store.aiQuestions || []}
            stepKey="extraQuestionsAnswers"
            // Paso final: llama directamente al callback de completado
            onComplete={onFormComplete}
            onBack={() => store.goToPreviousStep()}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <StepIndicator currentStep={store.currentStep} totalSteps={store.totalSteps} />
      {renderStep()}
    </>
  );
}

/** Modal de confirmación para cerrar el formulario sin guardar */
function AlertCloseDialog({
  isOpen = false,
  onConfirm,
  onCancel,
}: {
  isOpen?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => { if (!open) onCancel(); }}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Deseas abandonar el formulario?</AlertDialogTitle>
          <AlertDialogDescription>
            Todos los datos ingresados se perderán y no podrás deshacer esta acción.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>No, mantener los cambios</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Sí, cerrar sin guardar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/** Overlay que se muestra mientras se crea la empresa */
function CreatingCompanyOverlay() {
  return (
    <div className="bg-background/90 absolute -inset-4 z-50 flex items-center justify-center rounded-xl backdrop-blur-md">
      <div className="flex flex-col items-center gap-5 px-8 text-center">
        {/* Icono animado */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="bg-primary/20 absolute inset-0 animate-ping rounded-full" />
          <div className="bg-primary/10 absolute inset-2 rounded-full" />
          <Building2 className="text-primary relative z-10 h-8 w-8" />
        </div>

        {/* Texto principal */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Spinner className="text-primary h-4 w-4" />
            <span className="text-foreground text-base font-semibold">
              Creando tu empresa…
            </span>
          </div>
          <p className="text-muted-foreground max-w-[260px] text-sm">
            Guardando toda la información. Una vez terminado, generaremos tu diagnóstico
            y hoja de ruta con IA.
          </p>
        </div>

        {/* Indicadores de pasos siguientes */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-yellow-500" />
          <span>Diagnóstico + Hoja de ruta en camino</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────────────────────────

interface CompanyProfileDialogProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Prop opcional para override del submit (p.ej. en tests o Storybook) */
  onSubmit?: (data: CompanyFormData) => Promise<void>;
}

export function CompanyProfileDialog({
  isOpen = false,
  onOpenChange,
  onSubmit,
}: CompanyProfileDialogProps) {
  const store = useCompanyFormStore();
  const [pendingClose, setPendingClose] = useState(false);

  const createMutation = useCreateBusinessProfile({
    onSuccess: () => {
      // Cerrar el modal y resetear el store una vez la empresa está creada.
      // Las toasts de diagnóstico/roadmap se disparan en el hook de forma asíncrona.
      store.reset();
      onOpenChange?.(false);
    },
  });

  const isSubmitting = createMutation.isPending;

  // ── Handlers ──────────────────────────────────────────────

  const handleOpenChange = (newOpen: boolean) => {
    if (isSubmitting) return; // Bloquear cierre durante la creación
    if (!newOpen) {
      setPendingClose(true);
    } else {
      store.reset();
      onOpenChange?.(true);
    }
  };

  const handleConfirmClose = () => {
    setPendingClose(false);
    store.reset();
    onOpenChange?.(false);
  };

  const handleCancelClose = () => {
    setPendingClose(false);
  };

  /**
   * Se llama cuando el usuario pulsa "Completar" en la última pregunta.
   * Ejecuta la mutación de React Query en lugar de llamar al server action directamente.
   */
  const handleFormComplete = useCallback(async () => {
    if (!store.generalInfo) return;
    const formData: CompanyFormData = {
      generalInfo: store.generalInfo,
      questions: { questions: store.questionsAnswers },
      extraQuestions: { additionalQuestions: store.extraQuestionsAnswers },
    };

    // Override: si se pasó una prop onSubmit, usarla (Storybook / tests)
    if (onSubmit) {
      try {
        await onSubmit(formData);
        store.reset();
        onOpenChange?.(false);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Error inesperado");
      }
      return;
    }

    createMutation.mutate(formData);
  }, [store, onSubmit, onOpenChange, createMutation]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-2xl"
        onPointerDownOutside={(e) => { if (isSubmitting) e.preventDefault(); }}
        onEscapeKeyDown={(e) => { if (isSubmitting) e.preventDefault(); }}
      >
        <DialogHeader>
          <DialogTitle>Crear perfil de empresa</DialogTitle>
          <DialogDescription>
            Completa la información solicitada para crear el perfil de tu empresa.
          </DialogDescription>
        </DialogHeader>

        {/* Alerta de confirmación para cerrar sin guardar */}
        {pendingClose && (
          <AlertCloseDialog
            isOpen={pendingClose}
            onConfirm={handleConfirmClose}
            onCancel={handleCancelClose}
          />
        )}

        {/* Contenido del formulario */}
        <div className="relative space-y-6">
          <StepContent onFormComplete={handleFormComplete} />

          {/* Overlay de carga durante la creación */}
          {isSubmitting && <CreatingCompanyOverlay />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
