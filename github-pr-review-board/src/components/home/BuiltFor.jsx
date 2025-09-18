import BuiltForItem from "../BuiltForItem";
import SquareImg from "../../assets/Container.svg";
import { Icon } from "@iconify/react";

export default function BuiltFor() {
  const icons = [
    {
      icon: "solar:code-bold",
      text: "GitHub API integration",
      color: "border-brand-primary/30 text-brand-primary/30",
      bgColor: "bg-[#01FFFF1A]"
    },
    {
      icon: "solar:database-outline",
      text: "Historical PR tracking",
      color: "border-brand/30 text-brand/30",
      bgColor: "bg-[#8A2BE21A]"
    },
    {
      icon: "solar:eye-outline",
      text: "Team-customized views",
      color: "border-brand-secondary/30 text-brand-secondary/30",
      bgColor: "bg-[#FF00801A]"
    },
    {
      icon: "solar:monitor-outline",
      text: "Developer- friendly interface",
      color: "border-brand-primary/30 text-brand-primary/30",
      bgColor: "bg-[#01FFFF1A]"
    },
  ];

  return (
    <section className=' relative flex items-center  bg-background bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[length:50px_50px] py-12 px-3 md:px-6'>
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(1,255,255,0.05)] via-[rgba(1,255,255,0)] to-[rgba(255,0,128,0.05)] pointer-events-none"></div>
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-9">
        <div className="flex flex-col items-start justify-center gap-6 max-w-md">
        <div className="flex items-center justify-center w-full">
          <Icon
            icon='solar:cpu-outline' width="24" height="24"
            className='text-white bg-brand p-1'
          />
          <div className='flex-1 border-t border-brand w-full'></div>
        </div>
        <h2 className='text-white uppercase text-2xl font-bold tracking-wider'>Built for Development Teams</h2>
        <p className='border-l-4 border-brand p-5 text-sm text-text bg-[#1E232D33]'>
          Connects to GitHub's REST API to retrieve your team's PR data.
          Rate-limited friendly with local data caching for testing and
          development.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-white uppercase w-full'>
          {icons.map((item, index) => (
            <BuiltForItem
              key={index}
              icon={item.icon}
              text={item.text}
              color={item.color}
              bgColor={item.bgColor}
            />
          ))}
        </div>
        </div>
      <img
        src={SquareImg}
        className="object-contain"
        alt='Geometry image'
      />
      </div>
    </section>
  );
}
