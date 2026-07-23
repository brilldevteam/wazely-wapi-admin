import { PaginationInfo, Permission } from "./store";

export interface Role {
  _id: string;
  name: string;
  description?: string;
  status: "active" | "inactive";
  sort_order?: number;
  system_reserved?: boolean;
  permissions?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface GetRolesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sort_by?: string;
  sort_order?: string;
}

export interface GetRolesResponse {
  success: boolean;
  data: {
    roles: Role[];
    pagination: PaginationInfo;
  };
}

export interface GetRoleByIdResponse {
  success: boolean;
  data: Role & { permissions: string[] };
}

export interface GetPermissionsResponse {
  success: boolean;
  data: Permission[];
}

export interface CreateRoleRequest {
  name: string;
  description?: string;
  status?: "active" | "inactive";
  sort_order?: number;
  permissions?: string[];
}

export type UpdateRoleRequest = Partial<CreateRoleRequest>;

export interface RoleFormProps {
  initialValues?: Role & { permissions: string[] };
  onSubmit: (values: CreateRoleRequest) => Promise<void>;
  isLoading: boolean;
  mode: "create" | "edit";
}

export interface RoleHeaderProps {
  searchTerm: string;
  onSearch: (q: string) => void;
  onAddClick: () => void;
  isLoading: boolean;
  selectedCount: number;
  onBulkDelete: () => void;
  columns: { id: string; label: string; isVisible: boolean }[];
  onColumnToggle: (id: string) => void;
}

export interface RoleListProps {
  roles: Role[];
  onDelete: (id: string) => void;
  onBulkDelete: (ids: string[]) => void;
  onToggleStatus: (id: string) => void;
  isLoading: boolean;
  total: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
  onSelectionChange: (ids: string[]) => void;
  selectedIds: string[];
  onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void;
  visibleColumns?: string[];
  searchTerm?: string;
}

export interface EditRolePageProps {
  id: string;
}
