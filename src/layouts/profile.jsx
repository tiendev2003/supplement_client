import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AccountSidebar from "../components/account/AccountSidebar";

const LayoutProfile = () => {
  const [user, setUser] = useState({
    firstName: "Sofia",
    lastName: "Havertz",
    displayName: "Sofia Havertz",
    email: "sofia@example.com",
    avatar: "/placeholder.svg",
  });
  return (
    <div className="min-h-screen bg-[#e7ecef] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
          My Account
        </h1>

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <AccountSidebar user={user} />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default LayoutProfile;
