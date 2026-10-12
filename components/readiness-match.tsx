"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Headphones,
  LockKeyhole,
  MonitorCheck,
  ShieldCheck,
  Wifi,
  XCircle,
} from "lucide-react";

type Option = {
  label: string;
  value: string;
  passes?: boolean;
  note?: string;
};

type Step = {
  id: string;
  eyebrow: string;
  question: string;
  detail: string;
  icon: typeof CheckCircle2;
  required?: boolean;
  options: Option[];
};

const steps: Step[] = [
  {
    id: "remoteMotivation",
    eyebrow: "Work style",
    question: "Can you stay motivated and focused while working from home?",
    detail:
      "Remote customer support takes self-direction, consistency, and the ability to stay professional without someone looking over your shoulder.",
    icon: Headphones,
    required: true,
    options: [
      { label: "Yes, I can stay focused remotely", value: "yes", passes: true },
      {
        label: "Not right now",
        value: "no",
        passes: false,
        note: "Remote work is probably not the right fit until you have a plan for staying focused independently.",
      },
    ],
  },
  {
    id: "monitorSetup",
    eyebrow: "Equipment",
    question: "Do you have two monitors, or a laptop with an extra monitor?",
    detail:
      "Most client programs require a dual-screen setup so you can move between systems while supporting customers.",
    icon: MonitorCheck,
    required: true,
    options: [
      { label: "Yes, I have this setup", value: "yes", passes: true },
      {
        label: "No, I do not",
        value: "no",
        passes: false,
        note: "You will need a dual-screen setup before moving forward with most client programs.",
      },
    ],
  },
  {
    id: "certificationSchedule",
    eyebrow: "Certification",
    question: "Can you attend certification classes on a set schedule if required?",
    detail:
      "Certification schedules vary by client program and often run for a short, fixed period before servicing begins.",
    icon: ClipboardCheck,
    options: [
      { label: "Yes, I can attend a set schedule", value: "yes", passes: true },
      { label: "It depends on the schedule", value: "depends", passes: true },
      { label: "Not sure yet", value: "unsure", passes: true },
    ],
  },
  {
    id: "backgroundCheck",
    eyebrow: "Client requirements",
    question: "Most client programs require a background check. Are you able to pass one?",
    detail:
      "Specific screening requirements vary by client program, but background checks are common in customer support work.",
    icon: ShieldCheck,
    required: true,
    options: [
      { label: "Yes, I can pass a background check", value: "yes", passes: true },
      {
        label: "No, I do not believe I can",
        value: "no",
        passes: false,
        note: "Most available client programs require background screening, so this may prevent placement right now.",
      },
    ],
  },
  {
    id: "internet",
    eyebrow: "Connection",
    question: "Do you have high-speed internet and access to an Ethernet cable?",
    detail:
      "A wired connection is commonly required because it is more stable than Wi-Fi for customer support systems.",
    icon: Wifi,
    required: true,
    options: [
      { label: "Yes, I have both", value: "yes", passes: true },
      { label: "Not yet, but I can get it", value: "can-get", passes: true },
      {
        label: "No, and I cannot get it",
        value: "no",
        passes: false,
        note: "You will need reliable high-speed internet and Ethernet access before moving forward.",
      },
    ],
  },
  {
    id: "bilingual",
    eyebrow: "Language",
    question: "Are you bilingual?",
    detail:
      "Bilingual skills can be helpful for some client programs, but they are not required for every opportunity. English communication is required.",
    icon: Headphones,
    options: [
      { label: "Yes", value: "yes", passes: true },
      { label: "No", value: "no", passes: true },
      { label: "Some conversational ability", value: "some", passes: true },
    ],
  },
  {
    id: "contractor",
    eyebrow: "Work arrangement",
    question: "Do you understand this is not a W-2 employee position?",
    detail:
      "These are independent contractor opportunities. Program availability, certification, schedule options, and revenue terms vary by client program.",
    icon: LockKeyhole,
    required: true,
    options: [
      { label: "Yes, I understand", value: "yes", passes: true },
      {
        label: "No, I am only looking for W-2 employment",
        value: "no",
        passes: false,
        note: "Northline's current remote support path is for independent contractor opportunities, not W-2 employment.",
      },
    ],
  },
  {
    id: "quietWorkspace",
    eyebrow: "Workspace",
    question: "Do you have a quiet place to work from?",
    detail:
      "Most client programs require a quiet, professional space where customers cannot hear background noise.",
    icon: Headphones,
    required: true,
    options: [
      { label: "Yes, I have a quiet workspace", value: "yes", passes: true },
      { label: "I can create one", value: "can-create", passes: true },
      {
        label: "No",
        value: "no",
        passes: false,
        note: "You will need a quiet workspace before servicing customers from home.",
      },
    ],
  },
  {
    id: "backgroundFee",
    eyebrow: "Background check fee",
    question:
      "Some client programs require a non-refundable background check fee, commonly around $30. How soon could you handle that if required?",
    detail:
      "This fee is paid as part of the independent contractor onboarding process when required by a client program.",
    icon: ShieldCheck,
    options: [
      { label: "Today", value: "today", passes: true },
      { label: "Within 24-48 hours", value: "48-hours", passes: true },
      { label: "Within a week", value: "week", passes: true },
      { label: "I would need more time", value: "more-time", passes: true },
    ],
  },
  {
    id: "certificationPay",
    eyebrow: "Certification-period pay",
    question: "Do you understand certification-period compensation may be lower?",
    detail:
      "Some client programs may provide certification-period compensation as low as $7.25 per hour for a short period. After certification, available client program revenue terms commonly vary and may range from about $9-$14 per hour depending on the program.",
    icon: ClipboardCheck,
    required: true,
    options: [
      { label: "Yes, I understand", value: "yes", passes: true },
      {
        label: "No, that does not work for me",
        value: "no",
        passes: false,
        note: "This may not be a fit if certification-period compensation is not workable for you.",
      },
    ],
  },
  {
    id: "payTiming",
    eyebrow: "Payment timing",
    question: "Do you understand pay is generally twice per month?",
    detail:
      "Payment methods may include direct deposit or Zelle depending on setup and program process.",
    icon: CheckCircle2,
    required: true,
    options: [
      { label: "Yes, I understand", value: "yes", passes: true },
      {
        label: "No, I need weekly pay",
        value: "weekly",
        passes: false,
        note: "This path may not be a fit if you need weekly payments.",
      },
    ],
  },
  {
    id: "deposit",
    eyebrow: "Certification deposit",
    question: "Do you understand a refundable certification class deposit may be required?",
    detail:
      "Some programs require a $50 deposit to hold your certification seat. It is refunded to the original payment method after you attend a full first day of training. If you do not show up on the first day, the deposit is not refundable.",
    icon: LockKeyhole,
    required: true,
    options: [
      { label: "Yes, I understand", value: "yes", passes: true },
      {
        label: "No, I do not want to place a deposit",
        value: "no",
        passes: false,
        note: "Some client programs require a seat deposit, so this may limit your available options.",
      },
    ],
  },
];

const initialContact = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  state: "",
};

type ContactState = typeof initialContact;

export function ReadinessMatch() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [stop, setStop] = useState<{ title: string; message: string } | null>(null);
  const [contact, setContact] = useState<ContactState>(initialContact);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [statusMessage, setStatusMessage] = useState("");

  const currentStep = steps[currentIndex];
  const progress = useMemo(
    () => Math.round(((currentIndex + 1) / (steps.length + 1)) * 100),
    [currentIndex],
  );

  function chooseOption(option: Option) {
    setAnswers((current) => ({ ...current, [currentStep.id]: option.value }));

    if (option.passes === false) {
      setStop({
        title: "This may not be a match yet",
        message:
          option.note ||
          "Based on this answer, you may need to adjust your setup before continuing.",
      });
      return;
    }

    setCurrentIndex((index) => Math.min(index + 1, steps.length));
  }

  function goBack() {
    setCurrentIndex((index) => Math.max(index - 1, 0));
    setStop(null);
  }

  function restart() {
    setAnswers({});
    setCurrentIndex(0);
    setStop(null);
    setStatus("idle");
    setStatusMessage("");
  }

  function updateContact(name: keyof ContactState, value: string) {
    setContact((current) => ({ ...current, [name]: value }));
  }

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/readiness-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, answers }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "We could not submit your information.");
      }

      setContact(initialContact);
      setStatus("success");
      setStatusMessage(
        result.message ||
          "Thank you. Your readiness information was received. Watch for next steps.",
      );
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again in a moment.",
      );
    }
  }

  if (stop) {
    return (
      <section className="match-card match-stop" aria-live="polite">
        <div className="match-icon danger">
          <XCircle aria-hidden="true" size={34} />
        </div>
        <span className="eyebrow">Readiness check</span>
        <h2>{stop.title}</h2>
        <p>{stop.message}</p>
        <div className="match-actions">
          <button className="button secondary" type="button" onClick={goBack}>
            <ArrowLeft aria-hidden="true" size={18} />
            Change answer
          </button>
          <button className="button primary" type="button" onClick={restart}>
            Restart check
          </button>
        </div>
      </section>
    );
  }

  if (currentIndex >= steps.length) {
    return (
      <section className="match-card match-final" aria-live="polite">
        <div className="match-icon">
          <CheckCircle2 aria-hidden="true" size={34} />
        </div>
        <span className="eyebrow">Strong potential match</span>
        <h2>You may be ready for the next step.</h2>
        <p>
          Based on your answers, you meet the core readiness expectations for many
          remote customer support programs. Complete the form below so Northline can
          send your onboarding link and next-step instructions.
        </p>

        <form className="match-contact-form" onSubmit={submitContact}>
          <div className="form-grid">
            <label>
              Full name
              <input
                name="fullName"
                value={contact.fullName}
                onChange={(event) => updateContact("fullName", event.target.value)}
                autoComplete="name"
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={contact.email}
                onChange={(event) => updateContact("email", event.target.value)}
                autoComplete="email"
                required
              />
            </label>
            <label>
              Phone number
              <input
                type="tel"
                name="phone"
                value={contact.phone}
                onChange={(event) => updateContact("phone", event.target.value)}
                autoComplete="tel"
                required
              />
            </label>
            <label>
              City
              <input
                name="city"
                value={contact.city}
                onChange={(event) => updateContact("city", event.target.value)}
                autoComplete="address-level2"
                required
              />
            </label>
            <label>
              State
              <input
                name="state"
                value={contact.state}
                onChange={(event) => updateContact("state", event.target.value)}
                autoComplete="address-level1"
                required
              />
            </label>
          </div>

          <p className="match-disclaimer">
            By submitting this form, you give Northline Client Partners permission to
            contact you by phone, text message, and email about remote customer support
            onboarding steps. Message and data rates may apply. You can ask us to stop
            contacting you at any time.
          </p>

          {statusMessage ? (
            <p className={`form-status ${status}`} role="status">
              {statusMessage}
            </p>
          ) : null}

          <button
            className="button primary submit-button"
            disabled={status === "submitting" || status === "success"}
          >
            {status === "submitting" ? "Submitting..." : "Send My Onboarding Link"}
            <ArrowRight aria-hidden="true" size={18} />
          </button>
        </form>
      </section>
    );
  }

  const Icon = currentStep.icon;

  return (
    <section className="match-card" aria-live="polite">
      <div className="match-progress" aria-label={`Step ${currentIndex + 1}`}>
        <span style={{ width: `${progress}%` }} />
      </div>
      <div className="match-step-meta">
        <div className="match-icon">
          <Icon aria-hidden="true" size={34} />
        </div>
        <span>
          Step {currentIndex + 1} of {steps.length}
        </span>
      </div>
      <span className="eyebrow">{currentStep.eyebrow}</span>
      <h2>{currentStep.question}</h2>
      <p>{currentStep.detail}</p>
      {currentStep.required ? (
        <p className="match-required">This answer must align before moving forward.</p>
      ) : null}

      <div className="match-options">
        {currentStep.options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => chooseOption(option)}
          >
            {option.label}
            <ArrowRight aria-hidden="true" size={18} />
          </button>
        ))}
      </div>

      <div className="match-nav">
        <button
          className="button secondary"
          type="button"
          onClick={goBack}
          disabled={currentIndex === 0}
        >
          <ArrowLeft aria-hidden="true" size={18} />
          Back
        </button>
      </div>
    </section>
  );
}
