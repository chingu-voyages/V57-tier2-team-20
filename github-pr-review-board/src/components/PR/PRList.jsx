import PRCard from "./PRCard";

export default function PRList({ prList }) {
  return (
    <div className='space-y-3'>
      {prList.map((pr) => (
        <div
          key={pr.number}
          className='mt-6 text-center text-white space-y-3'
        >
          <div className='p-6 bg-card border border-brand-primary/20'>
            <PRCard pr={pr} />
          </div>
        </div>
      ))}
    </div>
  );
}
