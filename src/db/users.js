import { getDoc, getDocs, collection, doc, endAt } from "firebase/firestore";
import { db } from "./firebase";

const collection_name = "Users";

export const findUser = async (email) => {
  const d = await getDoc(doc(db, collection_name, email));
  return d.data();
};

export const findUsers = async () => {
  const doc_refs = await getDocs(collection(db, collection_name));

  const res = [];

  doc_refs.forEach((user) => {
    res.push({
      id: user.id,
      ...user.data(),
    });
  });

  return res;
};
