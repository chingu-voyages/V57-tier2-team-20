import { Icon } from "@iconify/react";

export default function Footer() {

    return (
        <footer className="flex flex-col border-t-2 border-[#01ffff33] items-center justify-center gap-4 py-6 px-4 bg-[#141923] bg-[linear-gradient(0deg,rgba(1,255,255,0.05)_0%,rgba(1,255,255,0)_50%,rgba(1,255,255,0)_100%)] ">
            <div className='flex items-center justify-center border-1 border-[#01ffff33] px-4 py-2 gap-2 hover:bg-[#01ffff33] '>
                <Icon icon="solar:code-outline" width="24" height="24" color='#00ffff' className='border-[#01ffff33] border-1 p-1 bg-[#01FFFF20]'/>
                <a href="https://github.com/chingu-voyages/V57-tier2-team-20" className='uppercase text-[#00ffff] tracking-wider font-extralight text-sm'>Github repository</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center text-white text-base/8 font-extralight md:gap-14 ">
                <div className='flex flex-col justify-center'>
                    <a className="hover:underline hover:underline-offset-4 hover:text-[#00ffff]" href='https://github.com/kenako1'>Chinedu - Product Owner</a>
                    <a className="hover:underline hover:underline-offset-4 hover:text-[#00ffff]" href='https://github.com/AAlabi2'>Ayo - Scrum Master</a>
                    <a className="hover:underline hover:underline-offset-4 hover:text-[#00ffff]" href='https://github.com/Hamza-EL07'>Hamza - UX/UI Designer</a>
                    <a className="hover:underline hover:underline-offset-4 hover:text-[#00ffff]" href='https://github.com/ouassimaelyakoubi'>Ouassima - Frontend Developer</a>
                </div>
                
                <div className='flex flex-col'>
                    <a className="hover:underline hover:underline-offset-4 hover:text-[#00ffff]" href='https://github.com/Alexander-NM'>Alexander - Frontend Developer</a>
                    <a className="hover:underline hover:underline-offset-4 hover:text-[#00ffff]" href='https://github.com/Isaacjosh23'>Joshua - Frontend Developer</a>
                    <a className="hover:underline hover:underline-offset-4 hover:text-[#00ffff]" href='https://github.com/NadiiaLashtun'>Nadiia - Frontend Developer</a>
                    <a className="hover:underline hover:underline-offset-4 hover:text-[#00ffff]" href=''>Dasicom - Frontend Developer</a>
                </div>
            </div>
            <div className='px-4 py-2 border-1 border-[#01ffff33] '>
                <p className='text-[#9696AA] uppercase text-base font-extralight tracking-wider'>© 2025 #GitHub PR Review Board</p>
            </div>
        </footer>
    )
}
