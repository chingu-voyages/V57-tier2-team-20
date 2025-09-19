import { useState } from "react";
import { Icon } from "@iconify/react";
import RepoModal from "./RepoModal";
import PRList from "./PRList";

export default function PRStartScreen() {
  const [showModal, setShowModal] = useState(false);
  const [prs, setPrs] = useState(null); // null = not loaded yet

  

  return (
    <section className='flex flex-col items-center justify-center relative p-8 bg-background bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[length:50px_50px] overflow-hidden'>
       {/* Floating animated squares */}
      <div className="absolute bottom-30 left-5 md:top-50 md:left-10 w-12 h-12 border border-[#8A2BE24D] bg-[#8A2BE21A] animate-float-slow"></div>
      <div className="absolute top-15 left-10 md:top-20 md:left-80 w-24 h-24 border border-[#01FFFF33] rotate-50 animate-float-slow"></div>
      <div className="absolute bottom-10 md:right-80 right-25 w-18 h-18 border border-[#FF008033] rotate-12 animate-float-slow"></div>
      <div className="absolute md:top-30 top-45 right-10 w-15 h-15 border border-[#01FFFF33] bg-[#01FFFF0D] rotate-12 animate-float"></div>
      {!prs ? (
      <div className="relative flex flex-col gap-8 md:w-3/4 items-center justify-center bg-card border border-brand-primary/20 py-12 px-6 h-100">
        <Icon icon="solar:folder-open-outline"  width="64" height="64" color="white" />
        <div className="flex flex-col justify-center items-center gap-3">
          <h1 className="capitalize text-5xl font-bold text-white text-center">open PRs dashboard</h1>
          <p className="text-text text-sm text-center">Initialize a repository from the home page to view open pull</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-brand-primary px-4 py-2 text-sm"
        onClick={() => setShowModal(true)}>
          <Icon icon="solar:add-circle-outline" width="22" height="22" color="black"/>
          New Repo
        </button>
      </div>
      ) : (
        <PRList prs={prs} />
      )}
      {/* Popup Modal */}
      {showModal && (
        <RepoModal
          onClose={() => setShowModal(false)}
          onSuccess={(data) => {
            setPrs(data); // save PRs
            setShowModal(false); // close modal
          }}
        />
      )}
    </section>
  );
}
