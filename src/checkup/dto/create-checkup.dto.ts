export class CreateCheckupDto {
  accountId: number;
  checkupDate: Date;
  actualBalance: number;
  expectedBalance: number;
  discrepancy: number;
  notes?: string;
}
