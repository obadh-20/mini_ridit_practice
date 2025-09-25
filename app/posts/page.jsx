"use client";
import React, { use, useState } from "react";
import { set } from "zod";
import { useForm } from "react-hook-form";
const page = () => {
  const [posts, setPosts] = useState([]);
  // useffect(async () => {
  //   const post = await fetch("/api/protected/posts");
  //   setPosts(post);
  // }, []);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const res = await fetch("/api/protected/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })

  };

  return (
    <div className="flex flex-col px-15 mt-10">
      <h1 className="text-3xl">Create post</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 mt-10 "
      >
        {" "}
        <label htmlFor="Title" className="text-2xl">
          {" "}
          Title
        </label>
        <input
          id="Title"
          type="text"
          {...register("Title")}
          className="outline-1 outline-blue-100 p-4 rounded-4xl"
        />
        <label htmlFor="text" className="text-2xl">
          Post
        </label>
        <textarea
          className="outline-1 outline-blue-100 p-4 rounded-4xl"
          id="message"
          name="message"
          rows="4"
          cols="50"
          placeholder="Type your message here..."
          {...register("message")}
        ></textarea>
        <button type="submit" className="bg-sky-300 max-w-[100] text-white rounded-4xl px-4 py-2">Submit</button>
      </form>
    </div>
  );
};

export default page;
