
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

interface EmailPayload {
  name: string;
  email: string;
  message: string;
}

async function getAccessToken() {
  try {
    const SENDPULSE_USER_ID = Deno.env.get('SENDPULSE_USER_ID');
    const SENDPULSE_SECRET = Deno.env.get('SENDPULSE_SECRET');

    if (!SENDPULSE_USER_ID || !SENDPULSE_SECRET) {
      throw new Error('SendPulse credentials are not configured. Please check your environment variables.');
    }

    const response = await fetch('https://api.sendpulse.com/oauth/access_token', {
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('SendPulse token request failed:', errorText);
      throw new Error(`Failed to get SendPulse access token: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.access_token) {
      console.error('Invalid SendPulse response:', data);
      throw new Error('SendPulse did not provide an access token');
    }

    return data.access_token;
  } catch (error) {
    console.error('Error getting SendPulse access token:', error);
    throw new Error('Failed to authenticate with SendPulse');
  }
}

async function sendEmail(payload: EmailPayload) {
  try {
    console.log('Starting email send process...');
    
    const accessToken = await getAccessToken();
    console.log('Successfully obtained SendPulse access token');

    const response = await fetch('https://api.sendpulse.com/smtp/emails', {
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('SendPulse email send failed:', errorText);
      throw new Error(`Failed to send email: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error in sendEmail function:', error);
    throw error;
  }
}

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload = await req.json() as EmailPayload;
    console.log('Received request payload:', payload);

    const result = await sendEmail(payload);

    return new Response(
      JSON.stringify({ success: true, data: result }),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
});
