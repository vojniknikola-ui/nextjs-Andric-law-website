import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Politika privatnosti | Andrić Law',
  description: 'Kako Andrić Law prikuplja, koristi i štiti lične podatke korisnika.',
};

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-slate-100">
      <Header />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Pravno</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4">Politika privatnosti</h1>
            <p className="text-slate-300 mt-4">
              Ova politika objašnjava koje podatke prikupljamo, zašto ih koristimo i kako ih štitimo.
            </p>
          </div>

          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Ko smo</h2>
            <p>Andrić Law (“mi”, “nas”) je advokatski ured sa sjedištem u Sarajevu, BiH.</p>

            <h2>Koje podatke prikupljamo</h2>
            <ul>
              <li>Kontakt podaci (ime, email, telefon) kada popunite formu ili nas kontaktirate.</li>
              <li>Podaci o predmetu koje nam dobrovoljno dostavite radi procjene slučaja.</li>
              <li>Tehnički podaci (IP, tip uređaja, osnovna analitika posjeta).</li>
            </ul>

            <h2>Svrha obrade</h2>
            <ul>
              <li>Odgovor na upite i dogovor konsultacija.</li>
              <li>Priprema ponude i pružanje pravnih usluga.</li>
              <li>Unapređenje sigurnosti i kvaliteta web stranice.</li>
            </ul>

            <h2>Pravna osnova</h2>
            <p>Podatke obrađujemo na osnovu vašeg pristanka, ugovorne potrebe ili legitimnog interesa.</p>

            <h2>Dijeljenje podataka</h2>
            <p>Vaše podatke ne prodajemo. Mogu biti dostupni našim ovlaštenim saradnicima isključivo radi pružanja usluga.</p>

            <h2>Rokovi čuvanja</h2>
            <p>Podatke čuvamo onoliko dugo koliko je potrebno za svrhu obrade ili zakonske obaveze.</p>

            <h2>Vaša prava</h2>
            <p>Imate pravo na pristup, ispravku, brisanje i ograničenje obrade vaših podataka.</p>

            <h2>Kontakt</h2>
            <p>Za zahtjeve vezane za privatnost pišite na: office@andric.law.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
