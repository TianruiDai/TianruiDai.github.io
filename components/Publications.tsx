import { publications } from "@/data/publications";
import { PublicationItem } from "./PublicationItem";

export function Publications() {
  return (
    <section id="publications">
      <h2 className="section-title">Selected Publications</h2>
      <div className="publication-list">
        {publications.map((publication) => (
          <PublicationItem key={publication.id} publication={publication} />
        ))}
      </div>
    </section>
  );
}
