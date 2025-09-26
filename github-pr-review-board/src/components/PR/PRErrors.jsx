import { Icon } from "@iconify/react/dist/iconify.js";
import SecondaryButton from "../SecondaryButton";

export default function PRErrors({ err }) {
  return (
    <div className='flex flex-col md:flex-row justify-between items-center gap-3 p-6 bg-brand-secondary/10 border border-brand-secondary/30 text-brand-secondary text-base text-center uppercase'>
      <div className='flex flex-col md:flex-row items-center gap-3'>
        <Icon
          icon='solar:danger-triangle-linear'
          className='w-6 h-6 shrink-0'
        />
        Repository not found or not accessible <br />
        {/* {" Error: " + err?.message || "Unknown error"} */}
      </div>
      <SecondaryButton error={true} />
    </div>
  );
}
