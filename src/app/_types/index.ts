export interface S3File {
  status: number;
  message: string;
  data: { url: string | null; width: number; height: number };
}

export interface CustomSwellFile {
  date_created: string;
  height: number;
  id: string;
  url: string;
  width: number;
}

export interface SwellFile {
  length?: number;
  chunkSize?: number;
  uploadDate?: string;
  filename: string;
  content_type: string;
  date_created: string;
  date_uploaded: string;
  md5: string;
  url: string;
  id: string;
  width?: number;
  height?: number;
}

export interface UploadedFile {
  length: number;
  chunkSize: number;
  uploadDate: string;
  filename: string;
  content_type: string;
  date_created: string;
  date_uploaded: string;
  md5: string;
  url: string;
  id: string;
}

export interface Category {
  name: string;
  active: boolean;
  sorting: null;
  images: null;
  description: string;
  meta_title: null;
  meta_description: null;
  parent_id: null;
  slug: string;
  top_id: null;
  date_created: string;
  id: string;
}

export interface SwellError {
  errors: {
    name: {
      code: string;
      message: string;
    };
    [key: string]: {
      code: string;
      message: string;
    };
  };
}

export interface SwellResponse<T> {
  count: number;
  page_count: number;
  page: number;
  results: T[];
}

export interface SwellAccount {
  name: string;
  email: string;
  notes: string;
  currency: string;
  date_created: Date;
  type: string;
  order_count: number;
  order_value: number;
  balance: number;
  date_updated: Date;
  first_name: string;
  last_name: string;
  id: string;
}

export interface UpdatedSwellAccount {
  first_name: "Sheogorath";
  email: string;
  group: string;
  currency: string;
  name: string;
  date_created: string;
  type: string;
  order_count: number;
  order_value: number;
  balance: number;
  id: string;
}

interface DeletedBillingInfo {
  name: string;
  first_name: string;
  last_name: string;
  address1: string;
  city: string;
  state: string;
  zip: number;
  country: string;
  phone: string;
  method: string;
  card: {
    token: string;
    test: boolean;
    last4: string;
    brand: string;
    address_check: string;
    zip_check: string;
    cvc_check: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
  };
  account_card_id: string;
}

interface DeletedShippingInfo {
  name: string;
  first_name: string;
  last_name: string;
  address1: string;
  city: string;
  state: string;
  zip: number;
  country: string;
  phone: string;
  account_address_id: string;
}

export interface DeletedSwelAccount {
  id: string;
  email: string;
  balance: number;
  billing_deleted: DeletedBillingInfo;
  cart_abandoned_count: number;
  currency: string;
  date_created: Date;
  date_first_cart_abandoned: Date;
  date_first_order: Date;
  date_last_cart_abandoned: Date;
  date_last_login: Date;
  date_last_order: Date;
  date_updated: Date;
  first_name: string;
  group: string;
  last_name: string;
  name: string;
  order_value: number;
  password: string;
  password_reset_key: string | null;
  password_reset_url: string | null;
  phone: string;
  shipping_deleted: DeletedShippingInfo;
  type: string;
}

export interface Vendor {
  clerk_id: string;
  email: string;
  first_name: string;
  last_name: string;
  email_optin: boolean;
  group: string;
  currency: string;
  name: string;
  date_created: string;
  type: "individual" | "company";
  order_count: number;
  order_value: number;
  balance: number;
  id: string;
}

export type EnhancedFile = File & { preview: string };

export interface SwellProductImage {
  id?: string;
  file: SwellFile;
}

interface Standard {
  active: boolean;
  price: number;
  sale: boolean;
  sale_price: null | number;
  prices: number[];
}

interface PurchaseOptions {
  standard: Standard;
}

interface Sort {
  [key: string]: number;
}

interface ProductCategoryIndex {
  sort: Sort;
  id: string[];
}

interface CategoryResults {
  name: string;
  id: string;
}

interface ProductCategories {
  count: number;
  page_count: number;
  page: number;
  results: CategoryResults[];
}

export interface Product {
  name: string;
  sku?: null | string;
  type?: string;
  active: boolean;
  images?: SwellProductImage[];
  purchase_options?: PurchaseOptions;
  variable?: boolean;
  content: {
    s3files_id: string[];
  };
  s3Images?: CustomSwellFile[];
  description: string;
  tags?: string[];
  meta_title?: null | string;
  meta_description?: null | string;
  slug?: string;
  attributes?: Record<string, unknown>;
  delivery?: null | string;
  virtual?: boolean;
  bundle?: null | string;
  price: number;
  stock_tracking?: boolean;
  options?: string[];
  vendor_id: string;
  currency?: string;
  sale?: boolean;
  sale_price?: null | number;
  prices?: number[];
  date_created?: string;
  stock_status?: null | string;
  date_updated?: string;
  category_index?: ProductCategoryIndex;
  id?: string;
  categories?: ProductCategories;
}

interface Page {
  start: number;
  end: number;
}

interface ProductPages {
  [key: string]: Page;
}
export interface ProductsPerPage {
  count: number;
  page_count: number;
  page: number;
  results: Product[];
  pages: ProductPages;
}
