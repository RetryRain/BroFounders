type SidebarLinkProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
};

export default function SidebarLink({ icon, label, active }: SidebarLinkProps) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm transition-all text-base font-medium tracking-wide cursor-pointer
        ${
          active
            ? "bg-purple text-primary-foreground"
            : "text-muted-foreground hover:bg-accent/20 hover:text-sidebar-foreground"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}
