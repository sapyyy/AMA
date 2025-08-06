import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { Loading } from "../components/Loading";

export function Login() {
  return (
    <div className="h-[100dvh] bg-[#F9FAFB] flex items-center justify-center">
      <Form></Form>
    </div>
  );
}

function Form() {
  const location = useLocation();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_URL;
  // states
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // useEffect to auto login
  useEffect(() => {
    if (location.state?.toastCreated) {
      toast.success(location.state.toastCreated);
    }
    const storage = localStorage.getItem("auth");
    if (storage) {
      navigate("/see-ama");
    }
  }, []);

  // function to post to validateLogin the login
  const validateLogin = async (email, password) => {
    try {
      const res = await axios.post(`${apiUrl}/admin/signin`, {
        email: email,
        password: password,
      });

      localStorage.setItem(
        "auth",
        JSON.stringify({
          id: res.data.id,
          token: res.data.token,
        })
      );

      navigate("/see-ama");
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

    if (formData.password.length < 8) {
      setError("Password should atleast be 8 characters long");
      return;
    }
    if (!/[!@#$^&*<>?~+=-_]/.test(formData.password)) {
      setError("Password should contain atleast one special character");
      return;
    }
    if (!/[A-Z]/.test(formData.password)) {
      setError("Password should contain atleast one uppecase letter");
      return;
    }

    validateLogin(formData.email, formData.password);
    setFormData({ email: "", password: "" });
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <form
      onSubmit={(e) => {
        submitHandler(e);
        setLoading(true);
      }}
      className="flex flex-col space-y-2"
    >
      <h1 className="text-4xl font-bold mask-r-from-neutral-950">
        Login to AMA
      </h1>
      <p>
        Don't have an account? &nbsp;
        <a
          className="text-blue-600 underline cursor-pointer"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Create a free account
        </a>
      </p>
      <label htmlFor="email">Email address</label>
      <input
        type="email"
        className="px-4 py-3 border border-gray-300 rounded-xl"
        placeholder="Enter email to get started"
        name="email"
        required
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

      {error && (
        <p className="text transition ease-in duration-300 text-center text-red-500">
          {error}
        </p>
      )}

      <input
        className="bg-slate-950 text-amber-50 py-2 rounded-[0.55rem] cursor-pointer"
        type="submit"
        value="Login"
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
