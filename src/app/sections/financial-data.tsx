"use client";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { DollarSign, TrendingUp, Users, Home, Coffee, Zap, Megaphone, Percent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "../form-schema";

interface FinancialDataSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  branchIndex: number;
}

const financialFields = [
  { name: "avgMonthlySales", label: "متوسط المبيعات الشهرية", icon: <TrendingUp className="text-primary/80" />, placeholder: "مثال: 50,000 ريال" },
  { name: "annualSales", label: "إجمالي المبيعات السنوية", icon: <DollarSign className="text-primary/80" />, placeholder: "مثال: 600,000 ريال" },
  { name: "staffSalaries", label: "رواتب الموظفين الشهرية", icon: <Users className="text-primary/80" />, placeholder: "مثال: 15,000 ريال" },
  { name: "rent", label: "الإيجار الشهري", icon: <Home className="text-primary/80" />, placeholder: "مثال: 5,000 ريال" },
  { name: "rawMaterials", label: "تكاليف المواد الخام الشهرية", icon: <Coffee className="text-primary/80" />, placeholder: "مثال: 10,000 ريال" },
  { name: "bills", label: "الفواتير الشهرية (كهرباء, ماء)", icon: <Zap className="text-primary/80" />, placeholder: "مثال: 2,000 ريال" },
  { name: "marketingCosts", label: "تكاليف التسويق الشهرية", icon: <Megaphone className="text-primary/80" />, placeholder: "مثال: 3,000 ريال" },
  { name: "franchiseFees", label: "رسوم الفرنشايز", icon: <Percent className="text-primary/80" />, placeholder: "مثال: 5% من المبيعات أو 1,000 ريال" },
] as const;

export default function FinancialDataSection({ form, branchIndex }: FinancialDataSectionProps) {
  return (
    <>
        <CardHeader className="p-0 mb-6">
            <CardTitle className="text-xl text-primary flex items-center gap-2"><DollarSign /> البيانات المالية</CardTitle>
            <CardDescription>الأداء المالي للفرع.</CardDescription>
        </CardHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {financialFields.map(item => (
            <FormField
              key={item.name}
              control={form.control}
              name={`branches.${branchIndex}.${item.name}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">{item.icon} {item.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={item.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
    </>
  );
}
