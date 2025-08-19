"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { formSchema } from "./form-schema";
import FormStepper from "@/components/form-stepper";
import FinancialDataSection from "./sections/financial-data";
import OperationalDataSection from "./sections/operational-data";
import StrategicOptionsSection from "./sections/strategic-options";
import WhatsappIcon from "@/components/whatsapp-icon";

const sections = [
  { id: 1, name: "Financial Data", component: FinancialDataSection, fields: ['avgMonthlySales', 'annualSales', 'staffSalaries', 'rent', 'rawMaterials', 'bills', 'marketingCosts', 'franchiseFees'] },
  { id: 2, name: "Operational Data", component: OperationalDataSection, fields: ['leaseContracts', 'employeeCount', 'branchAges', 'equipmentDetails', 'existingDebts'] },
  { id: 3, name: "Strategic Options", component: StrategicOptionsSection, fields: ['strategicOption'] },
];

export default function Home() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
      existingDebts: "",
      strategicOption: "full_acquisition",
    },
  });

  const { trigger, getValues } = form;

  const handleNext = async () => {
    const currentSectionFields = sections.find(s => s.id === step)?.fields as (keyof z.infer<typeof formSchema>)[];
    const isValid = await trigger(currentSectionFields);
    if (isValid) {
      setStep((prev) => Math.min(prev + 1, sections.length));
    } else {
        toast({
            variant: "destructive",
            title: "Incomplete Section",
            description: "Please fill out all required fields before proceeding.",
        });
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };
  
  function onSubmit(data: z.infer<typeof formSchema>) {
    const formattedData = `
*Golden Ratio Insights - New Client Data*
-----------------------------------------

*SECTION 1: FINANCIAL DATA*
- *Average Monthly Sales:* ${data.avgMonthlySales}
- *Annual Sales:* ${data.annualSales}
- *Monthly Staff Salaries:* ${data.staffSalaries}
- *Monthly Rent:* ${data.rent}
- *Monthly Raw Materials Cost:* ${data.rawMaterials}
- *Monthly Bills:* ${data.bills}
- *Monthly Marketing Costs:* ${data.marketingCosts}
- *Franchise Fees:* ${data.franchiseFees}

*SECTION 2: OPERATIONAL DATA*
- *Lease Contracts Details:* ${data.leaseContracts}
- *Number of Employees:* ${data.employeeCount}
- *Branch Opening Dates:* ${data.branchAges?.toLocaleDateString()}
- *Equipment Details:* ${data.equipmentDetails}
- *Existing Debts/Commitments:* ${data.existingDebts}

*SECTION 3: STRATEGIC OPTIONS*
- *Selected Option:* ${data.strategicOption.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
    `;

    const phoneNumber = "966568644169";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(formattedData.trim())}`;
    
    window.open(whatsappUrl, '_blank');

    toast({
        title: "Success!",
        description: "Your data is being redirected to WhatsApp.",
    });
  }

  const CurrentSection = sections[step - 1].component;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-background">
      <div className="w-full max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">
            Golden Ratio Insights
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Innovative Data Collection for Strategic Growth
          </p>
        </header>

        <FormStepper currentStep={step} steps={sections.map(s => s.name)} />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 relative h-[550px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute w-full"
              >
                <CurrentSection form={form} />
              </motion.div>
            </AnimatePresence>
          </form>
        </Form>
         <div className="flex justify-between items-center mt-8">
            <Button
              type="button"
              variant="secondary"
              onClick={handlePrev}
              className={`transition-opacity duration-300 ${step === 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              disabled={step === 1}
            >
              Previous
            </Button>
            {step < sections.length ? (
              <Button type="button" onClick={handleNext}>
                Next Step
              </Button>
            ) : (
              <Button
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:scale-105"
              >
                <WhatsappIcon className="w-5 h-5 mr-2" />
                Send via WhatsApp 0568644169
              </Button>
            )}
          </div>
      </div>
    </main>
  );
}
