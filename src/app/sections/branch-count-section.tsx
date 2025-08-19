"use client";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Store } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "../form-schema";

interface BranchCountSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export default function BranchCountSection({ form }: BranchCountSectionProps) {
  return (
    <Card className="w-full max-w-lg mx-auto border-primary/20 shadow-xl shadow-primary/5">
      <CardHeader>
        <CardTitle className="text-2xl text-primary flex items-center gap-2"><Store /> عدد الفروع</CardTitle>
        <CardDescription>كم عدد الفروع التي ترغب في إدخال بياناتها؟</CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="branchCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عدد الفروع</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="مثال: 3" 
                  {...field}
                  onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)}
                  className="max-w-xs"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
