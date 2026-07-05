import { Resend } from "resend";
import { contactSchema } from "@/lib/validation";
import { site } from "@/content/site";

/**
 * Contact form handler.
 * - Silently drops submissions that fill the honeypot field.
 * - Validates with the shared Zod schema.
 * - Sends via Resend when RESEND_API_KEY is set; otherwise runs in mock mode
 *   (logs the payload and returns success) so the UI is fully testable locally.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "リクエストの形式が正しくありません。" },
      { status: 400 },
    );
  }

  const data = body as Record<string, unknown>;

  // Honeypot: real users never fill this. Pretend success to fool bots.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "入力内容をご確認ください。" },
      { status: 400 },
    );
  }

  const { name, email, company, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  // Mock mode — no API key configured yet.
  if (!apiKey) {
    console.log("[contact] mock submission (RESEND_API_KEY not set):", {
      name,
      email,
      company,
      message,
    });
    return Response.json({ ok: true, mock: true });
  }

  try {
    const resend = new Resend(apiKey);
    const to = process.env.CONTACT_TO_EMAIL ?? site.email;
    const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

    const { error } = await resend.emails.send({
      from: `Portfolio Contact <${from}>`,
      to: [to],
      replyTo: email,
      subject: `【お問い合わせ】${name} 様${company ? `（${company}）` : ""}`,
      text: [
        `お名前: ${name}`,
        `メール: ${email}`,
        `会社名: ${company ?? "-"}`,
        "",
        "お問い合わせ内容:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] resend error:", error);
      return Response.json(
        { ok: false, error: "送信に失敗しました。時間をおいて再度お試しください。" },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return Response.json(
      { ok: false, error: "送信中にエラーが発生しました。" },
      { status: 500 },
    );
  }
}
