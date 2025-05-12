import { ThemeProvider } from "@/components/theme-provider"
import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar/Navbar"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import Settings from "./pages/Settings"
import ProfilePage from "./pages/ProfilePage"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
