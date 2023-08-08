import { StoreStatusEnum } from "../commons/StoreStatusEnum";

export interface IInvoiceData {
    id: string;
    user: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    is_paid: boolean;
}

export interface InvoiceData {
  status: StoreStatusEnum;
  data: IInvoiceData[];
}

export interface IInvoiceState {
  status: number;
  message: string;
  data?: string[];
}
