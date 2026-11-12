/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useDeletePlanMutation,
  useGetAllPlansQuery,
  useSyncPlansMutation,
} from "@/src/redux/api/planApi";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import FreeTrialModal from "./FreeTrialModal";
import PlanHeader from "./PlanHeader";
import PlanList from "./PlanList";

// Same billing tabs as the customer side (Billing & Plans and the public pricing page).
const BILLING_TABS = [
  { id: "monthly", label: "Monthly", badge: "" },
  { id: "yearly", label: "Yearly", badge: "SAVE" },
  { id: "lifetime", label: "One Time", badge: "" },
  { id: "free trial", label: "Free Trial", badge: "" },
] as const;
type BillingTabId = (typeof BILLING_TABS)[number]["id"];
const tabOfPlan = (plan: any): BillingTabId => {
  const cycle = String(plan?.billing_cycle || "monthly").toLowerCase();
  return (BILLING_TABS.find((t) => t.id === cycle)?.id || "monthly") as BillingTabId;
};

const PlanContainer = () => {
  const { data, isLoading, refetch, isFetching } = useGetAllPlansQuery({
    limit: 100,
  });

  const [deletePlan, { isLoading: isDeleting }] = useDeletePlanMutation();
  const [syncPlans, { isLoading: isSyncing }] = useSyncPlansMutation();
  const [isFreeTrialModalOpen, setIsFreeTrialModalOpen] = useState(false);

  const allPlans: any[] = useMemo(() => data?.data.plans || [], [data]);
  // Monthly / Yearly / One Time always show; Free Trial only when such plans exist.
  const tabs = BILLING_TABS.filter((t) => t.id !== "free trial" || allPlans.some((p) => tabOfPlan(p) === "free trial"));
  const countOf = (id: BillingTabId) => allPlans.filter((p) => tabOfPlan(p) === id).length;
  const [chosenTab, setChosenTab] = useState<BillingTabId | null>(null);
  const activeTab: BillingTabId = chosenTab || tabs.find((t) => countOf(t.id) > 0)?.id || "monthly";
  const plansInTab = allPlans.filter((p) => tabOfPlan(p) === activeTab);

  const handleDeletePlan = async (id: string) => {
    try {
      await deletePlan([id]).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to delete plan", error);
    }
  };

  const handleSyncPlans = async () => {
    try {
      const res = await syncPlans().unwrap();
      if (res.success) {
        toast.success(
          res.message || "Plans synchronized to gateways successfully",
        );
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to sync plans to gateways");
    }
  };

  return (
    <div>
      <PlanHeader
        isLoading={isFetching}
        onFreeTrialClick={() => setIsFreeTrialModalOpen(true)}
        onSyncClick={handleSyncPlans}
        isSyncing={isSyncing}
      />

      {!isLoading && (
        <div className="flex justify-center mb-6 px-4">
          <div className="inline-flex flex-wrap items-center gap-1 p-1 rounded-lg border border-gray-200 dark:border-(--card-border-color) bg-white dark:bg-(--card-color) shadow-sm">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              const count = countOf(tab.id);
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setChosenTab(tab.id)}
                  className={`relative flex items-center gap-2 px-5 h-10 rounded-lg text-sm font-semibold transition-all ${
                    active ? "bg-primary text-white shadow-sm" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-(--table-hover)"
                  }`}
                >
                  {tab.badge && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-1.5 py-px rounded-full bg-amber-400 text-[9px] font-black text-white tracking-wide">
                      {tab.badge}
                    </span>
                  )}
                  {tab.label}
                  <span className={`min-w-5 h-5 px-1.5 rounded-full text-[11px] font-bold flex items-center justify-center ${active ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500 dark:bg-(--page-body-bg) dark:text-slate-400"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <PlanList
        plans={plansInTab}
        onDelete={handleDeletePlan}
        isLoading={isLoading || isDeleting || isFetching}
      />

      <FreeTrialModal
        isOpen={isFreeTrialModalOpen}
        onClose={() => setIsFreeTrialModalOpen(false)}
      />
    </div>
  );
};

export default PlanContainer;
