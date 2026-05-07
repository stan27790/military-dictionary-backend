import React from 'react';
import { Link } from 'react-router-dom';

const aboutTranslations = {
  EN: {
    back: "BACK TO DATABASE",
    title: "About the Dictionary",
    aimTitle: "Aim & Purpose",
    aimText: "This trilingual military dictionary was created as part of the thesis “Translation Issues of Military Terms.” Its primary purpose is to provide a clear, standardized, and accessible collection of military vocabulary in English, Kazakh, and Russian.",
    usersTitle: "Target Users",
    usersText: "The resource is designed for students, military translators, researchers, and specialists who work with defense-related content. It allows users to compare terms across three linguistic systems, ensuring semantic accuracy in professional communication.",
    kazakhTitle: "The Kazakh Context",
    kazakhQuote: "Military terminology often causes translation difficulties due to the lack of exact equivalents.",
    kazakhText: "In the Kazakh language, military vocabulary is in a stage of active development. It requires further systematization and standardization to avoid inconsistency and semantic inaccuracy. This project contributes to the evolution of Kazakh military discourse in a modern digital form.",
    structureTitle: "Structure & Selection",
    structureText: "Terms are selected from authentic military discourse, including field manuals, international treaties, and academic journals. The trilingual format highlights the contrastive features of each language.",
    valueTitle: "Academic Value",
    valueText: "The academic value lies in the synthesis of lexicographical work and translation analysis. It addresses the practical needs of the linguistic community while supporting the digital transformation of military science.",
    footer: "The Thesis Project © 2026"
  },
  RU: {
    back: "НАЗАД В БАЗУ",
    title: "О словаре",
    aimTitle: "Цель проекта",
    aimText: "Этот трехязычный военный словарь был создан в рамках дипломной работы «Проблемы перевода военных терминов». Его основная цель — предоставить четкую, стандартизированную и доступную коллекцию военной лексики на английском, казахском и русском языках.",
    usersTitle: "Целевая аудитория",
    usersText: "Ресурс предназначен для студентов, военных переводчиков, исследователей и специалистов, работающих с контентом в сфере обороны. Он позволяет пользователям сравнивать термины в трех лингвистических системах, обеспечивая семантическую точность в профессиональной коммуникации.",
    kazakhTitle: "Казахская терминология",
    kazakhQuote: "Военная терминология часто вызывает трудности при переводе из-за отсутствия точных эквивалентов.",
    kazakhText: "В казахском языке военная лексика находится на стадии активного развития. Она требует дальнейшей систематизации и стандартизации во избежание несогласованности и семантической неточности. Данный проект вносит вклад в развитие казахского военного дискурса в современной цифровой форме.",
    structureTitle: "Структура и отбор",
    structureText: "Термины отобраны из аутентичного военного дискурса, включая полевые уставы, международные договоры и научные журналы. Трехязычный формат подчеркивает контрастивные особенности каждого языка.",
    valueTitle: "Научная ценность",
    valueText: "Научная ценность заключается в синтезе лексикографической работы и переводческого анализа. Проект отвечает практическим потребностям лингвистического сообщества, поддерживая цифровую трансформацию военной науки.",
    footer: "Дипломный проект © 2026"
  },
  KZ: {
    back: "ДЕРЕКТЕР ҚОРЫНА ҚАЙТУ",
    title: "Сөздік туралы",
    aimTitle: "Жобаның мақсаты",
    aimText: "Бұл үштілді әскери сөздік «Әскери терминдерді аудару мәселелері» атты дипломдық жұмыс аясында жасалған. Оның басты мақсаты — ағылшын, қазақ және орыс тілдеріндегі әскери лексиканың түсінікті, стандартталған және қолжетімді жинағын ұсыну.",
    usersTitle: "Мақсатты аудитория",
    usersText: "Бұл ресурс студенттерге, әскери аудармашыларға, зерттеушілерге және қорғаныс саласындағы контентпен жұмыс істейтін мамандарға арналған. Ол пайдаланушыларға кәсіби қарым-қатынаста семантикалық дәлдікті қамтамасыз ете отырып, терминдерді үш тілдік жүйеде салыстыруға мүмкіндік береді.",
    kazakhTitle: "Қазақ терминологиясы",
    kazakhQuote: "Әскери терминология нақты баламалардың болмауына байланысты аудармада жиі қиындықтар тудырады.",
    kazakhText: "Қазақ тіліндегі әскери лексика белсенді даму сатысында. Ол сәйкессіздіктер мен семантикалық дәлсіздіктерді болдырмау үшін одан әрі жүйелеу мен стандарттауды қажет етеді. Бұл жоба қазақ әскери дискурсының заманауи цифрлық форматта дамуына үлес қосады.",
    structureTitle: "Құрылымы мен іріктеу",
    structureText: "Терминдер шынайы әскери дискурстан, соның ішінде далалық жарғылардан, халықаралық шарттардан және академиялық журналдардан іріктеліп алынды. Үштілді формат әр тілдің контрастивті ерекшеліктерін айқындайды.",
    valueTitle: "Ғылыми құндылығы",
    valueText: "Ғылыми құндылығы лексикографиялық жұмыс пен аударма анализінің синтезінде жатыр. Ол әскери ғылымның цифрлық трансформациясын қолдай отырып, лингвистикалық қоғамдастықтың практикалық қажеттіліктерін өтейді.",
    footer: "Дипломдық жоба © 2026"
  }
};

function About({ uiLang }) {
  const t = aboutTranslations[uiLang] || aboutTranslations.EN;

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        <Link to="/" className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 no-underline font-bold mb-10 transition-all hover:-translate-x-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          {t.back}
        </Link>

        <h1 className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tight uppercase border-b border-slate-800 pb-6">
          {t.title}
        </h1>

        <div className="grid gap-12">
          {/* Section 1: Aim */}
          <section>
            <h2 className="text-green-500 font-bold text-xs uppercase tracking-[0.2em] mb-4">{t.aimTitle}</h2>
            <p className="text-xl text-slate-300 leading-relaxed">
              {t.aimText}
            </p>
          </section>

          {/* Section 2: Users */}
          <section className="bg-slate-800/30 p-8 rounded-3xl border border-slate-700/50">
            <h2 className="text-blue-400 font-bold text-xs uppercase tracking-[0.2em] mb-4">{t.usersTitle}</h2>
            <p className="text-slate-300">
              {t.usersText}
            </p>
          </section>

          {/* Section 3: Kazakh Context */}
          <section className="border-l-4 border-green-500/50 pl-8">
            <h2 className="text-green-500 font-bold text-xs uppercase tracking-[0.2em] mb-4">{t.kazakhTitle}</h2>
            <p className="text-slate-300 italic mb-4">
              "{t.kazakhQuote}"
            </p>
            <p className="text-slate-300">
              {t.kazakhText}
            </p>
          </section>

          {/* Section 4: Structure & Academic Value */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <h2 className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-3">{t.structureTitle}</h2>
              <p className="text-sm text-slate-400">
                {t.structureText}
              </p>
            </div>
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <h2 className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-3">{t.valueTitle}</h2>
              <p className="text-sm text-slate-400">
                {t.valueText}
              </p>
            </div>
          </div>
        </div>

        <footer className="mt-20 pt-8 border-t border-slate-800 text-center text-slate-600 text-xs uppercase tracking-widest">
          {t.footer}
        </footer>
      </div>
    </div>
  );
}

export default About;