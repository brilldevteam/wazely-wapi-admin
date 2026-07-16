import { usePermissions } from "@/src/hooks/usePermissions";
import { CanProps } from "@/src/types/shared";
import React from "react";

const Can: React.FC<CanProps> = ({
  permission,
  anyPermission,
  module,
  children,
  fallback = null,
}) => {
  const { hasPermission, hasAnyPermission, hasModulePermission } =
    usePermissions();

  let allowed = false;
  if (permission) {
    allowed = hasPermission(permission);
  } else if (anyPermission) {
    allowed = hasAnyPermission(anyPermission);
  } else if (module) {
    allowed = hasModulePermission(module);
  } else {
    // If no permission requirement specified, default to allowed
    allowed = true;
  }

  return allowed ? <>{children}</> : <>{fallback}</>;
};

export default Can;
