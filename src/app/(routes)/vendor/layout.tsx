import React from "react";
import VendorSidebar from "@/components/vendor_sidebar";
export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <VendorSidebar />
      {children}
    </>
  );
}
