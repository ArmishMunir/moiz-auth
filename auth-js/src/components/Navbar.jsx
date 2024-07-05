/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { ROLES } from "../../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar({ role }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex justify-end items-center bg-blue-400/20 px-4 py-2">
      <div className="flex flex-between gap-2">
        <button
          className={`${
            role === ROLES.USER && "opacity-50"
          } p-2 bg-slate-300 rounded-md shadow-sm font-bold text-black`}
          type="button"
          onClick={() => setShowModal(true)}
          disabled={role === ROLES.USER}
        >
          Add User
        </button>

        <button
          className={`p-2 bg-blue-500 text-white rounded-md shadow-sm font-bold`}
          type="button"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>

      {showModal && (
        <AddUserModal showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
}

export const AddUserModal = ({ setShowModal }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        name,
        password,
        role,
      });

      if (response.status === 201) {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.log(err);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value={ROLES.ADMIN} className="text-black">
                {ROLES.ADMIN}
              </option>
              <option value={ROLES.USER} className="text-black">
                {ROLES.USER}
              </option>
              <option value={ROLES.SUPER_ADMIN} className="text-black">
                {ROLES.SUPER_ADMIN}
              </option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="mr-2 px-4 py-2 bg-gray-300 rounded-md shadow-sm font-bold text-black hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm font-bold hover:bg-blue-600"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
