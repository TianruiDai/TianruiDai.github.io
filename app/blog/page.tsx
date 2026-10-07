import Link from "next/link";
import { Markdown } from "@/components/Markdown";
import { getPosts } from "@/data/posts";

export default function BlogPage() {
  const posts = getPosts();

  return (
    <main className="site-main">
      <h1 className="section-title">Blog</h1>
      <div className="blog-list">
        {posts.map((post) => (
          <article key={post.slug} className="blog-item">
            <h2 className="blog-title">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="blog-date">{post.date}</p>
            <Markdown>{post.excerpt}</Markdown>
            <p className="blog-more">
              <Link href={`/blog/${post.slug}`}>阅读全文</Link>
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
