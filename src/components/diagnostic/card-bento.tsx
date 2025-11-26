"use client";

import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const InfoTooltip = ({ content }: { content: string }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline" size="icon">
        <HelpCircle className="size-5" />
        <span className="sr-only">Más información</span>
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>{content}</p>
    </TooltipContent>
  </Tooltip>
);

export function CardBento({
  title,
  infoTooltipContent,
  description,
  cardContent,
  cardFooter,
  className,
  ...props
}: {
  title: string;
  infoTooltipContent?: string;
  description?: React.ReactNode | string;
  cardContent: React.ReactNode;
  cardFooter?: React.ReactNode;
} & React.ComponentProps<"div">) {
  return (
    <Card
      className={cn(
        "group h-full shadow-sm transition-all duration-300 hover:shadow-md",
        className,
      )}
      {...props}
    >
      <CardHeader>
        <CardTitle className="text-sm font-bold tracking-widest uppercase">
          {title}
        </CardTitle>
        {description && (
          <CardDescription>
            {typeof description === "string" ? (
              <span>{description}</span>
            ) : (
              description
            )}
          </CardDescription>
        )}
        {infoTooltipContent && (
          <CardAction>
            <InfoTooltip content={infoTooltipContent} />
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex h-full flex-col overflow-hidden">
        {cardContent}
      </CardContent>
      {cardFooter && <CardFooter>{cardFooter}</CardFooter>}
    </Card>
  );
}
