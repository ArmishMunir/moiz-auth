import { useContext } from "react";
import { UserContext } from "../context/user-context";
import Navbar from "./Navbar";

function Profile() {
  const { role, userData } = useContext(UserContext);
  return (
    <div className="flex flex-col">
      <Navbar role={role} />
      <div className="flex flex-col items-center justify-center h-screen w-full bg-slate-800/20 text-gray-900">
        <h1 className="text-3xl font-bold">{userData.name}</h1>
        {userData ? (
          <>
            <h2>{userData.id}</h2>
            <p className="text-green-600">{userData.status}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
