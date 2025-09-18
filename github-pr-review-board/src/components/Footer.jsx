import { Icon } from "@iconify/react";
import TeamMemberCard from "./TeamMemberCard";

export default function Footer() {
    const roleColors = {
    "Product Owner": "#00FFFF",     // Cyan
    "Scrum Master": "#00FFFF",      // Cyan
    "Frontend Developer": "#FF0080", // Pink
    "UI/UX Designer": "#8A2BE2",    // Purple
};
    const teamMembers = [
    { name: "Chinedu Oleka", role: "Product Owner", linkedin: "https://www.linkedin.com/in/chinedu-olekah", github: "https://github.com/kenako1" },
    { name: "Ayo Alabi", role: "Scrum Master", linkedin: "https://www.linkedin.com/in/ayot/", github: "https://github.com/AAlabi2" },
    { name: "Alexander Makoveev", role: "Frontend Developer", linkedin: "https://www.linkedin.com/in/alexander-makoveev", github: "https://github.com/Alexander-NM" },
    { name: "Ouassima El Yakoubi", role: "Frontend Developer", linkedin: "https://www.linkedin.com/in/ouassima-elyakoubi", github: "https://github.com/ouassimaelyakoubi" },
    { name: "Ebhamen Joshua", role: "Frontend Developer", linkedin: "https://www.linkedin.com/in/joshua-ebhamen-4904aa344/", github: "https://github.com/Isaacjosh23" },
    { name: "Nadiia Lashtun", role: "Frontend Developer", linkedin: "https://www.linkedin.com/in/lashtun", github: "https://github.com/NadiiaLashtun" },
    { name: "Dascom", role: "Frontend Developer", linkedin: "https://www.linkedin.com/in/dassi-dieudonne", github: "https://github.com/dascomsoft" },
    { name: "Hamza El Assri", role: "UI/UX Designer", linkedin: "https://www.linkedin.com/in/hamza-elassri/", github: "https://github.com/Hamza-EL07" },
    ];

    return (
        <footer className="flex flex-col border-t-8 border-transparent [border-image:linear-gradient(to_right,#00FFFF,#8A2BE2,#FF0080)_1] items-center justify-center gap-12 py-6 md:py-12 md:px-4 px-2 bg-[#141923] bg-[linear-gradient(0deg,rgba(1,255,255,0.05)_0%,rgba(1,255,255,0)_50%,rgba(1,255,255,0)_100%)] ">
            <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                <Icon icon="solar:tea-cup-outline" width="40" height="40" className="bg-[#01ffff33] border p-1 border-[#00FFFF]" color="#00FFFF"/>
                <h2 className="uppercase text-2xl font-bold text-center tracking-wide text-white">Neural Network Development Team</h2>
            </div>
            <div className="flex flex-col gap-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                    {teamMembers.map((member, index) => (
                    <TeamMemberCard
                        key={index}
                        {...member}
                        color={roleColors[member.role]}
                    />
                    ))}
                </div>
                <div className="flex flex-col md:flex-row items-center gap-2 justify-between">
                    <div className='flex items-center justify-center border-1 border-[#01ffff33] px-3 py-1.5 gap-2 hover:bg-[#01ffff33] '>
                        <Icon icon="solar:code-outline" width="24" height="24" color='#00ffff' className='border-[#01ffff33] border-1 p-1 bg-[#01FFFF20]'/>
                        <a href="https://github.com/chingu-voyages/V57-tier2-team-20" className='uppercase text-[#00ffff] tracking-wider text-xs'>Github repository</a>
                    </div>
                    <div className='px-4 py-2 border-1 border-[#01ffff33]'>
                        <p className='text-[#9696AA] uppercase text-sm  tracking-normal'>© 2025 #GitHub PR Review Board</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
