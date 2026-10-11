type ApplicationPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  state?: string;
  isAdult?: string;
  isUsBased?: string;
  hasQuietWorkspace?: string;
  hasWindowsPc?: string;
  hasWiredInternet?: string;
  hasUsbHeadset?: string;
  hasMonitorSetup?: string;
  isBilingual?: string;
  languages?: string;
  experience?: string;
  availability?: string;
  message?: string;
  consent?: boolean;
};

const requiredTextFields: Array<keyof ApplicationPayload> = [
  "fullName",
  "email",
  "phone",
  "state",
  "experience",
  "availability",
  "message",
];

const yesNoFields: Array<keyof ApplicationPayload> = [
  "isAdult",
  "isUsBased",
  "hasQuietWorkspace",
  "hasWindowsPc",
  "hasWiredInternet",
  "hasUsbHeadset",
  "hasMonitorSetup",
  "isBilingual",
];

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizePayload(payload: ApplicationPayload) {
  return {
    fullName: clean(payload.fullName),
    email: clean(payload.email).toLowerCase(),
    phone: clean(payload.phone),
    state: clean(payload.state),
    isAdult: clean(payload.isAdult),
    isUsBased: clean(payload.isUsBased),
    hasQuietWorkspace: clean(payload.hasQuietWorkspace),
    hasWindowsPc: clean(payload.hasWindowsPc),
    hasWiredInternet: clean(payload.hasWiredInternet),
    hasUsbHeadset: clean(payload.hasUsbHeadset),
    hasMonitorSetup: clean(payload.hasMonitorSetup),
    isBilingual: clean(payload.isBilingual),
    languages: clean(payload.languages),
    experience: clean(payload.experience),
    availability: clean(payload.availability),
    message: clean(payload.message),
    consent: payload.consent === true,
  };
}

function validate(payload: ReturnType<typeof normalizePayload>) {
  for (const field of requiredTextFields) {
    if (!payload[field]) {
      return "Please complete all required fields.";
    }
  }

  for (const field of yesNoFields) {
    if (payload[field] !== "yes" && payload[field] !== "no") {
      return "Please answer each yes/no readiness question.";
    }
  }

  if (!payload.consent) {
    return "Please confirm the independent contractor opportunity consent.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return "Please enter a valid email address.";
  }

  return null;
}

function rows(payload: ReturnType<typeof normalizePayload>) {
  return [
    ["Full name", payload.fullName],
    ["Email", payload.email],
    ["Phone", payload.phone],
    ["State", payload.state],
    ["18 or older", payload.isAdult],
    ["Located in the United States", payload.isUsBased],
    ["Quiet workspace", payload.hasQuietWorkspace],
    ["Windows PC", payload.hasWindowsPc],
    ["Wired internet", payload.hasWiredInternet],
    ["USB headset", payload.hasUsbHeadset],
    ["Two monitors or laptop plus external monitor", payload.hasMonitorSetup],
    ["Bilingual", payload.isBilingual],
    ["Languages", payload.languages || "Not provided"],
    ["Customer service experience", payload.experience],
    ["Availability", payload.availability],
    ["Message", payload.message],
  ];
}

function adminHtml(payload: ReturnType<typeof normalizePayload>) {
  const tableRows = rows(payload)
    .map(
      ([label, value]) => `
        <tr>
          <th align="left" style="padding:10px;border-bottom:1px solid #d8e0e7;color:#0b1f33;">${escapeHtml(label)}</th>
          <td style="padding:10px;border-bottom:1px solid #d8e0e7;color:#20252d;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#20252d;">
      <h1 style="color:#0b1f33;">New Northline Client Partners Application</h1>
      <p>A candidate submitted the recruiting form.</p>
      <table style="border-collapse:collapse;width:100%;max-width:760px;">${tableRows}</table>
    </div>
  `;
}

function applicantHtml(payload: ReturnType<typeof normalizePayload>) {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#20252d;line-height:1.6;">
      <h1 style="color:#0b1f33;">Application received</h1>
      <p>Hello ${escapeHtml(payload.fullName)},</p>
      <p>Thank you for submitting your information to Northline Client Partners. We received your application for review.</p>
      <p>If selected, you may receive next-step onboarding instructions. Client programs, certification requirements, availability, and revenue terms vary.</p>
      <p style="font-size:13px;color:#607080;">Northline Client Partners is an independent business and is not owned or operated by Arise Virtual Solutions Inc. Opportunities are independent contractor opportunities and are not employment with Arise, Northline Client Partners, or client brands.</p>
    </div>
  `;
}

async function sendResendEmail(input: {
  apiKey: string;
  from: string;
  to: string | string[];
  subject: string;
  html: string;
}) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${input.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: input.from,
      to: input.to,
      subject: input.subject,
      html: input.html,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend email failed: ${response.status} ${body}`);
  }
}

export async function POST(request: Request) {
  try {
    const payload = normalizePayload((await request.json()) as ApplicationPayload);
    const error = validate(payload);

    if (error) {
      return Response.json({ message: error }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;
    const fromEmail = process.env.FROM_EMAIL;

    if (!apiKey || !adminEmail || !fromEmail) {
      return Response.json(
        {
          message:
            "The application form is not fully configured yet. Please set RESEND_API_KEY, ADMIN_EMAIL, and FROM_EMAIL.",
        },
        { status: 503 },
      );
    }

    await sendResendEmail({
      apiKey,
      from: fromEmail,
      to: adminEmail,
      subject: `New application: ${payload.fullName}`,
      html: adminHtml(payload),
    });

    await sendResendEmail({
      apiKey,
      from: fromEmail,
      to: payload.email,
      subject: "Northline Client Partners application received",
      html: applicantHtml(payload),
    });

    return Response.json({
      message:
        "Thank you. Your application was received and a confirmation email has been sent.",
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "We could not submit your application. Please try again shortly." },
      { status: 500 },
    );
  }
}
