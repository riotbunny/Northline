import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { ReadinessMatch } from "@/components/readiness-match";

const highlights = [
  "Remote customer support readiness check",
  "Independent contractor expectations explained clearly",
  "Next-step onboarding form for qualified applicants",
];

export default function ReadinessCheckPage() {
  return (
    <main className="match-page">
      <header className="landing-header match-header">
        <a href="/" aria-label="Northline Client Partners home">
          <img src="/northline-logo.png" alt="Northline Client Partners" />
        </a>
        <nav aria-label="Readiness check navigation">
          <a href="/apply">Apply</a>
          <a href="/">For Companies</a>
        </nav>
      </header>

      <section className="match-hero">
        <div className="match-copy">
          <span className="eyebrow">Are you a match?</span>
          <h1>Let&apos;s see if remote support is the right next move.</h1>
          <p>
            This quick hands-on check helps confirm whether your workspace, schedule,
            and expectations line up with Northline Client Partners&apos; remote customer
            support opportunities.
          </p>
          <ul className="match-hero-list">
            {highlights.map((highlight) => (
              <li key={highlight}>
                <Check aria-hidden="true" size={18} />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
          <a className="button primary" href="#start">
            Start the check <ArrowRight aria-hidden="true" size={18} />
          </a>
        </div>
        <aside className="match-side-panel">
          <ShieldCheck aria-hidden="true" size={32} />
          <h2>Before you begin</h2>
          <p>
            Answer honestly. Some answers will pause the process so you know what to
            fix before spending time on onboarding.
          </p>
        </aside>
      </section>

      <section id="start" className="match-tool-section">
        <ReadinessMatch />
      </section>

      <footer className="landing-footer">
        <img src="/northline-logo.png" alt="Northline Client Partners" />
        <p>
          Northline Client Partners is an independent business entity and is not owned
          or operated by Arise Virtual Solutions Inc. Arise® is a registered trademark
          of Arise Virtual Solutions Inc. All opportunities are independent contractor
          positions and do not constitute employment with Arise, Northline Client
          Partners, or client brands. Client programs, certification requirements,
          availability, schedule options, and revenue terms vary.
        </p>
      </footer>
    </main>
  );
}
