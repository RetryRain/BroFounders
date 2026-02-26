import { useState } from "react";
import { Card } from "@/components/ui/card";
import RequestItem from "./RequestItem";
import SentApplicationItem from "./SentApplicationItem";

export default function ActivityCard() {
  const [activeTab, setActiveTab] = useState<"sent" | "received">("received");

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
            3
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
            2
          </span>
        </button>
      </div>

      {/* Content */}
      <div className="divide-y divide-white/5">
        {activeTab === "received" ? (
          <>
            <RequestItem />
            <RequestItem />
          </>
        ) : (
          <>
            <SentApplicationItem />
            <SentApplicationItem />
            <SentApplicationItem />
          </>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-white/5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
        <p>
          {activeTab === "received"
            ? "Showing 2 pending hosting requests"
            : "Showing 3 submitted applications"}
        </p>
        <button className="text-purple hover:underline">
          Clear all notifications
        </button>
      </div>
    </Card>
  );
}
