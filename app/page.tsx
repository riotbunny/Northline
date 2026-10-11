"use client";

import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Headphones,
  Laptop,
  Monitor,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { CSSProperties, useEffect, useState } from "react";

const solutionAreas = [
  "Inbound customer service",
  "Overflow call handling",
  "After-hours support",
  "Appointment scheduling",
  "Sales and retention calls",
  "Technical support triage",
  "Bilingual customer support",
  "Seasonal volume support",
];

const workforceCapabilities = [
  "Remote agents for inbound and outbound customer support",
  "Coverage for call spikes, seasonal demand, and overflow queues",
  "Customer service, scheduling, sales support, and basic technical support",
  "U.S.-based professionals prepared for remote call center work",
  "Bilingual support options when available",
  "Clear customer-facing communication standards",
  "Flexible support capacity without building a full in-house team",
  "Room to adjust coverage as your call volume changes",
];

const readinessCards = [
  {
    icon: UserCheck,
    title: "Outsourced call center support",
    text: "We help companies handle customer service, scheduling, sales support, and overflow call volume through remote support professionals.",
  },
  {
    icon: Monitor,
    title: "Remote-first coverage",
    text: "Our model is built for companies that need flexible support capacity without opening another office or staffing a traditional call center.",
  },
  {
    icon: ShieldCheck,
    title: "Brand-conscious customer care",
    text: "We understand that every call reflects on your business, so the focus stays on professional, helpful, and consistent customer interactions.",
  },
];

const steps = [
  "Tell us what kind of customer support you need.",
  "We define the call types, hours, volume, and customer experience goals.",
  "Northline matches the work with remote support professionals suited to the role.",
  "Support professionals are prepared around your service expectations.",
  "We help support customer care, scheduling, sales, or overflow needs.",
  "You gain flexible call center capacity without building everything in-house.",
  "Coverage can be adjusted as your customer support needs change.",
];

const faqs = [
  {
    question: "What does Northline Client Partners specialize in?",
    answer:
      "Northline Client Partners specializes in remote call center support for companies that want to outsource customer service, scheduling, sales support, technical triage, overflow calls, or seasonal call volume.",
  },
  {
    question: "What kinds of companies can use outsourced call center support?",
    answer:
      "Companies with inbound customer questions, appointment requests, account support needs, seasonal demand, or growing service queues can benefit from remote call center support.",
  },
  {
    question: "Can applicants still apply?",
    answer:
      "Yes. Applicant recruiting is handled on the dedicated landing page so this homepage can stay focused on companies looking to outsource support.",
  },
  {
    question: "Is Northline Client Partners owned by Arise?",
    answer:
      "No. Northline Client Partners is an independent business and may use platforms including the Arise® Platform.",
  },
];

type ViewportState = "desktop" | "tablet" | "mobile";

export default function Home() {
  const [viewport, setViewport] = useState<ViewportState>("desktop");
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);

  useEffect(() => {
    const setCurrentViewport = () => {
      const width = window.innerWidth;
      setViewport(width < 760 ? "mobile" : width < 1120 ? "tablet" : "desktop");
    };

    setCurrentViewport();
    window.addEventListener("resize", setCurrentViewport);
    return () => window.removeEventListener("resize", setCurrentViewport);
  }, []);

  useEffect(() => {
    const updateHeaderState = () => setIsHeaderCompact(window.scrollY > 24);

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  useEffect(() => {
    const animatedElements = document.querySelectorAll("[data-animate]");

    if (!("IntersectionObserver" in window)) {
      animatedElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.16 },
    );

    animatedElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="site-shell" data-viewport={viewport}>
      <header className="site-header" data-compact={isHeaderCompact}>
        <a className="brand logo-brand" href="#top" aria-label="Northline Client Partners home">
          <img src="/northline-logo.png" alt="Northline Client Partners" />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#solutions">Services</a>
          <a href="#workforce">Why Northline</a>
          <a href="#process">Process</a>
          <a href="#faq">FAQ</a>
          <a className="nav-cta" href="#contact">Outsource Support</a>
        </nav>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Remote call center outsourcing</span>
          <h1>
            {viewport === "mobile"
              ? "Remote Call Center Support"
              : "Outsource your customer support to a remote call center partner"}
          </h1>
          <p>
            Northline Client Partners helps companies handle customer calls, support
            queues, scheduling requests, sales inquiries, and overflow volume with
            remote customer service professionals.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#contact">
              Talk About Outsourcing <ArrowRight aria-hidden="true" size={18} />
            </a>
            <a className="button secondary" href="#solutions">
              View Services
            </a>
          </div>
          <div className="hero-points" aria-label="Business highlights">
            <span>
              <ShieldCheck aria-hidden="true" size={18} /> U.S.-based remote support
            </span>
            <span>
              <ClipboardCheck aria-hidden="true" size={18} /> Flexible outsourced coverage
            </span>
          </div>
        </div>
        <div className="hero-media" aria-label="Remote customer support workforce">
          <img src="/remote-support-hero.png" alt="" />
        </div>
      </section>

      <section className="intro-section" data-animate>
        <div>
          <span className="eyebrow">For businesses that need help answering customers</span>
          <h2>Remote call center support without building an in-house team</h2>
        </div>
        <p>
          When call volume grows, customers still expect fast, professional help.
          Northline gives companies a practical way to outsource customer service work
          while keeping the experience organized, responsive, and brand-conscious.
        </p>
      </section>

      <section id="workforce" className="section readiness-section" data-animate>
        <div className="readiness-grid">
          {readinessCards.map(({ icon: Icon, title, text }, index) => (
            <article
              className="readiness-card"
              data-animate
              key={title}
              style={{ "--i": index } as CSSProperties}
            >
              <Icon aria-hidden="true" size={24} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="solutions" className="section" data-animate>
        <div className="section-heading">
          <span className="eyebrow">Services</span>
          <h2>Call center support for the customer moments that matter</h2>
          <p>
            We support companies that need help answering questions, protecting service
            levels, covering busy seasons, and giving customers a reliable person to
            talk to.
          </p>
        </div>
        <div className="opportunity-grid">
          {solutionAreas.map((item, index) => (
            <div
              className="opportunity-item"
              data-animate
              key={item}
              style={{ "--i": index } as CSSProperties}
            >
              <Headphones aria-hidden="true" size={20} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section cost-section" data-animate>
        <div>
          <span className="eyebrow">Outsourcing use cases</span>
          <h2>Use remote support when demand outgrows your internal team</h2>
        </div>
        <p>
          Companies turn to outsourced call center support when they need to reduce hold
          times, cover after-hours requests, protect customer satisfaction, handle
          seasonal spikes, support national brand programs, or add capacity without
          hiring a full internal department.
        </p>
      </section>

      <section id="requirements" className="section muted-section" data-animate>
        <div className="section-heading">
          <span className="eyebrow">Why Northline</span>
          <h2>A remote call center partner built around real customer conversations</h2>
          <p>
            Your customers do not care whether support is in-house or outsourced. They
            care that someone answers, understands the issue, and represents your
            company well.
          </p>
        </div>
        <div className="requirements-layout">
          <div className="equipment-panel">
            <Laptop aria-hidden="true" size={28} />
            <h3>Built for outsourced service coverage</h3>
            <p>
              Northline focuses on practical support coverage: clear communication,
              professional remote work standards, and a service mindset that helps your
              customers feel taken care of.
            </p>
          </div>
          <ul className="check-list">
            {workforceCapabilities.map((item, index) => (
              <li data-animate key={item} style={{ "--i": index } as CSSProperties}>
                <CheckCircle2 aria-hidden="true" size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="process" className="section process-section" data-animate>
        <div className="section-heading">
          <span className="eyebrow">How it works</span>
          <h2>
            {viewport === "mobile"
              ? "A simple outsourcing path"
              : "A simple path from support need to remote coverage"}
          </h2>
        </div>
        <ol className="process-list">
          {steps.map((step, index) => (
            <li data-animate key={step} style={{ "--i": index } as CSSProperties}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="contact" className="application-section partner-section" data-animate>
        <div className="application-copy">
          <span className="eyebrow">For companies</span>
          <h2>Need a remote team to answer calls and support customers?</h2>
          <p>
            If your company is spending too much time chasing call volume, missed
            inquiries, or customer service backlogs, Northline can help you think
            through outsourced remote support coverage.
          </p>
        </div>
        <div className="partner-card">
          <h3>Outsource the support work that slows your team down.</h3>
          <p>
            We can support customer care, appointment scheduling, overflow calls,
            sales inquiries, and service-related conversations for companies that need
            more responsive coverage.
          </p>
          <a className="button primary" href="#solutions">
            Review Services <ArrowRight aria-hidden="true" size={18} />
          </a>
          <a className="button secondary partner-secondary" href="/apply">
            I am an applicant
          </a>
        </div>
      </section>

      <section id="faq" className="section faq-section" data-animate>
        <div className="section-heading">
          <span className="eyebrow">FAQ</span>
          <h2>Common business questions</h2>
        </div>
        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <details data-animate key={faq.question} style={{ "--i": index } as CSSProperties}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <img src="/northline-logo.png" alt="Northline Client Partners" />
        </div>
        <p>
          Northline Client Partners is an independent business and is not owned or
          operated by Arise Virtual Solutions Inc. Arise® is a registered trademark of
          Arise Virtual Solutions Inc. Opportunities are independent contractor
          opportunities and are not employment with Arise, Northline Client Partners, or
          client brands. Client programs, certification requirements, availability, and
          revenue terms vary.
        </p>
      </footer>
    </main>
  );
}
