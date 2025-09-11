import BuiltForItem from "../BuiltForItem";
import SquareImg from "../../img/Border.png";
import {
  CircleStackIcon,
  EyeIcon,
  CodeBracketIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

export default function BuiltFor() {
  const icons = [
    {
      icon: CodeBracketIcon,
      text: "GitHub API integration",
      color: " border-brand-primary/30 text-brand-primary/30",
    },
    {
      icon: CircleStackIcon,
      text: "Historical PR tracking",
      color: " border-brand/30 text-brand/30",
    },
    {
      icon: EyeIcon,
      text: "Team-customized views",
      color: " border-brand-secondary/30 text-brand-secondary/30",
    },
    {
      icon: ComputerDesktopIcon,
      text: "Developer- friendly interface",
      color: " border-brand-primary/30 text-brand-primary/30",
    },
  ];

  return (
    <div className='relative bg-background bg-[image:var(--gradient)] flex flex-wrap gap-9 justify-center md:justify-between pt-[84px] pb-12 px-3'>
      <div
        className='max-w-[414px] space-y-6 
                      before:absolute before:top-[48px] before:left-3 before:bg-brand before:w-6 before:h-6
                      after:absolute after:top-[60px] after:left-[48px] after:right-0 after:bg-brand after:h-0.25'
      >
        <div className='absolute top-[48px] left-3 w-6 h-6 flex justify-center items-center'>
          <CpuChipIcon className='w-4 h-4 text-white' />
        </div>
        <h2 className='text-white uppercase'>Built for Development Teams</h2>
        <p className='border-l-4 border-brand pl-3 text-text'>
          Connects to GitHub's REST API to retrieve your team's PR data.
          Rate-limited friendly with local data caching for testing and
          development.
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-white uppercase'>
          {icons.map((item, index) => (
            <BuiltForItem
              key={index}
              icon={item.icon}
              text={item.text}
              color={item.color}
            />
          ))}
        </div>
      </div>
      <img
        src={SquareImg}
        className='object-contain'
        alt='Geometry image'
      />
    </div>
  );
}
