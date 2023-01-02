import { useAuth } from "../../content/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../layouts/Table";
import { db } from "../../db/firebase";
import { addDoc, collection } from "firebase/firestore";
import softys from "../../assets/softys.json";
import { findUser } from "../../db/users";

export function Home() {
  const [devices, setDevices] = useState(softys.deviceList);

  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const addSoftys = async () => {
    await addDoc(collection(db, "Devices"), {
      Softys: softys,
    });
  };

  const filterDevices = async (email) => {
    const res = await findUser(email);
    const filter = devices.filter((device) =>
      device.tags.includes(res.facility.toUpperCase().trim())
    );
    return filter;
  };

  useEffect(() => {
    setDevices(filterDevices(user.email));
  }, []);

  if (loading) return <h1>Loading</h1>;

  return (
    <section>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="container px-6 py-12 h-full">
            <h1>Welcome {user.email}</h1>
            <button onClick={handleLogout}>LogOut</button>
          </div>
          <Table devices={devices} />
        </div>
      </main>
    </section>
  );
}
