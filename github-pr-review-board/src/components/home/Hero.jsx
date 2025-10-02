import { Icon } from "@iconify/react";
import Modal from "./Modal";
import { useState } from "react";
import { useModal } from "../../context/ModalContext";

export default function Hero() {
  // const [showModal, setShowModal] = useState(false);

  // const handleModal = () => {
  //   setShowModal((open) => !open);
  // };

  const { handleModal } = useModal();

  return (
    <section className="flex flex-col items-center justify-center relative py-15 px-3 bg-background bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[length:50px_50px] overflow-hidden">
      {/* Floating animated squares */}
      <div className="absolute bottom-30 left-5 md:top-50 md:left-10 w-12 h-12 border border-[#8A2BE24D] bg-[#8A2BE21A] animate-float-slow"></div>
      <div className="absolute top-15 left-10 md:top-20 md:left-80 w-24 h-24 border border-[#01FFFF33] rotate-50 animate-float-slow"></div>
      <div className="absolute bottom-10 md:right-80 right-25 w-18 h-18 border border-[#FF008033] rotate-12 animate-float-slow"></div>
      <div className="absolute md:top-30 top-45 right-10 w-15 h-15 border border-[#01FFFF33] bg-[#01FFFF0D] rotate-12 animate-float"></div>

      <div className="relative text-white flex flex-col items-center justify-center gap-8">
        <h1 className="text-center uppercase text-5xl font-bold tracking-wide text-transparent bg-clip-text bg-[linear-gradient(to_right,#00FFFF,#8A2BE2,#FF0080)]">
          pr status board
        </h1>
        <p className="text-center capitalize text-2xl font-bold">
          track your team's progress
        </p>

        <p className="bg-[#1E232D33] p-5 text-sm border-l-4 border-[#00FFFF] leading-relaxed text-[#9696AA] w-7/8 md:max-w-[550px]">
          Stop waiting on PR reviews. Get visibility into your team's GitHub
          Pull Requests with a customized dashboard designed for development
          teams.
        </p>

        <div className="flex flex-col gap-10">
          <button
            className="group py-4 px-6 cursor-pointer flex text-sm  items-center bg-[#0A0A0F] justify-center gap-2 border tracking-widest uppercase text-brand-primary border-brand-
          hover:bg-brand-primary hover:text-[#0A0A0F] hover:border-[#0A0A0F]
          transition duration-300 ease-in-out"
            onClick={handleModal}
          >
            <Icon
              icon="solar:flashlight-outline"
              color="#00ffff"
              width="20"
              height="20"
              className="group-hover:hidden"
            />
            <Icon
              icon="solar:flashlight-on-outline"
              width="20"
              height="20"
              className="hidden group-hover:block"
            />
            Initialize System
            <Icon
              icon="solar:alt-arrow-right-outline"
              width="20"
              height="20"
              className="text-brand-primary group-hover:text-[#0A0A0F]"
            />
          </button>
          <div className="flex items-center justify-center gap-6">
            <div className="w-[8px] h-[8px] bg-[#00FFFF] cursor-pointer p-[4px]"></div>
            <div className="w-[8px] h-[8px] bg-[#8A2BE2] cursor-pointer p-[4px]"></div>
            <div className="w-[8px] h-[8px] bg-[#FF0080] cursor-pointer p-[4px]"></div>
          </div>
        </div>
      </div>
      {/* <Modal showModal={showModal} setShowModal={setShowModal} /> */}
    </section>
  );
}
