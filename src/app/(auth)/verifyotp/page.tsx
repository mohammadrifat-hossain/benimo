"use client";

import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  useMemo,
  useCallback,
} from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@material-tailwind/react";

const VerifyOtp = () => {
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const [second, setSecond] = useState(10);
  const [triggered, setTriggered] = useState(false);
  const [mainOtp, setMainOtp] = useState<Number | undefined>();
  const [expireDate, setExpireDate] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const password = searchParams.get("password");
  const id = searchParams.get("id");
  const imageUrl = searchParams.get("imageUrl");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus the first input on initial render
    inputRefs.current[0]?.focus();
  }, []);

  // useEffect(()=>{
  //   if(id == 'undefined'){
  //     router.push("/register")
  //     toast({
  //       title:"Please try again"
  //     })
  //   }
  // },[id, router, toast])

  const getOtp = useCallback(async () => {
    if (id) {
      const res = await fetch("/api/getotp", {
        method: "POST",
        body: JSON.stringify({
          id,
        }),
      });
      const result = await res.json();
      setMainOtp(result.otp);
      setExpireDate(result.expireAt);
    }
  }, [id]);

  // useEffect(() => {
  //   getOtp();
  // }, [getOtp]);
  useEffect(() => {
    const randomOtp = Math.floor(1000 + Math.random() * 9000);
    setMainOtp(randomOtp);
  }, []);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus forward on input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && otp[index] === "" && index > 0) {
      // Move focus backward on backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  const otpString = otp.join("");

  // Convert the string to a number
  const otpNumber = parseInt(otpString, 10);

  useEffect(() => {
    const interval = setInterval(() => {
      if (second > 0) {
        setSecond(second - 1);
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => clearInterval(interval);
  }, [triggered, second]);

  const expireDateObj = new Date(expireDate!);
  const currentDate = new Date();

  const handleVerify = async () => {
    if (otpNumber === mainOtp) {
      if (expireDateObj < currentDate) {
        toast({
          title: "OTP expired",
        });
      } else {
        setIsLoading(true);
        const res = await fetch("/api/registeraccount", {
          method: "POST",
          body: JSON.stringify({ name, email, password, imageUrl }),
        });

        const result = await res.json()
        if(result){
          setIsLoading(false)
        }
        if(result.success){
          toast({
            title: "Register succes. Now login to continue"
          })
          router.push('/login')
        }else{
          toast({
            title: result.message
          })
        }
      }
    } else {
      toast({
        title: "Wrong OTP",
      });
      setOtp(new Array(4).fill(""));
    }
  };

  return (
    <div className="relative flex flex-col justify-center overflow-hidden  py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {email}</p>
            </div>
            <div>
              <p className="text-sm text-red-300">
                Enhancement of OTP mail sending method. It has switched off and
                is manually set in order to avoid using a paid mail sender.
              </p>
              <h2 className="text-base">Enter this OTP code:</h2>
              <h1 className="text-2xl font-bold mt-4">{mainOtp?.toString()}</h1>
            </div>
          </div>
          <div>
            <div>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between gap-2 mx-auto w-full ">
                  {otp.map((_, index) => (
                    <div key={index} className="flex gap-4 h-10">
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={otp[index]}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                      onClick={handleVerify}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Spinner className=" animate-spin" color="red" />
                      ) : (
                        "Verify Account"
                      )}
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn&apos;t recieve code?</p>{" "}
                    <button
                      className={`flex flex-row items-center ${
                        second === 0
                          ? "text-blue-600"
                          : "text-blue-300 pointer-events-none"
                      }`}
                    >
                      Resend
                    </button>
                    <div>{"(" + second + " second)"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
