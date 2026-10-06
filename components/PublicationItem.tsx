"use client";

import { useState } from "react";
import type { Publication } from "@/data/publications";

export function PublicationItem({ publication }: { publication: Publication }) {
  const [abstractOpen, setAbstractOpen] = useState(false);
  const hasThumb = publication.thumbnail.length > 0;

  return (
    <article
      className={`publication-card${hasThumb ? "" : " no-thumb"}`}
    >
      {hasThumb ? (
        <img
          className="publication-thumb"
          src={publication.thumbnail}
          alt=""
        />
      ) : null}
      <div>
        <h3 className="publication-title">{publication.title}</h3>
        <p className="publication-venue">{publication.venue}</p>
        {publication.highlight.length > 0 ? (
          <p className="publication-highlight">{publication.highlight}</p>
        ) : null}
        {publication.advisors.length > 0 ? (
          <p className="publication-advisors">
            Advisors: {publication.advisors.join(", ")}
          </p>
        ) : null}
        <div className="publication-actions">
          {publication.links.map((link) => (
            <a
              key={link.label}
              className="pub-btn"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            className={`pub-btn${abstractOpen ? " active" : ""}`}
            onClick={() => setAbstractOpen(!abstractOpen)}
          >
            Abstract
          </button>
        </div>
        {abstractOpen ? (
          <div className="publication-abstract">
            <ul>
              {publication.abstract.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}
