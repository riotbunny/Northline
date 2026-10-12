"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const yesNoFields = [
  ["isAdult", "Are you 18 years of age or older?"],
  ["isUsBased", "Are you currently located in the United States?"],
  ["hasQuietWorkspace", "Do you have a quiet workspace?"],
  ["hasWindowsPc", "Do you have a Windows PC?"],
  ["hasWiredInternet", "Do you have wired internet?"],
  ["hasUsbHeadset", "Do you have a USB headset?"],
  ["hasMonitorSetup", "Do you have two monitors, or a laptop plus external monitor?"],
  ["isBilingual", "Are you bilingual?"],
] as const;

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  state: "",
  isAdult: "",
  isUsBased: "",
  hasQuietWorkspace: "",
  hasWindowsPc: "",
  hasWiredInternet: "",
  hasUsbHeadset: "",
  hasMonitorSetup: "",
  isBilingual: "",
  languages: "",
  experience: "",
  availability: "",
  message: "",
  consent: false,
};

type FormState = typeof initialForm;

export function ApplicationForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [statusMessage, setStatusMessage] = useState("");

  function updateField(name: keyof FormState, value: string | boolean) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "We could not submit your application.");
      }

      setForm(initialForm);
      setStatus("success");
      setStatusMessage(
        result.message ||
          "Thank you. Your application was received and a confirmation email has been sent.",
      );
      window.setTimeout(() => router.push("/readiness-check"), 800);
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again in a moment.",
      );
    }
  }

  return (
    <form className="application-form" onSubmit={submitApplication}>
      <span className="eyebrow">Fast-Track Application Form</span>

      <div className="form-grid">
        <label>
          Full name
          <input
            name="fullName"
            value={form.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            autoComplete="name"
            required
          />
        </label>
        <label>
          Email address
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label>
          Phone number
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            autoComplete="tel"
            required
          />
        </label>
        <label>
          State
          <input
            name="state"
            value={form.state}
            onChange={(event) => updateField("state", event.target.value)}
            autoComplete="address-level1"
            required
          />
        </label>
      </div>

      <div className="radio-grid">
        {yesNoFields.map(([name, label]) => (
          <fieldset key={name}>
            <legend>{label}</legend>
            <div>
              <label>
                <input
                  type="radio"
                  name={name}
                  value="yes"
                  checked={form[name] === "yes"}
                  onChange={(event) => updateField(name, event.target.value)}
                  required
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name={name}
                  value="no"
                  checked={form[name] === "no"}
                  onChange={(event) => updateField(name, event.target.value)}
                />
                No
              </label>
            </div>
          </fieldset>
        ))}
      </div>

      <label>
        If bilingual, what languages?
        <input
          name="languages"
          value={form.languages}
          onChange={(event) => updateField("languages", event.target.value)}
          placeholder="Example: Spanish, French"
        />
      </label>

      <div className="form-grid">
        <label>
          Customer service experience
          <select
            name="experience"
            value={form.experience}
            onChange={(event) => updateField("experience", event.target.value)}
            required
          >
            <option value="">Select experience</option>
            <option value="none">None</option>
            <option value="less than 1 year">Less than 1 year</option>
            <option value="1-2 years">1-2 years</option>
            <option value="3+ years">3+ years</option>
          </select>
        </label>
        <label>
          Availability
          <select
            name="availability"
            value={form.availability}
            onChange={(event) => updateField("availability", event.target.value)}
            required
          >
            <option value="">Select availability</option>
            <option value="weekdays">Weekdays</option>
            <option value="evenings">Evenings</option>
            <option value="weekends">Weekends</option>
            <option value="flexible">Flexible</option>
          </select>
        </label>
      </div>

      <label>
        Tell us briefly why you are interested.
        <textarea
          name="message"
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          rows={5}
          required
        />
      </label>

      <label className="consent">
        <input
          type="checkbox"
          name="consent"
          checked={form.consent}
          onChange={(event) => updateField("consent", event.target.checked)}
          required
        />
        <span>
          I understand these are independent contractor opportunities and that program
          availability, requirements, certification, schedule availability, and revenue
          terms may vary.
        </span>
      </label>

      {statusMessage ? (
        <p className={`form-status ${status}`} role="status">
          {statusMessage}
        </p>
      ) : null}

      <button className="button primary submit-button" disabled={status === "submitting"}>
        {status === "submitting"
          ? "Submitting..."
          : "SUBMIT & CLAIM YOUR REMOTE OPPORTUNITY"}
      </button>
    </form>
  );
}
