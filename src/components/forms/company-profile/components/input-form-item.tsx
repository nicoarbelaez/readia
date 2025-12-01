"use client";

import React from "react";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

interface BaseInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TName>;
  inputProps?: React.ComponentProps<typeof Input>;
  label?: string;
  placeholder?: string;
}

interface SelectInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends BaseInputProps<TFieldValues, TName> {
  selectItems?: string[];
}

function TextInput<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({ field, inputProps }: BaseInputProps<TFieldValues, TName>) {
  return (
    <Input type="text" {...field} value={field.value ?? ""} {...inputProps} />
  );
}

function NumberInput<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({ field, inputProps }: BaseInputProps<TFieldValues, TName>) {
  return (
    <Input
      type="number"
      {...field}
      value={field.value ?? ""}
      onChange={(e) => {
        const v = e.target.value;
        field.onChange(v === "" ? undefined : Number(v));
      }}
      {...inputProps}
    />
  );
}

function TextAreaInput<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({ field, inputProps }: BaseInputProps<TFieldValues, TName>) {
  return (
    <textarea
      {...field}
      className="bg-background min-h-[100px] w-full rounded-md border px-3 py-2"
      placeholder={inputProps?.placeholder ?? ""}
    />
  );
}

function SelectInput<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
  inputProps,
  selectItems,
  label,
}: SelectInputProps<TFieldValues, TName>) {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={inputProps?.placeholder ?? "Seleccionar"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {selectItems?.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

interface InputFormItemProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends BaseInputProps<TFieldValues, TName> {
  type: "text" | "number" | "textarea" | "select";
  selectItems?: string[];
}

export function InputFormItem<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  type,
  field,
  inputProps,
  label,
  selectItems,
}: InputFormItemProps<TFieldValues, TName>) {
  return (
    <FormItem>
      <FormLabel>{label ?? "Campo"}</FormLabel>
      <FormControl>
        <div>
          {type === "text" && (
            <TextInput field={field} inputProps={inputProps} />
          )}
          {type === "number" && (
            <NumberInput field={field} inputProps={inputProps} />
          )}
          {type === "textarea" && (
            <TextAreaInput field={field} inputProps={inputProps} />
          )}
          {type === "select" && (
            <SelectInput
              field={field}
              inputProps={inputProps}
              selectItems={selectItems}
              label={label}
            />
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
