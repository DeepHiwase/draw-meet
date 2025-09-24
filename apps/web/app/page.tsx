"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import axios from "axios";

export default function Home() {
  const [roomSlug, setRoomSlug] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("draw-meet");

    console.log(token);

    if (!token) {
      throw new Error("Token is not parserd or not found");
    }

    const { data } = await axios.get(
      `http://localhost:4004/api/v1/rooms/${roomSlug}`,
      {
        headers: {
          Authorization: JSON.parse(token),
        },
      }
    );

    console.log(data);
    console.log(data.roomId);
    console.log(typeof data.roomId);

    router.push(`/room/${JSON.stringify(data.roomId)}`);
  };

  return (
    <form
      className="flex items-center justify-center flex-col gap-y-3 h-screen"
      onSubmit={handleSubmit}
    >
      <label htmlFor="Room_ID" className="flex gap-x-2 items-center">
        <p>Enter Room Name:</p>
        <input
          id="Room_ID"
          type="text"
          className=" border-2 rounded-full"
          onChange={(e) => setRoomSlug(e.target.value)}
        />
      </label>

      <button
        type="submit"
        className="border-2 bg-teal-300 rounded-full py-2 px-3.5 hover:bg-teal-500"
      >
        Join Room
      </button>
    </form>
  );
}
