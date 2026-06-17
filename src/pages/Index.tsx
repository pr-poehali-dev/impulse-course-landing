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
  {
    icon: 'Wind',
    title: 'Первый вдох',
    text: 'Честно препарируем то, что давит. Без жалости — но с заботой. Вы увидите реальную картину.',
  },
  {
    icon: 'Flame',
    title: 'Встряска',
    text: 'Практики, которые выводят из оцепенения. Тело, дыхание, фокус — вы снова чувствуете опору.',
  },
  {
    icon: 'Sunrise',
    title: 'Новый импульс',
    text: 'Системный путь, а не быстрые лайфхаки. Вы уходите с энергией и понятным планом движения.',
  },
];

const schedule = [
  { day: 'День 1', date: '12 июля', title: 'Диагностика. Где вы сейчас', desc: 'Безжалостный, но бережный разбор. Карта вашего состояния и точек напряжения.', time: '18:00 – 21:00' },
  { day: 'День 2', date: '13 июля', title: 'Дыхание и тело', desc: 'Телесные практики, дыхательные техники. Возвращаем контакт с собой.', time: '18:00 – 21:00' },
  { day: 'День 3', date: '14 июля', title: 'Встряска и ресурс', desc: 'Работа со страхами и блоками. Находим внутреннюю силу и опору.', time: '18:00 – 21:00' },
  { day: 'День 4', date: '15 июля', title: 'Новый импульс', desc: 'Сборка пути. Личный план движения и поддержка клуба на 30 дней.', time: '18:00 – 21:00' },
];

const experts = [
  { name: 'Анна Соколова', role: 'Основатель клуба СИЛА', bio: 'Психолог, телесный терапевт. 12 лет ведёт людей через личные кризисы к новой опоре.', icon: 'Anchor' },
  { name: 'Дмитрий Кравцов', role: 'Дыхательные практики', bio: 'Инструктор по дыхательным техникам и медитации. Автор методики «Глубокий вдох».', icon: 'Wind' },
  { name: 'Мария Лебедева', role: 'Работа с телом', bio: 'Соматический терапевт. Помогает вернуть энергию через движение и осознанность.', icon: 'Activity' },
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
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-sm bg-gold/15 border border-gold/40 flex items-center justify-center">
              <Icon name="Zap" className="text-gold" size={20} />
            </div>
            <span className="font-display font-bold text-lg tracking-wider">СИЛА</span>
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
            <p className="animate-fade-up text-gold font-display tracking-[0.3em] text-sm mb-6" style={{ animationDelay: '0.1s' }}>
              КЛУБ САМОРАЗВИТИЯ И ПОДДЕРЖКИ · КУРС-ИНТЕНСИВ
            </p>
            <h1 className="animate-fade-up font-display font-bold text-6xl md:text-8xl leading-[0.9] mb-6" style={{ animationDelay: '0.25s' }}>
              <span className="gold-text">ИМПУЛЬС</span>
            </h1>
            <p className="animate-fade-up text-xl md:text-2xl text-foreground/90 font-display font-light mb-4" style={{ animationDelay: '0.4s' }}>
              Сделай первый вдох настоящей жизни
            </p>
            <p className="animate-fade-up text-muted-foreground text-lg max-w-xl mb-10 leading-relaxed" style={{ animationDelay: '0.55s' }}>
              4 дня честной работы с собой. Мы препарируем то, что давит, делаем искусственное дыхание и возвращаем силу двигаться дальше.
            </p>
            <div className="animate-fade-up flex flex-col sm:flex-row gap-4" style={{ animationDelay: '0.7s' }}>
              <Button onClick={() => scrollTo('register')} size="lg" className="bg-gold text-primary-foreground hover:bg-gold/90 font-medium text-base h-13 px-8 gold-glow">
                <Icon name="Wind" size={18} className="mr-2" /> Сделать первый вдох
              </Button>
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
          <div className="max-w-2xl mb-16">
            <p className="text-gold font-display tracking-[0.25em] text-sm mb-4">О КУРСЕ</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">Мягкое препарирование без жалости</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              «ИМПУЛЬС» — это не про сладкие обещания. Это системная встряска для взрослых, уставших от пустых тренингов. Здесь вас поймут и помогут стать сильнее — но не будут нянчиться.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="group p-8 rounded-sm bg-card border border-border hover:border-gold/50 transition-all duration-300">
                <div className="w-14 h-14 rounded-sm bg-gold/10 border border-gold/30 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                  <Icon name={f.icon} className="text-gold" size={26} />
                </div>
                <h3 className="font-display font-semibold text-2xl mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="py-28 bg-secondary/30 relative grain">
        <div className="container relative z-10">
          <div className="max-w-2xl mb-16">
            <p className="text-gold font-display tracking-[0.25em] text-sm mb-4">РАСПИСАНИЕ</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">Путь от встряски до нового вдоха</h2>
            <p className="text-muted-foreground text-lg">Четыре вечера. Каждый шаг ведёт глубже — и выше.</p>
          </div>
          <div className="space-y-4">
            {schedule.map((s, i) => (
              <div key={i} className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-6 md:p-8 rounded-sm bg-card border border-border hover:border-gold/50 transition-all">
                <div className="md:w-40 shrink-0">
                  <div className="font-display font-bold text-2xl text-gold">{s.day}</div>
                  <div className="text-muted-foreground text-sm">{s.date} · {s.time}</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-xl mb-1">{s.title}</h3>
                  <p className="text-muted-foreground">{s.desc}</p>
                </div>
                <div className="hidden md:flex w-10 h-10 rounded-full border border-gold/30 items-center justify-center text-gold group-hover:bg-gold/10 transition-colors shrink-0">
                  {i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTS */}
      <section id="experts" className="py-28">
        <div className="container">
          <div className="max-w-2xl mb-16">
            <p className="text-gold font-display tracking-[0.25em] text-sm mb-4">СПЕЦИАЛИСТЫ</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">Те, кто проведёт вас через путь</h2>
            <p className="text-muted-foreground text-lg">Наставники клуба СИЛА — практики, прошедшие свой путь и ведущие других.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {experts.map((e) => (
              <div key={e.name} className="p-8 rounded-sm bg-card border border-border hover:border-gold/50 transition-all">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold/30 to-terracotta/40 border border-gold/40 flex items-center justify-center mb-6">
                  <Icon name={e.icon} className="text-gold" size={32} />
                </div>
                <h3 className="font-display font-semibold text-2xl mb-1">{e.name}</h3>
                <p className="text-gold text-sm mb-4">{e.role}</p>
                <p className="text-muted-foreground leading-relaxed">{e.bio}</p>
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
            <h2 className="font-display font-bold text-4xl md:text-5xl">Те, кто уже вдохнул</h2>
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
            <Button type="submit" className="w-full bg-gold text-primary-foreground hover:bg-gold/90 font-medium h-12 text-base">
              <Icon name="Wind" size={18} className="mr-2" /> Сделать первый вдох
            </Button>
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
                <div className="w-9 h-9 rounded-sm bg-gold/15 border border-gold/40 flex items-center justify-center">
                  <Icon name="Zap" className="text-gold" size={20} />
                </div>
                <span className="font-display font-bold text-lg tracking-wider">СИЛА</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">Клуб саморазвития и поддержки. Помогаем стать сильнее — честно и с заботой.</p>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-4">Контакты</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                <a href="tel:+70000000000" className="flex items-center gap-2 hover:text-gold transition-colors">
                  <Icon name="Phone" size={16} /> +7 (000) 000-00-00
                </a>
                <a href="mailto:hello@sila-club.ru" className="flex items-center gap-2 hover:text-gold transition-colors">
                  <Icon name="Mail" size={16} /> hello@sila-club.ru
                </a>
                <p className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} /> Москва, пространство клуба
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-4">Мы рядом</h4>
              <div className="flex gap-3">
                {['Send', 'Instagram', 'Youtube'].map((s) => (
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
