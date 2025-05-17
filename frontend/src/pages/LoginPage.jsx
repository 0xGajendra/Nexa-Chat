'use client';
import AuthImagePattern from "@/components/AuthImagePattern";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { Eye, EyeClosed, Loader, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
const LoginPage = () => {
   const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };
  
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* leftside */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="mb-8">
          <div className="flex flex-col items-center mb-8">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
            <p className="text-base-content/60">
              Login to your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <label htmlFor="email" className="text-sm opacity-80 ml-1">
              Email
            </label>
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <label htmlFor="password" className="text-sm opacity-80 ml-1">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center opacity-80"
              >
                {showPassword ? (
                  <EyeClosed className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
            <Button className="mt-10 w-full hover:cursor-pointer">
              {isLoggingIn ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
          <div className="text-center m-2 text-xs">
            <p className="opacity-80">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* right side */}
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={"Sign in to continue your conversations and catch up with your messages."}
      />
    </div>
  );
};
export default LoginPage;