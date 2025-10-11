import Messages from "./Message";

export default function PRnoData({ state = "open" , filtered = false}) {
  const color = state === "close" ? "border-brand-secondary/20" : "border-brand-primary/20";
  const text = state === "close" ? "text-brand-secondary" : "text-text";
  const title = filtered
    ? "No Results Found"
    : `No ${state} Pull Requests`;

  const description = filtered
    ? "No pull requests match your selected filters."
    : `This repository currently has no ${state} pull requests.`;
  return (
    <div
      className={`flex flex-col justify-center items-center gap-8 p-6 bg-card border ${color} ${text} text-center h-100`}
    >
      <Messages
        title={title}
        text={description}
      />
    </div>
  );
}
