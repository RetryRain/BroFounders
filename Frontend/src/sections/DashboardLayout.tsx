import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-300 mx-auto min-h-screen bg-dark-background text-foreground">
      <Sidebar />
      <main className="lg:ml-64 p-6 lg:p-8">{children}</main>
    </div>
  );
}
