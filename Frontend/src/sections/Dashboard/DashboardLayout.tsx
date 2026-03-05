import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import MobileHeader from "./MobileHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-dark-background text-foreground">
      {/* DESKTOP SIDEBAR */}
      <Sidebar />

      {/* MOBILE HEADER */}
      <div className="lg:hidden">
        <MobileHeader />
      </div>

      {/* MAIN CONTENT */}
      <main className="lg:ml-64 p-5 lg:p-8 pb-24 lg:pb-8">{children}</main>

      {/* MOBILE BOTTOM NAV */}
      <div className="lg:hidden">
        <MobileNav />
      </div>
    </div>
  );
}
