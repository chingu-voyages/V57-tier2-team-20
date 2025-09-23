import PRCard from "./PRCard/PRCard";

export default function PRList({ prList }) {
  return (
    <div className='space-y-3'>
      {prList.map((pr) => (
        <div
          key={pr.number}
          className='text-center text-white space-y-3'
        >
          <PRCard pr={pr} />
        </div>
      ))}
    </div>
  );
}
