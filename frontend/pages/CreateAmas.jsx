import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Loading } from "../components/Loading";

export function CreateAmas() {
  const { id } = useParams();
  const [qs, setQs] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_URL;

  useEffect(() => {
    async function validateUser() {
      try {
        const res = await axios.get(`${apiUrl}/user/ama/${id}`);
        toast.success("User found");
      } catch (err) {
        toast.error("No user found");
      }
    }
    validateUser();
  }, []);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (qs.trim() == "") {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${apiUrl}/user/ama-post/${id}`, {
        question: qs,
      });
      toast.success("AMA sent!");
      setQs("");
    } catch (res) {
      toast.error("Error sending ama");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="px-10 h-[100dvh] py-5 flex flex-col items-center md:px-27 xl:px-70">
      <div className="w-full flex justify-between mb-10">
        <div className="text-3xl font-extrabold cursor-pointer">AMA</div>
        <div className="flex space-x-1 md:space-x-3">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="border px-4 py-1 xl:transition xl:duration-500 rounded-4xl cursor-pointer active:bg-black active:text-amber-50 xl:hover:bg-black xl:hover:text-amber-50"
          >
            Home
          </div>
          <div
            onClick={() => {
              navigate("/login");
            }}
            className="border px-4 py-1 xl:transition xl:duration-500 rounded-4xl cursor-pointer active:bg-black active:text-amber-50 xl:hover:bg-black xl:hover:text-amber-50"
          >
            Login
          </div>
        </div>
      </div>

      <form className="mt-15 flex flex-col align-item" onSubmit={handleSubmit}>
        <div className="text-slate-950 text-8xl mask-r-from-10 text-center">
          anon
        </div>
        <textarea
          type="text"
          placeholder="ask me anything"
          className="border-2 px-5 py-2 h-30 rounded border-b-3"
          autoFocus
          value={qs}
          onChange={(e) => {
            setQs(e.target.value);
          }}
        />
        <br />
        <input
          className="px-5 py-2 border border-b-3 cursor-pointer rounded-xl hover:text-neutral-50 hover:bg-black transition duration-300"
          type="submit"
        />
      </form>
    </div>
  );
}
