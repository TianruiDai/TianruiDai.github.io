import FlipCard from "@/components/FlipCard";
import { profile } from "@/data/profile";

function BioFace({ paragraphs, hint }: { paragraphs: string[]; hint: string }) {
  return (
    <div className="about-bio-face">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <p className="about-bio-hint">{hint}</p>
    </div>
  );
}

export function About() {
  return (
    <section id="about">
      <div className="about-hero">
        <img
          className="about-photo"
          src={profile.photo}
          alt={profile.name}
        />
        <div className="about-intro">
          <h1>{profile.name}</h1>
          <p className="about-role">{profile.role}</p>
          <p className="about-email">
            <a href={`mailto:${profile.email}`}>Email</a>
          </p>
        </div>
      </div>
      <FlipCard
        className="about-bio-card"
        front={<BioFace paragraphs={profile.bio} hint="点击翻到 English" />}
        back={<BioFace paragraphs={profile.bioEn} hint="Click for 中文" />}
        width={720}
        height={400}
        draggable={false}
        background="var(--card-bg)"
        color="var(--foreground)"
        ariaLabel="Biography, click to switch language"
      />
      <h2 className="section-title">教育经历</h2>
      <ul className="profile-list">
        {profile.education.map((item) => (
          <li key={`${item.period}-${item.school}`} className="profile-list-item">
            <p className="profile-list-heading">
              <span className="profile-list-period">{item.period}</span>
              {item.degree} · {item.school}
            </p>
            <p className="profile-list-note">{item.note}</p>
          </li>
        ))}
      </ul>
      <h2 className="section-title">工作经历</h2>
      <ul className="profile-list">
        {profile.career.map((item) => (
          <li
            key={`${item.period}-${item.organization}`}
            className="profile-list-item"
          >
            <p className="profile-list-heading">
              <span className="profile-list-period">{item.period}</span>
              {item.position} · {item.organization}
            </p>
            <p className="profile-list-note">{item.note}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
