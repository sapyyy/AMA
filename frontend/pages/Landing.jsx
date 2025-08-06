import image from "./images/doodle.png";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export function Landing() {
  const location = useLocation();
  useEffect(() => {
    if (location.state?.toastVal) {
      toast.success(location.state.toastVal);
    }
  }, [location]);

  return (
    <>
      <div className="h-[100dvh] w-full bg-[#F9FAFB] relative">
        {/* Diagonal Fade Grid Background - Top Left */}
        <div
          className="absolute inset-0 z-0 opacity-70"
          style={{
            backgroundImage: `
        linear-gradient(to right, #d1d5db 1px, transparent 1px),
        linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
      `,
            backgroundSize: "32px 32px",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
          }}
        />
        {/* Your Content/Components */}
        <PageLanding />
      </div>
    </>
  );
}

function PageLanding() {
  const navigate = useNavigate();
  return (
    <div className=" absolute inset-0 z-5 text-slate-950 px-10 py-5 h-[100dvh] md:px-20 xl:px-70 xl:flex xl:flex-col">
      {/* Nav */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 100, transition: { duration: 0.5 } }}
      >
        <nav className="flex justify-between items-center">
          <div className="text-3xl font-extrabold cursor-pointer">AMA</div>
          <div className="flex space-x-1">
            <div
              onClick={() => {
                navigate("/login");
              }}
              className="border px-4 py-1 xl:transition xl:duration-500 rounded-4xl cursor-pointer active:bg-black active:text-amber-50 xl:hover:bg-black xl:hover:text-amber-50"
            >
              Login
            </div>
            <div
              onClick={() => {
                navigate("/signup");
              }}
              className="border px-4 py-1 xl:transition xl:duration-500 rounded-4xl cursor-pointer active:bg-black active:text-amber-50 xl:hover:bg-black xl:hover:text-amber-50"
            >
              Sign Up
            </div>
          </div>
        </nav>
        <section className="mt-20 text-center space-y-7 flex-grow xl:flex xl:flex-col xl:justify-between">
          <div className="space-y-7">
            <div className="font-bold max-w-65 text-slate-600 px-5 py-1 rounded-3xl border inline-block bg-slate-100">
              100% Anonymous &nbsp;&nbsp;🙌
            </div>

            <h1 className="text-4xl font-bold md:text-5xl xl:4xl">
              Ask Anything. <br className="" />
              Stay Anonymous. <br className="" />
              No Judgment.
            </h1>
            <p
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 100, transition: { duration: 0.4 } }}
              className="font-light md:text-xl"
            >
              Welcome to AMA — a space to drop your thoughts, questions, or
              confessions without revealing who you are. No names. No pressure.
              Just honest questions.
            </p>
            <div
              onClick={() => {
                navigate("/signup");
              }}
              className="hidden xl:block mx-auto transition duration-500 bg-black text-amber-50 w-40 border px-4 py-1 rounded-4xl cursor-pointer hover:text-slate-950 hover:bg-white"
            >
              Get Started
            </div>
          </div>
          <div className="flex justify-center ">
            <img
              src={image}
              className="max-w-67 h-full object-cover mask-b-from-80% xl:hidden"
              alt="doodle here"
            />
          </div>
          <div className="hidden xl:block text-gray-500">
            created with 💛 by{" "}
            <a
              className="text-blue-400 transition duration-500 hover:text-blue-300"
              href="https://x.com/sapyyyhere"
              target="__blank"
            >
              @sapyyy
            </a>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
