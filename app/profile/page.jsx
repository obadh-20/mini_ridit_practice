'use client'
import React, { useEffect, useState } from 'react'
import { set } from 'zod';


const page = () => {
  const [user, setUser] = useState(null);
  useEffect(() => { 
    const fetchProfile = async () => {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setUser(data);
      console.log("Profile response:", data);
    };
    fetchProfile();
  },[])
  return (
    <div>
      {user ? (
        <div className="flex flex-col gap-4 items-center justify-center mt-20">
          <div className="font-bold text-2xl">Profile</div>
          <div className="text-lg">ID: {user.id}</div>
          <div className="text-lg">Email: {user.email}</div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center justify-center mt-20">
          <div className="font-bold text-2xl">Loading...</div>
        </div>
      )}
    </div>
  )
}

export default page