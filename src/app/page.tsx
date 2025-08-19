"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { formSchema } from "./form-schema";
import FormStepper from "@/components/form-stepper";
import BranchesSection from "./sections/branches-section";
import WhatsappIcon from "@/components/whatsapp-icon";
import BranchCountSection from "./sections/branch-count-section";
import { CardFooter } from "@/components/ui/card";

const sections = [
  { id: 1, name: "عدد الفروع", component: BranchCountSection, fields: ['branchCount'] },
  { id: 2, name: "بيانات الفروع", component: BranchesSection, fields: ['branches'] },
];

export default function Home() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branchCount: 1,
      branches: [],
    },
  });

  const { fields, remove, replace } = useFieldArray({
    control: form.control,
    name: "branches",
  });

  const { trigger, getValues } = form;

  const handleNext = async () => {
    const currentSectionFields = sections.find(s => s.id === step)?.fields as (keyof z.infer<typeof formSchema>)[];
    const isValid = await trigger(currentSectionFields);
    
    if (isValid) {
      if (step === 1) { // After setting branch count
        const branchCount = getValues("branchCount");
        const currentBranches = getValues("branches");
        const newBranches = Array.from({ length: branchCount }, (_, i) => {
          return (
            currentBranches[i] || {
              id: `branch-${Date.now()}-${i}`,
              name: i === 0 ? "الفرع الرئيسي" : `الفرع ${i + 1}`,
              avgMonthlySales: "",
              annualSales: "",
              staffSalaries: "",
              rent: "",
              rawMaterials: "",
              bills: "",
              marketingCosts: "",
              franchiseFees: "",
              leaseContracts: "",
              employeeCount: "",
              branchAges: undefined,
              equipmentDetails: "",
              existingDebts: "لا يوجد",
            }
          );
        });
        replace(newBranches);
      }
      setStep((prev) => Math.min(prev + 1, sections.length));
    } else {
      toast({
          variant: "destructive",
          title: "حقول مطلوبة",
          description: "الرجاء التأكد من تعبئة جميع الحقول بشكل صحيح.",
      });
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };
  
  function onSubmit(data: z.infer<typeof formSchema>) {
    let branchesData = data.branches.map((branch, index) => `
*${branch.name}*
--------------------------
*البيانات المالية:*
- متوسط المبيعات الشهرية: ${branch.avgMonthlySales}
- المبيعات السنوية: ${branch.annualSales}
- رواتب الموظفين: ${branch.staffSalaries}
- الإيجار: ${branch.rent}
- تكلفة المواد الخام: ${branch.rawMaterials}
- الفواتير: ${branch.bills}
- تكاليف التسويق: ${branch.marketingCosts}
- رسوم الامتياز: ${branch.franchiseFees}

*البيانات التشغيلية:*
- عقود الإيجار: ${branch.leaseContracts}
- عدد الموظفين: ${branch.employeeCount}
- تاريخ الافتتاح: ${branch.branchAges ? branch.branchAges.toLocaleDateString('ar-SA') : 'غير محدد'}
- التجهيزات والمعدات: ${branch.equipmentDetails}
- المديونيات الحالية: ${branch.existingDebts}
`).join('\n\n');


    const formattedData = `
*دراسة علامة دارة القهوة - بيانات عميل جديد*
=========================================

${branchesData}
    `;

    const phoneNumber = "966568644169";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(formattedData.trim())}`;
    
    window.open(whatsappUrl, '_blank');

    toast({
        title: "تم بنجاح!",
        description: "يتم توجيه بياناتك إلى الواتساب.",
    });
  }

  const navigationButtons = (
    <CardFooter className="flex justify-between items-center mt-8 pt-4">
        <Button
            type="button"
            variant="secondary"
            onClick={handlePrev}
            className={`transition-opacity duration-300 ${step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            disabled={step === 1}
        >
            السابق
        </Button>
        {step < sections.length ? (
            <Button type="button" onClick={handleNext}>
            الخطوة التالية
            </Button>
        ) : (
            <Button
            type="button"
            onClick={form.handleSubmit(onSubmit)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:scale-105"
            >
            <WhatsappIcon className="w-5 h-5 ml-2" />
            إرسال البيانات عبر الواتساب
            </Button>
        )}
    </CardFooter>
  );

  const CurrentSection = sections[step - 1].component;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-background">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">
            دراسة علامة دارة القهوة
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            
          </p>
        </header>

        <FormStepper currentStep={step} steps={sections.map(s => s.name)} />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                 <CurrentSection form={form} fields={fields} remove={remove} navigation={navigationButtons} />
              </motion.div>
            </AnimatePresence>
          </form>
        </Form>
      </div>
    </main>
  );
}
