import { ThemeProvider } from "@/components/theme-provider";
import { LoaderPinwheelIcon } from "lucide-react";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/authStore";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });
  if (isCheckingAuth && !authUser)
    return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex items-center justify-center h-screen">
          <LoaderPinwheelIcon className="size-10 animate-spin" />
        </div>
      </ThemeProvider>
    );

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="max-w-[80%] mx-auto">
        <Toaster
          toastOptions={{
            style: {
              backdropFilter: "blur(10px)",
              backgroundColor: "transparent", // keep it subtle for blur effect
              border: "1px solid oklch(0.67 0.29 341.41)", // your fancy pink border
              padding: "16px",
              color: "oklch(0.67 0.29 341.41)", // same pink text
              borderRadius: "8px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            },
          }}
        />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
