"use client";
import { ImagePlus } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import ImageUpload from "@/components/ImageUpload";
import { Spinner } from "@material-tailwind/react";

const Loader = () => {
  return (
    <div className="fixed h-screen w-screen flex items-center justify-center left-0 top-0">
      <Image
        src={
          "https://i.pinimg.com/originals/2c/bb/5e/2cbb5e95b97aa2b496f6eaec84b9240d.gif"
        }
        height={400}
        width={400}
        alt="loading"
      />
    </div>
  );
};

const LoginPage = () => {
  const { data } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [otpTo, setOtpTo] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // console.log(process.env.RESEND_KEY);

  //functions
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // useEffect(() => {
  //   if (data?.user) {
  //     router.push("/");
  //   }
  // }, [data?.user, router]);

  const handleRedirect = async () => {
    // const res = await fetch("/api/send", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     name,
    //     email,
    //   }),
    // });
    // const result = await res.json();
    // console.log(result);
    setIsLoading(true);

    router.push(
      `/verifyotp?name=${name}&email=${email}&password=${password}&imageUrl=${imageUrl}`
    );

    setIsLoading(false);
  };

  return (
    <Suspense>
      <div className="flex items-center  p-4 lg:justify-center ">
        <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md w-screen">
          <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
            <div className="my-3 text-4xl font-bold tracking-wider text-center">
              <h1>Benimo</h1>
            </div>
            <p className="flex flex-col items-center justify-center mt-10 text-center">
              <span>Already have an account?</span>
              <Link href="/login" className="underline">
                Login!
              </Link>
            </p>
            <p className="mt-6 text-sm text-center text-gray-300">
              Read our <span className="underline">terms</span> and{" "}
              <span className="underline">conditions</span>
            </p>
          </div>
          <div className="p-5 bg-white md:flex-1">
            <h3 className="my-4 text-2xl font-semibold text-gray-700">
              Create Account
            </h3>
            <form
              action="#"
              className="flex flex-col space-y-5"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-gray-500"
                >
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-500"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-500"
                  >
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  id="password"
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirmpassword"
                    className="text-sm font-semibold text-gray-500"
                  >
                    Confirm Password
                  </label>
                </div>
                <input
                  type="password"
                  id="confirmpassword"
                  className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              </div>

              <div className="flex items-center  justify-center">
                <ImageUpload value={imageUrl} onChange={setImageUrl} />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-semibold text-gray-500"
                >
                  Remember me
                </label>
              </div>
              <div>
                {/* <VerifyOtp
                  name={name}
                  email={email}
                  password={password}
                  confirmPassword={confirmPassword}
                  imageUrl={imageUrl}
                /> */}
                <button
                  className={`w-full flex items-center justify-center bg-[#3B82F6] rounded-md py-2  text-white hover:bg-[#3d70c4] transition-all ${
                    password.length === 0 ||
                    password !== confirmPassword ||
                    !name ||
                    !email ||
                    !imageUrl
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }`}
                  onClick={handleRedirect}
                >
                  {isLoading ? <Spinner /> : "Register"}
                </button>
              </div>
              <div className="flex flex-col space-y-5">
                <span className="flex items-center justify-center space-x-2">
                  <span className="h-px bg-gray-400 w-14"></span>
                  <span className="font-normal text-gray-500">
                    or login with
                  </span>
                  <span className="h-px bg-gray-400 w-14"></span>
                </span>
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={() => signIn("google")}
                    className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group hover:bg-gray-800 focus:outline-none"
                  >
                    <span>
                      <FcGoogle />
                    </span>
                    <span className="text-sm font-medium text-gray-800 group-hover:text-white">
                      Google
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default LoginPage;
