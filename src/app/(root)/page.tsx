import MidSide from "./_components/MidSide";
import RightSide from "@/components/RightSide";

export default function Home() {
  return (
    <main className="flex ">
      {/* left side */}
      <div className=" h-[91.5vh] md:h-[93.5vh] w-2/5 hidden md:block"></div>
      {/* middle */}
      <div className=" h-[91.5vh] md:h-[93.5vh] w-full border shadow-md">
        <MidSide />
      </div>
      {/* {right} */}
      <div className=" h-[91.5vh] md:h-[93.5vh] w-2/5 hidden md:block">
        <RightSide />
      </div>
    </main>
  );
}
