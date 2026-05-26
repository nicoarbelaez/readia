"use client";

import { Control, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { NavigationButtons } from "@/components/forms/company-profile/components/navigation-buttons";
import { useCompanyFormStore } from "@/stores/use-company-form-store";
import {
  CompanyGeneralInfo,
  CompanyGeneralInfoSchema,
} from "@/components/forms/company-profile/schemas/company-form-schemas";
import { InputFormItem } from "@/components/forms/company-profile/components/input-form-item";

const FormFieldGroup = ({
  control,
}: {
  control: Control<CompanyGeneralInfo>;
}) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex w-full items-center justify-between gap-4">
          <FormField
            control={control}
            name="companyName"
            render={({ field }) => (
              <div className="flex-1">
                <InputFormItem
                  type="text"
                  field={field}
                  label="Nombre de la empresa"
                  inputProps={{
                    placeholder: "Empresa S.A.",
                  }}
                />
              </div>
            )}
          />
          <FormField
            control={control}
            name="sector"
            render={({ field }) => (
              <div className="flex-1">
                <InputFormItem
                  type="select"
                  field={field}
                  label="Sector"
                  selectItems={["Industrial", "Comercio", "Servicios"]}
                />
              </div>
            )}
          />
        </div>
        <div className="flex w-full items-center justify-between gap-4">
          <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <div className="flex-1">
                <InputFormItem
                  type="text"
                  field={field}
                  label="Categoría"
                  inputProps={{
                    placeholder: "Ej: Tecnología, Agricultura, etc.",
                  }}
                />
              </div>
            )}
          />
          <FormField
            control={control}
            name="employeeCount"
            render={({ field }) => (
              <div className="flex-1">
                <InputFormItem
                  type="number"
                  field={field}
                  label="Cantidad de empleados"
                  inputProps={{
                    placeholder: "Ej: 50",
                  }}
                />
              </div>
            )}
          />
          <FormField
            control={control}
            name="netEarnings"
            render={({ field }) => (
              <div className="flex-1">
                <InputFormItem
                  type="number"
                  field={field}
                  label="Ganancias netas"
                  inputProps={{
                    placeholder: "Ej: 100000",
                  }}
                />
              </div>
            )}
          />
        </div>
      </div>
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <InputFormItem type="textarea" field={field} label="Descripción" />
        )}
      />
    </>
  );
};

export function CompanyGeneralInfoStep() {
  const store = useCompanyFormStore();

  const form = useForm<CompanyGeneralInfo>({
    resolver: zodResolver(CompanyGeneralInfoSchema),
    defaultValues: store.generalInfo || {
      companyName: "",
      sector: "",
      category: "",
      employeeCount: undefined,
      netEarnings: undefined,
      description: "",
    },
  });

  const onSubmit = (data: CompanyGeneralInfo) => {
    store.setGeneralInfo(data);
    store.goToNextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormFieldGroup control={form.control} />

        <NavigationButtons
          onNext={form.handleSubmit(onSubmit)}
          isNextDisabled={form.formState.isSubmitting}
          nextLabel={form.formState.isSubmitting ? "Guardando..." : "Siguiente"}
          backLabel="Cancelar"
          onBack={undefined}
        />
      </form>
    </Form>
  );
}
