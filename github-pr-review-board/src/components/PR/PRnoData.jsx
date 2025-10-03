import Messages from "./Message";

export default function PRnoData({ state = "open" }) {
  const color = state === "close" ? "brand-secondary" : "brand-primary";
  const text = state === "close" ? "brand-secondary" : "text";

  return (
    <div
      className={`flex flex-col justify-center items-center gap-8 p-6 bg-card border border-${color}/20 text-${text} text-center h-100`}
    >
      <Messages
        title={`No ${state} Pull Requests`}
        text={`This repository currently has no ${state} pull requests`}
      />
    </div>
  );
}
