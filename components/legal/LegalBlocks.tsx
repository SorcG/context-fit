import type { ReactNode } from "react";

export function LegalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="break-all text-accent underline underline-offset-2 transition-colors hover:text-text"
    >
      {children}
    </a>
  );
}

export type LegalBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "h4"; text: string }
  | { type: "p"; content: ReactNode }
  | { type: "ul"; items: ReactNode[] }
  | { type: "address"; lines: ReactNode[] };

export function LegalContent({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="mt-4 text-xl leading-tight text-text lg:text-2xl"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="mt-2 text-base font-semibold text-text"
              >
                {block.text}
              </h3>
            );
          case "h4":
            return (
              <h4 key={i} className="text-sm font-semibold text-text">
                {block.text}
              </h4>
            );
          case "p":
            return (
              <p
                key={i}
                className="text-sm leading-relaxed text-muted lg:text-base"
              >
                {block.content}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="flex flex-col gap-2 pl-1">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-sm leading-relaxed text-muted lg:text-base"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "address":
            return (
              <p
                key={i}
                className="text-sm leading-relaxed text-muted lg:text-base"
              >
                {block.lines.map((line, j) => (
                  <span key={j}>
                    {line}
                    {j < block.lines.length - 1 && <br />}
                  </span>
                ))}
              </p>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
