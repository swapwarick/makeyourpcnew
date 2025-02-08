
import { serve } from 'https://deno.fresh.runtime.dev';

interface EmailPayload {
  name: string;
  email: string;
  message: string;
}

async function sendEmail(payload: EmailPayload) {
  const SENDPULSE_USER_ID = Deno.env.get('SENDPULSE_USER_ID');
  const SENDPULSE_SECRET = Deno.env.get('SENDPULSE_SECRET');

  console.log('Starting email send process...');
  console.log('Payload received:', payload);

  try {
    // Get access token
    console.log('Requesting access token...');
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

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Token request failed:', errorData);
      throw new Error(`Failed to get access token: ${errorData}`);
    }

    const tokenData = await tokenResponse.json();
    console.log('Access token received successfully');

    // Send email
    console.log('Sending email...');
    const emailResponse = await fetch('https://api.sendpulse.com/smtp/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenData.access_token}`,
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

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error('Email send failed:', errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Error in sendEmail function:', error);
    throw error;
  }
}

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload = await req.json() as EmailPayload;
    console.log('Received request with payload:', payload);

    const success = await sendEmail(payload);

    if (!success) {
      throw new Error('Failed to send email');
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error('Error in request handler:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
});
