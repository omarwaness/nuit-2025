import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
import { FetchDataSteps } from "@/components/tutorial/fetch-data-steps";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { DotScreenShader } from "@/components/ui/dot-shader-background";

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return JSON.stringify(data.claims, null, 2);
}

export default function ProtectedPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <DotScreenShader />
      </div>
      <div className="relative z-10 w-full">
        <Navbar />
        <div className="mt-32 px-4 text-center">
          <h1 className="text-4xl font-bold text-slate-900">Protected Page</h1>
        </div>
      </div>
    </div>
  );
}
