'use client';

import { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  AreaChart,
  Area,
  Cell,
  ContentType,
} from 'recharts';
import { Calendar, Clock, TrendingUp, AlertCircle, FileText } from 'lucide-react';

type ChartRow = {
  week: number;
  op1: number;
  cum1: number;
  op2: number;
  cum2: number;
  diff: number;
  diffLabel: string;
};

const InfoCard = ({ title, value, caption, accent }: { title: string; value: string; caption: string; accent: 'blue' | 'emerald' | 'purple' }) => {
  const colors = {
    blue: 'from-blue-500/30 to-blue-400/20 border-blue-300/30 text-blue-100',
    emerald: 'from-emerald-500/30 to-emerald-400/20 border-emerald-300/30 text-emerald-100',
    purple: 'from-violet-500/30 to-violet-400/20 border-violet-300/30 text-violet-100',
  } as const;

  return (
    <div className={`rounded-2xl border backdrop-blur bg-gradient-to-br ${colors[accent]} px-4 py-3`}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">{title}</p>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
      <p className="text-[11px] text-white/70">{caption}</p>
    </div>
  );
};

const CumulativeTooltip: ContentType<number, string> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-lg text-xs z-50">
        <p className="font-bold text-slate-700 mb-2">Sedmica {label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color ?? '#0ea5e9' }}></div>
            <span className="text-slate-600">{entry.name}:</span>
            <span className="font-mono font-medium">{Number(entry.value).toLocaleString()} h</span>
          </div>
        ))}
        {payload[0]?.payload?.diff !== undefined && (
          <div className="mt-2 pt-2 border-t border-slate-100">
            <span className="text-slate-500 text-[10px]">Razlika (kumulativno): </span>
            <span className={`font-bold block ${payload[0].payload.diff > 0 ? 'text-blue-600' : 'text-emerald-600'}`}>
              {payload[0].payload.diff > 0 ? `Op.1 vodi: +${payload[0].payload.diff}h` : `Op.2 vodi: +${Math.abs(payload[0].payload.diff)}h`}
            </span>
          </div>
        )}
      </div>
    );
  }
  return null;
};

const DiffTooltip: ContentType<number, string> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const val = payload[0].value as number;
    const week = payload[0].payload?.week;
    return (
      <div className="bg-slate-800 text-white text-[10px] p-1.5 rounded shadow-sm">
        Sedmica {week}: <span className="font-bold">{val > 0 ? '+' : ''}{val}h</span>
      </div>
    );
  }
  return null;
};

export function WorkHoursInfographic() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'table'>('dashboard');

  const data: ChartRow[] = useMemo(() => {
    const rows: ChartRow[] = [];
    let cum1 = 0;
    let cum2 = 0;

    for (let week = 1; week <= 52; week++) {
      let op1Val = 0;
      if (week === 52) {
        op1Val = 36;
      } else {
        const remainder = week % 3;
        op1Val = remainder === 1 ? 48 : 36;
      }

      const cyclePos = (week - 1) % 8;
      const op2Val = cyclePos < 4 ? 45 : 33.75;

      cum1 += op1Val;
      cum2 += op2Val;

      const diff = parseFloat((cum1 - cum2).toFixed(2));

      rows.push({
        week,
        op1: op1Val,
        cum1: cum1,
        op2: op2Val,
        cum2: cum2,
        diff,
        diffLabel: diff > 0 ? `+${diff}` : diff === 0 ? '=' : `${diff}`,
      });
    }
    return rows;
  }, []);

  const totalOp1 = data[51].cum1;
  const totalOp2 = data[51].cum2;
  const totalDiff = totalOp1 - totalOp2;

  return (
    <div className="w-full rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-slate-950/40 overflow-hidden backdrop-blur">
      <header className="bg-slate-900/50 border-b border-white/10 p-5">
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200 flex items-center gap-2">
              <Calendar className="size-4" /> Radno vrijeme · infografika
            </p>
            <h2 className="text-2xl font-bold text-white mt-2">Rotacija 12h vs blokovi 11.25h</h2>
            <p className="text-sm text-slate-300 mt-1">Interaktivni pregled 52 sedmice: ukupni sati, ritam i razlike.</p>
          </div>

          <div className="flex bg-slate-800/60 rounded-xl p-1 border border-white/10 self-start">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                activeTab === 'dashboard' ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <TrendingUp className="size-3" />
              Graf
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                activeTab === 'table' ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              <FileText className="size-3" />
              Tabela
            </button>
          </div>
        </div>
      </header>

      <main className="p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <InfoCard title="Opcija 1" value={`${totalOp1.toLocaleString()} h`} caption="Rotacija 12h (48/36/36)" accent="blue" />
          <InfoCard title="Opcija 2" value={`${totalOp2.toLocaleString()} h`} caption="Blokovi 11.25h (45/33.75)" accent="emerald" />
          <InfoCard title="Razlika" value={`${totalDiff > 0 ? '+' : ''}${totalDiff} h`} caption="Opcija 1 vs Opcija 2" accent="purple" />
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
              <h3 className="text-sm font-semibold text-white mb-3">Kumulativni rast sati</h3>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorOp1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorOp2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#34d399" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
                    <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false} interval={9} />
                    <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                    <Tooltip content={CumulativeTooltip} />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px', color: '#e5e7eb' }} />
                    <Area type="monotone" dataKey="cum1" name="Op. 1 (12h)" stroke="#60a5fa" fillOpacity={1} fill="url(#colorOp1)" strokeWidth={2} />
                    <Area type="monotone" dataKey="cum2" name="Op. 2 (11.25h)" stroke="#34d399" fillOpacity={1} fill="url(#colorOp2)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
              <h3 className="text-sm font-semibold text-white mb-1">Razlika (Op.1 - Op.2)</h3>
              <p className="text-[11px] text-slate-400 mb-3">Pozitivno = Opcija 1 vodi</p>
              <div className="h-36 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
                    <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fill: '#9ca3af', fontSize: 10 }} interval={9} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                    <Tooltip cursor={{ fill: '#0f172a' }} content={DiffTooltip} />
                    <ReferenceLine y={0} stroke="#4b5563" strokeWidth={1} />
                    <Bar dataKey="diff" name="Razlika">
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.diff > 0 ? '#60a5fa' : '#f87171'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-2xl border border-blue-400/30 bg-blue-500/10 p-3">
                <div className="flex items-center gap-2 text-blue-100">
                  <Clock className="size-4" />
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]">Opcija 1: ritam</p>
                </div>
                <p className="text-sm text-blue-50 mt-2 leading-relaxed">
                  Stabilan obrazac 48/36/36h donosi predvidljivost i 6h više ukupno na godišnjem nivou.
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-3">
                <div className="flex items-center gap-2 text-emerald-100">
                  <AlertCircle className="size-4" />
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]">Opcija 2: fleks</p>
                </div>
                <p className="text-sm text-emerald-50 mt-2 leading-relaxed">
                  Ciklus 45h/33.75h (4+4 sedmice) miješa teže i lakše blokove, korisno za timove koji trebaju varijabilno opterećenje.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'table' && (
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 overflow-hidden">
            <div className="overflow-x-auto max-h-[420px]">
              <table className="w-full text-xs text-left text-slate-200">
                <thead className="bg-slate-800 text-slate-300 font-medium border-b border-white/10 sticky top-0 z-10">
                  <tr>
                    <th className="px-2 py-2 text-center">Sed.</th>
                    <th className="px-2 py-2 text-right text-blue-200">Op.1</th>
                    <th className="px-2 py-2 text-right text-blue-100 font-semibold">Kum.1</th>
                    <th className="px-2 py-2 text-right text-emerald-200">Op.2</th>
                    <th className="px-2 py-2 text-right text-emerald-100 font-semibold">Kum.2</th>
                    <th className="px-2 py-2 text-center">Razl.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.map((row) => (
                    <tr key={row.week} className="hover:bg-slate-800/70 transition-colors">
                      <td className="px-2 py-1.5 text-center font-medium text-slate-400">{row.week}</td>
                      <td className="px-2 py-1.5 text-right">{row.op1}</td>
                      <td className="px-2 py-1.5 text-right font-semibold text-blue-100">{row.cum1.toLocaleString()}</td>
                      <td className="px-2 py-1.5 text-right">{row.op2}</td>
                      <td className="px-2 py-1.5 text-right font-semibold text-emerald-100">{row.cum2.toLocaleString()}</td>
                      <td
                        className={`px-2 py-1.5 text-center font-bold ${
                          row.diff > 0 ? 'text-blue-300' : row.diff < 0 ? 'text-red-300' : 'text-slate-300'
                        }`}
                      >
                        {row.diffLabel}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-800 font-bold text-slate-100 sticky bottom-0">
                  <tr>
                    <td className="px-2 py-2 text-center">Σ</td>
                    <td className="px-2 py-2 text-right">-</td>
                    <td className="px-2 py-2 text-right text-blue-200">{totalOp1.toLocaleString()}</td>
                    <td className="px-2 py-2 text-right">-</td>
                    <td className="px-2 py-2 text-right text-emerald-200">{totalOp2.toLocaleString()}</td>
                    <td className="px-2 py-2 text-center text-violet-200">{totalDiff > 0 ? `+${totalDiff}` : totalDiff}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
