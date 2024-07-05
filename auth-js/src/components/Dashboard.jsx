/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/user-context";
import axios from "axios";
import { ROLES, ROLE_BG } from "../../utils/constants";
import Navbar from "./Navbar";
import useAuth from "../hooks/useAuth";

function Dashboard() {
  useAuth();
  const [users, setUsers] = useState([]);
  const { token, role } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, [token]);

  return (
    <div className="flex flex-col h-screen w-full bg-black text-white">
      <Navbar role={role} />
      <div className="h-full w-full flex flex-col items-center justify-center">
        {users?.map((user) => (
          <div
            key={user.id}
            className="flex justify-between items-center w-1/2 p-4 border-b"
          >
            <p>{user.id}</p>
            <p>{user.name}</p>
            <p
              className={`${
                ROLE_BG[user.role_name]?.bgColor
              } text-white rounded-md p-2 font-semibold`}
            >
              {user.role_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
