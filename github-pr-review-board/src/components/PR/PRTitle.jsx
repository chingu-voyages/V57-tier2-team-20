import Button1 from "../components/Button1";
import Button2 from "../components/Button2";
import { Icon } from "@iconify/react";

export default function Title({ repo, orgUrl, repoUrl, onRefresh }) {
  return (
    <div className='flex justify-between gap-3 flex-wrap'>
      <div className=' flex items-center gap-3 flex-wrap text-brand'>
        <div className='flex items-center gap-2 flex-wrap'>
          <Icon
            icon='solar:link-minimalistic-2-outline'
            className='w-5 h-5'
          />
          <a
            href={prList[0]?.orgUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            {org}
          </a>
          /
          <a
            href={prList[0]?.repoUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            {repo}
          </a>
        </div>
        <Button2
          icon='solar:add-circle-outline'
          text='Change repo'
          onClick={null}
        />
      </div>

      <Button1
        icon='solar:refresh-square-outline'
        text='Refresh'
        onClick={loadPRs}
      />
    </div>
  );
}
