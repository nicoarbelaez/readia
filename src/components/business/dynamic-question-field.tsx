import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Control } from "react-hook-form";
import { CompanyFormData } from "@/components/forms/company-profile/schemas/company-form-schemas";

interface DynamicQuestionFieldProps {
  control: Control<CompanyFormData>;
  index: number;
  questionText: string;
  questionType: "open" | "single" | "multiple";
  options?: { label: string; value: string }[];
  path: "extraQuestions.additionalQuestions" | "questions.questions";
}

export const DynamicQuestionField = ({
  control,
  index,
  questionText,
  questionType,
  options,
  path,
}: DynamicQuestionFieldProps) => {
  return (
    <FormField
      control={control}
      name={`${path}.${index}.answer`}
      render={({ field }) => (
        <FormItem className="bg-accent rounded-lg border p-4 shadow-sm">
          <FormLabel className="text-base font-semibold">
            {questionText}
          </FormLabel>
          <FormControl>
            <div className="pt-2">
              {questionType === "open" && (
                <Textarea
                  placeholder="Escribe tu respuesta aquí..."
                  className="min-h-[100px] resize-y"
                  {...field}
                  value={field.value ?? ""}
                />
              )}

              {questionType === "single" && (
                <RadioGroup
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-1"
                >
                  {options?.map((opt) => (
                    <FormItem
                      key={opt.value}
                      className="flex items-center space-y-0 space-x-3"
                    >
                      <FormControl>
                        <RadioGroupItem
                          value={opt.value}
                          checked={field.value == opt.value}
                        />
                      </FormControl>
                      <FormLabel className="cursor-pointer font-normal">
                        {opt.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              )}

              {questionType === "multiple" && (
                <div className="flex flex-col space-y-2">
                  {options?.map((opt) => (
                    <FormItem
                      key={opt.value}
                      className="flex flex-row items-start space-y-0 space-x-3"
                    >
                      <FormControl>
                        <Checkbox
                          defaultChecked={field.value?.includes(opt.value)}
                        />
                      </FormControl>
                      <FormLabel className="cursor-pointer font-normal">
                        {opt.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
