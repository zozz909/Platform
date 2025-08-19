import { z } from "zod";

export const formSchema = z.object({
  // Financial Data
  avgMonthlySales: z.string().min(1, "Average monthly sales is required."),
  annualSales: z.string().min(1, "Annual sales is required."),
  staffSalaries: z.string().min(1, "Staff salaries are required."),
  rent: z.string().min(1, "Rent is required."),
  rawMaterials: z.string().min(1, "Raw materials cost is required."),
  bills: z.string().min(1, "Bills are required."),
  marketingCosts: z.string().min(1, "Marketing costs are required."),
  franchiseFees: z.string().min(1, "Franchise fees are required."),

  // Operational Data
  leaseContracts: z.string().min(1, "Lease contract details are required."),
  employeeCount: z.string().min(1, "Number of employees is required."),
  branchAges: z.date({
    required_error: "Branch opening date is required.",
  }),
  equipmentDetails: z.string().min(1, "Equipment details are required."),
  existingDebts: z.string().min(1, "This field is required."),

  // Strategic Options
  strategicOption: z.enum(["full_acquisition", "partial_partnership", "selective_acquisition"], {
    required_error: "You need to select a strategic option.",
  }),
});
