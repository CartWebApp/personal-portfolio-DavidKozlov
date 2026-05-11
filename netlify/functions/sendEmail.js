// Right now I don't have an API key because that requires the trial (I found out about this after finishing like half the process) 
// I will just leave this here for now -->

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Accept both JSON and form-encoded payloads
  let payload = {};
  const ct = event.headers['content-type'] || event.headers['Content-Type'] || '';
  try {
    if (ct.includes('application/json')) {
      payload = JSON.parse(event.body || '{}');
    } else {
      // form-encoded
      const params = new URLSearchParams(event.body || '');
      for (const [k, v] of params) payload[k] = v;
    }
  } catch (err) {
    return { statusCode: 400, body: 'Invalid request body' };
  }

  // Simple honeypot check (Andrew Check)
  if (payload['bot-field']) {
    return { statusCode: 200, body: 'OK' };
  }

  const name = payload.name || 'No name';
  const fromEmail = payload.email || 'no-reply@example.com';
  const message = payload.message || '';

  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const SENDER_EMAIL = process.env.SENDER_EMAIL || 'no-reply@example.com';
  const RECIPIENT_EMAIL = 'davidkozlov24@gmail.com';

  if (!SENDGRID_API_KEY) {
    return { statusCode: 500, body: 'Email provider not configured (SENDGRID_API_KEY missing)' };
  }

  const emailPayload = {
    personalizations: [
      {
        to: [{ email: RECIPIENT_EMAIL }],
        subject: `Portfolio contact from ${name}`,
      },
    ],
    from: { email: SENDER_EMAIL, name: 'Portfolio Contact' },
    reply_to: { email: fromEmail, name },
    content: [
      { type: 'text/plain', value: `Name: ${name}\nEmail: ${fromEmail}\n\n${message}` },
      {
        type: 'text/html',
        value: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${fromEmail}</p><hr/><p>${message.replace(/\n/g, '<br/>')}</p>`,
      },
    ],
  };

  try {
    const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('SendGrid error', res.status, text);
      return { statusCode: 502, body: 'Failed to send email' };
    }

    return { statusCode: 200, body: 'Email sent' };
  } catch (err) {
    console.error('sendEmail function error', err);
    return { statusCode: 500, body: 'Server error' };
  }
};
