import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      © {profile.copyrightYear} {profile.name}
    </footer>
  );
}
