"use client";

import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionWithResponses } from "@/types/business/type";

interface QuestionFieldProps {
  question: QuestionWithResponses;
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  type: "base" | "ai";
}

export function QuestionField({ question, index, control, type }: QuestionFieldProps) {
  const name = type === "base"
    ? `questions.questions.${index}.answer`
    : `extraQuestions.additionalQuestions.${index}.answer`;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="bg-surface-800/20 hover:bg-surface-800/40 border border-border/50 hover:border-border rounded-xl p-6 transition-all duration-300">
          <FormLabel className="text-base font-semibold text-foreground/90">
            {question.questionText}
          </FormLabel>
          <div className="mt-3">
            <FormControl>
              {question.questionType === "open" ? (
                <Textarea
                  placeholder="Escribe tu respuesta detallada aquí..."
                  className="min-h-[100px] bg-background/50 focus-visible:ring-primary/30 border-border/60 transition-all resize-y"
                  {...field}
                  value={field.value || ""}
                />
              ) : question.questionType === "single" ? (
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value || ""}
                  className="flex flex-col gap-2.5"
                >
                  {question.options?.map((opt) => (
                    <FormItem
                      key={opt.value}
                      className="flex items-center space-y-0 gap-3 cursor-pointer group"
                    >
                      <FormControl>
                        <RadioGroupItem
                          value={opt.value}
                          className="cursor-pointer"
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-muted-foreground group-hover:text-foreground cursor-pointer transition-colors text-sm">
                        {opt.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              ) : question.questionType === "multiple" ? (
                <div className="flex flex-col gap-2.5">
                  {question.options?.map((opt) => {
                    const isChecked = Array.isArray(field.value) && field.value.includes(opt.value);
                    return (
                      <FormItem
                        key={opt.value}
                        className="flex flex-row items-center space-y-0 gap-3 cursor-pointer group"
                      >
                        <FormControl>
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={(checked) => {
                              const currentValues = Array.isArray(field.value) ? field.value : [];
                              if (checked) {
                                field.onChange([...currentValues, opt.value]);
                              } else {
                                field.onChange(currentValues.filter((val) => val !== opt.value));
                              }
                            }}
                            className="cursor-pointer"
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-muted-foreground group-hover:text-foreground cursor-pointer transition-colors text-sm">
                          {opt.label}
                        </FormLabel>
                      </FormItem>
                    );
                  })}
                </div>
              ) : null}
            </FormControl>
          </div>
          <FormMessage className="text-xs mt-1.5" />
        </FormItem>
      )}
    />
  );
}
