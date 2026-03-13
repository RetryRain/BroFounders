import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-background px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-extrabold text-purple mb-4">404</h1>

        <h2 className="text-xl font-semibold text-white mb-2">
          Page not found
        </h2>

        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn’t exist or was moved.
        </p>

        <Link to="/projects">
          <Button className="bg-purple hover:bg-purple/90 text-white font-bold">
            Back to Discovery
          </Button>
        </Link>
      </div>
    </div>
  );
}
