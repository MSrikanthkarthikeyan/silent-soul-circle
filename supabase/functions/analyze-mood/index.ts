import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { text } = await req.json()
    
    // Use Gemini API for mood analysis
    const geminiApiKey = "AIzaSyCh_5H3df-gsWXiQWbD7aG5br6FD0jE1sI"
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Analyze the emotional tone of this journal entry and return only one word that best describes the primary emotion. Choose from: Sad, Anxious, Lonely, Hopeful, Overwhelmed, Grateful, Lost, Angry, Peaceful, Confused, Excited, Depressed, Healing, Numb, Stressed. Entry: "${text}"`
          }]
        }]
      })
    })

    const data = await response.json()
    const mood = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "Neutral"
    
    return new Response(
      JSON.stringify({ mood }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message, mood: "Neutral" }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})