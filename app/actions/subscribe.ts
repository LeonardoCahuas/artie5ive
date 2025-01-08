'use server'

import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.NEXT_PUBLIC_KV_URL!,
  token: process.env.NEXT_PUBLIC_KV_REST_API_TOKEN!
})

export async function subscribeToNewsletter(formData: FormData) {
  try {
    const email = formData.get('email')
    
    if (!email || typeof email !== 'string') {
      return { success: false, message: 'Email non valido' }
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

    return { success: true, message: 'Iscrizione completata con successo!' }
  } catch (error) {
    console.error('Error saving email:', error)
    return { success: false, message: 'Errore durante l\'iscrizione' }
  }
}
