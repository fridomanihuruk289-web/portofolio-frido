import { useEffect, useRef, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BookOpen,
  ChevronDown,
  Code2,
  Download,
  ExternalLink,
  GraduationCap,
  Linkedin,
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
import portraitImage from '@assets/Foto_Kasual_4x5_1788089653019.png';
import supplyChainImage from '@assets/image_868571.png_1788097299939.png';
import arimaForecastImage from '@assets/Rplot.png_1788097319770.png';
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
        <div className="hero-copy-column reveal">
          <div className="hero-kicker mono-label">Open to opportunity / Medan, Indonesia</div>
          <h1 className="hero-title display-font">
            <em>I'M</em>
            <strong>FRIDO</strong>
          </h1>
          <div className="hero-actions">
            <a className="button-primary" href={position.cv} target="_blank" rel="noreferrer" data-testid="hero-download-cv">
              Unduh CV <Download size={15} />
            </a>
            <a className="button-outline" href="#kontak" data-testid="hero-contact-link">
              Hubungi Saya <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="hero-role">CHAMPION TRAINEE</div>
          <p className="hero-copy">{position.tagline}</p>
        </div>
        <div className="hero-portrait reveal delay-2">
          <div className="follow-me">
            <span className="follow-me-label">Follow Me</span>
            <div className="social-links">
              <a href={`mailto:${position.email}`} aria-label="Email Frido" data-testid="hero-email"><Mail size={15} /></a>
              <a href={position.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp Frido" data-testid="hero-whatsapp"><MessageCircle size={15} /></a>
              <a href={position.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn Frido" data-testid="hero-linkedin"><Linkedin size={15} /></a>
            </div>
          </div>
          <div className="portrait-frame">
            {/* Source: PNG without background */}
            <img className="portrait-image" src={portraitImage} alt="Frido Evindey Manihuruk" data-testid="img-hero-portrait" />
            <span className="hero-number">01 / 06</span>
          </div>
          <div className="hero-side-label"><span>DATA ANALYST &amp;</span><span>SUPPLY CHAIN</span></div>
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
              ['3', 'Pengalaman Organisasi'],
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

function TableauEmbed({ label }: { label: string }) {
  const tableauRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = tableauRef.current;
    if (!container) return;

    const script = document.createElement('script');
    script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    script.async = true;
    container.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div ref={tableauRef} className="embed-frame w-full overflow-hidden">
      {/* COPY PASTE TABLEAU EMBED CODE DI SINI */}
      <div className="tableauPlaceholder" id="viz1788090535935" style={{ position: 'relative', width: '100%' }}>
        <noscript>
          <a href="https://public.tableau.com/views/SalesPerformanceDashboard_17878396204710/Dashboard1?:showVizHome=no">
            <img
              alt="Sales Performance Dashboard 2025 Toko Peralatan Dapur ABC"
              src="https://public.tableau.com/static/images/Sa/SalesPerformanceDashboard_17878396204710/Dashboard1/1_rss.png"
              style={{ border: 'none', width: '100%' }}
            />
          </a>
        </noscript>
        <object className="tableauViz" style={{ display: 'none' }}>
          <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
          <param name="embed_code_version" value="3" />
          <param name="site_root" value="" />
          <param name="name" value="SalesPerformanceDashboard_17878396204710/Dashboard1" />
          <param name="tabs" value="no" />
          <param name="toolbar" value="yes" />
          <param name="static_image" value="https://public.tableau.com/static/images/Sa/SalesPerformanceDashboard_17878396204710/Dashboard1/1.png" />
          <param name="animate_transition" value="yes" />
          <param name="display_static_image" value="yes" />
          <param name="display_spinner" value="yes" />
          <param name="display_overlay" value="yes" />
          <param name="display_count" value="yes" />
          <param name="language" value="en-US" />
          <param name="filter" value="publish=yes" />
        </object>
      </div>
      <div className="embed-note"><ExternalLink size={15} /><span>{label} • live Tableau dashboard</span></div>
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
          <article className="project-card retail-card reveal">
            <div className="project-content">
              <div className="project-number mono-label">Project 01 / Interactive analysis</div>
              <h3>Retail Sales Performance Dashboard</h3>
              <p>Menganalisis jutaan baris data transaksi ritel untuk mengidentifikasi tren profitabilitas, performa kategori, dan efisiensi wilayah.</p>
              <div className="tag-list">
                {['Data Cleaning', 'Descriptive Analytics', 'Data Visualization', 'Cross-Selling Strategy'].map((tag) => <span className="tag" key={tag}>{tag}</span>)}
              </div>
              <TableauEmbed label="Retail Sales Performance Dashboard" />
              <a className="project-link" href="https://public.tableau.com/views/SalesPerformanceDashboard_17878396204710/Dashboard1?:showVizHome=no" target="_blank" rel="noreferrer" data-testid="link-tableau-retail">Buka di Tableau Public <ArrowUpRight size={14} /></a>
            </div>
          </article>

          <article className="project-card forecast-card dark-card reveal delay-1">
            <div className="project-content">
              <div className="project-number mono-label">Project 02 / Planning model</div>
              <h3>Supply Chain & Demand Forecasting</h3>
              <p>Memodelkan optimasi persediaan dan memprediksi permintaan masa depan untuk menekan Stockout Rate hingga di bawah batas kritis. Menghitung parameter Reorder Point (ROP) dan Safety Stock.</p>
              <div className="tag-list">
                {['ARIMA Time-Series Forecasting (R)', 'Inventory Planning', 'Reorder Point Calculation'].map((tag) => <span className="tag" key={tag}>{tag}</span>)}
              </div>
              <a className="project-link secondary-project-link" href="https://public.tableau.com/shared/DFGNHB7JZ" target="_blank" rel="noreferrer" data-testid="link-tableau-forecast">Buka Dashboard di Tableau Public <ArrowUpRight size={14} /></a>
            </div>
            <div className="project-visual supply-visual">
              <figure className="forecast-image-card">
                <img className="w-full h-auto object-contain rounded-lg border shadow-sm forecast-image" src={supplyChainImage} alt="Excel ROP Calculation" />
                <figcaption>Gambar 1: Perhitungan Parameter ROP &amp; Safety Stock</figcaption>
              </figure>
              <figure className="forecast-image-card">
                <img className="w-full h-auto object-contain rounded-lg border shadow-sm forecast-image" src={arimaForecastImage} alt="ARIMA Demand Forecast" />
                <figcaption>Gambar 2: Prediksi Permintaan menggunakan model ARIMA di R</figcaption>
              </figure>
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