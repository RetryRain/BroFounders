import "material-symbols/rounded.css";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [left, right] = React.Children.toArray(children);
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row bg-background">
      {/* LEFT */}
      {left}

      {/* RIGHT */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-24 bg-dark-background">
        {right}
      </div>
    </div>
  );
}
