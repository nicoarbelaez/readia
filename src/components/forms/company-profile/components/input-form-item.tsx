"use client";

import React from "react";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

interface InputFormItemProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> {
  type: "text" | "number" | "textarea";
  field: ControllerRenderProps<TFieldValues, TName>;
  inputProps?: React.ComponentProps<typeof Input>;
  label?: string;
}

export function InputFormItem<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({ type, field, inputProps, label }: InputFormItemProps<TFieldValues, TName>) {
  return (
    <FormItem>
      <FormLabel>{label ?? "Campo"}</FormLabel>
      <FormControl>
        {type === "textarea" ? (
          <textarea
            {...field}
            className="bg-background min-h-[100px] w-full rounded-md border px-3 py-2"
            placeholder={inputProps?.placeholder ?? ""}
          />
        ) : (
          <Input
            type={type}
            value={field.value ?? ""}
            onChange={(e) => {
              const v = e.target.value;
              if (type === "number") {
                field.onChange(v === "" ? undefined : Number(v));
              } else {
                field.onChange(v);
              }
            }}
            {...inputProps}
          />
        )}
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
