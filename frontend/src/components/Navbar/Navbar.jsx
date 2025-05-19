import { Link } from "react-router";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="border-accent border rounded-2xl border-base-300 fixed w-[80vw] top-2 z-40 
    backdrop-blur-lg hover:border-white  transition-colors duration-500 shadow-2xl"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">NexaChat</h1>
            </Link>
          </div>

          <div className="flex items-center md:gap-10 gap-2">
              <div
                className={`
                btn btn-sm gap-2 transition-colors
                flex justify-center group cursor-pointer
                `}
              >
                <ModeToggle/>
              </div>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2 flex justify-center`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline text-xs">Profile</span>
                </Link>

                <button className="flex gap-2 items-center justify-center cursor-pointer" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline text-xs">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;