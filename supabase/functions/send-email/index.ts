
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
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload = await req.json() as EmailPayload;
    console.log('Received request payload:', payload);

    if (!payload.name || !payload.email || !payload.message) {
      throw new Error('Missing required fields');
    }

    const emailResponse = await resend.emails.send({
      from: "MakeYourPCFast Support <onboarding@resend.dev>",
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
