"use client";

import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    const { data } = await axios.post(
      "http://localhost:4004/api/v1/auth/login",
      user
    );
    const token = data.token as string;

    localStorage.setItem("draw-meet", JSON.stringify(token));

    return router.push("/");
  };

  return (
    <form
      className="flex flex-col items-center gap-y-1 p-12 bg-teal-300 rounded-xl opacity-90"
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="email"
        className="flex items-center gap-2 justify-between w-full"
      >
        <p className="font-semibold tracking-tight text-xl">Email:</p>
        <input
          type="email"
          name="Email"
          id="email"
          placeholder="johndoe@gmail.com"
          className="outline-none border-2 rounded-md text-xl h-10 text-center placeholder:text-start placeholder:pl-2"
          onChange={({ target }) => setEmail(target.value)}
        />
      </label>
      <label
        htmlFor="password"
        className="flex items-center gap-2  justify-between w-full"
      >
        <p className="font-semibold tracking-tight text-xl">Password:</p>
        <input
          type="password"
          name="Password"
          id="password"
          placeholder="12341234"
          className="outline-none border-2 rounded-md text-xl h-10 text-center placeholder:text-start placeholder:pl-2"
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>

      <Button
        type="submit"
        className="border-2 py-2 px-3.5 rounded-md mt-4 bg-green-400 hover:bg-green-600 active:bg-green-600 hover:text-green-300 hover:border-green-500 transition-all duration-150"
      >
        Sign In
      </Button>
    </form>
  );
}
