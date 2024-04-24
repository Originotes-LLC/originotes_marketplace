import VendorSidebar from '../../_components/vendor_sidebar';

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <><VendorSidebar />{children}</>;
}
