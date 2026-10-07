import { profile } from "@/data/profile";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a href="/" className="site-logo">
          {profile.name}
        </a>
        <nav className="site-nav">
          <a href="/#about">About</a>
          <a href="/#publications">Publications</a>
          <a href="/blog">Blog</a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
