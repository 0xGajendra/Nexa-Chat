import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { Eye, EyeClosed, MessageSquare } from "lucide-react";
import { useState } from "react";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
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
            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            <p className="text-base-content/60">
              Get started woth your free account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <label htmlFor="fullname" className="text-sm opacity-80 ml-1">Full Name</label>
            <Input
              type="text"
              placeholder="John Doe"
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
            <label htmlFor="email" className="text-sm opacity-80 ml-1">Email</label>
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <label htmlFor="password" className="text-sm opacity-80 ml-1">Password</label>
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
          </form>
          <Button className="mt-10 w-full hover:cursor-pointer">
              <span>Create Account</span>
              <BottomGradient/>
          </Button>
        </div>
      </div>
      <div className="red-500">
              
      </div>
    </div>
  );
};

export default SignUpPage;

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};
