import { Card } from "@/components/ui/card";
import RequestItem from "./RequestItem";
import SentApplicationItem from "./SentApplicationItem";

interface Props {
  activeTab: "sent" | "received";
  setActiveTab: (tab: "sent" | "received") => void;
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
  return (
    <Card className="glass-card rounded-2xl overflow-hidden border-white/10 bg-white/5">
      {/* Tabs */}
      <div className="flex border-b border-white/10 bg-white/5">
        <button
          onClick={() => setActiveTab("sent")}
          className={`relative px-6 py-4 text-sm font-semibold transition-colors ${
            activeTab === "sent"
              ? "text-purple after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-purple"
              : "text-muted-foreground"
          }`}
        >
          Sent Applications
          <span className="ml-2 bg-white/10 text-[10px] px-1.5 py-0.5 rounded-md">
            {sent.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("received")}
          className={`relative px-6 py-4 text-sm font-semibold transition-colors ${
            activeTab === "received"
              ? "text-purple after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-purple"
              : "text-muted-foreground"
          }`}
        >
          Received Requests
          <span className="ml-2 bg-purple/20 text-purple text-[10px] px-1.5 py-0.5 rounded-md">
            {received.length}
          </span>
        </button>
      </div>

      {/* Content */}
      <div className="divide-y divide-white/5">
        {loading ? (
          <div className="p-6 text-sm text-muted-foreground">Loading...</div>
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
            <div className="p-6 text-sm text-muted-foreground">
              No requests yet.
            </div>
          )
        ) : sent.length > 0 ? (
          sent.map((item) => (
            <SentApplicationItem key={item._id} interest={item} />
          ))
        ) : (
          <div className="p-6 text-sm text-muted-foreground">
            No applications sent.
          </div>
        )}
      </div>
    </Card>
  );
}
