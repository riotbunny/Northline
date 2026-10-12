type ReadinessPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  answers?: Record<string, string>;
};

const answerLabels: Record<string, string> = {
  remoteMotivation: "Can stay motivated remotely",
  monitorSetup: "Dual monitor setup",
  certificationSchedule: "Can attend certification schedule",
  backgroundCheck: "Can pass background check",
  internet: "High-speed internet and Ethernet",
  bilingual: "Bilingual",
  contractor: "Understands independent contractor arrangement",
  quietWorkspace: "Quiet workspace",
  backgroundFee: "Background check fee timing",
  certificationPay: "Understands certification-period compensation",
  payTiming: "Understands twice-monthly pay timing",
  deposit: "Understands refundable certification deposit",
};

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

function normalizePayload(payload: ReadinessPayload) {
  const answers =
    payload.answers && typeof payload.answers === "object" ? payload.answers : {};

  return {
    fullName: clean(payload.fullName),
    email: clean(payload.email).toLowerCase(),
    phone: clean(payload.phone),
    city: clean(payload.city),
    state: clean(payload.state),
    answers: Object.fromEntries(
      Object.entries(answers).map(([key, value]) => [key, clean(value)]),
    ),
  };
}

function validate(payload: ReturnType<typeof normalizePayload>) {
  if (
    !payload.fullName ||
    !payload.email ||
    !payload.phone ||
    !payload.city ||
    !payload.state
  ) {
    return "Please complete all contact fields.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return "Please enter a valid email address.";
  }

  return null;
}

function answerRows(payload: ReturnType<typeof normalizePayload>) {
  return Object.entries(answerLabels).map(([key, label]) => [
    label,
    payload.answers[key] || "Not provided",
  ]);
}

function adminHtml(payload: ReturnType<typeof normalizePayload>) {
  const rows = [
    ["Full name", payload.fullName],
    ["Email", payload.email],
    ["Phone", payload.phone],
    ["City", payload.city],
    ["State", payload.state],
    ...answerRows(payload),
  ]
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
      <h1 style="color:#0b1f33;">Readiness Match Completed</h1>
      <p>An applicant completed the Northline readiness check and requested onboarding instructions.</p>
      <table style="border-collapse:collapse;width:100%;max-width:780px;">${rows}</table>
    </div>
  `;
}

function applicantHtml(payload: ReturnType<typeof normalizePayload>) {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#20252d;line-height:1.6;">
      <h1 style="color:#0b1f33;">Your readiness check was received</h1>
      <p>Hello ${escapeHtml(payload.fullName)},</p>
      <p>Thank you for completing the Northline Client Partners readiness check. Your information was received for review.</p>
      <p>If your readiness profile matches current client program needs, you may receive next-step onboarding instructions.</p>
      <p style="font-size:13px;color:#607080;">Northline Client Partners is an independent business and is not owned or operated by Arise Virtual Solutions Inc. Opportunities are independent contractor opportunities and are not employment with Arise, Northline Client Partners, or client brands. Program availability, certification requirements, schedule options, and revenue terms vary.</p>
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
    const payload = normalizePayload((await request.json()) as ReadinessPayload);
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
            "The onboarding form is not fully configured yet. Please set RESEND_API_KEY, ADMIN_EMAIL, and FROM_EMAIL.",
        },
        { status: 503 },
      );
    }

    await sendResendEmail({
      apiKey,
      from: fromEmail,
      to: adminEmail,
      subject: `Readiness match: ${payload.fullName}`,
      html: adminHtml(payload),
    });

    await sendResendEmail({
      apiKey,
      from: fromEmail,
      to: payload.email,
      subject: "Northline Client Partners readiness check received",
      html: applicantHtml(payload),
    });

    return Response.json({
      message:
        "Thank you. Your readiness information was received. Watch your email for next steps.",
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "We could not submit your readiness information. Please try again shortly." },
      { status: 500 },
    );
  }
}
