import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Loading } from "../components/Loading";

export function SignUp() {
  return (
    <div className="h-[100dvh] flex items-center justify-center">
      <Form></Form>
    </div>
  );
}

function Form() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_URL;
  // states
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  // store the auth id and token after validation
  const [auth, setAuth] = useState({
    id: "",
    token: "",
  });
  const [loading, setLoading] = useState(false);

  // function to post to validateLogin the login
  const validateLogin = async (email, password) => {
    try {
      const res = await axios.post(`${apiUrl}/admin/signup`, {
        email: email,
        password: password,
      });
      setAuth(() => ({ id: res.data.id, token: res.data.token }));

      localStorage.clear();

      navigate("/login", {
        state: { toastCreated: "Account successfully created!" },
      });
    } catch (err) {
      setError(err.response.data.status);
    } finally {
      setLoading(false);
    }
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData(() => ({
      ...formData,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password.length < 6) {
      setLoading(false);
      setError("Password should atleast be 8 characters long");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setLoading(false);
      setError("Password and confirm password should be equal");
      return;
    }

    validateLogin(formData.email, formData.password);
    setFormData({ email: "", password: "", confirmPassword: "" });
    setError("");
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <form className="flex flex-col space-y-2" onSubmit={submitHandler}>
      <h1 className="text-4xl font-bold mask-r-from-neutral-950">
        Sign up to AMA
      </h1>
      <p>
        Already have an account? &nbsp;
        <a
          className="text-blue-600 underline cursor-pointer"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login now to start
        </a>
      </p>
      <label htmlFor="email">Email address</label>
      <input
        type="email"
        className="px-4 py-3 border border-gray-300 rounded-xl"
        placeholder="Enter email to get started"
        required
        name="email"
        value={formData.email}
        onChange={handleChanges}
      />
      <label htmlFor="password">Password</label>
      <input
        className="px-4 py-3 border border-gray-300 rounded-xl"
        type="password"
        name="password"
        placeholder="Enter your password"
        required
        value={formData.password}
        onChange={handleChanges}
      />
      <label htmlFor="confirm-password">Confirm Password</label>
      <input
        className="px-4 py-3 border border-gray-300 rounded-xl"
        type="password"
        name="confirmPassword"
        placeholder="Enter your password again"
        required
        value={formData.confirmPassword}
        onChange={handleChanges}
      />
      {error && (
        <p className="text transition ease-in duration-300 text-center text-red-500">
          {error}
        </p>
      )}
      <input
        className="bg-slate-950 text-amber-50 py-2 rounded-[0.55rem] cursor-pointer"
        type="submit"
        value="Sign Up"
      />
      <a
        onClick={() => {
          navigate("/");
        }}
        className="underline text-gray-500 cursor-pointer"
      >
        Back to home page
      </a>
    </form>
  );
}
