"use client"

import { motion } from "framer-motion"
import { Footer } from "../components/Footer"

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black text-white pt-16">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8"
        >
          Informativa sulla Privacy di Trenches Records Entertainment
        </motion.h1>
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Introduzione</h2>
          <p>
            Benvenuto nell&apos;Informativa sulla Privacy di Trenches Records Entertainment. Come azienda di abbigliamento a Milano, ci impegniamo a proteggere la tua privacy in conformità con il Regolamento Generale sulla Protezione dei Dati (GDPR).
          </p>

          <h2 className="text-2xl font-semibold">1. Titolare del Trattamento</h2>
          <p>
            Trenches Records Entertainment, con sede a Milano, è responsabile dei tuoi dati personali.
          </p>

          <h2 className="text-2xl font-semibold">2. Dati Personali che Raccogliamo</h2>
          <ul className="list-disc list-inside">
            <li>
              <strong>Informazioni che Fornisci:</strong> Queste includono dettagli come il tuo nome e le informazioni di contatto quando acquisti i nostri prodotti o interagisci con i nostri servizi.
            </li>
            <li>
              <strong>Informazioni Raccolte Automaticamente:</strong> Raccogliamo dati come l&apos;attività di navigazione e le preferenze per personalizzare la nostra pubblicità.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold">3. Come Utilizziamo i Tuoi Dati</h2>
          <ul className="list-disc list-inside">
            <li>Per fornire, mantenere e personalizzare i nostri servizi.</li>
            <li>Per comunicare con te riguardo ai nostri prodotti e servizi.</li>
            <li>Per pubblicità basata sul pubblico per migliorare la tua esperienza di acquisto.</li>
          </ul>

          <h2 className="text-2xl font-semibold">4. Base Giuridica per il Trattamento</h2>
          <p>
            Trattiamo i tuoi dati sulla base del tuo consenso e dei nostri legittimi interessi commerciali.
          </p>

          <h2 className="text-2xl font-semibold">5. Conservazione dei Dati</h2>
          <p>
            Conserviamo i dati personali finché necessario per le finalità descritte.
          </p>

          <h2 className="text-2xl font-semibold">6. Sicurezza dei Dati</h2>
          <p>
            Implementiamo misure per proteggere le tue informazioni da accessi non autorizzati o abusi.
          </p>

          <h2 className="text-2xl font-semibold">7. I Tuoi Diritti di Protezione dei Dati</h2>
          <p>
            Hai diritti ai sensi del GDPR, inclusi accesso, rettifica e opposizione al trattamento.
          </p>

          <h2 className="text-2xl font-semibold">8. Divulgazione a Terzi</h2>
          <p>
            Non vendiamo i tuoi dati. Potremmo condividere i dati con partner per scopi pubblicitari, in conformità con questa politica.
          </p>

          <h2 className="text-2xl font-semibold">9. Trasferimenti Internazionali</h2>
          <p>
            I dati possono essere trasferiti al di fuori dello Spazio Economico Europeo (SEE), garantendo sempre protezioni conformi al GDPR.
          </p>

          <h2 className="text-2xl font-semibold">10. Privacy dei Minori</h2>
          <p>
            Non raccogliamo consapevolmente informazioni da individui di età inferiore ai 16 anni.
          </p>

          <h2 className="text-2xl font-semibold">11. Aggiornamenti della Politica</h2>
          <p>
            Ti informeremo di eventuali cambiamenti significativi a questa politica sul nostro sito web.
          </p>

          <h2 className="text-2xl font-semibold">12. Contattaci</h2>
          <p>
            Per domande riguardanti questa politica, contattaci all&apos;indirizzo <a href="mailto:info@starsnation.it" className="text-blue-400">info@starsnation.it</a>.
          </p>
        </section>
      </div>
      <Footer/>
    </main>
  )
}