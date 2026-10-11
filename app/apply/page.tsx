import {
  ArrowRight,
  Check,
  ClipboardCheck,
  Headphones,
  Laptop,
  Mail,
  MonitorCheck,
  Phone,
  ShieldCheck,
  Wifi,
} from "lucide-react";
import { ApplicationForm } from "@/components/application-form";

const benefits = [
  {
    title: "Be Your Own Boss",
    text: "You decide when you log on and how much you earn.",
  },
  {
    title: "World-Class Brands",
    text: "Provide top-tier support for household names you already know and love.",
  },
  {
    title: "Zero Commute, Zero Stress",
    text: "Reclaim 10+ hours a week lost to traffic and office politics.",
  },
  {
    title: "Guided Success",
    text: "We don't just drop you in. Our team guides you through every setup and certification step.",
  },
];

const requirements = [
  "18+ years old & living in the U.S.",
  "Quiet Home Space where you can focus",
  "Windows PC + High-Speed Wired Internet",
  "USB Headset + Dual Monitors. Laptop + 1 External Monitor works too!",
];

const steps = [
  "Quick Application. Takes under 3 minutes.",
  "Fast Review & Match with Open Client Programs.",
  "Complete Simple Onboarding & Self-Paced Certification.",
  "Start Servicing & Earning on Your Own Terms!",
];

const workdayTasks = [
  "Account Care & VIP Support",
  "Inbound Customer Assistance & Problem Solving",
  "Service & Order Scheduling",
];

export default function LandingPage() {
  return (
    <main className="landing-page">
      <header className="landing-header">
        <a href="/" aria-label="Northline Client Partners home">
          <img src="/northline-logo.png" alt="Northline Client Partners" />
        </a>
        <nav aria-label="Landing page navigation">
          <a href="#fit">Freedom</a>
          <a href="#requirements">Requirements</a>
          <a href="#steps">Steps</a>
          <a className="landing-nav-cta" href="#apply">
            Apply Now
          </a>
        </nav>
      </header>

      <section className="landing-hero">
        <div className="landing-hero-copy">
          <span className="eyebrow">Remote customer support pathways</span>
          <h1>Ditch the Commute. Design Your Schedule. Earn From Home.</h1>
          <p>
            Imagine working in your favorite clothes, setting your own hours, and
            supporting recognized national brands-all without ever leaving your house.
            Northline Client Partners bridges the gap between top U.S. talent and
            premium, work-from-home customer support opportunities powered by leading
            platforms like Arise®.
          </p>
          <div className="landing-actions">
            <a className="button primary" href="#apply">
              Unlock Available Roles <ArrowRight aria-hidden="true" size={18} />
            </a>
            <a className="button secondary" href="#requirements">
              See If You Qualify
            </a>
          </div>
          <p className="landing-compliance-note">
            Fast-Track Onboarding • 100% Remote • Total Workday Freedom
          </p>
          <p className="landing-compliance-note">
            Independent contractor opportunities. Program availability, schedule
            options, certification, and revenue terms vary.
          </p>
        </div>
        <aside className="landing-proof-panel" aria-label="Application highlights">
          <div>
            <ShieldCheck aria-hidden="true" size={28} />
            <h2>What makes this path different</h2>
          </div>
          <ul>
            <li>
              <Check aria-hidden="true" size={18} />
              <span>Remote opportunities that can fit around real life</span>
            </li>
            <li>
              <Check aria-hidden="true" size={18} />
              <span>Support as you move through readiness and onboarding steps</span>
            </li>
            <li>
              <Check aria-hidden="true" size={18} />
              <span>Client program options may include support for recognized brands</span>
            </li>
          </ul>
        </aside>
      </section>

      <section id="fit" className="landing-section landing-benefits">
        <div className="landing-section-heading">
          <span className="eyebrow">More control over your workday</span>
          <h2>Why High Performers Choose Northline</h2>
          <p>
            If you are looking for a practical way to work from home, support customers,
            and pursue a more flexible professional path with programs connected to
            established national brands, this is a strong place to start.
          </p>
        </div>
        <div className="landing-benefit-grid">
          {benefits.map((benefit) => (
            <article key={benefit.title}>
              <ClipboardCheck aria-hidden="true" size={24} />
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-band">
        <div>
          <span className="eyebrow">What the work can look like</span>
          <h2>What Your New Workday Looks Like</h2>
        </div>
        <div>
          <p>
            No micromanagement. No long drives in bad weather. Just you, your home
            office, and rewarding work helping customers via chat, phone, or email.
          </p>
          <ul className="landing-checklist">
            {workdayTasks.map((task) => (
              <li key={task}>
                <Check aria-hidden="true" size={18} />
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="requirements" className="landing-section landing-requirements">
        <div className="landing-section-heading">
          <span className="eyebrow">Readiness checklist</span>
          <h2>Are You Set Up for Success? (Quick Gear Check)</h2>
          <p>
            If you have these basics, you're already halfway to your first payout:
          </p>
        </div>
        <div className="landing-requirement-layout">
          <div className="landing-equipment-card">
            <Laptop aria-hidden="true" size={28} />
            <h3>Remote workspace basics</h3>
            <p>
              A reliable setup helps prevent delays during review, onboarding,
              assessment, and any required certification.
            </p>
            <div className="landing-equipment-icons" aria-label="Common equipment">
              <span>
                <MonitorCheck aria-hidden="true" size={20} /> Monitor setup
              </span>
              <span>
                <Wifi aria-hidden="true" size={20} /> Wired internet
              </span>
              <span>
                <Headphones aria-hidden="true" size={20} /> USB headset
              </span>
            </div>
          </div>
          <ul className="landing-checklist">
            {requirements.map((requirement) => (
              <li key={requirement}>
                <Check aria-hidden="true" size={18} />
                <span>{requirement}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="steps" className="landing-section landing-steps">
        <div className="landing-section-heading">
          <span className="eyebrow">How the process works</span>
          <h2>Your Path to Freedom in 4 Fast Steps</h2>
        </div>
        <ol>
          {steps.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="landing-fee-note">
        <div>
          <span className="eyebrow">Recognized national brands</span>
          <h2>Support customers for names people already know</h2>
        </div>
        <p>
          Available client programs may connect qualified remote support professionals
          with customer care opportunities for leading national brands. Specific
          programs, certification requirements, availability, and revenue terms vary.
        </p>
      </section>

      <section id="apply" className="landing-form-section">
        <div className="landing-form-copy">
          <span className="eyebrow">Application</span>
          <h2>Ready to Claim Your Remote Freedom?</h2>
          <p>
            Fill out the quick 2-minute readiness form below. If your setup is a match,
            we'll fast-track your onboarding instructions immediately!
          </p>
          <div className="contact-strip">
            <span>
              <Mail aria-hidden="true" size={18} /> Email notification enabled
            </span>
            <span>
              <Phone aria-hidden="true" size={18} /> Applicant confirmation enabled
            </span>
          </div>
        </div>
        <ApplicationForm />
      </section>

      <section className="landing-final-cta">
        <span className="eyebrow">Ready for more freedom?</span>
        <h2>Apply now and see which remote paths may fit.</h2>
        <p>
          Northline Client Partners will review your application and follow up with
          next-step instructions if your readiness profile matches current needs.
        </p>
        <a className="button primary" href="#apply">
          Apply Now <ArrowRight aria-hidden="true" size={18} />
        </a>
      </section>

      <footer className="landing-footer">
        <img src="/northline-logo.png" alt="Northline Client Partners" />
        <p>
          Northline Client Partners is an independent business entity and is not owned
          or operated by Arise Virtual Solutions Inc. Arise® is a registered trademark
          of Arise Virtual Solutions Inc. All opportunities are independent contractor
          positions and do not constitute employment with Arise, Northline Client
          Partners, or client brands. Client programs, certification requirements,
          availability, and revenue terms vary.
        </p>
      </footer>
    </main>
  );
}
