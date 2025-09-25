import React from "react";
import Link from "next/link";
const Navbar = () => {
  return (
    <div>
      <div className="px-8 mt-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href={"/Dashboard"}>
            <img src="/Reddit-Emblema.png" width={140} alt="" />
          </Link>
          <Link href="/profile" className="me-2">
            Profile
          </Link>
        </div>
        <Link href="/posts">Create Post</Link>
      </div>
    </div>
  );
};

export default Navbar;
