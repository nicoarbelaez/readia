"use client";

import React from "react";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioFormItemProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> {
  type: "single" | "multiple";
  label: string;
  field: ControllerRenderProps<TFieldValues, TName>;
  options: RadioOption[];
}

export function RadioFormItem<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({ type, label, field, options }: RadioFormItemProps<TFieldValues, TName>) {
  const radioedValues: string[] =
    type === "multiple" ? (Array.isArray(field.value) ? field.value : []) : [];

  const handleSingleChange = (value: string) => {
    field.onChange(value);
  };

  const handleMultipleChange = (optionValue: string, checked: boolean) => {
    let newArr: string[] = Array.isArray(field.value) ? [...field.value] : [];
    if (checked) {
      if (!newArr.includes(optionValue)) {
        newArr.push(optionValue);
      }
    } else {
      newArr = newArr.filter((v) => v !== optionValue);
    }
    field.onChange(newArr);
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div>
          {options.map((option) => {
            if (type === "single") {
              return (
                <label
                  key={option.value}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={field.value === option.value}
                    onChange={() => handleSingleChange(option.value)}
                  />
                  <span>{option.label}</span>
                </label>
              );
            } else {
              // multiple
              const isChecked = radioedValues.includes(option.value);
              return (
                <label
                  key={option.value}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    name={field.name}
                    value={option.value}
                    checked={isChecked}
                    onChange={(e) =>
                      handleMultipleChange(option.value, e.target.checked)
                    }
                  />
                  <span>{option.label}</span>
                </label>
              );
            }
          })}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
