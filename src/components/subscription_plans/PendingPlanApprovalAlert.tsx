"use client";

import { ROUTES } from "@/src/constants";
import { Button } from "@/src/elements/ui/button";
import { usePermissions } from "@/src/hooks/usePermissions";
import { useAppSelector } from "@/src/redux/hooks";
import { useGetAllSubscriptionsQuery } from "@/src/redux/api/subscriptionApi";
import { AlertCircle, ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const PendingPlanApprovalAlert = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();
  const { hasPermission, isAuthenticated } = usePermissions();
  const user = useAppSelector((state) => state.auth.user);
  const canViewSubscriptions = user?.role === "super_admin" || hasPermission("view.subscriptions");
  const isCustomerPlansPage = pathname === ROUTES.SubscriberPlans || pathname.startsWith(`${ROUTES.SubscriberPlans}/`);

  const { data, isLoading } = useGetAllSubscriptionsQuery(
    {
      page: 1,
      limit: 1,
      status: "pending",
      sort_by: "created_at",
      sort_order: "DESC",
    },
    {
      skip: !isAuthenticated || !canViewSubscriptions,
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  const pendingCount = data?.data?.pagination?.totalItems || 0;

  if (isCustomerPlansPage || isLoading || pendingCount === 0) return null;

  const approvalLabel =
    pendingCount === 1
      ? t("pending_plan_approval_single", {
          defaultValue: "1 customer has selected a package and is waiting for approval.",
        })
      : t("pending_plan_approval_multiple", {
          count: pendingCount,
          defaultValue: `${pendingCount} customers have selected packages and are waiting for approval.`,
        });

  return (
    <div className="sticky top-[110px] z-[70] mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900 shadow-sm dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-lg bg-amber-100 p-2 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold">
              {t("pending_plan_approval_title", {
                defaultValue: "Plan approval needed",
              })}
            </p>
            <p className="mt-1 text-sm text-amber-800 dark:text-amber-100/80">
              {approvalLabel}
            </p>
          </div>
        </div>

        <Button
          onClick={() => router.push(`${ROUTES.SubscriberPlans}?status=pending`)}
          className="h-10 shrink-0 gap-2 rounded-lg bg-amber-600 px-4 text-white hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
        >
          {t("review_customer_plans", { defaultValue: "Review customer plans" })}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PendingPlanApprovalAlert;
