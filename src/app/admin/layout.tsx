import type { ReactNode } from "react";
import AdminIdleLogout from "@/components/AdminIdleLogout";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <>
      <AdminIdleLogout />
      {children}
    </>
  );
}
