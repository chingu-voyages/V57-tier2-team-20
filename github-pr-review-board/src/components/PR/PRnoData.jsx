import Messages from "./Message";

export default function PRnoData() {
  return (
    <div className='flex flex-col justify-center items-center gap-8 p-6 bg-card border border-brand-primary/20 text-text text-center h-100'>
      <Messages
        title='No Open Pull Requests'
        text='This repository currently has no open pull requests'
      />
    </div>
  );
}
