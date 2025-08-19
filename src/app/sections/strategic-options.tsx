"use client";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Gem, Handshake, Target, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { formSchema } from "../form-schema";

interface StrategicOptionsSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const options = [
  {
    value: "full_acquisition",
    icon: <Gem className="w-8 h-8" />,
    label: "Full Acquisition",
    description: "Buy all branches and assume full management.",
  },
  {
    value: "partial_partnership",
    icon: <Handshake className="w-8 h-8" />,
    label: "Partial Partnership",
    description: "Invest in a percentage (e.g., 50%) and share profit/loss without direct management.",
  },
  {
    value: "selective_acquisition",
    icon: <Target className="w-8 h-8" />,
    label: "Selective Acquisition",
    description: "Buy only profitable branches and restructure or close weaker ones.",
  },
] as const;

export default function StrategicOptionsSection({ form }: StrategicOptionsSectionProps) {
  return (
    <Card className="w-full border-primary/20 shadow-xl shadow-primary/5">
      <CardHeader>
        <CardTitle className="text-2xl text-primary flex items-center gap-2"><CheckCircle2 /> Strategic Options</CardTitle>
        <CardDescription>Select your preferred investment or acquisition strategy.</CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="strategicOption"
          render={({ field }) => (
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="space-y-4"
            >
              {options.map((option) => (
                <FormItem key={option.value}>
                  <FormControl>
                    <RadioGroupItem value={option.value} className="sr-only" />
                  </FormControl>
                  <FormLabel
                    className={cn(
                      "flex items-center space-x-4 rounded-lg border-2 p-4 cursor-pointer transition-all duration-300",
                      field.value === option.value
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="text-primary">{option.icon}</div>
                    <div className="flex-1">
                      <p className="font-bold text-lg text-foreground">{option.label}</p>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                    {field.value === option.value && <CheckCircle2 className="w-6 h-6 text-primary" />}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          )}
        />
      </CardContent>
    </Card>
  );
}
