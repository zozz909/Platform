"use client";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { FileText, Users, CalendarDays, Wrench, CreditCard, CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
}

export default function OperationalDataSection({ form }: OperationalDataSectionProps) {
  return (
    <Card className="w-full border-primary/20 shadow-xl shadow-primary/5">
      <CardHeader>
        <CardTitle className="text-2xl text-primary flex items-center gap-2"><Wrench /> البيانات التشغيلية</CardTitle>
        <CardDescription>تفاصيل الجوانب التشغيلية للفروع.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="leaseContracts"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-base"><FileText className="text-primary/80" /> عقود الإيجار</FormLabel>
              <FormControl>
                <Textarea placeholder="المدة المتبقية، شروط التجديد، الزيادات السنوية..." {...field} className="h-24 text-base"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="employeeCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-base"><Users className="text-primary/80" /> عدد الموظفين</FormLabel>
                <FormControl>
                  <Input placeholder="مثال: 10 لكل فرع" {...field} className="text-base py-6" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="branchAges"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="flex items-center gap-2 text-base mt-0.5"><CalendarDays className="text-primary/80" /> تاريخ افتتاح الفرع</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full text-right font-normal h-auto text-base py-3",
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
          name="equipmentDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-base"><Wrench className="text-primary/80" /> التجهيزات والمعدات</FormLabel>
              <FormControl>
                <Textarea placeholder="مملوكة أم مؤجرة؟ حالتها..." {...field} className="h-24 text-base"/>
              </FormControl>
               <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="existingDebts"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-base"><CreditCard className="text-primary/80" /> المديونيات أو الالتزامات المالية القائمة</FormLabel>
              <FormControl>
                <Textarea placeholder="قروض، مستحقات للموردين، إلخ." {...field} className="h-24 text-base"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
