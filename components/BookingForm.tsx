'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, Video, Send } from 'lucide-react';

export function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'online', // online ili office
    date: '',
    time: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '', email: '', phone: '', type: 'online',
          date: '', time: '', message: ''
        });
      }
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-500/30 bg-green-950/20 p-8 text-center">
        <div className="size-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
          <Send className="size-8 text-green-400" />
        </div>
        <h3 className="text-xl font-semibold text-green-100 mb-2">
          Zahtev poslat!
        </h3>
        <p className="text-green-200">
          Kontaktiraćemo vas u najkraćem roku da potvrdimo termin.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tip konsultacija */}
        <div>
          <label className="block text-sm font-medium mb-3">Tip konsultacija</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData({...formData, type: 'online'})}
              className={`p-4 rounded-xl border transition ${
                formData.type === 'online'
                  ? 'border-blue-500 bg-blue-500/10 text-blue-100'
                  : 'border-white/20 hover:border-white/30'
              }`}
            >
              <Video className="size-6 mx-auto mb-2" />
              <div className="font-medium">Online</div>
              <div className="text-sm opacity-70">Video poziv</div>
            </button>
            <button
              type="button"
              onClick={() => setFormData({...formData, type: 'office'})}
              className={`p-4 rounded-xl border transition ${
                formData.type === 'office'
                  ? 'border-blue-500 bg-blue-500/10 text-blue-100'
                  : 'border-white/20 hover:border-white/30'
              }`}
            >
              <MapPin className="size-6 mx-auto mb-2" />
              <div className="font-medium">U kancelariji</div>
              <div className="text-sm opacity-70">Lični susret</div>
            </button>
          </div>
        </div>

        {/* Osnovni podaci */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Ime i prezime *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Telefon</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Datum i vreme */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              <Calendar className="inline size-4 mr-1" />
              Datum *
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              <Clock className="inline size-4 mr-1" />
              Vreme *
            </label>
            <select
              required
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Izaberite vreme</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
            </select>
          </div>
        </div>

        {/* Poruka */}
        <div>
          <label className="block text-sm font-medium mb-2">Kratko opišite vaš slučaj</label>
          <textarea
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus:border-blue-500 focus:outline-none resize-none"
            placeholder="Opišite pravno pitanje ili situaciju..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition"
        >
          {isSubmitting ? 'Šalje se...' : 'Zakaži konsultacije'}
        </button>
      </form>
    </div>
  );
}