'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function CookiePolicy() {
  const [showPolicy, setShowPolicy] = useState(true)
  const [essentialCookies, setEssentialCookies] = useState(true)
  const [analyticsCookies, setAnalyticsCookies] = useState(false)
  const [marketingCookies, setMarketingCookies] = useState(false)

  useEffect(() => {
    const policyAccepted = localStorage.getItem('cookiePolicyAccepted')
    if (policyAccepted) {
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookiePolicyAccepted', 'true')
    localStorage.setItem('essentialCookies', essentialCookies.toString())
    localStorage.setItem('analyticsCookies', analyticsCookies.toString())
    localStorage.setItem('marketingCookies', marketingCookies.toString())
    setShowPolicy(false)
  }

  const handleReject = () => {
    localStorage.setItem('cookiePolicyAccepted', 'true')
    localStorage.setItem('essentialCookies', 'true')
    localStorage.setItem('analyticsCookies', 'false')
    localStorage.setItem('marketingCookies', 'false')
    setShowPolicy(false)
  }

  if (!showPolicy) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 w-full h-full">
<div className="bg-white rounded-lg p-6 w-full max-h-full overflow-y-auto">
<h2 className="text-2xl font-bold mb-4">Politica sui Cookie</h2>
        <p className="mb-6 text-gray-600 text-sm">
          Questo sito utilizza cookie per migliorare l&apos;esperienza utente. I cookie essenziali sono necessari per il funzionamento del sito. 
          Non raccogliamo, utilizziamo o condividiamo dati personali degli utenti, a meno che l&apos;utente non fornisca volontariamente tali dati, ad esempio:
        </p>
        <ul className="mb-6 text-gray-600 list-disc list-inside text-sm">
          <li>Iscrivendosi alla newsletter, fornendo il proprio indirizzo email.</li>
          <li>Inserendo i dati di spedizione al momento del checkout tramite Shopify, necessari per completare gli ordini.</li>
        </ul>
        <p className="mb-6 text-gray-600 text-sm">
          Tutte le informazioni fornite dagli utenti sono gestite in conformità con il GDPR e altre normative applicabili. Per ulteriori dettagli, consulta la nostra <Link href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>.
        </p>
        
        <div className="space-y-4">
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={essentialCookies}
              onChange={() => setEssentialCookies(!essentialCookies)}
              disabled
              className="mt-1 mr-2"
            />
            <span className="flex flex-col">
              <strong>Cookie Essenziali</strong>
              <span className="text-sm text-gray-500">Necessari per il corretto funzionamento del sito.</span>
            </span>
          </label>

          <label className="flex items-start">
            <input
              type="checkbox"
              checked={analyticsCookies}
              onChange={() => setAnalyticsCookies(!analyticsCookies)}
              className="mt-1 mr-2"
            />
            <span className="flex flex-col">
              <strong>Cookie di Analisi</strong>
              <span className="text-sm text-gray-500">Ci aiutano a migliorare il nostro sito raccogliendo informazioni anonime sull&apos;uso.</span>
            </span>
          </label>

          <label className="flex items-start">
            <input
              type="checkbox"
              checked={marketingCookies}
              onChange={() => setMarketingCookies(!marketingCookies)}
              className="mt-1 mr-2"
            />
            <span className="flex flex-col">
              <strong>Cookie di Marketing</strong>
              <span className="text-sm text-gray-500">Ci permettono di personalizzare annunci e contenuti per te.</span>
            </span>
          </label>
        </div>

        <div className="flex justify-between mt-6 gap-2">
          <button 
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors text-sm"
            onClick={handleReject}
          >
            Rifiuta Tutto
          </button>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
            onClick={handleAccept}
          >
            Accetta Selezionati
          </button>
        </div>
      </div>
    </div>
  )
}
