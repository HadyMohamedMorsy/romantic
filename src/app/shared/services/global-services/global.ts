import { TemplateRef } from '@angular/core';

/* In TypeScript, interfaces only define the shape of an object but do not allow us to assign default values directly. This is because interfaces do not exist at runtime; they are a compile-time construct used for type checking. To assign default values, we can consider using a class to generate an instance with default values */

// Global types (models/entities)
export interface GlobalApiResponse {
  message: string;
  status: boolean;
  data: any;
}

export interface BreadcrumbItem {
  label?: string;
  url?: string;
  icon?: string;
}

export interface DataTableColumn {
  title?: string | null;
  name?: string | null;
  searchable?: boolean | null;
  orderable?: boolean | null;
  search?: {
    value?: string | null;
    regex?: boolean | null;
  };
  format?: string;
  render?: TemplateRef<any> | null;
}

export interface FiltersData {
  [key: string]: any;
}
