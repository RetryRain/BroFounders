import { Card } from "@/components/ui/card";
import RequestItem from "./RequestItem";
import SentApplicationItem from "./SentApplicationItem";
import { useNotificationStore } from "@/store/notifications";

type Tab = "sent" | "received";

interface Props {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  sent: any[];
  received: any[];
  loading: boolean;
  onRespond: (id: string, status: "accepted" | "rejected") => void;
}

export default function ActivityCard({
  activeTab,
  setActiveTab,
  sent,
  received,
  loading,
  onRespond,
}: Props) {
  const hasUnreadActivity = useNotificationStore((s) => s.hasUnreadActivity);

  const tabs: { key: Tab; label: string }[] = [
    { key: "sent", label: "Sent Applications" },
    { key: "received", label: "Received Requests" },
  ];

  return (
    <Card className="rounded-2xl overflow-hidden border-white/10 bg-white/5">
      <div className="flex border-b border-white/10 bg-white/5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 relative px-4 sm:px-6 py-3 sm:py-4 text-sm font-semibold transition-colors ${
              activeTab === tab.key
                ? "text-purple after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-purple"
                : "text-muted-foreground"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              {tab.label}

              {tab.key === "received" && hasUnreadActivity && (
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              )}
            </span>
          </button>
        ))}
      </div>

      <div className="divide-y divide-white/5">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-6 h-6 border-2 border-purple border-t-transparent rounded-full animate-spin" />
          </div>
        ) : activeTab === "received" ? (
          received.length > 0 ? (
            received.map((item) => (
              <RequestItem
                key={item._id}
                interest={item}
                onRespond={onRespond}
              />
            ))
          ) : (
            <div className="p-4 sm:p-6 text-sm text-muted-foreground text-center">
              <p>No requests yet.</p>
              <p>Don't hesitate, just do it :)</p>
            </div>
          )
        ) : sent.length > 0 ? (
          sent.map((item) => (
            <SentApplicationItem key={item._id} interest={item} />
          ))
        ) : (
          <div className="p-4 sm:p-6 text-sm text-muted-foreground text-center">
            <p>No applications sent.</p>
            <p>Don't be shy, join a team :)</p>
          </div>
        )}
      </div>
    </Card>
  );
}
