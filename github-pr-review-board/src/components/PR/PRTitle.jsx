import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";
import { Icon } from "@iconify/react";
import { useModal } from "../../context/ModalContext";

export default function PRTitle({
  org,
  repo,
  orgUrl,
  repoUrl,
  onRefresh,
  title = "Open pull requests",
  variant = "open", // new prop: "open" | "closed"
}) {
  const isClosed = variant === "close";
  const { handleModal } = useModal();

  return (
    <div
      className={`p-6 bg-card flex items-center justify-between flex-wrap sm:flex-nowrap gap-6 border ${
        isClosed ? "border-brand-secondary/30" : "border-brand-primary/20"
      }`}
    >
      <div className='space-y-2'>
        <h2
          className={`text-3xl md:text-5xl font-bold uppercase ${
            isClosed ? "text-brand-secondary" : "text-white"
          }`}
        >
          {title}
        </h2>
        <div className='flex items-center gap-3 flex-wrap'>
          <div className='flex items-center gap-2 flex-wrap text-brand'>
            <Icon
              icon='solar:link-minimalistic-2-outline'
              className='w-5 h-5'
            />
            <a
              href={orgUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              {org}
            </a>
            /
            <a
              href={repoUrl}
              target='_blank'
              rel='noopener noreferrer'
            >
              {repo}
            </a>
          </div>
          <SecondaryButton onClick={handleModal} />
        </div>
      </div>

      <PrimaryButton
        icon='solar:refresh-square-outline'
        text='Refresh'
        onClick={onRefresh}
        className={
          isClosed
            ? "bg-brand-secondary text-mutted hover:bg-backround hover:border hover:border-brand-secondary hover:text-brand-secondary"
            : "bg-brand-primary"
        }
      />
    </div>
  );
}
