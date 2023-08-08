import { ReactNode } from "react";

export interface IPaymentType {
    created_at: string;
    id: string;
    payment_portal_id: string;
    payment_portal_price_id: string;
    is_up_to_date:boolean;
    updated_at: string;
    package: string;
    type: string;
  }
  
  export interface IPackage {
    type: string;
    amount: number;
    description: string;
    id: string;
    name: string;
    paymentTypes: IPaymentType[];
  }