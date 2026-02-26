import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPanel() {
  return (
    <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-24 bg-dark-background">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-muted-foreground">
            Start building projects with the community.
          </p>
        </div>
        <Card className="p-8 space-y-6 shadow-xl border">
          <form className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="John Doe" />
            </div>
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="name@company.com" />
            </div>
            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" />
            </div>
            {/* Terms */}
            <div className="flex items-start space-x-2">
              <Checkbox id="terms" />
              <Label
                htmlFor="terms"
                className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed"
              >
                I agree to the{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </Label>
            </div>
            {/* Submit */}
            <Button type="submit" className="w-full cursor-pointer">
              Create Account →
            </Button>
            {/* Separator */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            {/* Social */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-full cursor-pointer"
              >
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full cursor-pointer"
              >
                GitHub
              </Button>
            </div>
          </form>
        </Card>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href="#" className="font-bold text-primary hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
