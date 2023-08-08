/* 
created_at:"2023-06-16T04:32:56.117907Z"
deleted_at:null
id:"727e1ce2-0873-4e77-a651-4d5fdae2328a"
is_paid: true
updated_at: "2023-06-16T04:32:56.117921Z"
user: "72cf8273-e776-4642-9c2a-50a9ba64a9f4" 
products_invoice_items: []
subscription_invoice_item:
    created_at: "2023-06-16T04:32:56.101958Z"
    current_period_end: "2023-07-16T04:32:52Z"
    current_period_start: "2023-06-16T04:32:52Z"
    deleted_at: null
    description: "56 photos in small (512&512)"
    id: "59447a9a-e351-4144-b742-de1462f2d632"
    monthly_amount: "6.90"
    name: "Solo"
    package: "af6e1006-e488-444e-bd07-74fce0490824"
    updated_at: "2023-06-16T04:32:56.101978Z"
*/

interface ISubscriptionInvoiceItem{
    created_at: string;
    current_period_end: string;
    current_period_start: string;
    deleted_at: null
    description: string;
    id: string;
    monthly_amount: string;
    name: string;
    package: string;
    updated_at: string;
}

export interface IInvoice {
  created_at: string;
  deleted_at: null;
  id: string;
  is_paid: boolean;
  updated_at: string;
  user: string;
  products_invoice_items: string[];
  subscription_invoice_item: ISubscriptionInvoiceItem;
}
