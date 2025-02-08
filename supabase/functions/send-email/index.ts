
import { serve } from 'https://deno.fresh.runtime.dev';

interface EmailPayload {
  name: string;
  email: string;
  message: string;
}

async function sendEmail(payload: EmailPayload) {
  const SENDPULSE_USER_ID = Deno.env.get('SENDPULSE_USER_ID');
  const SENDPULSE_SECRET = Deno.env.get('SENDPULSE_SECRET');

  // Get access token
  const tokenResponse = await fetch('https://api.sendpulse.com/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: SENDPULSE_USER_ID,
      client_secret: SENDPULSE_SECRET,
    }),
  });

  const { access_token } = await tokenResponse.json();

  // Send email
  const emailResponse = await fetch('https://api.sendpulse.com/smtp/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      email: {
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${payload.name}</p>
          <p><strong>Email:</strong> ${payload.email}</p>
          <p><strong>Message:</strong> ${payload.message}</p>
        `,
        text: `New Contact Form Submission\n\nName: ${payload.name}\nEmail: ${payload.email}\nMessage: ${payload.message}`,
        subject: 'New Contact Form Submission',
        from: {
          name: 'Make Your PC Fast',
          email: 'makeyourpcnew@gmail.com',
        },
        to: [
          {
            name: 'Admin',
            email: 'makeyourpcnew@gmail.com',
          },
        ],
      },
    }),
  });

  return emailResponse.ok;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  try {
    const payload = await req.json() as EmailPayload;
    const success = await sendEmail(payload);

    if (!success) {
      throw new Error('Failed to send email');
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
});
