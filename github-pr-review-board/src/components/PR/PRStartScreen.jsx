import { useState } from "react";
import OpenPRs from "../../pages/OpenPRs";

export default function PRStartScreen() {
  const [showPRs, setShowPRs] = useState(false);

  if (showPRs) {
    return <OpenPRs />;
  }

  return (
    <div>
      <button
        onClick={() => setShowPRs(true)}
        className='bg-brand text-white p-3'
      >
        Add Pull Requests
      </button>
    </div>
  );
}
