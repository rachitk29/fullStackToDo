import React from "react";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  ClerkLoaded,
  ClerkLoading,
} from "@clerk/clerk-react";
import Hero from "./Hero";
import Header from "./Header";

function ClerkWrapper() {
  return (
    <div className="min-h-screen w-full relative text-gray-800 dark:bg-gray-900">
      {/* Background grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
            radial-gradient(circle at 20px 20px, rgba(55, 65, 81, 0.12) 2px, transparent 2px),
            radial-gradient(circle at 40px 40px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)
          `,
          backgroundSize: "40px 40px, 40px 40px, 40px 40px, 40px 40px",
        }}
      />

      <div className="relative z-10">
        {/* While Clerk is still loading */}
        <ClerkLoading>
          <div className="flex items-center justify-center min-h-screen text-gray-500">
            Loading...
          </div>
        </ClerkLoading>

        {/* Once Clerk has loaded */}
        <ClerkLoaded>
          <SignedIn>
            {/* User button at top-right */}
            <header className="p-4 flex justify-end">
              <UserButton afterSignOutUrl="/" />
            </header>

            {/* Header below */}
            <Header />

            {/* Hero content */}
            <Hero />
          </SignedIn>

          <SignedOut>
            <div className="flex items-center justify-center min-h-screen">
              <SignIn />
            </div>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </div>
  );
}

export default ClerkWrapper;
