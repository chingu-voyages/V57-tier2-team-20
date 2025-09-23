import { Icon } from "@iconify/react";
import linkedinLogo from "../assets/linkedin.svg";
import githubLogo from "../assets/github.svg";
export default function TeamMemberCard({
  name,
  role,
  linkedin,
  github,
  color,
}) {
  return (
    <div
      className='flex items-center justify-between border p-3 gap-4 min-w-[300px]'
      style={{ borderColor: `${color}33` }}
    >
      <div className='flex items-center justify-start gap-3'>
        <div
          className='border-1 p-1'
          style={{ borderColor: color, backgroundColor: `${color}33` }}
        >
          <Icon
            icon='solar:user-outline'
            width='30'
            height='30'
            color={color}
          />
        </div>

        <div className='flex flex-col justify-center items-start place-self-start'>
          <h3 className='text-base font-medium uppercase text-white'>{name}</h3>
          <p className='text-sm uppercase text-transparent bg-clip-text bg-[linear-gradient(to_right,#00FFFF,#8A2BE2,#FF0080)]'>
            {role}
          </p>
        </div>
      </div>
      <div className='flex items-center justify-center gap-2'>
        {linkedin && (
          <a
            href={linkedin}
            target='_blank'
            rel='noopener noreferrer'
            className='border-1 p-2 border-[#01FFFF]/20 hover:bg-[#01FFFF]/20'
          >
            <img
              src={linkedinLogo}
              alt='linkedin logo'
              width='24px'
              height='24px'
            />
          </a>
        )}

        {github && (
          <a
            href={github}
            target='_blank'
            rel='noopener noreferrer'
            className='border-1  p-2 border-[#8A2BE2]/20 hover:bg-[#8A2BE2]/20'
          >
            <img
              src={githubLogo}
              alt='github logo'
              width='24px'
              height='24px'
            />
          </a>
        )}
      </div>
    </div>
  );
}
