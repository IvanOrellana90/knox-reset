import { useAuth } from "../../content/AuthContext";
import { useState, useEffect } from "react";
import Cards from "../layouts/Cards";
import { db } from "../../db/firebase";
import { addDoc, collection } from "firebase/firestore";
import softys from "../../assets/JSON/softys.json";
import { findUser } from "../../db/users";

const tagRegExp = /\b(TOR)\d{1,2}(E|S)((-)\w{1,3}){1,2}\b/g;

export function Home() {
  const [devices, setDevices] = useState([]);

  const { user, loading } = useAuth();

  const addSoftys = async () => {
    await addDoc(collection(db, "Devices"), {
      Softys: softys,
    });
  };

  const filterDevices = async (email) => {
    const res = await findUser(email);
    const filter = softys.deviceList.filter(
      (device) =>
        device.tags.includes(res.facility.toUpperCase().trim()) &&
        device.tags.some((tag) => tag.match(tagRegExp))
    );
    return filter;
  };

  const fetchData = async () => {
    const data = await filterDevices(user.email);
    setDevices(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <h1>Loading</h1>;

  return (
    <section>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Cards devices={devices} />
        </div>
      </main>
    </section>
  );
}
