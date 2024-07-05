import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name && !password) setError("Name & Password are required");
    if (!name) setError("Name is required");
    if (!password) setError("Password is required");

    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        name,
        password,
        role,
      });

      if (response.status === 201) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-black">
      <div className="flex flex-col px-6 border rounded-md shadow-md bg-slate-100/20 gap-y-6 py-8">
        <h1 className="font-bold text-white text-3xl text-center">Sign up</h1>
        <div className="flex flex-col min-w-[400px] gap-y-4">
          <input
            type="text"
            id="name"
            placeholder="Moiz Kashif"
            className="p-2 rounded-sm shadow-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="*****"
            className="p-2 rounded-sm shadow-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex justify-between items-center py-2">
            <div className="flex gap-2 items-center justify-start">
              <input
                type="radio"
                id="super_admin"
                name="role"
                value="super_admin"
                checked={role === "super_admin"}
                onChange={(e) => setRole(e.target.value)}
                className="cursor-pointer size-4"
              />
              <p className="text-md text-white cursor-pointer">Super Admin</p>
            </div>
            <div className="flex gap-2 items-center justify-start">
              <input
                type="radio"
                id="admin"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={(e) => setRole(e.target.value)}
                className="cursor-pointer size-4"
              />
              <p className="text-md text-white cursor-pointer">Admin</p>
            </div>
          </div>
          {error && <p className="text-md text-red-600/50">{error}</p>}
          <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded-sm hover:bg-blue-600"
            onClick={handleSignup}
          >
            {isLoading ? "Registering ..." : "Register"}
          </button>
          <p className="text-white text-md text-center mt-2">
            Already have an account?{" "}
            <Link to={"/"} className="text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
