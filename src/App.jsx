import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./Pages/HomePage/HomePage"
import AuthPage from "./Pages/AuthPage/AuthPage"
import PageLayout from "./Layouts/PageLayout/PageLayout"
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase/firebase";
import useAuthStore from "./store/authStore";
import { useEffect } from "react";

function App() {
  const [user] = useAuthState(auth);
  const authUser = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user && !authUser) {
      // If Firebase auth state changes but Zustand store hasn't updated
      const userData = JSON.parse(localStorage.getItem("user-info"));
      if (userData) {
        useAuthStore.getState().login(userData);
      }
    }
  }, [user, authUser]);

  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
        <Route path="/:username" element={user ? <ProfilePage /> : <Navigate to="/auth" />} />
      </Routes>
    </PageLayout>
  );
}

export default App;