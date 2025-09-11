import SquareImg from "../../img/Border.png";
export default function BuiltFor() {
  return (
    <div className=' bg-background bg-[image:var(--gradient)]  flex flex-wrap gap-9 justify-center md:justify-between py-12 px-3'>
      <div className='max-w-[414px] space-y-6'>
        <h2 className='text-white uppercase'>Built for Development Teams</h2>
        <p className='border-l-4 border-brand pl-3 text-text'>
          Connects to GitHub's REST API to retrieve your team's PR data.
          Rate-limited friendly with local data caching for testing and
          development.
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-white uppercase'>
          <div className='p-2 bg-card border border-brand-primary/30'>
            GitHub API integration
          </div>
          <div className='p-2 bg-card border border-brand-primary/30'>
            Historical PR tracking
          </div>
          <div className='p-2 bg-card border border-brand-primary/30'>
            Team-customized views
          </div>
          <div className='p-2 bg-card border border-brand-primary/30'>
            Developer- friendly interface
          </div>
        </div>
      </div>
      <img
        src={SquareImg}
        className='object-contain'
        alt='Geometrium image'
      />
    </div>
  );
}
