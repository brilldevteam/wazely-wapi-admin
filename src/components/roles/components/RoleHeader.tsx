"use client";

import CommonHeader from "@/src/shared/CommonHeader";
import { RoleHeaderProps } from "@/src/types/role";

const RoleHeader = ({
  searchTerm,
  onSearch,
  onAddClick,
  isLoading,
  selectedCount,
  onBulkDelete,
  columns,
  onColumnToggle,
}: RoleHeaderProps) => {
  return (
    <CommonHeader
      title="Permissions Control"
      description="Manage roles and set access permissions."
      onSearch={onSearch}
      searchTerm={searchTerm}
      searchPlaceholder="Search roles..."
      onAddClick={onAddClick}
      addLabel="Add New Role"
      addPermission="create.roles"
      isLoading={isLoading}
      selectedCount={selectedCount}
      onBulkDelete={onBulkDelete}
      bulkDeletePermission="delete.roles"
      columns={columns}
      onColumnToggle={onColumnToggle}
    />
  );
};

export default RoleHeader;
