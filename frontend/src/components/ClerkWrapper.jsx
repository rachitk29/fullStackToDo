import React from "react";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
} from "@clerk/clerk-react";
import Hero from "./Hero";

function ClerkWrapper() {
  return (
       <div className="min-h-screen w-full bg-white relative text-gray-800">
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
        <SignedIn>
          <header className="p-4 flex justify-end">
            <UserButton afterSignOutUrl="/" />
          </header>
          <Hero />
        </SignedIn>

        <SignedOut>
          <div className="flex items-center justify-center min-h-screen">
            <SignIn />
          </div>
        </SignedOut>
      </div>
    </div>   
  );
}

export default ClerkWrapper;
