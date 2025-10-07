export default function PRAnimationGrid({ state = "open" }) {
  const color = state === "close" ? "brand-secondary" : "brand-primary";

  return (
    <div className='space-y-3'>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className={`flex items-start gap-2.5 bg-card border border-${color}/20 p-6 animate-pulse`}
        >
          <div className={`w-6 h-6 bg-${color}/20`}></div>
          <div className=' flex-1 space-y-1'>
            <div className={`h-2.5 bg-${color}/20`}></div>
            <div className='h-2.5 w-25 bg-mutted'></div>
          </div>
          <div className={`w-9 h-4.5 bg-${color}/20`}></div>
        </div>
      ))}
    </div>
  );
}
