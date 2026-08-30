import { useEffect, useRef, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BarChart3,
  BookOpen,
  ChevronDown,
  Code2,
  Download,
  ExternalLink,
  GraduationCap,
  LineChart,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Network,
  Phone,
  Users,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

// KONFIGURASI POSISI — area utama untuk mengganti lamaran berikutnya.
const position = {
  name: 'Frido Evindey Manihuruk',
  role: 'Champion Trainee – Supply Chain Management',
  tagline:
    'Calon profesional yang siap membawa kemampuan analisis data dan riset ekonomi ke dalam pengelolaan rantai pasok yang lebih efisien, akurat, dan berbasis data.',
  // [GANTI: URL CV publik jika ada versi terbaru]
  cv: 'https://drive.google.com/file/d/1aGQyDurTLheiBfWFR4-zp1C2e-Dp-mUD/view?usp=sharing',
  email: 'fridomanihuruk289@gmail.com',
  whatsapp: 'https://wa.me/6283163258425',
  // [GANTI: URL LinkedIn jika diperlukan]
  linkedin: 'https://linkedin.com/in/fridoevindeym298/',
};

const navigation = [
  ['Beranda', 'beranda'],
  ['Tentang', 'tentang'],
  ['Pengalaman', 'pengalaman'],
  ['Proyek', 'proyek'],
  ['Sertifikasi', 'sertifikasi'],
  ['Kontak', 'kontak'],
];

function usePortfolioInteractions() {
  const [activeSection, setActiveSection] = useState('beranda');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sections = navigation
      .map(([, id]) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const revealItems = Array.from(document.querySelectorAll('.reveal'));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12, rootMargin: '0px 0px -45px' },
    );
    const sectionObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { threshold: 0.25, rootMargin: '-78px 0px -45% 0px' },
    );
    revealItems.forEach((item) => observer.observe(item));
    sections.forEach((section) => sectionObserver.observe(section));
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };
  return { activeSection, scrolled, mobileOpen, setMobileOpen, goTo };
}

function Navigation() {
  const { activeSection, scrolled, mobileOpen, setMobileOpen, goTo } = usePortfolioInteractions();
  return (
    <header className={`nav-shell ${scrolled ? 'scrolled' : ''}`}>
      <div className="section-wrap nav-inner">
        <button className="nav-mark" onClick={() => goTo('beranda')} data-testid="button-home">
          <span className="nav-mark-square">FM</span>
          <span className="mono-label">Portfolio / 2026</span>
        </button>
        <nav className="nav-links" aria-label="Navigasi utama">
          {navigation.map(([label, id]) => (
            <button
              key={id}
              className={`nav-link ${activeSection === id ? 'active' : ''}`}
              onClick={() => goTo(id)}
              data-testid={`link-${id}`}
            >
              {label}
            </button>
          ))}
        </nav>
        <a className="nav-cta" href={position.cv} target="_blank" rel="noreferrer" data-testid="link-download-cv">
          Unduh CV <Download size={14} />
        </a>
        <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Buka menu" data-testid="button-mobile-menu">
          {mobileOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      {mobileOpen && (
        <nav className="mobile-menu" aria-label="Navigasi mobile">
          {navigation.map(([label, id]) => (
            <button key={id} className={`nav-link ${activeSection === id ? 'active' : ''}`} onClick={() => goTo(id)} data-testid={`mobile-link-${id}`}>
              {label}
            </button>
          ))}
          <a className="nav-cta" href={position.cv} target="_blank" rel="noreferrer" data-testid="mobile-link-cv">
            Unduh CV <Download size={14} />
          </a>
        </nav>
      )}
    </header>
  );
}

function SectionHeading({ index, title, children }: { index: string; title: string; children: ReactNode }) {
  return (
    <div className="section-heading reveal">
      <div className="section-index mono-label">{index}</div>
      <div>
        <h2 className="section-title display-font">{title}</h2>
        <div className="accent-rule" />
        <p className="section-lede">{children}</p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="beranda" className="hero" aria-label="Beranda">
      <div className="hero-grid">
        <div className="reveal">
          <div className="hero-kicker mono-label">Open to opportunity / Medan, Indonesia</div>
          <h1 className="hero-title display-font">Frido Evindey <em>Manihuruk</em></h1>
          <div className="hero-role">{position.role}</div>
          <p className="hero-copy">{position.tagline}</p>
          <div className="hero-actions">
            <a className="button-primary" href={position.cv} target="_blank" rel="noreferrer" data-testid="hero-download-cv">
              Unduh CV <Download size={15} />
            </a>
            <a className="button-outline" href="#kontak" data-testid="hero-contact-link">
              Hubungi Saya <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="hero-contact-row">
            <a href={`mailto:${position.email}`} data-testid="hero-email"><Mail size={14} /> {position.email}</a>
            <a href={position.whatsapp} target="_blank" rel="noreferrer" data-testid="hero-whatsapp"><MessageCircle size={14} /> WhatsApp</a>
            <a href={position.linkedin} target="_blank" rel="noreferrer" data-testid="hero-linkedin"><Network size={14} /> LinkedIn</a>
          </div>
        </div>
        <div className="hero-portrait reveal delay-2">
          <div className="portrait-frame">
            {/* [GANTI: upload foto profesional potret Frido di area ini] */}
            <div className="portrait-art" aria-hidden="true" />
            <span className="hero-number">01 / 06</span>
            <div className="portrait-placeholder" data-testid="placeholder-portrait">
              <strong>[GANTI: Foto profesional]</strong><br />
              Placeholder visual — ganti dengan foto portrait resmi.
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-cue mono-label"><span className="scroll-line" /> Scroll to explore <ArrowDown size={13} /></div>
    </section>
  );
}

function About() {
  return (
    <section id="tentang" className="light-section section-pad">
      <div className="section-wrap">
        <SectionHeading index="02 / Tentang" title="Ekonomi bertemu keputusan operasional.">
          Sarjana Ilmu Ekonomi yang nyaman membaca angka, menyusun konteks, dan menerjemahkan temuan menjadi langkah yang dapat dijalankan.
        </SectionHeading>
        <div className="about-grid">
          <p className="profile-summary reveal">
            Sarjana Ilmu Ekonomi Universitas Negeri Medan (IPK 3,71/4,00) dengan pengalaman dalam analisis data ekonomi regional, riset kebijakan perdagangan dan komoditas, serta koordinasi administratif di lingkungan pemerintahan. Terbiasa bekerja dengan data kuantitatif dan tertarik mengembangkan karier di bidang supply chain, perdagangan, dan logistik.
          </p>
          <div className="stat-grid reveal delay-1">
            {[
              ['3.71', 'IPK / 4.00'],
              ['20+', 'Publikasi Ilmiah'],
              ['5+', 'Pengalaman Organisasi'],
              ['2026', 'Tahun Lulus'],
            ].map(([number, label]) => (
              <div className="stat" key={label} data-testid={`stat-${label.replaceAll(' ', '-').toLowerCase()}`}>
                <span className="stat-number">{number}</span><span className="stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="education-block reveal">
          <article className="education-card">
            <GraduationCap size={20} />
            <h3>S1 Ilmu Ekonomi</h3>
            <p>Universitas Negeri Medan<br />Agustus 2022 – April 2026 · IPK 3,71/4,00</p>
          </article>
          <article className="education-card">
            <BookOpen size={20} />
            <h3>IPS</h3>
            <p>SMA Swasta Methodist-3 Medan<br />Juli 2018 – Mei 2021 · Rata-rata 91</p>
          </article>
        </div>
      </div>
    </section>
  );
}

const workExperience = [
  {
    date: 'JAN — FEB 2025',
    title: 'Analis Ekonomi Regional',
    org: 'BAPPERIDA Sumatera Utara · Bidang PSDA',
    text: 'Menganalisis indikator ekonomi regional, menyunting laporan KEK Sei Mangkei, terlibat riset dampak sektor jasa keuangan terhadap komoditas unggulan Sumatera Utara, serta verifikasi laporan kinerja ASN via sistem e-Kinerja.',
  },
  {
    date: 'SEP 2025 — JAN 2026',
    title: 'Tim Akreditasi Prodi Ilmu Ekonomi',
    org: 'Universitas Negeri Medan',
    text: 'Merekapitulasi dan memverifikasi 122 riwayat penelitian dan pengabdian dosen melalui sistem LAMEMBA, berkontribusi pada pencapaian akreditasi “Unggul” selama 5 tahun.',
  },
];

const orgExperience = [
  {
    date: 'AGU 2025 — JUN 2026',
    title: 'Anggota Divisi Pengabdian Masyarakat',
    org: 'GenBI Sumatera Utara',
    text: 'Sekretaris panitia program edukasi keuangan CBP Rupiah, koordinator konsumsi kegiatan donor darah bersama PMI Kota Medan.',
  },
  {
    date: 'FEB — DES 2024',
    title: 'Koordinator Divisi Agama Kristen',
    org: 'Himpunan Mahasiswa Ilmu Ekonomi',
    text: 'Mengoordinasikan 3 anggota divisi, PIC kegiatan Natal (500+ peserta, 14 dosen), dan kegiatan sosial panti asuhan (18 anak).',
  },
  {
    date: 'SEP 2022 — JUN 2026',
    title: 'Asisten Pelatih',
    org: 'PSM Magnificum Et Bonum',
    text: 'Membina 40–50 anggota paduan suara, conductor untuk 46 penyanyi pada Konser ke-7.',
  },
];

function Experience() {
  const [activeTab, setActiveTab] = useState<'work' | 'org'>('work');
  const entries = activeTab === 'work' ? workExperience : orgExperience;
  return (
    <section id="pengalaman" className="experience-section section-pad">
      <div className="section-wrap">
        <SectionHeading index="03 / Pengalaman" title="Bekerja dengan teliti. Memimpin dengan konteks.">
          Pengalaman yang membentuk cara kerja: disiplin pada data, tenang dalam koordinasi, dan selalu menghubungkan tugas kecil dengan hasil yang lebih besar.
        </SectionHeading>
        <div className="experience-tabs reveal">
          <button className={`tab-button ${activeTab === 'work' ? 'active' : ''}`} onClick={() => setActiveTab('work')} data-testid="tab-work">Pengalaman Kerja</button>
          <button className={`tab-button ${activeTab === 'org' ? 'active' : ''}`} onClick={() => setActiveTab('org')} data-testid="tab-organization">Organisasi</button>
        </div>
        <div className="timeline" data-testid={`timeline-${activeTab}`}>
          {entries.map((entry, index) => (
            <article className={`timeline-item reveal delay-${Math.min(index + 1, 3)}`} key={entry.title}>
              <div className="timeline-date">{entry.date}</div>
              <div className="timeline-card">
                <h3>{entry.title}</h3>
                <span className="org">{entry.org}</span>
                <p>{entry.text}</p>
                {activeTab === 'org' && (
                  <div className="org-photo">
                    <div className="org-photo-box" data-testid={`placeholder-org-photo-${index}`}>PHOTO</div>
                    <span>[GANTI: Foto kegiatan organisasi]</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmbedPlaceholder({ label }: { label: string }) {
  const iframeMarkup = `<html><body style="margin:0;background:#17243a;color:#aebac8;display:grid;place-items:center;font:11px monospace;letter-spacing:1px">TABLEAU EMBED AREA</body></html>`;
  return (
    <div className="embed-frame">
      {/* COPY PASTE TABLEAU EMBED CODE DI SINI */}
      <iframe title={`${label} Tableau embed placeholder`} srcDoc={iframeMarkup} />
      <div className="embed-note"><ExternalLink size={15} /><span>[GANTI: Link / embed Tableau Public]</span></div>
    </div>
  );
}

function Projects() {
  const [openResearch, setOpenResearch] = useState<string | null>('background');
  const toggle = (key: string) => setOpenResearch(openResearch === key ? null : key);
  return (
    <section id="proyek" className="projects-section section-pad">
      <div className="section-wrap">
        <SectionHeading index="04 / Proyek & Riset" title="Dari data transaksi sampai guncangan global.">
          Tiga studi yang menunjukkan rentang berpikir: mengubah data mentah menjadi visibilitas, membuat keputusan persediaan lebih terukur, lalu menguji cerita ekonomi dengan metode yang ketat.
        </SectionHeading>
        <div className="project-stack">
          <article className="project-card reveal">
            <div className="project-visual dashboard-visual">
              <span className="visual-label"><BarChart3 size={13} /> Retail intelligence</span>
              <div className="placeholder-badge">[GANTI: Tableau preview]</div>
            </div>
            <div className="project-content">
              <div className="project-number mono-label">Project 01 / Interactive analysis</div>
              <h3>Retail Sales Performance Dashboard</h3>
              <p>Menganalisis jutaan baris data transaksi ritel untuk mengidentifikasi tren profitabilitas, performa kategori, dan efisiensi wilayah.</p>
              <div className="tag-list">
                {['Data Cleaning', 'Descriptive Analytics', 'Data Visualization', 'Cross-Selling Strategy'].map((tag) => <span className="tag" key={tag}>{tag}</span>)}
              </div>
              <EmbedPlaceholder label="Retail Sales Performance Dashboard" />
              <a className="project-link" href="#kontak" data-testid="link-tableau-retail">[GANTI: Link ke Tableau Public] <ArrowUpRight size={14} /></a>
            </div>
          </article>

          <article className="project-card dark-card reveal delay-1">
            <div className="project-visual supply-visual">
              {/* [GANTI: Masukkan link gambar Excel ROP di sini] */}
              <div className="excel-sheet">
                <img
                  className="placeholder-image"
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='180' viewBox='0 0 240 180'%3E%3Crect width='240' height='180' fill='%23f9fbfc'/%3E%3Cpath d='M0 38h240M0 70h240M0 102h240M0 134h240M48 0v180M96 0v180M144 0v180M192 0v180' stroke='%23d9e2e8'/%3E%3Cpath d='M9 23h26' stroke='%236c2648' stroke-width='4'/%3E%3C/svg%3E"
                  alt="[GANTI: Gambar Excel ROP]"
                />
                <span className="placeholder-badge">[GANTI: Excel ROP]</span>
              </div>
              {/* [GANTI: Masukkan preview Tableau di sini] */}
              <div className="mini-chart">
                <iframe title="Supply chain Tableau preview placeholder" srcDoc="<html><body style='margin:0;background:transparent;color:#c59aaf;display:grid;place-items:center;font:10px monospace;letter-spacing:1px'>[GANTI: TABLEAU]</body></html>" />
                <span className="placeholder-badge">FORECAST</span>
              </div>
            </div>
            <div className="project-content">
              <div className="project-number mono-label">Project 02 / Planning model</div>
              <h3>Supply Chain & Demand Forecasting</h3>
              <p>Memodelkan optimasi persediaan dan memprediksi permintaan masa depan untuk menekan Stockout Rate hingga di bawah batas kritis. Menghitung parameter Reorder Point (ROP) dan Safety Stock.</p>
              <div className="tag-list">
                {['ARIMA Time-Series Forecasting (R)', 'Inventory Planning', 'Reorder Point Calculation'].map((tag) => <span className="tag" key={tag}>{tag}</span>)}
              </div>
              <a className="project-link" href="#kontak" data-testid="link-tableau-forecast">[GANTI: Link ke Tableau / file Excel] <ArrowUpRight size={14} /></a>
            </div>
          </article>

          <article className="research-card reveal delay-2">
            <div className="research-visual">
              {/* [GANTI: Masukkan gambar grafik IRF / FEVD di sini] */}
              <div className="irf-chart" data-testid="placeholder-research-chart">
                <span className="placeholder-badge">[GANTI: Grafik IRF / FEVD]</span>
              </div>
            </div>
            <div className="research-copy">
              <div className="project-number mono-label">Project 03 / Macroeconomics research</div>
              <h3>Global Shocks & Sovereign Borrowing Costs</h3>
              <p className="research-subtitle">A Structural VAR Analysis on Exchange Rate Pass-Through</p>
              <div className="accordion">
                {[
                  ['background', 'Latar belakang & metode', <><p>Menganalisis transmisi guncangan GEPU, BDI, dan WTI terhadap sektor riil, inflasi, nilai tukar, dan imbal hasil obligasi di Indonesia (small open economy). Menyoroti hipotesis reversed causality dari nilai tukar menuju imbal hasil obligasi.</p><p><strong>Metode:</strong> Structural Vector Autoregression (SVAR) dengan monthly time-series data (Januari 2010–November 2025).</p></>],
                  ['findings', 'Temuan utama', <ul className="finding-list"><li>Guncangan WTI menekan inflasi namun memberi respons positif pada IPI.</li><li>Depresiasi memicu kenaikan YIELD kontemporer, mendukung hipotesis currency risk premium.</li><li>Pada horizon 32 bulan, inflasi adalah penyumbang eksternal terbesar variasi YIELD (34,06%).</li></ul>],
                  ['implication', 'Implikasi', <p>Menegaskan pentingnya intervensi valas dan stabilisasi inflasi jangka panjang untuk mengendalikan biaya pembiayaan utang pemerintah.</p>],
                ].map(([key, label, content]) => (
                  <div className="accordion-item" key={key as string}>
                    <button className={`accordion-trigger ${openResearch === key ? 'open' : ''}`} onClick={() => toggle(key as string)} data-testid={`accordion-${key}`}>
                      {label as string}<ChevronDown size={17} />
                    </button>
                    {openResearch === key && <div className="accordion-panel">{content}</div>}
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

const skillGroups = [
  { icon: <LineChart size={18} />, title: 'Analisis & Bisnis', skills: ['Analisis Ekonomi & Keuangan', 'Analisis Data', 'Analytical Thinking & Problem Solving', 'Banking & Financial Systems'] },
  { icon: <Users size={18} />, title: 'Kepemimpinan & Interpersonal', skills: ['Leadership', 'Communication', 'Teamwork', 'Stakeholder Coordination'] },
  { icon: <Code2 size={18} />, title: 'Tools Teknis', skills: ['Microsoft Excel', 'EViews', 'RStudio', 'Tableau', 'SmartPLS', 'Canva', 'Python', 'SQL', 'Google Looker Studio'] },
];

function Skills() {
  return (
    <section className="light-section section-pad">
      <div className="section-wrap">
        <SectionHeading index="05 / Keahlian" title="Alat yang dipakai untuk membuat hal rumit terbaca.">
          Fondasi analitis, kemampuan bekerja bersama, serta toolset teknis untuk bergerak dari pertanyaan ke keputusan.
        </SectionHeading>
        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <article className={`skill-group reveal delay-${index + 1}`} key={group.title}>
              <h3>{group.icon}{group.title}</h3>
              <div className="skill-pills">{group.skills.map((skill) => <span className="skill-pill" key={skill}>{skill}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const certifications = [
  ['Bootcamp Data Analyst', 'Excel, SQL, Python, Google Looker Studio · PT. Ebiz Karisma · Juli 2026'],
  ['TOEFL Prediction', 'Skor 500 · Asterdam Course'],
  ['Uji Kemahiran Berbahasa Indonesia', 'Skor 565 · Badan Bahasa'],
  ['E-Learning Pengenalan Kebijakan Publik', 'Kementerian Keuangan · 2026'],
  ['E-Learning Pengantar Manajemen Keuangan Negara', 'Kementerian Keuangan'],
  ['Dasar Microsoft Excel untuk Administrasi Perkantoran', 'PT. Yureka Edukasi Cipta'],
  ['LIKE IT', 'Bank Indonesia, OJK, Kemenkeu, dan LPS · Oktober 2025'],
];

function Certifications() {
  return (
    <section id="sertifikasi" className="cert-section section-pad">
      <div className="section-wrap">
        <SectionHeading index="06 / Sertifikasi" title="Belajar, lalu mengujinya dalam praktik.">
          Pelatihan yang memperluas kemampuan kerja—dari data dan bahasa, sampai kebijakan publik dan sistem keuangan.
        </SectionHeading>
        <div className="cert-grid">
          {certifications.map(([title, detail], index) => (
            <article className={`cert-card reveal delay-${Math.min((index % 3) + 1, 3)}`} key={title} data-testid={`certification-${index}`}>
              <div className="cert-icon"><Award size={17} /></div>
              <div><h3>{title}</h3><p>{detail}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="kontak" className="contact-section section-pad">
      <div className="section-wrap">
        <div className="contact-grid">
          <div className="reveal">
            <div className="hero-kicker mono-label">07 / Kontak</div>
            <h2 className="contact-title display-font">Mari membangun keputusan yang <em>lebih baik.</em></h2>
            <p className="contact-copy">Tertarik berdiskusi tentang supply chain, analisis ekonomi, atau peluang kolaborasi? Saya siap terhubung.</p>
            <div className="contact-actions">
              <a className="button-primary" href={`mailto:${position.email}`} data-testid="contact-send-email">Kirim Email <Mail size={15} /></a>
              <a className="button-outline" href={position.whatsapp} target="_blank" rel="noreferrer" data-testid="contact-whatsapp">Hubungi via WhatsApp <MessageCircle size={15} /></a>
            </div>
          </div>
          <div className="contact-details reveal delay-1">
            <a className="contact-detail" href={`mailto:${position.email}`} data-testid="contact-email"><Mail size={17} /> {position.email}</a>
            <a className="contact-detail" href={position.whatsapp} target="_blank" rel="noreferrer" data-testid="contact-phone"><Phone size={17} /> +62 831-6325-8425</a>
            <a className="contact-detail" href={position.linkedin} target="_blank" rel="noreferrer" data-testid="contact-linkedin"><Network size={17} /> linkedin.com/in/fridoevindeym298/ <ExternalLink size={13} /></a>
            <div className="contact-detail"><MapPin size={17} /> Medan, Sumatera Utara, Indonesia</div>
          </div>
        </div>
        <footer className="footer-row">
          <span>© 2026 Frido Evindey Manihuruk</span>
          <span>Focused on data. Ready for operations.</span>
        </footer>
      </div>
    </section>
  );
}

function Home() {
  return (
    <div className="site-shell">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;