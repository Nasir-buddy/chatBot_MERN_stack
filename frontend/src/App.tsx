import Header from "./components/Header"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import NotFount from "./pages/NotFount"
import Chat from "./pages/Chat"
import { useAuth } from "./context/AuthContext"

function App() {
  const auth = useAuth();
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        {auth?.isLoggedIn && auth.user && (
          <Route path="/chat" element={<Chat />}></Route>
        )}
        <Route path="*" element={<NotFount />}></Route>
      </Routes>
    </main>
  )
}

export default App
