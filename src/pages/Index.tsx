import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const HERO_BG =
  'https://cdn.poehali.dev/projects/be3c599a-f041-48fc-a5b3-cc5d57a35c74/files/e3562d88-7b71-4861-9d10-f3a2e315a36d.jpg';

const nav = [
  { id: 'about', label: 'О курсе' },
  { id: 'schedule', label: 'Расписание' },
  { id: 'experts', label: 'Специалисты' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'register', label: 'Регистрация' },
  { id: 'contacts', label: 'Контакты' },
];

const features = [
  { icon: 'PersonStanding', title: 'Тело', text: 'Авторская гимнастика СинТРИя + йога. Свобода движения и гибкость без боли.' },
  { icon: 'Brain', title: 'Психический тонус', text: 'Работа с теневыми паттернами и сценариями. Внутренние конфликты — без насилия.' },
  { icon: 'Salad', title: 'Энергия', text: 'Природные ритмы питания. Перестаёте заедать усталость — питание встраивается в ритм.' },
  { icon: 'Wind', title: 'Осанка и дыхание', text: 'Соматические практики. Утро перестаёт быть борьбой — появляется живой импульс.' },
  { icon: 'Repeat', title: 'Привычки', text: '2–3 стабильных паттерна. Новые привычки работают сами — без ежедневной войны с собой.' },
];

const weeks = [
  {
    label: 'Неделя 1',
    range: '12–18 июля',
    days: [
      { date: '12 июля', dow: 'Вс', time: '10:00 МСК', speaker: 'Камилла Ринатова', role: 'Теневые паттерны', icon: 'Brain', title: 'Знакомство. Постановка намерений', desc: 'Постановка намерений на курс. Безопасность как первый шаг.' },
      { date: '13 июля', dow: 'Пн', time: '20:00 МСК', speaker: 'Андрей Волга', role: 'Натуропат', icon: 'Salad', title: 'Суть происходящего', desc: 'Природный режим сна и питания. Паразиты: друзья или враги? Пищевые паузы.' },
      { date: '14 июля', dow: 'Вт', time: '07:00 МСК', speaker: 'Елена Егорова', role: 'Гимнастика СинТРИя', icon: 'PersonStanding', title: 'Включение в тело', desc: 'Разбор теории и инструкции. Практическое занятие.' },
      { date: '16 июля', dow: 'Чт', time: '07:00 МСК', speaker: 'Елизавета Тарасова', role: 'Йога', icon: 'Flower2', title: 'Базовая настройка', desc: 'Йога для любого уровня подготовки.' },
    ],
  },
  {
    label: 'Неделя 2',
    range: '19–25 июля',
    days: [
      { date: '19 июля', dow: 'Вс', time: '10:00 МСК', speaker: 'Камилла Ринатова', role: 'Теневые паттерны', icon: 'Brain', title: 'Где я теряю импульс', desc: 'Сопротивление. Внутренний конфликт — пути решения.' },
      { date: '20 июля', dow: 'Пн', time: '20:00 МСК', speaker: 'Андрей Волга', role: 'Натуропат', icon: 'Salad', title: 'АЗ-бука питания', desc: 'Западное влияние в диетах. Завтраки для клеток. Правильные закупки.' },
      { date: '21 июля', dow: 'Вт', time: '07:00 МСК', speaker: 'Елена Егорова', role: 'Гимнастика СинТРИя', icon: 'PersonStanding', title: 'Проработка зажимов', desc: 'Работа с телесными зажимами и напряжением.' },
      { date: '23 июля', dow: 'Чт', time: '07:00 МСК', speaker: 'Елизавета Тарасова', role: 'Йога', icon: 'Flower2', title: 'Базовая настройка', desc: 'Йога для любого уровня подготовки.' },
    ],
  },
  {
    label: 'Неделя 3',
    range: '26 июля – 1 авг',
    days: [
      { date: '26 июля', dow: 'Вс', time: '10:00 МСК', speaker: 'Камилла Ринатова', role: 'Теневые паттерны', icon: 'Brain', title: 'Паттерны мышления', desc: 'Как создавать новые паттерны и закрепить их.' },
      { date: '27 июля', dow: 'Пн', time: '20:00 МСК', speaker: 'Андрей Волга', role: 'Натуропат', icon: 'Salad', title: 'Наслаждение очищением', desc: 'Обеды без запретов. Влияние жиров и железа на качество жизни.' },
      { date: '28 июля', dow: 'Вт', time: '07:00 МСК', speaker: 'Елена Егорова', role: 'Гимнастика СинТРИя', icon: 'PersonStanding', title: 'СинТРИя в динамике', desc: 'Как использовать практику в обычной жизни.' },
      { date: '30 июля', dow: 'Чт', time: '07:00 МСК', speaker: 'Елизавета Тарасова', role: 'Йога', icon: 'Flower2', title: 'Базовая настройка', desc: 'Йога для любого уровня подготовки.' },
      { date: '1 авг', dow: 'Сб', time: '11:00 МСК', speaker: 'Камилла + команда', role: 'Финал', icon: 'Flame', title: 'Итоги. Интеграция', desc: 'Интеграция в повседневную жизнь. Ритуал закрытия.', final: true },
    ],
  },
];

const experts = [
  { name: 'Камилла Ринатова', role: 'Теневые паттерны', bio: 'Специалист по теневым паттернам, куратор трансперсонального подхода. Ведёт через намерения и интеграцию.', icon: 'Brain' },
  { name: 'Андрей Волга', role: 'Натуропат', bio: 'Натуропат. Природный режим питания и сна, очищение тела, осознанные пищевые привычки.', icon: 'Salad' },
  { name: 'Елена Егорова', role: 'Гимнастика СинТРИя', bio: 'Автор гимнастики СинТРИя. Включение в тело, проработка зажимов, движение в жизни.', icon: 'PersonStanding' },
  { name: 'Елизавета Тарасова', role: 'Йога', bio: 'Преподаватель йоги. Базовая настройка в практике для любого уровня подготовки.', icon: 'Flower2' },
];

const reviews = [
  { name: 'Ольга, 34', text: 'Думала — очередной тренинг. А оказалось — точка перелома. Впервые за годы вдохнула полной грудью.' },
  { name: 'Сергей, 41', text: 'Здесь не нянчатся. Честно и по делу. Ушёл с планом и силой его делать. Спасибо клубу.' },
  { name: 'Елена, 29', text: 'Атмосфера поддержки невероятная. Тебя слышат, но не жалеют. Именно это и сработало.' },
];

const Index = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [open, setOpen] = useState(false);
  const [activeWeek, setActiveWeek] = useState(0);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Вы в потоке силы 🔥',
      description: 'Заявка принята. Мы свяжемся с вами и расскажем детали интенсива.',
    });
    setForm({ name: '', phone: '', email: '' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-1">
            <img src="https://cdn.poehali.dev/projects/be3c599a-f041-48fc-a5b3-cc5d57a35c74/bucket/09ee154e-ff83-426c-b61b-b56c50cf9ccd.jpg" alt="СИЛА" className="w-10 h-10 object-contain" />
          </button>
          <nav className="hidden md:flex items-center gap-7">
            {nav.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-sm text-muted-foreground hover:text-gold transition-colors">
                {n.label}
              </button>
            ))}
          </nav>
          <Button onClick={() => scrollTo('register')} className="hidden md:inline-flex bg-gold text-primary-foreground hover:bg-gold/90 font-medium">
            Записаться
          </Button>
          <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
            <Icon name={open ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t border-border/50 bg-background/95 px-6 py-4 flex flex-col gap-3">
            {nav.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-left text-muted-foreground hover:text-gold py-1">
                {n.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden grain">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl animate-breathe" />
        <div className="container relative z-10 py-32">
          <div className="max-w-3xl">
            <p className="animate-fade-up text-gold font-display tracking-[0.3em] text-sm mb-6" style={{ animationDelay: '0.1s' }}>КЛУБ САМОРАЗВИТИЯ И ПОДДЕРЖКИ · ОНЛАЙН ИНТЕНСИВ</p>
            <h1 className="animate-fade-up font-display font-bold text-6xl md:text-8xl leading-[0.9] mb-6" style={{ animationDelay: '0.3s' }}>
              <span className="gold-text">ИМПУЛЬС</span>
            </h1>
            <p className="animate-fade-up text-xl md:text-2xl text-foreground/90 font-display font-light mb-4" style={{ animationDelay: '0.4s' }}>Комплексный подход, чтобы перестать откладывать жизнь.</p>
            <p className="animate-fade-up text-muted-foreground text-lg max-w-xl mb-10 leading-relaxed" style={{ animationDelay: '0.55s' }}>21 день  честной работы с собой. 
4 столпа счастья и здоровья:
Тело+психика+питание+энергия</p>
            <div className="animate-fade-up flex flex-col sm:flex-row gap-4" style={{ animationDelay: '0.7s' }}>
              <Button onClick={() => scrollTo('register')} size="lg" className="bg-gold text-primary-foreground hover:bg-gold/90 font-medium text-base h-13 px-8 gold-glow">Я иду</Button>
              <Button onClick={() => scrollTo('about')} size="lg" variant="outline" className="border-gold/40 text-foreground hover:bg-gold/10 h-13 px-8">
                Узнать о курсе
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 relative">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
            <div>
              <p className="text-gold font-display tracking-[0.25em] text-sm mb-4">О КУРСЕ</p>
              <h2 className="font-display font-bold text-4xl md:text-5xl mb-6 leading-tight">Сборка тела, психики и ритмов в одну систему</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                «ИМПУЛЬС» — это сборка тела, психики и ритмов в одну работающую систему. Всё онлайн. 3 недели. 4 специалиста. Один ритм.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-8">Вы оберёте  инструмент комплексного подхода, который остаётся с вами. Без «войны с собой». Перезапусти пространство жизни</p>
              <div className="flex flex-wrap gap-4">
                {[['Calendar', '3 недели'], ['Users', 'Группа 10 человек'], ['Wifi', 'Всё онлайн'], ['Users2', '4 специалиста']].map(([icon, label]) => (
                  <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-sm bg-card border border-gold/30 text-sm">
                    <Icon name={icon} className="text-gold" size={16} />
                    <span className="text-foreground/80">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <p className="font-display font-semibold text-gold tracking-wide mb-4">🧬 База счастья и здоровья — то, что останется с вами</p>
              {[
                'Утро перестаёт быть борьбой — появляется живой импульс встать',
                'Тело перестаёт болеть и застывать — возвращается свобода и гибкость',
                'Питание встраивается в ритм, а не в хаос — вы перестаёте заедать усталость',
                'Внутренние конфликты проходят без насилия — вы действуете спокойно',
                'Новые паттерны работают сами — без ежедневной войны с собой',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 rounded-sm bg-card border border-border">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                  <p className="text-foreground/80 leading-relaxed text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {features.map((f) => (
              <div key={f.title} className="group p-6 rounded-sm bg-card border border-border hover:border-gold/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-sm bg-gold/10 border border-gold/30 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <Icon name={f.icon} className="text-gold" size={22} />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="py-28 bg-secondary/30 relative grain">
        <div className="container relative z-10">
          <div className="max-w-2xl mb-12">
            <p className="text-gold font-display tracking-[0.25em] text-sm mb-4">РАСПИСАНИЕ</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">21 день пути к новому вдоху</h2>
            <p className="text-muted-foreground text-lg">Три недели глубокой работы в безопасном пространстве. Полная конфиденциальность.</p>
          </div>

          {/* Week tabs */}
          <div className="flex flex-wrap gap-3 mb-10">
            {weeks.map((w, i) => (
              <button
                key={i}
                onClick={() => setActiveWeek(i)}
                className={`px-6 py-3 rounded-sm font-display font-semibold tracking-wide transition-all border ${
                  activeWeek === i
                    ? 'bg-gold text-primary-foreground border-gold gold-glow'
                    : 'bg-card text-muted-foreground border-border hover:border-gold/50 hover:text-gold'
                }`}
              >
                {w.label}
                <span className={`block text-xs font-sans font-normal ${activeWeek === i ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{w.range}</span>
              </button>
            ))}
          </div>

          {/* Days */}
          <div className="space-y-4">
            {weeks[activeWeek].days.map((d, i) => (
              <div
                key={i}
                className={`group flex flex-col md:flex-row md:items-center gap-4 md:gap-6 p-6 md:p-7 rounded-sm border transition-all animate-fade-up ${
                  d.final ? 'bg-gold/10 border-gold/50' : 'bg-card border-border hover:border-gold/50'
                }`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="md:w-32 shrink-0">
                  <div className="font-display font-bold text-2xl text-gold">{d.date}</div>
                  <div className="text-muted-foreground text-sm">{d.dow} · {d.time}</div>
                </div>
                <div className="hidden md:flex w-14 h-14 rounded-sm bg-gold/10 border border-gold/30 items-center justify-center shrink-0">
                  <Icon name={d.icon} className="text-gold" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-xl mb-1">{d.title}</h3>
                  <p className="text-muted-foreground text-sm">{d.desc}</p>
                </div>
                <div className="md:text-right shrink-0 md:w-48">
                  <div className="font-display font-semibold text-foreground">{d.speaker}</div>
                  <div className="text-gold text-sm">{d.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* REVIEWS */}
      <section id="reviews" className="py-28 bg-secondary/30 relative grain">
        <div className="container relative z-10">
          <div className="max-w-2xl mb-16">
            <p className="text-gold font-display tracking-[0.25em] text-sm mb-4">ОТЗЫВЫ</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl">Те, кто уже с нами</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="p-8 rounded-sm bg-card border border-border relative">
                <Icon name="Quote" className="text-gold/30 mb-4" size={36} />
                <p className="text-foreground/90 leading-relaxed mb-6 text-lg">{r.text}</p>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="text-gold fill-gold" size={16} />
                  ))}
                </div>
                <p className="font-display font-semibold text-gold">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGISTER */}
      <section id="register" className="py-28 relative overflow-hidden">
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold/10 blur-3xl animate-breathe" />
        <div className="container relative z-10">
          <div className="max-w-xl mx-auto text-center mb-12">
            <p className="text-gold font-display tracking-[0.25em] text-sm mb-4">РЕГИСТРАЦИЯ</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">Присоединиться к силе</h2>
            <p className="text-muted-foreground text-lg">Оставьте заявку — расскажем детали и забронируем за вами место в потоке.</p>
          </div>
          <form onSubmit={submit} className="max-w-md mx-auto p-8 rounded-sm bg-card border border-gold/30 gold-glow space-y-4">
            <Input
              required
              placeholder="Ваше имя"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-secondary border-border h-12 focus-visible:ring-gold"
            />
            <Input
              required
              type="tel"
              placeholder="Телефон"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="bg-secondary border-border h-12 focus-visible:ring-gold"
            />
            <Input
              required
              type="email"
              placeholder="E-mail"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-secondary border-border h-12 focus-visible:ring-gold"
            />
            <Button type="submit" className="w-full bg-gold text-primary-foreground hover:bg-gold/90 font-medium h-12 text-base">Добро</Button>
            <p className="text-xs text-muted-foreground text-center">Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</p>
          </form>
        </div>
      </section>

      {/* CONTACTS / FOOTER */}
      <footer id="contacts" className="py-16 border-t border-border bg-secondary/30">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="https://cdn.poehali.dev/projects/be3c599a-f041-48fc-a5b3-cc5d57a35c74/bucket/09ee154e-ff83-426c-b61b-b56c50cf9ccd.jpg" alt="СИЛА" className="w-12 h-12 object-contain" />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">Клуб саморазвития и поддержки. Помогаем стать сильнее — честно и с заботой.</p>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-4">Контакты</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                <a href="tel:+70000000000" className="flex items-center gap-2 hover:text-gold transition-colors">+7 (917) 353-90-92</a>
                <a href="mailto:hello@sila-club.ru" className="flex items-center gap-2 hover:text-gold transition-colors">elma.do@mail.ru</a>
                <p className="flex items-center gap-2">РФ, Республика Башкортостан, г Уфа
</p>
              </div>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-4">Мы рядом</h4>
              <div className="flex gap-3">
                <a href="https://vk.com/powerpeopleclub" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-sm border border-border hover:border-gold/50 hover:bg-gold/10 flex items-center justify-center text-muted-foreground hover:text-gold transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C5.029 10.818 4.42 8.985 4.42 8.56c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.169.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .643.271.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.745-.576.745z"/></svg>
                </a>
                <a href="https://t.me/silapeople" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-sm border border-border hover:border-gold/50 hover:bg-gold/10 flex items-center justify-center text-muted-foreground hover:text-gold transition-all">
                  <Icon name="Send" size={18} />
                </a>
                {['Instagram', 'Youtube'].map((s) => (
                  <a key={s} href="#" className="w-10 h-10 rounded-sm border border-border hover:border-gold/50 hover:bg-gold/10 flex items-center justify-center text-muted-foreground hover:text-gold transition-all">
                    <Icon name={s} size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 Клуб СИЛА · Курс-интенсив «ИМПУЛЬС»
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;