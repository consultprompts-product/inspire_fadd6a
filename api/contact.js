export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method not allowed' });
    return;
  }

  const { name, email, message } = req.body || {};

  if (typeof name !== 'string' || name.trim().length === 0 || name.length > 200) {
    res.status(400).json({ ok: false, error: 'name is required' });
    return;
  }
  if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email) || email.length > 320) {
    res.status(400).json({ ok: false, error: 'a valid email is required' });
    return;
  }
  if (typeof message !== 'string' || message.trim().length === 0 || message.length > 5000) {
    res.status(400).json({ ok: false, error: 'message is required' });
    return;
  }

  // No email/CRM integration wired yet — accepting the submission is enough
  // for the client to see the form works; forwarding it is a manual step
  // for now (matches the current bespoke-tier behavior — see
  // claude_service.go's generateAPIFunctions, which authors the same
  // no-op-success contract for the same reason).
  res.status(200).json({ ok: true });
}
