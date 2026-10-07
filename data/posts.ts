import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
};

const blogDir = path.join(process.cwd(), "data/blog");

function asDate(value: unknown) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

function excerptOf(content: string) {
  const marker = "<!-- more -->";
  const index = content.indexOf(marker);
  if (index !== -1) return content.slice(0, index).trim();
  return content.trim().split(/\n\s*\n/)[0];
}

export function getPosts(): Post[] {
  return fs
    .readdirSync(blogDir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const slug = name.slice(0, -3);
      const raw = fs.readFileSync(path.join(blogDir, name), "utf8");
      const { data, content } = matter(raw);
      const body = content.trim().replace("<!-- more -->", "").trim();
      return {
        slug,
        title: String(data.title),
        date: asDate(data.date),
        excerpt: excerptOf(content.trim()),
        content: body,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string) {
  return getPosts().find((post) => post.slug === slug);
}
