import { useAuth } from "../content/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import { sendMessageBotRestart } from "../lib/slack-api";

export function Home() {
  const [tag, setTag] = useState();

  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  const handleRestart = async ({ target: { value } }) => {
    await sendMessageBotRestart("Ivan");
  };

  if (loading) return <h1>Loading</h1>;

  return (
    <section className="h-screen">
      <div className="container px-6 py-12 h-full">
        <h1>Welcome {user.email}</h1>
        <button onClick={handleLogout}>LogOut</button>
        <button onClick={handleRestart}>Restart</button>
      </div>
      <Footer />
    </section>
  );
}
