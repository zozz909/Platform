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
}

const financialFields = [
  { name: "avgMonthlySales", label: "Average Monthly Sales", icon: <TrendingUp className="text-primary/80" />, placeholder: "e.g., $50,000" },
  { name: "annualSales", label: "Annual Sales", icon: <DollarSign className="text-primary/80" />, placeholder: "e.g., $600,000" },
  { name: "staffSalaries", label: "Monthly Staff Salaries", icon: <Users className="text-primary/80" />, placeholder: "e.g., $15,000" },
  { name: "rent", label: "Monthly Rent", icon: <Home className="text-primary/80" />, placeholder: "e.g., $5,000" },
  { name: "rawMaterials", label: "Monthly Raw Materials", icon: <Coffee className="text-primary/80" />, placeholder: "e.g., $10,000" },
  { name: "bills", label: "Monthly Bills (Utilities)", icon: <Zap className="text-primary/80" />, placeholder: "e.g., $2,000" },
  { name: "marketingCosts", label: "Monthly Marketing Costs", icon: <Megaphone className="text-primary/80" />, placeholder: "e.g., $3,000" },
  { name: "franchiseFees", label: "Franchise Fees", icon: <Percent className="text-primary/80" />, placeholder: "e.g., 5% of sales or $1,000" },
] as const;

export default function FinancialDataSection({ form }: FinancialDataSectionProps) {
  return (
    <Card className="w-full border-primary/20 shadow-xl shadow-primary/5">
      <CardHeader>
        <CardTitle className="text-2xl text-primary flex items-center gap-2"><DollarSign /> Financial Data</CardTitle>
        <CardDescription>Provide an overview of the financial performance per branch.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {financialFields.map(item => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-base">{item.icon} {item.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={item.placeholder} {...field} className="text-base py-6" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
