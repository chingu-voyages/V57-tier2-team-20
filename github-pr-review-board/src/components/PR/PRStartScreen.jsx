import { useState } from "react";
import { Icon } from "@iconify/react";
import Modal from "../home/Modal";
import Message from "../PR/Message";
import PrimaryButton from "../PrimaryButton";

import { usePrDetails } from "../../context/PrDetailsContext";
import { useModal } from "../../context/ModalContext";

export default function PRStartScreen({
  title,
  description,
  icon,
  EmptyComponent,
  theme = {
    primary: "bg-brand-primary", // default cyan
    icon: "white",
    text: "text-text",
    border: "border-brand-primary/20",
  },
}) {
  // const [showModal, setShowModal] = useState(false);
  const { newPrDetails } = usePrDetails();
  const repoData = !!(newPrDetails?.orgName && newPrDetails?.repoName);

  const { handleModal } = useModal();

  return (
    <section className='flex flex-col items-center justify-center relative p-8 overflow-hidden'>
      {/* Floating animated squares */}
      <div className='absolute bottom-30 left-5 md:top-50 md:left-10 w-12 h-12 border border-[#8A2BE24D] bg-[#8A2BE21A] animate-float-slow'></div>
      <div className='absolute top-15 left-10 md:top-20 md:left-80 w-24 h-24 border border-[#01FFFF33] rotate-50 animate-float-slow'></div>
      <div className='absolute bottom-10 md:right-80 right-25 w-18 h-18 border border-[#FF008033] rotate-12 animate-float-slow'></div>
      <div className='absolute md:top-30 top-45 right-10 w-15 h-15 border border-[#01FFFF33] bg-[#01FFFF0D] rotate-12 animate-float'></div>

      {!repoData ? (
        <div
          className={`relative flex flex-col gap-8 md:w-3/4 items-center justify-center bg-card border ${theme.border} py-12 px-6 ${theme.text} text-center h-100`}
        >
          <Message
            icon={icon}
            title={title}
            text={description}
          />

          <PrimaryButton
            icon='solar:add-circle-outline'
            text='New Repo'
            color={theme.primary}
            onClick={handleModal}
          />
        </div>
      ) : (
        <EmptyComponent
          org={newPrDetails.orgName}
          repo={newPrDetails.repoName}
        />
      )}

      {/* Popup Modal */}
      {/* {showModal && <Modal />} */}
      {/* <Modal /> */}
    </section>
  );
}
