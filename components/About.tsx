import { profile } from "@/data/profile";

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
      <div className="about-bio">
        {profile.bio.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <h2 className="section-title">Education</h2>
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
      <h2 className="section-title">Career</h2>
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
