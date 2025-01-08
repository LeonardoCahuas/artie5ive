import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.NEXT_PUBLIC_KV_URL!,
  token: process.env.NEXT_PUBLIC_KV_REST_API_TOKEN!,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const email = formData.get('email')
    
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Email non valido' },
        { status: 400 }
      )
    }

    // Add email to Redis list with timestamp
    const timestamp = new Date().toISOString()
    const emailData = {
      email,
      timestamp,
    }

    // Use email as key and save subscription data
    await redis.set(`newsletter:${email}`, emailData)
    // Also maintain a list of all subscribers
    await redis.sadd('newsletter:subscribers', email)

    return NextResponse.json(
      { success: true, message: 'Iscrizione completata con successo!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error saving email:', error)
    return NextResponse.json(
      { success: false, message: 'Errore durante l\'iscrizione' },
      { status: 500 }
    )
  }
}

