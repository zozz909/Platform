
"use client";

import { UseFormReturn, UseFieldArrayReturn } from "react-hook-form";
import { z } from "zod";
import { Trash2, Store } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

import { formSchema } from "../form-schema";
import FinancialDataSection from "./financial-data";
import OperationalDataSection from "./operational-data";

interface BranchesSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  fields: UseFieldArrayReturn<z.infer<typeof formSchema>, "branches", "id">['fields'];
  remove: UseFieldArrayReturn<z.infer<typeof formSchema>, "branches", "id">['remove'];
}

export default function BranchesSection({ form, fields, remove }: BranchesSectionProps) {

  if (fields.length === 0) {
    return null;
  }

  return (
    <Card className="w-full border-primary/20 shadow-xl shadow-primary/5">
      <CardHeader>
        <CardTitle className="text-2xl text-primary flex items-center gap-2"><Store /> بيانات الفروع</CardTitle>
        <CardDescription>أدخل تفاصيل كل فرع تملكه. يمكنك العودة وتعديل العدد إذا احتجت.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full" defaultValue={fields[0]?.id}>
          {fields.map((field, index) => (
            <AccordionItem value={field.id || `item-${index}`} key={field.id}>
              <AccordionTrigger className="flex justify-between">
                <div className="flex-grow text-right">
                  <FormField
                    control={form.control}
                    name={`branches.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="w-full max-w-sm">
                        <FormControl>
                          <Input 
                            {...field}
                            onClick={(e) => e.stopPropagation()} 
                            placeholder="اسم الفرع"
                            className="text-lg font-semibold border-0 bg-transparent p-0 h-auto focus-visible:ring-0" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        remove(index)
                    }}
                    className="mr-auto text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                )}
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                  <FinancialDataSection form={form} branchIndex={index} />
                  <Separator className="my-8" />
                  <OperationalDataSection form={form} branchIndex={index} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-6">
          <FormField
            control={form.control}
            name="branches"
            render={() => (
                <FormMessage className="mt-2 text-center" />
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
