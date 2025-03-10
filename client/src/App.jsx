import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SwipePage from "./pages/SwipePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import About from "./components/about";  // Add About import statement

function App() {
  const { checkAuth, authUser, checkingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return null;

  return (
    <div className='absolute inset-0 -z-10 h-full w-full bg-white'>
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to={"/auth"} />} />
        <Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to={"/"} />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to={"/auth"} />} />
        <Route path='/chat/:id' element={authUser ? <ChatPage /> : <Navigate to={"/auth"} />} />
        <Route path='/swipe' element={authUser ? <SwipePage /> : <Navigate to={"/auth"} />} /> 
        <Route path="/about" element={<About />} />  {/* Add About Route */}
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;

