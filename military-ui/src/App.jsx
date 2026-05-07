import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import TermDetails from './TermDetails'
import About from './About' // Импортируем твой новый файл

// 1. СЛОВАРЬ ПЕРЕВОДОВ ИНТЕРФЕЙСА
const translations = {
  EN: {
    title: "Military Terminology",
    nav: "NAVIGATION",
    browse: "Browse A-Z Index",
    filters: "Filters",
    all: "ALL",
    searchPlaceholder: "Fast search through the database...",
    term: "Term",
    ru: "Russian",
    kz: "Kazakh",
    definition: "Definition",
    notFound: "Nothing found",
    reset: "Reset all",
    version: "v1.0 Military Database",
    allCategories: "All",
    aboutLink: "About Dictionary" // Добавили перевод для ссылки
  },
  RU: {
    title: "Военная Терминология",
    nav: "НАВИГАЦИЯ",
    browse: "Алфавитный указатель",
    filters: "Фильтры",
    all: "ВСЕ",
    searchPlaceholder: "Быстрый поиск по всей базе...",
    term: "Термин",
    ru: "Русский",
    kz: "Казахский",
    definition: "Определение",
    notFound: "Ничего не найдено",
    reset: "Сбросить всё",
    version: "v1.0 Военная база данных",
    allCategories: "Все",
    aboutLink: "О словаре" // Добавили перевод для ссылки
  },
  KZ: {
    title: "Әскери Терминология",
    nav: "НАВИГАЦИЯ",
    browse: "Әліпбилік көрсеткіш",
    filters: "Сүзгілер",
    all: "БАРЛЫҒЫ",
    searchPlaceholder: "Деректер базасы бойынша жылдам іздеу...",
    term: "Термин",
    ru: "Орысша",
    kz: "Қазақша",
    definition: "Анықтама",
    notFound: "Ештеңе табылмады",
    reset: "Барлығын қайта орнату",
    version: "v1.0 Әскери деректер қоры",
    allCategories: "Барлығы",
    aboutLink: "Сөздік туралы" // Добавили перевод для ссылки
  }
};

// --- КОМПОНЕНТ ГЛАВНОЙ СТРАНИЦЫ ---
function Home({ words, uiLang, setUiLang, alphabets }) {
  const [search, setSearch] = useState("");
  const t = translations[uiLang];

  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);

  const categories = ["Все", ...new Set(words.map(w => w.category).filter(Boolean))];

  const filteredWords = words.filter(word => {
    const matchesSearch = 
      word.en?.toLowerCase().includes(search.toLowerCase()) ||
      word.ru?.toLowerCase().includes(search.toLowerCase()) ||
      word.kz?.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategory === "Все" || word.category === selectedCategory;

    let matchesLetter = true;
    if (selectedLetter) {
      const field = uiLang.toLowerCase(); 
      matchesLetter = word[field]?.toUpperCase().startsWith(selectedLetter);
    }

    return matchesSearch && matchesCategory && matchesLetter;
  });

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans selection:bg-green-500/30">
      
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* --- SIDEBAR --- */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-slate-900 border-r border-slate-800 z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="font-bold text-lg tracking-tight uppercase">{t.nav}</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="p-1 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-8 scrollbar-hide">
          
          {/* Ссылка на "About" в сайтбаре */}
          <div>
            <Link 
              to="/about" 
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50 text-slate-300 hover:bg-green-500/10 hover:text-green-400 transition-all no-underline border border-slate-700/50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-xs font-bold uppercase tracking-wider">{t.aboutLink}</span>
            </Link>
          </div>

          <hr className="border-slate-800" />

          {/* Алфавит */}
          <div>
            <h3 className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mb-4 font-bold">{t.browse}</h3>
            <div className="grid grid-cols-6 gap-1.5">
              <button
                onClick={() => setSelectedLetter(null)}
                className={`col-span-2 h-8 rounded-md text-[10px] font-bold transition-all border ${!selectedLetter ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/40' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'}`}
              >
                {t.all}
              </button>
              {alphabets[uiLang].map(letter => (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter === selectedLetter ? null : letter)}
                  className={`h-8 rounded-md text-xs font-bold transition-all border ${selectedLetter === letter ? 'bg-green-600 border-green-500 text-white shadow-lg shadow-green-900/40' : 'bg-slate-800/40 border-transparent text-slate-500 hover:text-white hover:border-slate-600'}`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-slate-800" />

          {/* Категории */}
          <div>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-between w-full group mb-2"
            >
              <h3 className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold group-hover:text-slate-300 transition-colors">{t.filters}</h3>
              <svg className={`w-3 h-3 text-slate-500 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            <div className={`space-y-1 transition-all duration-300 overflow-hidden ${isFilterOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all border ${selectedCategory === cat ? "bg-green-500/10 text-green-400 border-green-500/30 font-semibold" : "text-slate-400 border-transparent hover:bg-slate-800"}`}
                >
                  {cat === "Все" ? t.allCategories : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-950/50 border-t border-slate-800">
          <p className="text-[10px] text-slate-600 text-center uppercase tracking-widest">{t.version}</p>
        </div>
      </aside>

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-30 bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all group">
            <svg className="w-6 h-6 text-slate-400 group-hover:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>

          <Link to="/" className="hidden md:block text-center no-underline">
            <h1 className="text-xl font-black tracking-tighter text-white uppercase">{t.title}</h1>
          </Link>

          <div className="flex bg-slate-800/50 p-1 rounded-xl border border-slate-700">
            {['EN', 'RU', 'KZ'].map(lang => (
              <button
                key={lang}
                onClick={() => { setUiLang(lang); setSelectedLetter(null); }}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${uiLang === lang ? 'bg-slate-700 text-green-400' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* --- MAIN --- */}
      <main className="p-6 md:p-12 max-w-5xl mx-auto">
        <div className="relative mb-12 group">
          <input 
            type="text" 
            placeholder={t.searchPlaceholder}
            className="w-full bg-slate-800/40 border border-slate-700/50 p-6 pl-14 rounded-3xl focus:ring-2 focus:ring-green-500 focus:outline-none transition-all backdrop-blur-md text-xl shadow-2xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg className="absolute left-6 top-7 w-6 h-6 text-slate-500 group-focus-within:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredWords.map((word) => (
            <Link to={`/term/${word.id}`} key={word.id} className="block no-underline group">
              <div className="bg-slate-800/30 border border-slate-700/30 p-6 rounded-3xl hover:bg-slate-800/50 hover:border-green-500/30 transition-all cursor-pointer">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <span className="text-[9px] font-bold text-green-500 uppercase tracking-[0.2em] block mb-2">{t.term}</span>
                    <h3 className="text-2xl font-bold text-white mb-2">{word.en}</h3>
                    <span className="inline-block px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-[9px] font-bold uppercase border border-blue-500/20">{word.category}</span>
                  </div>
                  <div className="md:w-1/3 space-y-4 border-slate-700/50 md:border-l md:pl-8">
                    <div>
                      <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1">{t.ru}</p>
                      <p className="text-slate-200 font-medium">{word.ru}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1">{t.kz}</p>
                      <p className="text-slate-200 font-medium">{word.kz}</p>
                    </div>
                  </div>
                  <div className="md:w-1/3 bg-black/20 p-4 rounded-2xl border border-slate-800/50">
                    <p className="text-[9px] text-slate-500 uppercase font-bold mb-2">{t.definition}</p>
                    <p className="text-xs text-slate-400 leading-relaxed italic line-clamp-3">{word.definition}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredWords.length === 0 && (
          <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-dashed border-slate-800 mt-6">
            <p className="text-slate-500">{t.notFound}</p>
            <button onClick={() => {setSearch(""); setSelectedLetter(null); setSelectedCategory("Все");}} className="mt-4 text-green-400 text-sm hover:underline">
              {t.reset}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

// --- ОСНОВНОЙ КОМПОНЕНТ APP ---
function App() {
  const [words, setWords] = useState([]);
  const [uiLang, setUiLang] = useState('EN');

  const alphabets = {
    EN: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    RU: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЭЮЯ".split(""),
    KZ: "АӘБВГҒДЕЁЖЗИЙКҚЛМНҢОӨПРСТУҰҮФХҺЦЧШЩЪЫІЬЭЮЯ".split("")
  };

  useEffect(() => {
    fetch('https://military-api-v9gu.onrender.com/words')
      .then(res => res.json())
      .then(data => setWords(data))
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <Router>
      <Routes>
        {/* Главная страница */}
        <Route 
          path="/" 
          element={<Home words={words} uiLang={uiLang} setUiLang={setUiLang} alphabets={alphabets} />} 
        />
        
        {/* Страница отдельного термина */}
        <Route 
          path="/term/:id" 
          element={<TermDetails words={words} uiLang={uiLang} />} 
        />

        {/* Страница "О словаре" */}
        <Route 
          path="/about" 
          element={<About uiLang={uiLang} />} 
        />
      </Routes>
    </Router>
  )
}

export default App;