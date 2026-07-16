"use client";

import CommonHeader from "@/src/shared/CommonHeader";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/src/constants";
import { TaxHeaderProps } from "@/src/types/tax";



const TaxHeader = ({ onSearch, searchTerm, onFilter, onExport, onAddClick, isLoading = false, columns, onColumnToggle, selectedCount, onBulkDelete }: TaxHeaderProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  return <CommonHeader title={t("tax_title") || "Taxes"} description={t("tax_description") || "Manage tax rates and types for your products and services."} onSearch={onSearch} searchTerm={searchTerm} searchPlaceholder={t("tax_search_placeholder") || "Search taxes..."} onAddClick={onAddClick || (() => router.push(`${ROUTES.Taxes}/create`))} addLabel={t("tax_add_new") || "Add New Tax"} addPermission="create.taxes" bulkDeletePermission="delete.taxes" isLoading={isLoading} columns={columns} onColumnToggle={onColumnToggle} selectedCount={selectedCount} onBulkDelete={onBulkDelete} onFilter={onFilter} onExport={onExport} />;
};

export default TaxHeader;
