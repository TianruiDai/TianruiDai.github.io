import { profile } from "@/data/profile";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a href="#top" className="site-logo">
          {profile.name}
        </a>
        <nav className="site-nav">
          <a href="#about">About</a>
          <a href="#publications">Publications</a>
        </nav>
      </div>
    </header>
  );
}
