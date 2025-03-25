"use client"

import { motion } from "framer-motion"
import { Footer } from "../components/Footer"

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black text-white pt-48">
      <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8 px-4"
        >
          Privacy policy e politica resi e rimborsi
        </motion.h1>
        <div className="container mx-auto px-4 py-16">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-8"
        >
          Informativa sulla Privacy di 5STARSNATION
        </motion.h3>
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">Introduzione</h2>
          <p>
            Benvenuto nell&apos;Informativa sulla Privacy di 5STARSNATION. Come azienda di abbigliamento a Milano, ci impegniamo a proteggere la tua privacy in conformità con il Regolamento Generale sulla Protezione dei Dati (GDPR).
          </p>

          <h2 className="text-lg font-semibold">1. Titolare del Trattamento</h2>
          <p>
            5STARSNATION, con sede a Milano, è responsabile dei tuoi dati personali.
          </p>

          <h2 className="text-lg font-semibold">2. Dati Personali che Raccogliamo</h2>
          <ul className="list-disc list-inside">
            <li>
              <strong>Informazioni che Fornisci:</strong> Queste includono dettagli come il tuo nome e le informazioni di contatto quando acquisti i nostri prodotti o interagisci con i nostri servizi.
            </li>
            <li>
              <strong>Informazioni Raccolte Automaticamente:</strong> Raccogliamo dati come l&apos;attività di navigazione e le preferenze per personalizzare la nostra pubblicità.
            </li>
          </ul>

          <h2 className="text-lg font-semibold">3. Come Utilizziamo i Tuoi Dati</h2>
          <ul className="list-disc list-inside">
            <li>Per fornire, mantenere e personalizzare i nostri servizi.</li>
            <li>Per comunicare con te riguardo ai nostri prodotti e servizi.</li>
            <li>Per pubblicità basata sul pubblico per migliorare la tua esperienza di acquisto.</li>
          </ul>

          <h2 className="text-lg font-semibold">4. Base Giuridica per il Trattamento</h2>
          <p>
            Trattiamo i tuoi dati sulla base del tuo consenso e dei nostri legittimi interessi commerciali.
          </p>

          <h2 className="text-lg font-semibold">5. Conservazione dei Dati</h2>
          <p>
            Conserviamo i dati personali finché necessario per le finalità descritte.
          </p>

          <h2 className="text-lg font-semibold">6. Sicurezza dei Dati</h2>
          <p>
            Implementiamo misure per proteggere le tue informazioni da accessi non autorizzati o abusi.
          </p>

          <h2 className="text-lg font-semibold">7. I Tuoi Diritti di Protezione dei Dati</h2>
          <p>
            Hai diritti ai sensi del GDPR, inclusi accesso, rettifica e opposizione al trattamento.
          </p>

          <h2 className="text-lg font-semibold">8. Divulgazione a Terzi</h2>
          <p>
            Non vendiamo i tuoi dati. Potremmo condividere i dati con partner per scopi pubblicitari, in conformità con questa politica.
          </p>

          <h2 className="text-lg font-semibold">9. Trasferimenti Internazionali</h2>
          <p>
            I dati possono essere trasferiti al di fuori dello Spazio Economico Europeo (SEE), garantendo sempre protezioni conformi al GDPR.
          </p>

          <h2 className="text-lg font-semibold">10. Privacy dei Minori</h2>
          <p>
            Non raccogliamo consapevolmente informazioni da individui di età inferiore ai 16 anni.
          </p>

          <h2 className="text-lg font-semibold">11. Aggiornamenti della Politica</h2>
          <p>
            Ti informeremo di eventuali cambiamenti significativi a questa politica sul nostro sito web.
          </p>

          <h2 className="text-lg font-semibold">12. Contattaci</h2>
          <p>
            Per domande riguardanti questa politica, contattaci all&apos;indirizzo <a href="mailto:info@starsnation.it" className="text-blue-400">info@starsnation.it</a>.
          </p>
        </section>
      </div>

      <div className="container mx-auto px-4 py-16">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-8"
        >
          Informativa su resi e rimborsi per Starsnation.it
        </motion.h3>
        <section className="space-y-6">
          <h2 className="text-lg font-semibold">Resi</h2>
          <p>
            TUTTE LE VENDITE SONO DEFINITIVE. NON SONO AMMESSI RESI, SCAMBI O MODIFICHE ALL’ORDINE DOPO LA SUA EFFETTUAZIONE.
          </p>

          <h2 className="text-lg font-semibold">Link verso Altri Siti Web</h2>
          <p>
            Il nostro Servizio può contenere link verso siti web o servizi di terze parti che non sono di proprietà o controllati da Starsnation.it.
          </p>
          <p>
            Starsnation.it non ha alcun controllo e non assume alcuna responsabilità per i contenuti, le politiche sulla privacy o le pratiche di qualsiasi sito web o servizio di terze parti. Non saremo responsabili, direttamente o indirettamente, per eventuali danni o perdite causate o presunte causate dall’uso o dallo scarso affidamento su tali contenuti, beni o servizi disponibili su tali siti o servizi.
          </p>
          <p>
            Ti consigliamo vivamente di leggere i termini e le condizioni e le politiche sulla privacy di qualsiasi sito web o servizio di terze parti che visiti.
          </p>

          <h2 className="text-lg font-semibold">Disclaimer</h2>
          <p>
            L’uso del Servizio è a tuo rischio esclusivo. Il Servizio viene fornito su base “COSÌ COM’È” e “COME DISPONIBILE”. Il Servizio viene fornito senza garanzie di alcun tipo, incluse garanzie di commerciabilità, idoneità per uno scopo particolare, non violazione o svolgimento del servizio.
          </p>
        </section>
      </div>
      <Footer/>
    </main>
  )
}