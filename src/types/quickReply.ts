export interface QuickReplyHeaderProps {
  onSearch: (value: string) => void;
  searchTerm: string;
  onRefresh: () => void;
  isLoading: boolean;
  selectedCount: number;
  onBulkDelete: () => void;
  onAddClick: () => void;
}

export interface QuickReply {
  _id: string;
  content: string;
  is_admin_reply: boolean;
  is_favorite?: boolean;
  createdAt: string;
}

export interface QuickReplyListProps {
  quickReplies: QuickReply[];
  page: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  limit: number;
  onEdit: (data: QuickReply) => void;
  onDelete: (id: string) => void;
  onBulkDelete: (ids: string[]) => void;
  onToggleFavorite: (id: string) => void;
  isLoading: boolean;
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onSortChange?: (key: string, order: "asc" | "desc") => void;
  searchTerm?: string;
}

export interface QuickReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { content: string; is_admin_reply: boolean }) => void;
  editData?: { _id: string; content: string; is_admin_reply: boolean } | null;
  isLoading: boolean;
}