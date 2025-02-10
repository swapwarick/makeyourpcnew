
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

interface EmailPayload {
  name: string;
  email: string;
  message: string;
}

async function getAccessToken() {
  const SENDPULSE_USER_ID = Deno.env.get('SENDPULSE_USER_ID');
  const SENDPULSE_SECRET = Deno.env.get('SENDPULSE_SECRET');

  if (!SENDPULSE_USER_ID || !SENDPULSE_SECRET) {
    throw new Error('SendPulse credentials are not configured');
  }

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
  if (!tokenData.access_token) {
    throw new Error('Invalid token response from SendPulse');
  }

  return tokenData.access_token;
}

async function sendEmail(payload: EmailPayload) {
  console.log('Starting email send process...');
  console.log('Payload received:', payload);

  try {
    const accessToken = await getAccessToken();
    console.log('Access token received successfully');

    const emailResponse = await fetch('https://api.sendpulse.com/smtp/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
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

    const responseData = await emailResponse.json();
    console.log('Email sent successfully:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error in sendEmail function:', error);
    throw error;
  }
}

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload = await req.json() as EmailPayload;
    console.log('Received request with payload:', payload);

    const result = await sendEmail(payload);

    return new Response(JSON.stringify({ success: true, data: result }), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error('Error in request handler:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
});
