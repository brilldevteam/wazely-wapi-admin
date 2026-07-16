"use client";

import { paymentColumns } from "@/src/data/payment";
import { useGetSubscriptionPaymentsQuery } from "@/src/redux/api/subscriptionApi";
import CommonHeader from "@/src/shared/CommonHeader";
import { exportData } from "@/src/utils/exportUtils";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import PaymentsTable from "./PaymentsTable";
import { GetPaymentHistoryParams } from "@/src/types/payment";

const PaymentsTransaction = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("paid_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [columns, setColumns] = useState(paymentColumns);

  const handleColumnToggle = (columnId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, isVisible: !col.isVisible } : col,
      ),
    );
  };

  const handleSortChange = (key: string, order: "asc" | "desc") => {
    setSortBy(key);
    setSortOrder(order);
    setPage(1);
  };

  const queryParams: GetPaymentHistoryParams = {
    page,
    limit,
    search: search || undefined,
    sort_by: sortBy,
    sort_order: sortOrder.toUpperCase() as "ASC" | "DESC",
  };

  const { data, isLoading, refetch } =
    useGetSubscriptionPaymentsQuery(queryParams);

  const payments = data?.data?.payments ?? [];
  const pagination = data?.data?.pagination;

  const handleRefresh = () => {
    refetch();
    toast.info(t("payment_transactions_refreshed"));
  };

  const handleExport = (format: "csv" | "excel" | "pdf") => {
    if (!payments.length) {
      toast.error(t("common_no_data_export") || "No data to export");
      return;
    }

    const exportColumns = columns
      .filter((col) => col.isVisible && col.id !== "actions")
      .map((col) => ({
        header: col.label,
        key: col.key,
      }));

    exportData({
      data: payments,
      columns: exportColumns,
      filename: `payments_${new Date().toISOString().split("T")[0]}`,
      format,
    });
    toast.success(t("common_export_success") || "Export started successfully");
  };

  return (
    <div className="flex flex-col min-h-full">
      <CommonHeader
        title={t("payment_transactions_title")}
        description={t("payment_transactions_description")}
        searchTerm={search}
        onSearch={setSearch}
        onRefresh={handleRefresh}
        isLoading={isLoading}
        columns={columns}
        onColumnToggle={handleColumnToggle}
        onExport={handleExport}
      />

      <PaymentsTable
        payments={payments}
        isLoading={isLoading}
        pagination={pagination}
        onPageChange={setPage}
        onLimitChange={(l) => {
          setLimit(l);
          setPage(1);
        }}
        page={page}
        limit={limit}
        onSortChange={handleSortChange}
        visibleColumns={columns.filter((c) => c.isVisible).map((c) => c.id)}
        searchTerm={search}
      />
    </div>
  );
};

export default PaymentsTransaction;
