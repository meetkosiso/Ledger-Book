export interface ILedger {
  user: string;
  token: number;
  usd: number;
  createdAt: string;
}

export interface IValidation extends ILedger {
  isError: boolean;
  error?: string;
}
