
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

interface EmailPayload {
  name: string;
  email: string;
  message: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('Starting email function...');
    
    // Parse and validate the request payload
    const payload = await req.json() as EmailPayload;
    console.log('Received request payload:', payload);

    if (!payload.name || !payload.email || !payload.message) {
      console.error('Validation error: Missing required fields');
      throw new Error('Missing required fields: name, email, and message are required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      console.error('Validation error: Invalid email format');
      throw new Error('Invalid email format');
    }

    // Attempt to send email
    console.log('Attempting to send email via Resend...');
    const emailResponse = await resend.emails.send({
      from: "contact@makeyourpcnew.in", // Update this with your verified domain
      to: ["makeyourpcnew@gmail.com"],
      reply_to: payload.email,
      subject: `New Contact Form Submission from ${payload.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; margin-bottom: 20px;">New Contact Form Submission</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
            <p style="margin-bottom: 15px;"><strong>Name:</strong> ${payload.name}</p>
            <p style="margin-bottom: 15px;"><strong>Email:</strong> ${payload.email}</p>
            <p style="margin-bottom: 15px;"><strong>Message:</strong></p>
            <p style="background-color: white; padding: 15px; border-radius: 4px;">${payload.message}</p>
          </div>
        </div>
      `,
    });

    console.log('Email sent successfully:', emailResponse);

    return new Response(
      JSON.stringify({ success: true, data: emailResponse }),
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
