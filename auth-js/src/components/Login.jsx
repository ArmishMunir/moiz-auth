import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/user-context";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { updateToken, setRole, setUserData } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!name && !password) setError("Name & Password are required");
    if (!name) setError("Name is required");
    if (!password) setError("Password is required");

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        name,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      updateToken(token);
      setRole(response.data.role);
      setUserData({
        id: response.data.id,
        name: response.data.name,
        status: response.data.status,
      });

      if (response.status === 200) {
        navigate("/profile");
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
        <h1 className="font-bold text-white text-3xl text-center">Login</h1>
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
          {error && <p className="text-md text-red-600/50">{error}</p>}
          <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded-sm hover:bg-blue-600"
            onClick={handleLogin}
          >
            {isLoading ? "Loggin in ..." : "Login"}
          </button>
          <p className="text-white text-md text-center mt-2">
            Don&apos;t have an account?{" "}
            <Link to={"/signup"} className="text-blue-600">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
