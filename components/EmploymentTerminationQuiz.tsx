'use client';

import { type ReactNode, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Info,
  RotateCcw,
} from 'lucide-react';

type Option = {
  id: string;
  label: string;
  next: string;
};

type QuestionNode = {
  id: string;
  type: 'question';
  title: string;
  description?: string;
  options: Option[];
};

type InputNode = {
  id: string;
  type: 'input';
  title: string;
  description?: string;
  next: string;
};

type OutcomeNode = {
  id: string;
  type: 'outcome';
  outcomeId: OutcomeId;
};

type FlowNode = QuestionNode | InputNode | OutcomeNode;

type OutcomeId =
  | 'formal'
  | 'regular'
  | 'extraordinary'
  | 'unlawful'
  | 'agreement-invalid'
  | 'agreement-valid'
  | 'fixed-indefinite'
  | 'fixed-expire'
  | 'fixed-unknown'
  | 'employee-regular'
  | 'employee-without';

type Tone = 'warning' | 'info' | 'success' | 'neutral';

type Insight = {
  title: string;
  body: string;
};

const nodes: Record<string, FlowNode> = {
  q1: {
    id: 'q1',
    type: 'question',
    title: 'Q1 — Kako prestaje ugovor o radu?',
    description: 'ZOR FBiH prepoznaje više načina prestanka ugovora (otkaz, sporazum, istek na određeno).',
    options: [
      { id: 'employer', label: 'Poslodavac mi daje otkaz', next: 'q2' },
      { id: 'employee', label: 'Ja dajem otkaz', next: 'q2b' },
      { id: 'agreement', label: 'Sporazumni prestanak', next: 'q2c' },
      { id: 'fixed', label: 'Ističe ugovor na određeno', next: 'q2d' },
    ],
  },
  q2: {
    id: 'q2',
    type: 'question',
    title: 'Q2 — Jesi li na probnom radu?',
    options: [
      { id: 'yes', label: 'Da', next: 'q3' },
      { id: 'no', label: 'Ne', next: 'q3' },
    ],
  },
  q3: {
    id: 'q3',
    type: 'question',
    title: 'Q3 — Jesi li dobio otkaz u pisanoj formi?',
    options: [
      { id: 'yes', label: 'Da', next: 'q4' },
      { id: 'no', label: 'Ne', next: 'o1' },
    ],
  },
  q4: {
    id: 'q4',
    type: 'question',
    title: 'Q4 — Je li otkaz obrazložen (naveden razlog)?',
    options: [
      { id: 'yes', label: 'Da', next: 'q5' },
      { id: 'no', label: 'Ne', next: 'o1' },
    ],
  },
  q5: {
    id: 'q5',
    type: 'question',
    title: 'Q5 — Koji je razlog naveden u otkazu?',
    options: [
      {
        id: 'economic',
        label: 'Ekonomski / tehnički / organizacijski razlozi (višak radnika)',
        next: 'q6',
      },
      {
        id: 'inability',
        label: 'Nisam u mogućnosti izvršavati obaveze (radna sposobnost / posao)',
        next: 'q6',
      },
      {
        id: 'serious',
        label: 'Teža povreda obaveza / teži prijestup (izvanredni otkaz)',
        next: 'q7',
      },
      {
        id: 'minor',
        label: 'Lakša povreda / disciplina',
        next: 'q7',
      },
      {
        id: 'unlawful',
        label: 'Bolovanje / povreda / tužba protiv poslodavca / prijava korupcije',
        next: 'o4',
      },
      { id: 'unclear', label: 'Nešto drugo / nejasno', next: 'o1' },
    ],
  },
  q6: {
    id: 'q6',
    type: 'question',
    title: 'Q6 — Koliki otkazni rok ti piše u rješenju?',
    options: [
      { id: 'lt14', label: 'Manje od 14 dana', next: 'q10' },
      { id: 'gte14', label: '14 dana ili više', next: 'q10' },
      { id: 'none', label: 'Ne piše / odmah prestaje', next: 'q10' },
    ],
  },
  q7: {
    id: 'q7',
    type: 'question',
    title: 'Q7 — Je li otkaz zbog teže povrede / teškog prijestupa?',
    description: 'Ovo pitanje se pojavljuje ako je razlog disciplinski (teža ili lakša povreda).',
    options: [
      { id: 'yes', label: 'Da', next: 'q8' },
      { id: 'no', label: 'Ne', next: 'q6' },
    ],
  },
  q8: {
    id: 'q8',
    type: 'question',
    title: 'Q8 — Je li radniku omogućeno iznošenje odbrane?',
    options: [
      { id: 'yes', label: 'Da', next: 'q9' },
      { id: 'no', label: 'Ne', next: 'o3' },
    ],
  },
  q9: {
    id: 'q9',
    type: 'question',
    title: 'Q9 — Je li otkaz dat na vrijeme?',
    description: 'Kod otkaza bez roka, otkaz se mora dati u 60 dana od saznanja (najkasnije 1 godinu).',
    options: [
      { id: 'in_time', label: 'Otkaz je došao u 60 dana od saznanja', next: 'o3' },
      { id: 'late', label: 'Prošlo je više od 60 dana', next: 'o3' },
      { id: 'unknown', label: 'Ne znam', next: 'o3' },
    ],
  },
  q10: {
    id: 'q10',
    type: 'question',
    title: 'Q10 — Ugovor ti je na neodređeno?',
    options: [
      { id: 'yes', label: 'Da', next: 'q11' },
      { id: 'no', label: 'Ne', next: 'o2' },
    ],
  },
  q11: {
    id: 'q11',
    type: 'question',
    title: 'Q11 — Imaš li najmanje 2 godine neprekidnog rada kod poslodavca?',
    options: [
      { id: 'yes', label: 'Da', next: 'q12' },
      { id: 'no', label: 'Ne', next: 'o2' },
    ],
  },
  q12: {
    id: 'q12',
    type: 'input',
    title: 'Q12–Q13 — Prosječna plata i godine rada',
    description: 'Unesi prosječnu neto platu zadnja 3 mjeseca i pune godine rada kod poslodavca.',
    next: 'o2',
  },
  q2b: {
    id: 'q2b',
    type: 'question',
    title: 'Q2B — Daješ li otkaz redovno ili bez roka?',
    options: [
      { id: 'regular', label: 'Redovni otkaz', next: 'q3b' },
      { id: 'without', label: 'Bez otkaznog roka (teška povreda poslodavca)', next: 'o10' },
    ],
  },
  q3b: {
    id: 'q3b',
    type: 'question',
    title: 'Q3B — Koliki otkazni rok daješ?',
    options: [
      { id: 'gte7', label: '7 dana ili više', next: 'o9' },
      { id: 'lt7', label: 'Manje od 7 dana', next: 'o9' },
    ],
  },
  q2c: {
    id: 'q2c',
    type: 'question',
    title: 'Q2C — Imaš li sporazum u pisanoj formi (potpisan)?',
    options: [
      { id: 'yes', label: 'Da', next: 'o6' },
      { id: 'no', label: 'Ne', next: 'o5' },
    ],
  },
  q2d: {
    id: 'q2d',
    type: 'question',
    title: 'Q2D — Ugovori na određeno traju duže od 3 godine bez prekida?',
    options: [
      { id: 'yes', label: 'Da', next: 'o7' },
      { id: 'no', label: 'Ne', next: 'o8' },
      { id: 'unknown', label: 'Ne znam', next: 'o11' },
    ],
  },
  o1: { id: 'o1', type: 'outcome', outcomeId: 'formal' },
  o2: { id: 'o2', type: 'outcome', outcomeId: 'regular' },
  o3: { id: 'o3', type: 'outcome', outcomeId: 'extraordinary' },
  o4: { id: 'o4', type: 'outcome', outcomeId: 'unlawful' },
  o5: { id: 'o5', type: 'outcome', outcomeId: 'agreement-invalid' },
  o6: { id: 'o6', type: 'outcome', outcomeId: 'agreement-valid' },
  o7: { id: 'o7', type: 'outcome', outcomeId: 'fixed-indefinite' },
  o8: { id: 'o8', type: 'outcome', outcomeId: 'fixed-expire' },
  o9: { id: 'o9', type: 'outcome', outcomeId: 'employee-regular' },
  o10: { id: 'o10', type: 'outcome', outcomeId: 'employee-without' },
  o11: { id: 'o11', type: 'outcome', outcomeId: 'fixed-unknown' },
};

const outcomeMeta: Record<OutcomeId, { title: string; lead: string; tone: Tone }> = {
  formal: {
    title: 'Otkaz je formalno problematičan',
    lead: 'Postoji visoki rizik nezakonitosti zbog forme ili obrazloženja.',
    tone: 'warning',
  },
  regular: {
    title: 'Redovni otkaz uz rok: provjeri rok i otpremninu',
    lead: 'Ovdje su ključne provjere oko roka i osnovnih prava.',
    tone: 'info',
  },
  extraordinary: {
    title: 'Izvanredni otkaz: provjeri odbranu i rok 60 dana',
    lead: 'Kod izvanrednog otkaza postupak i rokovi su strogi.',
    tone: 'warning',
  },
  unlawful: {
    title: 'Neopravdan razlog otkaza',
    lead: 'Zakon eksplicitno zabranjuje ovakve razloge.',
    tone: 'warning',
  },
  'agreement-invalid': {
    title: 'Sporazum nije validan (nema pisane forme)',
    lead: 'Sporazum mora biti u pisanoj formi i potpisan.',
    tone: 'warning',
  },
  'agreement-valid': {
    title: 'Sporazum validan (uz pisanu formu)',
    lead: 'Ako je potpisan, provjeri šta tačno piše o pravima i rokovima.',
    tone: 'success',
  },
  'fixed-indefinite': {
    title: 'Ugovor se smatra na neodređeno',
    lead: 'Kod trajanja preko 3 godine bez prekida, ugovor prelazi u neodređeni.',
    tone: 'info',
  },
  'fixed-expire': {
    title: 'Istek ugovora na određeno',
    lead: 'Ugovor prestaje istekom roka, uz provjeru preostalih prava.',
    tone: 'neutral',
  },
  'fixed-unknown': {
    title: 'Provjeri ukupno trajanje ugovora na određeno',
    lead: 'Ako je preko 3 godine bez prekida, smatra se neodređeni.',
    tone: 'info',
  },
  'employee-regular': {
    title: 'Radnik daje redovni otkaz',
    lead: 'Minimalni otkazni rok je 7 dana.',
    tone: 'neutral',
  },
  'employee-without': {
    title: 'Radnik otkazuje bez otkaznog roka',
    lead: 'Moguće samo kada poslodavac teško krši obaveze.',
    tone: 'warning',
  },
};

const toneStyles: Record<Tone, { container: string; badge: string; icon: ReactNode }> = {
  warning: {
    container: 'border-red-500/30 bg-red-500/10 text-red-50',
    badge: 'bg-red-500/20 text-red-100 border-red-500/40',
    icon: <AlertTriangle className="size-5" />,
  },
  info: {
    container: 'border-blue-500/30 bg-blue-500/10 text-blue-50',
    badge: 'bg-blue-500/20 text-blue-100 border-blue-500/40',
    icon: <Info className="size-5" />,
  },
  success: {
    container: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-50',
    badge: 'bg-emerald-500/20 text-emerald-100 border-emerald-500/40',
    icon: <CheckCircle2 className="size-5" />,
  },
  neutral: {
    container: 'border-white/10 bg-white/5 text-slate-100',
    badge: 'bg-white/10 text-slate-100 border-white/20',
    icon: <Info className="size-5" />,
  },
};

const maxSteps = 12;

export function EmploymentTerminationQuiz() {
  const [trail, setTrail] = useState<string[]>(['q1']);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [salaryInput, setSalaryInput] = useState('');
  const [yearsInput, setYearsInput] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);

  const currentId = trail[trail.length - 1];
  const currentNode = nodes[currentId];

  const activeAnswers = useMemo(() => {
    const result: Record<string, string> = {};
    trail.slice(0, -1).forEach((nodeId) => {
      const answer = answers[nodeId];
      if (answer) result[nodeId] = answer;
    });
    return result;
  }, [trail, answers]);

  const { flags, infos } = useMemo(() => buildInsights(activeAnswers), [activeAnswers]);

  const salaryValue = parseNumber(salaryInput);
  const yearsValueRaw = parseNumber(yearsInput);
  const yearsValue = yearsValueRaw ? Math.floor(yearsValueRaw) : null;

  const stepLabel = `Korak ${Math.min(trail.length, maxSteps)} / ${maxSteps}`;
  const hasRedFlags = flags.length > 0;

  if (!currentNode) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-100">
        Ne mogu učitati kviz. Molimo osvježite stranicu.
      </div>
    );
  }

  const handleSelect = (option: Option) => {
    setAnswers((prev) => ({ ...prev, [currentId]: option.id }));
    setTrail((prev) => [...prev, option.next]);
  };

  const handleBack = () => {
    setInputError(null);
    setTrail((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const handleReset = () => {
    setTrail(['q1']);
    setAnswers({});
    setSalaryInput('');
    setYearsInput('');
    setInputError(null);
  };

  const handleInputNext = (skip = false) => {
    if (!skip && (!salaryValue || !yearsValue)) {
      setInputError('Unesi prosječnu platu i pune godine rada.');
      return;
    }
    setInputError(null);
    setTrail((prev) => [...prev, (currentNode as InputNode).next]);
  };

  const outcomeId = currentNode.type === 'outcome' ? currentNode.outcomeId : null;
  const outcome = outcomeId ? outcomeMeta[outcomeId] : null;
  const outcomeDetails = outcomeId
    ? buildOutcomeDetails(outcomeId, activeAnswers, salaryValue, yearsValue)
    : null;

  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950/90 p-6 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-slate-400">
        <span>Interaktivni decision tree</span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-300">{stepLabel}</span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 md:p-8">
          {currentNode.type === 'question' && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Pitanje</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{currentNode.title}</h3>
              {currentNode.description && (
                <p className="mt-2 text-sm text-slate-300">{currentNode.description}</p>
              )}
              <div className="mt-6 grid gap-3">
                {currentNode.options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className="group rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-slate-100 transition hover:border-white/20 hover:bg-white/10"
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span>{option.label}</span>
                      <ArrowRight className="size-4 text-slate-400 transition group-hover:translate-x-1" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentNode.type === 'input' && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Kalkulator</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{currentNode.title}</h3>
              {currentNode.description && (
                <p className="mt-2 text-sm text-slate-300">{currentNode.description}</p>
              )}
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-200">
                  <span>Prosječna neto plata (zadnja 3 mjeseca)</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.01"
                    value={salaryInput}
                    onChange={(event) => setSalaryInput(event.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="npr. 1500"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-200">
                  <span>Pune godine rada kod poslodavca</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min="0"
                    step="1"
                    value={yearsInput}
                    onChange={(event) => setYearsInput(event.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="npr. 4"
                  />
                </label>
              </div>
              {inputError && <p className="mt-3 text-sm text-red-300">{inputError}</p>}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => handleInputNext(false)}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:from-blue-600 hover:to-cyan-600"
                >
                  Izračunaj otpremninu
                  <ArrowRight className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleInputNext(true)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/5"
                >
                  Preskoči izračun
                </button>
              </div>
            </div>
          )}

          {currentNode.type === 'outcome' && outcome && outcomeDetails && (
            <div>
              <div className={`rounded-2xl border ${toneStyles[outcome.tone].container} p-5`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Ishod</p>
                    <h3 className="text-2xl font-semibold text-white">{outcome.title}</h3>
                    <p className="text-sm text-slate-200/90">{outcome.lead}</p>
                  </div>
                  <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${toneStyles[outcome.tone].badge}`}>
                    {toneStyles[outcome.tone].icon}
                    {hasRedFlags ? 'Crvene zastavice' : 'Bez crvenih zastavica'}
                  </span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-200/90">
                  {outcomeDetails.bullets.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 size-1.5 rounded-full bg-slate-200/70" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {outcomeDetails.severanceCard}

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Rokovi zaštite prava</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-200">
                  <li className="flex gap-2">
                    <span className="mt-1 size-1.5 rounded-full bg-slate-300/70" />
                    <span>Za druga prava: zahtjev poslodavcu u 30 dana, pa tužba u 90 dana.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 size-1.5 rounded-full bg-slate-300/70" />
                    <span>Kod otkaza ugovora moguće je odmah tražiti sudsku zaštitu.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleBack}
              disabled={trail.length <= 1}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowLeft className="size-4" />
              Nazad
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/5"
            >
              <RotateCcw className="size-4" />
              Reset
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Status</p>
            <div className="mt-3 flex items-center justify-between">
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                  hasRedFlags
                    ? 'border-red-500/40 bg-red-500/20 text-red-100'
                    : 'border-emerald-500/30 bg-emerald-500/15 text-emerald-100'
                }`}
              >
                {hasRedFlags ? 'Crvene zastavice' : 'Bez crvenih zastavica'}
              </span>
              <span className="text-xs text-slate-400">{stepLabel}</span>
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Klikovi do sada: {Math.max(trail.length - 1, 0)}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Crvene zastavice</p>
            <div className="mt-3 space-y-3 text-sm">
              {flags.length === 0 ? (
                <p className="text-slate-400">Nema aktivnih crvenih zastavica.</p>
              ) : (
                flags.map((flag) => (
                  <div key={flag.title} className="rounded-xl border border-red-500/20 bg-red-500/10 p-3">
                    <p className="text-sm font-semibold text-red-100">{flag.title}</p>
                    <p className="text-xs text-red-200/80">{flag.body}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Info i podsjetnici</p>
            <div className="mt-3 space-y-3 text-sm">
              {infos.length === 0 ? (
                <p className="text-slate-400">Klikovima dodaješ specifične informacije.</p>
              ) : (
                infos.map((info) => (
                  <div key={info.title} className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
                    <p className="text-sm font-semibold text-slate-100">{info.title}</p>
                    <p className="text-xs text-slate-300">{info.body}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function buildInsights(answers: Record<string, string>) {
  const flags: Insight[] = [];
  const infos: Insight[] = [];

  if (answers.q2 === 'yes') {
    infos.push({
      title: 'Probni rad',
      body: 'Ako se probni rad prekida prije isteka, otkazni rok je 7 dana.',
    });
  }

  if (answers.q3 === 'no' || answers.q4 === 'no') {
    flags.push({
      title: 'Forma otkaza',
      body: 'Otkaz mora biti u pisanoj formi i obrazložen.',
    });
  }

  if (answers.q5 === 'unlawful') {
    flags.push({
      title: 'Neopravdan razlog',
      body: 'Bolovanje, tužba ili prijava korupcije su neopravdani razlozi za otkaz.',
    });
  }

  if (answers.q5 === 'unclear') {
    flags.push({
      title: 'Nejasan razlog',
      body: 'Razlog mora biti konkretno naveden u obrazloženju.',
    });
  }

  if (answers.q6 === 'lt14') {
    flags.push({
      title: 'Kratak otkazni rok',
      body: 'Poslodavac ne može dati rok kraći od 14 dana.',
    });
  }

  if (answers.q6 === 'none') {
    flags.push({
      title: 'Otkaz bez roka',
      body: 'Kod redovnog otkaza rok mora teći od uručenja rješenja.',
    });
  }

  if (answers.q7 === 'yes' && answers.q8 === 'no') {
    flags.push({
      title: 'Odbrana nije omogućena',
      body: 'Radniku se mora omogućiti iznošenje odbrane prije otkaza.',
    });
  }

  if (answers.q7 === 'yes' && answers.q9 === 'late') {
    flags.push({
      title: 'Rok 60 dana',
      body: 'Otkaz bez roka mora biti dat u 60 dana od saznanja.',
    });
  }

  if (answers.q7 === 'yes' && answers.q9 === 'unknown') {
    infos.push({
      title: 'Rok 60 dana',
      body: 'Provjeri kada je poslodavac saznao za povredu i kada je otkaz uručen.',
    });
  }

  if (answers.q2b === 'regular') {
    infos.push({
      title: 'Minimalni rok',
      body: 'Kad radnik otkazuje, otkazni rok ne može biti kraći od 7 dana.',
    });
  }

  if (answers.q3b === 'lt7') {
    flags.push({
      title: 'Rok kraći od 7 dana',
      body: 'Redovni otkaz radnika mora imati najmanje 7 dana.',
    });
  }

  if (answers.q2b === 'without') {
    infos.push({
      title: 'Otkaz bez roka',
      body: 'Moguć samo kod teške povrede obaveza poslodavca.',
    });
  }

  if (answers.q2c === 'no') {
    flags.push({
      title: 'Sporazum bez forme',
      body: 'Sporazum o prestanku mora biti u pisanoj formi.',
    });
  }

  if (answers.q5 === 'minor') {
    infos.push({
      title: 'Lakša povreda',
      body: 'Kod lakše povrede obično ide prethodno upozorenje.',
    });
  }

  if (answers.q2d === 'yes') {
    infos.push({
      title: 'Preko 3 godine',
      body: 'Ugovori na određeno preko 3 godine bez prekida prelaze u neodređeno.',
    });
  }

  return { flags, infos };
}

function buildOutcomeDetails(
  outcomeId: OutcomeId,
  answers: Record<string, string>,
  salaryValue: number | null,
  yearsValue: number | null
) {
  const bullets: string[] = [];
  let severanceCard: ReactNode = null;

  if (outcomeId === 'formal') {
    bullets.push('Otkaz mora biti u pisanoj formi i obrazložen.');
    bullets.push('Sačuvaj dokaze (mailovi, Viber, uručenje, svjedoci).');
    if (answers.q5 === 'unclear') {
      bullets.push('Razlog mora biti konkretno naveden, ne samo generična fraza.');
    }
  }

  if (outcomeId === 'regular') {
    bullets.push('Ako poslodavac otkazuje, otkazni rok ne može biti kraći od 14 dana i teče od uručenja.');
    if (answers.q6 === 'lt14') {
      bullets.push('U rješenju je naveden rok kraći od 14 dana — ispod minimuma.');
    }
    if (answers.q6 === 'none') {
      bullets.push('Ako rok nije naveden ili prestaje odmah, to je sporno za redovni otkaz.');
    }

    const severance = getSeveranceStatus(answers);
    if (severance.eligible) {
      bullets.push('Otpremnina: ispunjeni su osnovni uslovi (neodređeno + 2+ godine + razlog nije disciplinski).');
      bullets.push('Minimalni izračun je 1/3 prosječne mjesečne plate × godine, max 6 plata (kolektivni ugovor može više).');
    } else {
      bullets.push(`Otpremnina: nema uslova — ${severance.reason}`);
    }

    if (severance.eligible) {
      const amount = calculateSeverance(salaryValue, yearsValue);
      severanceCard = (
        <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-emerald-50">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100/80">Otpremnina (minimum)</p>
          {amount !== null ? (
            <div className="mt-3">
              <p className="text-3xl font-semibold">{formatMoney(amount)}</p>
              <p className="mt-2 text-xs text-emerald-100/80">
                Formula: 1/3 prosječne plate × pune godine, max 6 plata.
              </p>
            </div>
          ) : (
            <p className="mt-3 text-sm text-emerald-100/80">
              Unesi platu i godine rada da izračunamo okvirni minimum.
            </p>
          )}
        </div>
      );
    }
  }

  if (outcomeId === 'extraordinary') {
    bullets.push('Ako je otkaz zbog ponašanja/rada, mora ti biti omogućena odbrana.');
    bullets.push('Otkaz bez roka mora biti u 60 dana od saznanja, najkasnije 1 godinu od povrede.');
    if (answers.q8 === 'no') {
      bullets.push('Odbrana nije omogućena — visoki rizik nezakonitosti.');
    }
    if (answers.q9 === 'late') {
      bullets.push('Otkaz je zakasnio (više od 60 dana) — sporno.');
    }
    if (answers.q9 === 'unknown') {
      bullets.push('Provjeri datume saznanja i uručenja otkaza.');
    }
  }

  if (outcomeId === 'unlawful') {
    bullets.push('Bolovanje, povreda, tužba ili prijava korupcije su neopravdani razlozi.');
    bullets.push('Sačuvaj dokaze i reaguj brzo; ovo je velika crvena zastavica.');
  }

  if (outcomeId === 'agreement-invalid') {
    bullets.push('Sporazum o prestanku mora biti u pisanoj formi.');
    bullets.push('Bez potpisa i forme, sporazum je sporan.');
  }

  if (outcomeId === 'agreement-valid') {
    bullets.push('Pisani sporazum je validan ako je potpisan od obje strane.');
    bullets.push('Provjeri da su navedeni datum prestanka i međusobna prava/obaveze.');
  }

  if (outcomeId === 'fixed-indefinite') {
    bullets.push('Ugovori na određeno preko 3 godine bez prekida prelaze u neodređeno.');
    bullets.push('Tada se primjenjuju pravila o otkazu i otpremnini.');
  }

  if (outcomeId === 'fixed-expire') {
    bullets.push('Ugovor prestaje istekom roka bez posebnog otkaza.');
    bullets.push('Provjeri isplatu neiskorištenog godišnjeg i drugih prava.');
  }

  if (outcomeId === 'fixed-unknown') {
    bullets.push('Provjeri datume ugovora i eventualne prekide.');
    bullets.push('Ako ukupno traje više od 3 godine bez prekida, smatra se neodređeno.');
  }

  if (outcomeId === 'employee-regular') {
    bullets.push('Kad radnik otkazuje, otkazni rok ne može biti kraći od 7 dana.');
    if (answers.q3b === 'lt7') {
      bullets.push('Rok je kraći od minimuma — moguće sporno.');
    }
  }

  if (outcomeId === 'employee-without') {
    bullets.push('Otkaz bez roka je moguć samo kod teške povrede obaveza poslodavca.');
    bullets.push('Dokumentuj sve povrede (plate, mobing, sigurnost na radu).');
  }

  return { bullets, severanceCard };
}

function getSeveranceStatus(answers: Record<string, string>) {
  if (answers.q10 !== 'yes') {
    return { eligible: false, reason: 'ugovor nije na neodređeno' };
  }
  if (answers.q11 !== 'yes') {
    return { eligible: false, reason: 'manje od 2 godine rada' };
  }
  if (answers.q5 === 'serious' || answers.q5 === 'minor') {
    return { eligible: false, reason: 'otkaz zbog kršenja obaveza' };
  }
  return { eligible: true, reason: '' };
}

function calculateSeverance(salary: number | null, years: number | null) {
  if (!salary || !years) return null;
  const base = (salary / 3) * years;
  const cap = salary * 6;
  return Math.min(base, cap);
}

function parseNumber(value: string) {
  if (!value) return null;
  const normalized = value.replace(/\s+/g, '').replace(',', '.');
  const parsed = Number(normalized);
  if (!Number.isFinite(parsed)) return null;
  return parsed;
}

function formatMoney(value: number) {
  return `${new Intl.NumberFormat('bs-BA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)} KM`;
}
