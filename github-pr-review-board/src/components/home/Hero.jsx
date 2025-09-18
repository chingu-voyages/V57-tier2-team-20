import { Icon } from "@iconify/react";
import Modal from "./Modal";
import { useState } from "react";

export default function Hero() {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal((open) => !open);
  };

  return (
    <section className="bg-[#0A0A0F] bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[length:50px_50px]">
      <div className="text-white mx-auto my-0 py-0 px-[32px] flex flex-col items-center gap-8 ">
        <div className="flex flex-col gap-14 ">
          <h1 className="flex flex-col gap-5 text-center">
            <span className="uppercase inline-block text-[45px] md:text-[48px] lg:text-[55px] font-bold leading-[55px] hero-gradient-text">
              pr status board
            </span>

            <span className="capitalize text-[18px] md:text-[24px] font-bold inline-block lg:text-[28px]">
              track your team's progress
            </span>
          </h1>

          <p className="bg-[rgba(30,35,45,0.2)] p-[13px] text-[14px] border-l-4 border-l-[#00FFFF] font-normal text-[#9696AA] md:text-[16px] lg:text-[18px]">
            Stop waiting on PR reviews. Get visibility into your team's GitHub
            Pull Requests with a customized dashboard designed for development
            teams.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          <button
            onClick={handleModal}
            className=" cta-border py-[10px] px-[18px] lg:py-[8px] md:px-[24px] text-[#00ffff] md:text-[17px] lg:text-[19px] cursor-pointer flex items-center gap-2"
          >
            <span>
              <Icon icon="solar:flashlight-outline" />
            </span>
            <span>Initialize System</span>
            <span>
              <Icon icon="solar:alt-arrow-right-outline" />
            </span>
          </button>

          <div className="flex items-center justify-center gap-6">
            <div className="w-[8px] h-[8px] bg-[#00FFFF] cursor-pointer p-[4px]"></div>
            <div className="w-[8px] h-[8px] bg-[#8A2BE2] cursor-pointer p-[4px]"></div>
            <div className="w-[8px] h-[8px] bg-[#FF0080] cursor-pointer p-[4px]"></div>
          </div>
        </div>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
}
