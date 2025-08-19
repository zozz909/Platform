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
    label: "الاستحواذ الكامل",
    description: "شراء كل الفروع وتولي إدارتها بالكامل.",
  },
  {
    value: "partial_partnership",
    icon: <Handshake className="w-8 h-8" />,
    label: "الشراكة الجزئية",
    description: "الاستثمار بنسبة معينة (مثلاً 50%) والمشاركة في الأرباح والخسائر بدون إدارة مباشرة.",
  },
  {
    value: "selective_acquisition",
    icon: <Target className="w-8 h-8" />,
    label: "الاستحواذ الانتقائي",
    description: "شراء الفروع المربحة فقط وإعادة هيكلة أو إغلاق الفروع الأضعف.",
  },
] as const;

export default function StrategicOptionsSection({ form }: StrategicOptionsSectionProps) {
  return (
    <Card className="w-full border-primary/20 shadow-xl shadow-primary/5">
      <CardHeader>
        <CardTitle className="text-2xl text-primary flex items-center gap-2"><CheckCircle2 /> الخيارات الاستراتيجية</CardTitle>
        <CardDescription>اختر استراتيجية الاستثمار أو الاستحواذ المفضلة لديك.</CardDescription>
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
