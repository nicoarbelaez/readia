"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { NavigationButtons } from "@/components/forms/company-profile/components/navigation-buttons";
import { useCompanyForm } from "@/components/forms/company-profile/context/company-form-context";
import {
  CompanyGeneralInfo,
  CompanyGeneralInfoSchema,
} from "@/components/forms/company-profile/schemas/company-form-schemas";
import { InputFormItem } from "@/components/forms/company-profile/components/input-form-item";

export function CompanyGeneralInfoStep() {
  const { formData, setStepData, goToNextStep, isFirstStep } = useCompanyForm();

  const form = useForm<CompanyGeneralInfo>({
    resolver: zodResolver(CompanyGeneralInfoSchema),
    defaultValues: formData.generalInfo || {
      companyName: "",
      sector: "",
      employeeCount: undefined,
      netEarnings: undefined,
      description: "",
    },
  });

  const onSubmit = (data: CompanyGeneralInfo) => {
    setStepData({ generalInfo: data });
    goToNextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <InputFormItem
                type="text"
                field={field}
                label="Nombre de la empresa"
                inputProps={{
                  placeholder: "Empresa S.A.",
                }}
              />
            )}
          />
          <FormField
            control={form.control}
            name="sector"
            render={({ field }) => (
              <InputFormItem
                type="text"
                field={field}
                label="Sector"
                inputProps={{
                  placeholder: "Tecnología, Agricultura, etc.",
                }}
              />
            )}
          />
          <FormField
            control={form.control}
            name="employeeCount"
            render={({ field }) => (
              <InputFormItem
                type="number"
                field={field}
                label="Cantidad de empleados"
                inputProps={{
                  placeholder: "Ej: 50",
                }}
              />
            )}
          />
          <FormField
            control={form.control}
            name="netEarnings"
            render={({ field }) => (
              <InputFormItem
                type="number"
                field={field}
                label="Ganancias netas"
                inputProps={{
                  placeholder: "Ej: 100000",
                }}
              />
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <InputFormItem type="textarea" field={field} label="Descripción" />
          )}
        />
        <NavigationButtons
          onNext={form.handleSubmit(onSubmit)}
          isNextDisabled={form.formState.isSubmitting}
          nextLabel={form.formState.isSubmitting ? "Guardando..." : "Siguiente"}
          backLabel="Cancelar"
          onBack={isFirstStep ? undefined : undefined}
        />
      </form>
    </Form>
  );
}
