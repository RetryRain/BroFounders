export default function TermsModal({
  open,
  onClose,
  tab,
  setTab,
}: {
  open: boolean;
  onClose: () => void;
  tab: "terms" | "privacy";
  setTab: (t: "terms" | "privacy") => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-background rounded-2xl border border-white/10 p-6 relative max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // prevent close on inside click
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-white"
        >
          ✕
        </button>

        {/* Tabs */}
        <div className="flex gap-6 mb-6 border-b border-white/10 pb-3">
          <button
            onClick={() => setTab("terms")}
            className={`font-semibold ${
              tab === "terms"
                ? "text-white border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            Terms of Service
          </button>

          <button
            onClick={() => setTab("privacy")}
            className={`font-semibold ${
              tab === "privacy"
                ? "text-white border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            Privacy Policy
          </button>
        </div>

        {/* CONTENT */}
        {tab === "terms" && (
          <div className="text-sm text-muted-foreground space-y-4 leading-relaxed">
            <p className="text-white font-semibold text-lg">Terms of Service</p>

            <p>
              By using BroFounders, you agree to use the platform respectfully
              and not engage in harmful, illegal, or abusive behavior.
            </p>

            <p>
              This platform is built for collaboration and learning. Projects
              are created by users, and we do not guarantee outcomes, quality,
              or reliability.
            </p>

            <p>
              As this is an independent project, features and availability may
              change at any time without notice.
            </p>
          </div>
        )}

        {tab === "privacy" && (
          <div className="text-sm text-muted-foreground space-y-4 leading-relaxed">
            <p className="text-white font-semibold text-lg">Privacy Policy</p>

            <p>
              We only collect your email for authentication and account access.
            </p>

            <p>
              Your data is not sold, shared, or used for advertising. It is used
              solely to operate the platform.
            </p>

            <p>You can delete your account and data at any time.</p>
          </div>
        )}
      </div>
    </div>
  );
}
