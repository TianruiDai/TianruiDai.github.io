import ReactMarkdown from "react-markdown";

export function Markdown({ children }: { children: string }) {
  return (
    <div className="blog-prose">
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
}
