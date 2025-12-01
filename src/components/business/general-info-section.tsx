import React from "react";
import { Control } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import { InputFormItem } from "@/components/forms/company-profile/components/input-form-item";
import { CompanyFormData } from "@/components/forms/company-profile/schemas/company-form-schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const GeneralInfoSection = ({
  control,
}: {
  control: Control<CompanyFormData>;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información General</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={control}
            name="generalInfo.companyName"
            render={({ field }) => (
              <InputFormItem
                type="text"
                field={field}
                label="Nombre de la empresa"
                inputProps={{ placeholder: "Empresa S.A." }}
              />
            )}
          />
          <FormField
            control={control}
            name="generalInfo.sector"
            render={({ field }) => (
              <InputFormItem
                type="select"
                field={field}
                label="Sector"
                selectItems={["Industrial", "Comercio", "Servicios"]}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={control}
            name="generalInfo.category"
            render={({ field }) => (
              <InputFormItem
                type="text"
                field={field}
                label="Categoría"
                inputProps={{ placeholder: "Ej: Tecnología" }}
              />
            )}
          />
          <FormField
            control={control}
            name="generalInfo.employeeCount"
            render={({ field }) => (
              <InputFormItem
                type="number"
                field={field}
                label="Empleados"
                inputProps={{ placeholder: "Ej: 50" }}
              />
            )}
          />
          <FormField
            control={control}
            name="generalInfo.netEarnings"
            render={({ field }) => (
              <InputFormItem
                type="number"
                field={field}
                label="Ganancias netas"
                inputProps={{ placeholder: "Ej: 100000" }}
              />
            )}
          />
        </div>

        <FormField
          control={control}
          name="generalInfo.description"
          render={({ field }) => (
            <InputFormItem
              type="textarea"
              field={field}
              label="Descripción"
              inputProps={{ placeholder: "Describe brevemente tu empresa..." }}
            />
          )}
        />
      </CardContent>
    </Card>
  );
};
