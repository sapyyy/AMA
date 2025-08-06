import { useEffect, useState } from "react";
import imgLink from "./images/copy.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";
import { motion } from "motion/react";
import toast from "react-hot-toast";

let count = 0;

export function AdminAmas() {
  const apiUrl = import.meta.env.VITE_URL;
  const [shareLink, setShareLink] = useState("unable to fetch link");
  const [userName, setUserName] = useState("anon");
  const [amas, setAmas] = useState([""]);
  const [loading, setLoading] = useState(true);
  const [confirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const logSuccess = () => toast.success("Logged in successfully");
  const copiedSuccess = () => toast.success("Copied in clipboard");
  const errorMsg = () => toast.error("Error fetching data");

  useEffect(() => {
    async function getAmas() {
      const storage = localStorage.getItem("auth");
      if (storage) {
        const { id, token } = JSON.parse(storage);
        // fetch amas from the website
        try {
          const res = await axios.get(`${apiUrl}/admin/amas`, {
            headers: {
              Authorization: `Bearer ${token}`,
              id: id,
            },
          });

          if (res) {
            // store the link inside
            setShareLink(`https://ama-frontend.vercel.app/post-ama/${id}`);
            setAmas(res.data.questions);
            setUserName(res.data.username);
            logSuccess();
          } else {
            errorMsg();
          }
          setLoading(false);
        } catch (err) {
          errorMsg();
          setLoading(false);
          console.log(err);
        }
      }
    }
    getAmas();
  }, []);

  // method to delete all the amas
  const deleteAllAmas = async () => {
    const storage = localStorage.getItem("auth");

    if (storage) {
      const { id, token } = JSON.parse(storage);
      try {
        const result = await axios.delete(`${apiUrl}/admin/amas`, {
          headers: {
            Authorization: `Bearer ${token}`,
            id: id,
          },
        });
        toast.success("Deleted all AMAS!");
        setLoading(false);
        navigate("/login");
      } catch (err) {
        toast.error(err);
      }
    }
  };

  function Confirmation() {
    return (
      <div className="absolute backdrop-blur-sm z-50 w-full h-screen flex justify-center items-center">
        <div className="mx-5 px-5 py-10 bg-neutral-100 border-2 border-b-5 rounded-xl">
          <h1 className="text-2xl font-bold text-center">
            Do you really want to <span className="text-red-700">delete</span>{" "}
            all the amas?
          </h1>
          <div className="w-full flex justify-evenly mt-5">
            <button
              className="text-xl font-bold border-2 p-2 rounded-3xl transition duration-300 hover:bg-neutral-300"
              onClick={() => {
                setShowConfirmation(false);
              }}
            >
              Cancel
            </button>
            <button
              className="text-xl font-bold border-red-950 border-2 p-2 bg-red-700 text-neutral-100 rounded-3xl transition duration-300 hover:bg-red-800"
              onClick={() => {
                deleteAllAmas();
                setLoading(true);
                setShowConfirmation(false);
              }}
            >
              Delete All
            </button>
          </div>
        </div>
      </div>
    );
  }

  // if the current element is loading we show the loading component
  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="relative">
      {amas.length !== 0 && confirmation && <Confirmation />}
      <motion.div
        initial={{ y: 20, opacity: 0, filter: "blur(4x)" }}
        animate={{ y: 0, opacity: 100, transition: { duration: 0.5 } }}
      >
        <div className="px-10 py-5 flex flex-col items-center md:px-27 xl:px-70">
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
                  localStorage.removeItem("auth");
                  navigate("/", {
                    state: { toastVal: "Signed out successfully" },
                  });
                }}
                className="border px-4 py-1 xl:transition xl:duration-500 rounded-4xl cursor-pointer active:bg-red-800 active:text-amber-50 xl:hover:bg-red-800 xl:hover:text-amber-50"
              >
                LogOut
              </div>
            </div>
          </div>
          <h1 className="my-5 text-2xl text-center text-slate-700">
            Welcome,{" "}
            <span
              className="font-medium text-slate-950 underline cursor-pointer"
              title="Currently logged in as"
            >
              {userName}
            </span>
          </h1>
          <h3 className="text-2xl font-bold">Share this link to start</h3>
          <div
            title="click to copy the link"
            className="h-10 w-7/8 text-[0.7rem] md:text-[1rem] italic border-2 border-b-5 px-2 border-black rounded-2xl relative flex justify-center items-center text-black"
          >
            <div className="text-center">{shareLink}</div>
            <img
              src={imgLink}
              about="copy-logo"
              className="w-6 absolute right-3 top-1 border-2 rounded object-contain bg-amber-50 border-black transition-all duration-300 hover:opacity-50"
              onClick={async () => {
                await navigator.clipboard.writeText(shareLink);
                copiedSuccess();
              }}
            ></img>
          </div>

          <div className="flex my-8 flex-col items-center space-y-5 text-center font-bold">
            <div className="text-2xl">
              All the AMAS will be visible below once people start asking
              questions!
            </div>

            {amas.length !== 0 && (
              <button
                className="px-3 py-2 border-black border-2 border-b-5 rounded font-medium transition duration-300 hover:bg-red-700 hover:text-slate-50"
                title="This will delete all the amas"
                onClick={() => {
                  setShowConfirmation(true);
                }}
              >
                Delete All
              </button>
            )}

            {amas.map((ama) => {
              return (
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  key={count++}
                  className="rounded-2xl w-70 px-5 py-5 shadow-xl border-2 border-b-5 italic md:w-80 xl:w-96"
                >
                  {ama}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
