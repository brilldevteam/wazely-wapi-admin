/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import RoleForm from "@/src/components/roles/components/RoleForm";
import { ROUTES } from "@/src/constants";
import {
  useGetRoleByIdQuery,
  useUpdateRoleMutation,
} from "@/src/redux/api/roleApi";
import { EditRolePageProps } from "@/src/types/role";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const EditRole = ({ id }: EditRolePageProps) => {
  const router = useRouter();
  const { data, isLoading: isFetching } = useGetRoleByIdQuery(id);
  const [updateRole, { isLoading }] = useUpdateRoleMutation();

  const handleSubmit = async (values: any) => {
    try {
      const res = await updateRole({ id, data: values }).unwrap();
      toast.success(res.message || "Role updated successfully");
      router.push(ROUTES.Roles);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update role");
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <RoleForm
        mode="edit"
        initialValues={data?.data}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default EditRole;
