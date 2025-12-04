import { LoginForm } from "@/components/login-form";
import Navbar from "@/components/Navbar";
import { DotScreenShader } from "@/components/ui/dot-shader-background";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <DotScreenShader />
      </div>
      <div className="absolute top-0 w-full z-50">
        <Navbar />
      </div>
      <div className="w-full max-w-sm z-10">
        <LoginForm />
      </div>
    </div>
  );
}
