import React from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import Gravatar from "./Gravatar";

function CustomUserButton() {
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!user) return null;

  const email = user.primaryEmailAddress?.emailAddress || "";

  return (
    <div className="flex items-center gap-2">
      <Gravatar email={email} />
      <button
        onClick={() => signOut()}
        className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
      >
        Sign out
      </button>
    </div>
  );
}

export default CustomUserButton;
