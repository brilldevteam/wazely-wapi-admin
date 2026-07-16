"use client";

import { PendingFilesMap } from "@/src/types/setting";
import { createContext, useContext, useRef } from "react";

const SettingsFilesContext = createContext<PendingFilesMap | null>(null);

export const SettingsFilesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pendingFiles = useRef<Map<string, File>>(new Map());
  return (
    <SettingsFilesContext.Provider value={pendingFiles}>
      {children}
    </SettingsFilesContext.Provider>
  );
};

export const usePendingFiles = (): PendingFilesMap => {
  const ctx = useContext(SettingsFilesContext);
  if (!ctx)
    throw new Error(
      "usePendingFiles must be used within SettingsFilesProvider",
    );
  return ctx;
};
