export default function PRAnimationGrid() {
  return (
    <div className='space-y-3'>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className='flex items-center gap-2.5 border-b border-brand-primary/10 pb-3'
        >
          <div className='w-6 h-6 bg-brand-secondary/30 animate-pulse'></div>
          <div className='flex-1 h-2.5 bg-brand-secondary/20 animate-pulse'></div>
          <div className='w-9 h-4.5  bg-brand-secondary/30 animate-pulse'></div>
        </div>
      ))}
    </div>
  );
}
