"use client";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { FileText, Users, CalendarDays, Wrench, CreditCard, CalendarIcon } from "lucide-react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";
import { formSchema } from "../form-schema";

interface OperationalDataSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  branchIndex: number;
}

export default function OperationalDataSection({ form, branchIndex }: OperationalDataSectionProps) {
  return (
    <>
      <CardHeader className="p-0 mb-6 mt-8">
        <CardTitle className="text-xl text-primary flex items-center gap-2"><Wrench /> البيانات التشغيلية</CardTitle>
        <CardDescription>الجوانب التشغيلية للفرع.</CardDescription>
      </CardHeader>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name={`branches.${branchIndex}.leaseContracts`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><FileText className="text-primary/80" /> عقود الإيجار</FormLabel>
              <FormControl>
                <Textarea placeholder="المدة المتبقية، شروط التجديد، الزيادات السنوية..." {...field} className="h-24"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name={`branches.${branchIndex}.employeeCount`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2"><Users className="text-primary/80" /> عدد الموظفين</FormLabel>
                <FormControl>
                  <Input placeholder="مثال: 10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name={`branches.${branchIndex}.branchAges`}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="flex items-center gap-2 mt-0.5"><CalendarDays className="text-primary/80" /> تاريخ افتتاح الفرع</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full text-right font-normal h-auto py-2.5",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: arSA })
                        ) : (
                          <span>اختر تاريخًا</span>
                        )}
                        <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      locale={arSA}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name={`branches.${branchIndex}.equipmentDetails`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><Wrench className="text-primary/80" /> التجهيزات والمعدات</FormLabel>
              <FormControl>
                <Textarea placeholder="مملوكة أم مؤجرة؟ حالتها..." {...field} className="h-24"/>
              </FormControl>
               <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`branches.${branchIndex}.existingDebts`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><CreditCard className="text-primary/80" /> المديونيات أو الالتزامات المالية القائمة</FormLabel>
              <FormControl>
                <Textarea placeholder="قروض، مستحقات للموردين، إلخ." {...field} className="h-24"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
