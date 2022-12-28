import { useAuth } from "../../content/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../layouts/Table";

export function Home() {
  const [tag, setTag] = useState();

  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading) return <h1>Loading</h1>;

  return (
    <section>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="container px-6 py-12 h-full">
            <h1>Welcome {user.email}</h1>
            <button onClick={handleLogout}>LogOut</button>
          </div>
          <Table />
        </div>
      </main>
    </section>
  );
}
