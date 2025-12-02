export interface LexwareCredentials {
  accessToken: string;
  baseUrl: string;
}

export interface ArticlePrice {
  netPrice?: number;
  grossPrice?: number;
  leadingPrice?: "NET" | "GROSS";
  taxRate?: number;
}

export interface Article {
  id?: string;
  title?: string;
  description?: string;
  type?: "PRODUCT" | "SERVICE";
  articleNumber?: string;
  gtin?: string;
  note?: string;
  unitName?: string;
  price?: ArticlePrice;
  createdAt?: string;
  updatedAt?: string;
}

export interface Contact {
  id?: string;
  roles?: {
    customer?: Record<string, unknown>;
    vendor?: Record<string, unknown>;
  };
  company?: {
    name?: string;
    taxNumber?: string;
    vatRegistrationId?: string;
    allowTaxFreeInvoices?: boolean;
    contactPersons?: Array<{
      salutation?: string;
      firstName?: string;
      lastName?: string;
      emailAddress?: string;
      phoneNumber?: string;
    }>;
  };
  addresses?: {
    billing?: Array<Record<string, unknown>>;
    shipping?: Array<Record<string, unknown>>;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface DunningLineItemPrice {
  currency?: string;
  netAmount?: number;
  grossAmount?: number;
  taxRatePercentage?: number;
}

export interface DunningLineItem {
  id?: string | null;
  type?: "custom" | "text";
  name?: string;
  description?: string | null;
  quantity?: number;
  unitName?: string;
  unitPrice?: DunningLineItemPrice;
  discountPercentage?: number;
  lineItemAmount?: number;
}

export interface DunningTotalPrice {
  currency?: string;
  totalNetAmount?: number;
  totalGrossAmount?: number;
  totalTaxAmount?: number;
}

export interface Dunning {
  id?: string | null;
  voucherDate?: string;
  address?: {
    contactId?: string | null;
    name?: string;
    supplement?: string;
    street?: string;
    city?: string;
    zip?: string;
    countryCode?: string;
  };
  lineItems?: DunningLineItem[];
  totalPrice?: DunningTotalPrice;
  title?: string;
  introduction?: string;
  remark?: string;
}

export interface Invoice {
  id?: string;
  invoiceNumber?: string;
  invoiceDate?: string;
  dueDate?: string;
  grossAmount?: number;
  netAmount?: number;
  taxAmount?: number;
  currency?: string;
  status?: "DRAFT" | "SENT" | "PAID" | "OVERDUE";
  createdAt?: string;
  updatedAt?: string;
}

export interface Payment {
  id?: string;
  paymentNumber?: string;
  paymentDate?: string;
  amount?: number;
  currency?: string;
  paymentMethod?: "TRANSFER" | "CASH" | "CHECK" | "CREDIT_CARD";
  status?: "PENDING" | "SUCCESSFUL" | "FAILED";
  createdAt?: string;
  updatedAt?: string;
}

export interface Order {
  id?: string;
  orderNumber?: string;
  orderDate?: string;
  deliveryDate?: string;
  grossAmount?: number;
  netAmount?: number;
  taxAmount?: number;
  currency?: string;
  status?: "DRAFT" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export interface Quotation {
  id?: string;
  title?: string;
  introduction?: string;
  remark?: string;
  voucherDate?: string;
  expiryDate?: string;
  address?: {
    contactId?: string;
    name?: string;
    supplement?: string;
    street?: string;
    city?: string;
    zip?: string;
    countryCode?: string;
  };
  lineItems?: Array<{
    id?: string | null;
    type?: "custom" | "text";
    name?: string;
    description?: string | null;
    quantity?: number;
    unitName?: string;
    unitPrice?: {
      currency?: string;
      netAmount?: number;
      grossAmount?: number;
      taxRatePercentage?: number;
    };
    discountPercentage?: number;
    lineItemAmount?: number;
  }>;
  totalPrice?: {
    currency?: string;
    totalNetAmount?: number;
    totalGrossAmount?: number;
    totalTaxAmount?: number;
  };
  taxConditions?: {
    taxType?: "net" | "gross";
    taxTypeNote?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface CreditNote {
  id?: string;
  organizationId?: string;
  createdDate?: string;
  updatedDate?: string;
  version?: number;
  language?: "de" | "en";
  archived?: boolean;
  voucherStatus?: "draft" | "open" | "paid" | "paidoff" | "voided" | "transferred";
  voucherNumber?: string;
  voucherDate?: string;
  dueDate?: string;
  address?: {
    contactId?: string;
    name?: string;
    supplement?: string;
    street?: string;
    city?: string;
    zip?: string;
    countryCode?: string;
    contactPerson?: string;
  };
  lineItems?: Array<{
    id?: string | null;
    type?: "custom" | "text" | "material" | "service";
    name?: string;
    description?: string | null;
    quantity?: number;
    unitName?: string;
    unitPrice?: {
      currency?: string;
      netAmount?: number;
      grossAmount?: number;
      taxRatePercentage?: number;
    };
    discountPercentage?: number;
    lineItemAmount?: number;
  }>;
  totalPrice?: {
    currency?: string;
    totalNetAmount?: number;
    totalGrossAmount?: number;
    totalTaxAmount?: number;
    totalDiscountAbsolute?: number;
    totalDiscountPercentage?: number;
  };
  taxConditions?: {
    taxType?: string;
    taxTypeNote?: string;
    taxSubType?: string;
  };
  shippingConditions?: {
    shippingDate?: string;
    shippingEndDate?: string;
    shippingType?: "service" | "servicePeriod" | "delivery";
  };
  paymentConditions?: {
    paymentTermLabel?: string;
    paymentTermLabelTemplate?: string;
    paymentTermDuration?: number;
    paymentDiscountConditions?: {
      discountPercentage?: number;
      discountRange?: number;
    };
  };
  relatedVouchers?: Array<{
    id?: string;
    voucherType?: string;
    voucherNumber?: string;
  }>;
  title?: string;
  introduction?: string;
  remark?: string;
  files?: Record<string, any>;
}

export interface DeliveryNote {
  id?: string;
  organizationId?: string;
  createdDate?: string;
  updatedDate?: string;
  version?: number;
  language?: "de" | "en";
  archived?: boolean;
  voucherStatus?: "draft" | "open";
  voucherNumber?: string;
  voucherDate?: string;
  address?: {
    contactId?: string;
    name?: string;
    supplement?: string;
    street?: string;
    city?: string;
    zip?: string;
    countryCode?: string;
    contactPerson?: string;
  };
  lineItems?: Array<{
    id?: string | null;
    type?: "custom" | "text" | "material" | "service";
    name?: string;
    description?: string | null;
    quantity?: number;
    unitName?: string;
    unitPrice?: {
      currency?: string;
      netAmount?: number;
      grossAmount?: number;
      taxRatePercentage?: number;
    };
    discountPercentage?: number;
    lineItemAmount?: number;
  }>;
  totalPrice?: {
    currency?: string;
    totalNetAmount?: number;
    totalGrossAmount?: number;
    totalTaxAmount?: number;
    totalDiscountAbsolute?: number;
    totalDiscountPercentage?: number;
  };
  taxConditions?: {
    taxType?: string;
    taxTypeNote?: string;
  };
  shippingConditions?: {
    shippingDate?: string;
    shippingEndDate?: string;
    shippingType?: "service" | "servicePeriod" | "delivery";
  };
  relatedVouchers?: Array<{
    id?: string;
    voucherType?: string;
    voucherNumber?: string;
  }>;
  title?: string;
  introduction?: string;
  remark?: string;
  files?: Record<string, any>;
}

export interface DownPaymentInvoice {
  id?: string;
  organizationId?: string;
  createdDate?: string;
  updatedDate?: string;
  version?: number;
  language?: "de" | "en";
  archived?: boolean;
  voucherStatus?: "draft" | "open" | "paid" | "paidoff" | "voided";
  voucherNumber?: string;
  voucherDate?: string;
  dueDate?: string;
  address?: Record<string, any>;
  lineItems?: Array<Record<string, any>>;
  totalPrice?: {
    currency?: string;
    totalNetAmount?: number;
    totalGrossAmount?: number;
    totalTaxAmount?: number;
  };
  taxConditions?: Record<string, any>;
  paymentConditions?: Record<string, any>;
  shippingConditions?: Record<string, any>;
  closingInvoiceId?: string;
  relatedVouchers?: Array<{
    id?: string;
    voucherType?: string;
    voucherNumber?: string;
  }>;
  title?: string;
  introduction?: string;
  remark?: string;
}

export interface PaymentInfo {
  openAmount?: number;
  paidAmount?: number;
  currency?: string;
  paymentStatus?: "openBalance" | "balanced";
  paidDate?: string;
  paymentItems?: Array<{
    paymentItemType?:
      | "payment"
      | "creditNote"
      | "openingBalance"
      | "irrecoverableReceivable";
    amount?: number;
    currency?: string;
    paymentDate?: string;
    voucherNumber?: string;
    voucherId?: string;
  }>;
}

export interface PaymentCondition {
  paymentTermLabelTemplate?: string;
  paymentTermDuration?: number;
  paymentDiscountConditions?: {
    discountPercentage?: number;
    discountRange?: number;
  };
}

export interface PostingCategory {
  id?: string;
  name?: string;
  type?: "revenue" | "expense" | "asset" | "liability" | "equity";
  accountNumber?: string;
}

export interface Profile {
  organizationId?: string;
  userId?: string;
  companyName?: string;
  created?: string;
  connectionId?: string;
  features?: {
    payments?: boolean;
    invoices?: boolean;
    receipts?: boolean;
  };
  businessFeatures?: {
    taxType?: "net" | "gross";
    smallBusiness?: boolean;
    distanceSalesPrinciple?: string;
  };
  smallBusiness?: boolean;
  taxType?: "net" | "gross";
  distanceSalesPrinciple?: string;
}

export interface RecurringTemplate {
  id?: string;
  organizationId?: string;
  createdDate?: string;
  updatedDate?: string;
  version?: number;
  templateName?: string;
  nextExecutionDate?: string;
  intervalType?: "weekly" | "monthly" | "quarterly" | "yearly";
  intervalValue?: number;
  finalize?: boolean;
  voucherTemplateData?: Record<string, any>;
}

export interface EventSubscription {
  subscriptionId?: string;
  eventType?: string;
  callbackUrl?: string;
  createdDate?: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  status: number;
  details?: any;
}
