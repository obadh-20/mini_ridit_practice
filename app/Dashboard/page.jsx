"use client";
import { useEffect, useState } from "react";
import { set } from "zod";

export default function Dashboard() {
const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProtected = async () => {
      const res = await fetch("/api/protected", {
        method: "GET",
        credentials: "include",
      });
      
  

      const secondRes = await fetch("/api/protected/posts", {
        method: "GET",
        credentials: "include", 
      })
      const secondData = await secondRes.json();
      setPosts(secondData);
        console.log("Protected posts response:", secondData);
    };
  
    fetchProtected();
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      {posts.map((post) => {
        return (
          <div key={post.id} className=" mt-20 flex border-t-1 border-b-1 flex-col gap-4 w-[80%] border-gray-300 py-4" >
            <div className="font-bold text-2xl">{post.title}</div>
            <div className="">{post.content}</div>
          </div>
        );
      })}
    </div>
  );
}
