"use client";
import { useRouter } from "next/navigation";
import React from "react";
import AuthForm from "../components/AuthForm";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const page = () => {
  const router = useRouter();
 
  const handleRegister = async (data) => {
    console.log(data);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
    
    if (res.status === 400) {
      console.log("User already exists");
      router.push("/Login");
    } else {
      console.log("Registered successfully");
      router.push("/Login");
    }
  };
  return (
    <AuthForm schema={schema} onSubmit={handleRegister} SubmitLabel={"Register"} />
  );
};

export default page;
