import { unstable_noStore } from 'next/cache';
import Link from 'next/link';
import { sql, desc } from 'drizzle-orm';
import { getDb, acts, provisions, cmsPosts } from '@/db';
import AdminPostsTable from './AdminPostsTable';
import { getAllPosts } from '@/lib/blog';

export default async function AdminDashboardPage() {
  unstable_noStore();

  if (!process.env.DATABASE_URL) {
    return (
      <section className="rounded-2xl border border-yellow-400/40 bg-yellow-500/10 p-8 text-yellow-100">
        <h2 className="text-2xl font-semibold text-yellow-200">Potrebna je konfiguracija baze</h2>
        <p className="mt-3 text-sm">
          Dodajte <code className="rounded bg-white/10 px-1 py-0.5 text-white">DATABASE_URL</code> u env prije nego što koristite admin panel.
        </p>
      </section>
    );
  }

  const db = getDb();

  const [{ value: actCount }] = await db.select({ value: sql<number>`count(*)` }).from(acts);
  const [{ value: provisionCount }] = await db.select({ value: sql<number>`count(*)` }).from(provisions);
  const posts = await db.select().from(cmsPosts).orderBy(desc(cmsPosts.publishedAt), desc(cmsPosts.createdAt));
  const recentActs = await db
    .select({
      id: acts.id,
      title: acts.title,
      slug: acts.slug,
      publishedAt: acts.publishedAt,
      createdAt: acts.createdAt,
      jurisdiction: acts.jurisdiction,
    })
    .from(acts)
    .orderBy(desc(acts.createdAt))
    .limit(5);

  const lastImport = recentActs[0]?.createdAt ? new Date(recentActs[0]!.createdAt as unknown as string) : null;
  const dbSlugs = new Set(posts.map((p) => p.slug));
  const mergedPosts = await getAllPosts();
  const postRows = mergedPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    tags: post.tags,
    isLawDocument: post.isLawDocument ?? false,
    featured: post.featured ?? false,
    publishedAt: post.date ?? null,
    lawSlug: post.lawSlug ?? null,
    canDelete: dbSlugs.has(post.slug),
  }));

  return (
    <div className="space-y-10">
      <section className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30 lg:grid-cols-3">
        <StatCard label="Ukupno zakona" value={actCount ?? 0} />
        <StatCard label="Članova u bazi" value={provisionCount ?? 0} />
        <StatCard label="Zadnji import" value={lastImport ? formatDate(lastImport) : 'n/a'} accent />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <QuickActionCard
          title="Dodaj novi zakon"
          description="Upload .md / .txt / AKN fajl i pokreni ETL."
          href="/admin/law-uploader"
        />
        <QuickActionCard
          title="Zakoni i članci"
          description="Pregled javne liste propisa i analiza."
          href="/zakoni"
        />
        <QuickActionCard
          title="Objavi blog ili analizu"
          description="Unesi tekst, tagove i metapodatke za novi članak."
          href="/admin/law-uploader?type=blog"
        />
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Najnoviji zakoni</h2>
          <span className="text-sm text-slate-400">{recentActs.length} zapisa</span>
        </div>
        {recentActs.length === 0 ? (
          <p className="mt-6 text-sm text-slate-400">Još nema zakona u bazi.</p>
        ) : (
          <ul className="mt-6 space-y-4">
            {recentActs.map((act) => (
              <li
                key={act.id}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 hover:border-white/30"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">{act.title}</p>
                    <p className="text-xs text-slate-400">{act.jurisdiction}</p>
                  </div>
                  <div className="text-right text-xs text-slate-400">
                    <p>{act.publishedAt ? formatDate(new Date(act.publishedAt as unknown as string)) : 'n/a'}</p>
                    <Link href={`/zakoni/${act.slug}`} className="text-blue-300 hover:underline">
                      Otvori zakon →
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <AdminPostsTable posts={postRows} />

      <section className="rounded-3xl border border-dashed border-white/20 bg-slate-900/40 p-6 text-sm text-slate-300">
        <p className="font-semibold text-white">ETL job queue stiže uskoro</p>
        <p className="mt-2">
          Nakon što dodamo `ingest_job` tabelu i webhook za Typesense, ovdje će se prikazivati statusi (Processing, Done, Failed) za svaki upload. Trenutno prati logove u terminalu nakon pokretanja sync skripti.
        </p>
      </section>
    </div>
  );
}

function StatCard({ label, value, accent = false }: { label: string; value: number | string; accent?: boolean }) {
  return (
    <div
      className={`rounded-2xl border px-4 py-5 ${accent ? 'border-cyan-400/40 bg-cyan-500/10' : 'border-white/10 bg-white/5'}`}
    >
      <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

function QuickActionCard({
  title,
  description,
  href,
  external,
}: {
  title: string;
  description: string;
  href: string;
  external?: boolean;
}) {
  const content = (
    <div className="block rounded-2xl border border-white/10 bg-white/5 p-5 text-left shadow-lg shadow-black/20 transition hover:border-white/30">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{title}</p>
      <p className="mt-2 text-sm text-slate-300">{description}</p>
      <span className="mt-4 inline-flex items-center text-xs text-blue-300">Otvori →</span>
    </div>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return <Link href={href}>{content}</Link>;
}

function formatDate(date: Date) {
  return date.toLocaleDateString('bs-BA', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
