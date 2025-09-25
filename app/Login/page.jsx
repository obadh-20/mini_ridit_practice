"use client";
import { useRouter } from "next/navigation";
import React, { use,useState } from "react";
import AuthForm from "../components/AuthForm";
import {  z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const page = () => {
  const router = useRouter();
  const [error,setError] = useState("");
  const handleLogin = async (data) => {
    try {
   
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
 const result = await res.json();
      if (res.ok) {
        console.log("Login successful");
        router.push("/Dashboard");
      } else {
         setError(result.message + "Something went wrong");
      }
    } catch (err) {
      console.error("Login failed", err);
      setError("An error occurred. Please try again.");
    }
  };
  return (
    <AuthForm schema={schema} onSubmit={handleLogin} SubmitLabel={"Login"} error={ error} />
  );
};

export default page;
