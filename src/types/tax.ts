import { PaginationInfo } from "./store";

export interface Tax {
  _id: string;
  name: string;
  rate: number;
  type: "percentage" | "fixed";
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GetTaxesParams {
  page?: number;
  limit?: number;
  search?: string;
  is_active?: boolean;
  sort_by?: string;
  sort_order?: "ASC" | "DESC";
}

export interface GetTaxesResponse {
  success: boolean;
  data: {
    taxes: Tax[];
    total: number;
    pagination?: PaginationInfo;
  };
}

export interface ColumnItem {
  id: string;
  label: string;
  isVisible: boolean;
}

export interface TaxFormProps {
  id?: string;
}

export interface TaxFormData {
  name: string;
  type: "percentage" | "fixed";
  rate: string;
  description: string;
  is_active: boolean;
}

export interface TaxHeaderProps {
  onSearch: (query: string) => void;
  searchTerm: string;
  onFilter?: () => void;
  onRefresh?: () => void;
  onExport?: (type: "csv" | "excel" | "pdf") => void;
  onAddClick?: () => void;
  isLoading?: boolean;
  columns?: { id: string; label: string; isVisible: boolean }[];
  onColumnToggle?: (columnId: string) => void;
  selectedCount?: number;
  onBulkDelete?: () => void;
}

export interface TaxListProps {
  taxes: Tax[];
  isLoading: boolean;
  total: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
  onDelete: (item: Tax) => void;
  onBulkDelete: (ids: string[]) => void;
  onSelectionChange: (ids: string[]) => void;
  selectedIds: string[];
  onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void;
  visibleColumns?: string[];
  searchTerm?: string;
}
