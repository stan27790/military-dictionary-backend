import React from 'react';
import { useParams, Link } from 'react-router-dom';

// 1. Расширенный словарь переводов (твои ключи + новые для примеров)
const detailTranslations = {
  EN: {
    back: "BACK TO DATABASE",
    ruEq: "Russian Equivalent",
    kzEq: "Kazakh Equivalent",
    def: "Extended Definition",
    examples: "Usage Examples",
    exEn: "English Example",
    exRu: "Russian Example",
    exKz: "Kazakh Example",
    analysis: "Translation Analysis",
    usage: "Usage Notes",
    related: "Related Terms",
    loading: "Term loading or not found...",
    noRelated: "No related terms found.",
    noExample: "Example not provided yet.",
    noAnalysis: "Linguistic analysis of this term is in progress..."
  },
  RU: {
    back: "НАЗАД В БАЗУ",
    ruEq: "Русский эквивалент",
    kzEq: "Казахский эквивалент",
    def: "Расширенное определение",
    examples: "Примеры использования",
    exEn: "Пример на английском",
    exRu: "Пример на русском",
    exKz: "Пример на казахском",
    analysis: "Лингвистический анализ",
    usage: "Примечания по использованию",
    related: "Связанные термины",
    loading: "Термин загружается или не найден...",
    noRelated: "Связанные термины не найдены.",
    noExample: "Пример пока не добавлен.",
    noAnalysis: "Лингвистический анализ в процессе подготовки..."
  },
  KZ: {
    back: "ДЕРЕКТЕР ҚОРЫНА ҚАЙТУ",
    ruEq: "Орысша баламасы",
    kzEq: "Қазақша баламасы",
    def: "Кеңейтілген анықтама",
    examples: "Қолдану мысалдары",
    exEn: "Ағылшынша мысал",
    exRu: "Орысша мысал",
    exKz: "Қазақша мысал",
    analysis: "Аударма анализі",
    usage: "Қолдану ескертпелері",
    related: "Байланысты терминдер",
    loading: "Термин жүктелуде немесе табылмады...",
    noRelated: "Байланысты терминдер табылмады.",
    noExample: "Мысал әлі берілмеген.",
    noAnalysis: "Бұл терминнің лингвистикалық анализі дайындалуда..."
  }
};

function TermDetails({ words, uiLang }) {
  const { id } = useParams();
  const term = words.find(w => w.id.toString() === id);
  const t = detailTranslations[uiLang] || detailTranslations.EN;

  if (!term) return <div className="p-20 text-white text-center">{t.loading}</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Кнопка назад */}
        <Link to="/" className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 no-underline font-bold mb-10 transition-transform hover:-translate-x-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          {t.back}
        </Link>

        {/* Заголовок */}
        <header className="mb-12">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase border border-blue-500/20">
            {term.category}
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mt-4 tracking-tighter uppercase">{term.en}</h1>
        </header>

        {/* Эквиваленты (RU/KZ) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 backdrop-blur-sm">
            <p className="text-slate-500 uppercase font-bold text-[10px] mb-2 tracking-[0.2em]">{t.ruEq}</p>
            <p className="text-3xl font-bold text-white">{term.ru}</p>
          </div>
          <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 backdrop-blur-sm">
            <p className="text-slate-500 uppercase font-bold text-[10px] mb-2 tracking-[0.2em]">{t.kzEq}</p>
            <p className="text-3xl font-bold text-white">{term.kz}</p>
          </div>
        </div>

        <div className="space-y-12">
          
          {/* 1. Расширенное определение */}
          <section>
            <h3 className="text-green-500 uppercase font-bold text-xs mb-4 tracking-widest flex items-center gap-2">
              <span className="w-8 h-[1px] bg-green-500/30"></span> {t.def}
            </h3>
            <p className="text-xl text-slate-300 leading-relaxed italic border-l-4 border-green-500/50 pl-6">
              {term.definition}
            </p>
          </section>

          {/* 2. ТРИ ПРИМЕРА (Новая часть для руководителя) */}
          <section className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800">
            <h3 className="text-blue-400 uppercase font-bold text-xs mb-6 tracking-widest">{t.examples}</h3>
            <div className="space-y-6">
              <div className="group">
                <p className="text-[9px] text-slate-500 uppercase font-black mb-1">{t.exEn}</p>
                <p className="text-slate-200 border-l-2 border-slate-700 pl-4 group-hover:border-blue-400 transition-colors">
                  {term.example_en || t.noExample}
                </p>
              </div>
              <div className="group">
                <p className="text-[9px] text-slate-500 uppercase font-black mb-1">{t.exRu}</p>
                <p className="text-slate-200 border-l-2 border-slate-700 pl-4 group-hover:border-blue-400 transition-colors">
                  {term.example_ru || t.noExample}
                </p>
              </div>
              <div className="group">
                <p className="text-[9px] text-green-500/50 uppercase font-black mb-1">{t.exKz}</p>
                <p className="text-slate-200 border-l-2 border-slate-700 pl-4 group-hover:border-green-500 transition-colors">
                  {term.example_kz || t.noExample}
                </p>
              </div>
            </div>
          </section>

          {/* 3. Твой научный анализ и заметки */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <h3 className="text-slate-400 uppercase font-bold text-xs mb-4 tracking-widest">{t.analysis}</h3>
              <p className="text-slate-400 leading-relaxed text-sm bg-slate-800/20 p-6 rounded-2xl border border-slate-800/50">
                {term.analysis || t.noAnalysis}
              </p>
            </section>
            <section>
              <h3 className="text-slate-400 uppercase font-bold text-xs mb-4 tracking-widest">{t.usage}</h3>
              <p className="text-slate-400 leading-relaxed text-sm bg-slate-800/20 p-6 rounded-2xl border border-slate-800/50">
                {term.usage_notes || '—'}
              </p>
            </section>
          </div>

          {/* 4. Связанные термины */}
          <section className="pt-8 border-t border-slate-800">
            <h3 className="text-slate-500 uppercase font-bold text-[10px] mb-4 tracking-widest">{t.related}</h3>
            <div className="flex flex-wrap gap-2">
              {term.related_terms?.map((related, index) => (
                <span key={index} className="px-4 py-2 bg-slate-800 rounded-xl text-xs text-slate-300 border border-slate-700 hover:border-blue-500/50 transition-colors cursor-default">
                  {related}
                </span>
              )) || <span className="text-slate-600 italic text-xs">{t.noRelated}</span>}
            </div>
          </section>
        </div>

        <footer className="mt-20 pt-8 border-t border-slate-800 text-center text-slate-600 text-[10px] uppercase tracking-widest">
           Military Lexicography Thesis Project © 2026
        </footer>
      </div>
    </div>
  );
}

export default TermDetails;