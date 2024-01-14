import React from "react";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function TopicsList() {
  const { topic } = await getTopics();

  return (
    <>
      {topic.map((t) => (
        <div
          key={t._id}
          className="flex justify-between p-4 my-3 border border-slate-950 items-start"
        >
          <div>
            <h2>{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-3">
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
