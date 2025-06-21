"use client";

import React from "react";
import Link from "next/link";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";

function Header() {
  return (
    <header className="flex w-full items-center justify-between px-6 py-3 bg-gray-500 shadow-sm">
      <div>
        <Link href="/" className="text-white text-xl font-bold">
          TaskGenie
        </Link>
      </div>
      <div>
        <SignedOut>
          <SignInButton>
            <Button variant="secondary">Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-12 h-12 ring-0.5 ring-green-100",
                avatarImage: "rounded-full shadow-lg",
                userButtonPopoverCard: "text-black shadow-2xl",
                userPreviewMainIdentifier: "text-blue-500 font-bold",
              },
            }}
          />
        </SignedIn>
      </div>
    </header>
  );
}

export default Header;
