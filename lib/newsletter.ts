'use server'

import fs from 'fs/promises'

const EMAIL_FILE = '/tmp/newsletter-emails.txt'

export async function subscribeToNewsletter(formData: FormData) {
  try {
    const email = formData.get('email')
    
    if (!email || typeof email !== 'string') {
      return { success: false, message: 'Email non valido' }
    }

    // Add timestamp to the email entry
    const timestamp = new Date().toISOString()
    const emailEntry = `${timestamp} - ${email}\n`

    // Append the email to the file
    await fs.appendFile(EMAIL_FILE, emailEntry)

    return { success: true, message: 'Iscrizione completata con successo!' }
  } catch (error) {
    console.error('Error saving email:', error)
    return { success: false, message: 'Errore durante l\'iscrizione' }
  }
}