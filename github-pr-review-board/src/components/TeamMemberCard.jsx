import {Icon} from '@iconify/react'
import linkedinLogo from '../assets/linkedin.svg'
import githubLogo from '../assets/github.svg'
export default function TeamMemberCard({name, role, linkedin, github, color}){

    return(
        <div className='flex items-center justify-between border p-3 gap-4 min-w-[300px]' style={{borderColor :`${color}33`}} >
            <div className='flex items-center justify-start gap-3'>
                <div className="border-1 p-1" style={{borderColor :color, backgroundColor: `${color}33` }}>
                    <Icon icon="solar:user-outline" width="30" height="30" color={color} />
                </div>
                
                <div className='flex flex-col justify-center items-start place-self-start'>
                    <h3 className="text-base font-medium uppercase text-white">{name}</h3>
                    <p className="text-sm uppercase text-transparent bg-clip-text bg-[linear-gradient(to_right,#00FFFF,#8A2BE2,#FF0080)]">
                        {role}
                    </p>
                </div>
            </div>
            <div className='flex items-center justify-center gap-1'>
                <div className='border-1 p-1 border-[#01FFFF]/20 hover:bg-[#01FFFF]/20' >
                    {linkedin && (
                    <a href={linkedin} target="_blank" rel="noopener noreferrer">
                        {/* <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="30,10 50,50 10,50" stroke="white" stroke-width="2" fill="none"/>
                        </svg> */}
                        <img src={linkedinLogo} alt='linkedin logo'/>
                    </a>
                    )}
                </div>
                <div className='border-1  p-1 border-[#8A2BE2]/20 hover:bg-[#8A2BE2]/20'>
                {github && (
                    <a href={github} target="_blank" rel="noopener noreferrer">
                        {/* <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="40" stroke="white" stroke-width="2"/>
                        </svg> */}
                        <img src={githubLogo} alt='github logo'/>
                    </a>
                )}
                </div>
            </div>
        </div>
    )
}