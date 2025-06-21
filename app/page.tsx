import Image from "next/image";
import { SignInButton, SignedOut, SignedIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 items-center h-[80vh] px-10">
      <div className="space-y-6">
        <h1 className="font-bold text-4xl">
          Welcome to <br />
          <span className="text-emerald-500">TaskGemini</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-md">
          Generate actionable task lists using the power of AI. Stay productive
          and focused.
        </p>

        <SignedOut>
          <SignInButton>
            <Button className="cursor-pointer text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Sign in to get started
            </Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <Link href="/generate">
            <Button className="cursor-pointer text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Get Started
            </Button>
          </Link>
        </SignedIn>
      </div>

      <div className="hidden md:flex justify-center">
        <Image
          src="/stepsviaai.jpg"
          alt="AI illustration"
          width={400}
          height={400}
          className="rounded-xl shadow-lg"
        />
      </div>
    </main>
  );
}
