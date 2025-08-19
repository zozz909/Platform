import { z } from "zod";

const branchSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "اسم الفرع مطلوب."),
  // Financial Data
  avgMonthlySales: z.string().min(1, "متوسط المبيعات الشهرية مطلوب."),
  annualSales: z.string().min(1, "المبيعات السنوية مطلوبة."),
  staffSalaries: z.string().min(1, "رواتب الموظفين مطلوبة."),
  rent: z.string().min(1, "الإيجار مطلوب."),
  rawMaterials: z.string().min(1, "تكلفة المواد الخام مطلوبة."),
  bills: z.string().min(1, "الفواتير مطلوبة."),
  marketingCosts: z.string().min(1, "تكاليف التسويق مطلوبة."),
  franchiseFees: z.string().min(1, "رسوم الامتياز مطلوبة."),

  // Operational Data
  leaseContracts: z.string().min(1, "تفاصيل عقد الإيجار مطلوبة."),
  employeeCount: z.string().min(1, "عدد الموظفين مطلوب."),
  branchAges: z.date({
    required_error: "تاريخ افتتاح الفرع مطلوب.",
  }),
  equipmentDetails: z.string().min(1, "تفاصيل المعدات مطلوبة."),
  existingDebts: z.string().min(1, "هذا الحقل مطلوب."),
});

export const formSchema = z.object({
  branches: z.array(branchSchema).min(1, "يجب إضافة فرع واحد على الأقل."),
  
  // Strategic Options
  strategicOption: z.enum(["full_acquisition", "partial_partnership", "selective_acquisition"], {
    required_error: "يجب عليك اختيار خيار استراتيجي.",
  }),
});