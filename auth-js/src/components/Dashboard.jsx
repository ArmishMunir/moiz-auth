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
  const [refresh, setRefresh] = useState(false);

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
  }, [token, refresh]);

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8080/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      })
      .finally(() => {
        setRefresh(true);
      });
  };

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
            <p
              className="p-2 bg-red-500 text-white font-bold cursor-pointer hover:bg-red-600/80 rounded-md"
              onClick={() => deleteUser(user.id)}
            >
              delete
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
