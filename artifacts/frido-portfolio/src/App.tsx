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
import supplyChainDashboardImage from '@assets/image_1788099334600.png';
import retailDashboardImage from '@assets/image_1788099566300.png';
import supplyChainImage from '@assets/image_868571.png_1788097299939.png';
import arimaForecastImage from '@assets/Rplot.png_1788097319770.png';
import irfImage from '@assets/download_1788154953408.png';
import genbiImage from '@assets/DSC00677_1788156866901.jpg';
import himpunanImage from '@assets/IMG_2510.JPG_1788156866897.jpeg';
import psmImage from '@assets/DSC02683_1788156866900.jpg';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

// KONFIGURASI POSISI — area utama untuk mengganti lamaran berikutnya.
const position = {
  name: 'Frido Evindey Manihuruk',
  role: 'Internship – Business Development Staff',
  tagline:
    'Calon profesional yang siap membawa kemampuan analisis data, pemetaan pasar industri, dan riset ekonomi ke dalam pengembangan bisnis kawasan industri dan ekosistem tenant secara sistematis dan berbasis data.',
  // [GANTI: URL CV publik jika ada versi terbaru]
  cv: 'https://drive.google.com/file/d/12WnCpTzfs_IuJtOwbDi2PaQ2vI8wScFb/view?usp=drive_link',
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
  ['Pelatihan dan Sertifikasi', 'sertifikasi'],
  ['Publikasi', 'publikasi'],
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
          <div className="hero-role">{position.role}</div>
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
            Sarjana Ekonomi Universitas Negeri Medan (IPK 3,71) dengan pengalaman solid dalam analisis data, riset ekonomi, dan koordinasi stakeholder. Memiliki rekam jejak magang di BAPPERIDA Sumatera Utara dalam pengolahan data regional, serta pengalaman memimpin 40-50 anggota dalam organisasi mahasiswa. Didukung oleh 20+ publikasi ilmiah dan keahlian teknis (Tableau, Excel, EViews, SmartPLS), saya memiliki minat kuat pada business development, market mapping, dan pengembangan kawasan industri.
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
    date: 'AGUSTUS 2025 — JUNI 2026',
    title: 'Anggota Divisi Pengabdian Masyarakat',
    org: 'GenBI Sumatera Utara',
    image: genbiImage,
    alt: 'Kegiatan GenBI',
    points: [
      'Sekretaris panitia edukasi keuangan dan CBP Rupiah di SLB (67+ peserta), mengelola administrasi (TOR, LPJ) dan koordinasi pihak sekolah.',
      'Koordinator konsumsi program donor darah bersama PMI Kota Medan.',
    ],
  },
  {
    date: 'FEBRUARI 2024 — DESEMBER 2024',
    title: 'Koordinator Divisi Agama Kristen',
    org: 'Himpunan Mahasiswa Ilmu Ekonomi',
    image: himpunanImage,
    alt: 'Kegiatan Himpunan',
    points: [
      'Memimpin 3 anggota divisi dan berkolaborasi dengan 30 pengurus himpunan dalam program kerja keagamaan dan sosial.',
      'Menjadi PIC utama perayaan Natal (500+ peserta, 14 dosen) dan koordinator bakti sosial panti asuhan.',
    ],
  },
  {
    date: 'SEPTEMBER 2022 — JUNI 2026',
    title: 'Asisten Pelatih',
    org: 'PSM Magnificum Et Bonum',
    image: psmImage,
    alt: 'Konser PSM',
    points: [
      'Melatih dan mengevaluasi perkembangan vokal 40–50 anggota paduan suara secara rutin setiap minggu.',
      'Dipercaya sebagai conductor untuk 46 penyanyi pada Konser ke-7 PSM Magnificum Et Bonum.',
    ],
  },
];

function Experience() {
  const [activeTab, setActiveTab] = useState<'work' | 'org'>('work');
  const setTab = (tab: 'work' | 'org') => setActiveTab(tab);
  return (
    <section id="pengalaman" className="experience-section section-pad">
      <div className="section-wrap">
        <SectionHeading index="03 / Pengalaman" title="Bekerja dengan teliti. Memimpin dengan konteks.">
          Pengalaman yang membentuk cara kerja: disiplin pada data, tenang dalam koordinasi, dan selalu menghubungkan tugas kecil dengan hasil yang lebih besar.
        </SectionHeading>
        <div className="experience-tabs reveal" role="tablist" aria-label="Kategori pengalaman">
          <button
            className={`tab-button ${activeTab === 'work' ? 'active' : ''}`}
            id="tab-work"
            role="tab"
            aria-selected={activeTab === 'work'}
            aria-controls="pengalaman-kerja-panel"
            onClick={() => setTab('work')}
            data-testid="tab-work"
          >
            Pengalaman Kerja
          </button>
          <button
            className={`tab-button ${activeTab === 'org' ? 'active' : ''}`}
            id="tab-organization"
            role="tab"
            aria-selected={activeTab === 'org'}
            aria-controls="organisasi-panel"
            onClick={() => setTab('org')}
            data-testid="tab-organization"
          >
            Organisasi
          </button>
        </div>
        <div
          id="pengalaman-kerja-panel"
          className={`tab-panel ${activeTab !== 'work' ? 'hidden' : ''}`}
          role="tabpanel"
          aria-labelledby="tab-work"
          hidden={activeTab !== 'work'}
          data-testid="panel-work"
        >
          <div className="timeline" data-testid="timeline-work">
            {workExperience.map((entry, index) => (
              <article className={`timeline-item reveal delay-${Math.min(index + 1, 3)} ${activeTab === 'work' ? 'is-visible' : ''}`} key={entry.title}>
                <div className="timeline-date">{entry.date}</div>
                <div className="timeline-card">
                  <h3>{entry.title}</h3>
                  <span className="org">{entry.org}</span>
                  <p>{entry.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div
          id="organisasi-panel"
          className={`tab-panel ${activeTab !== 'org' ? 'hidden' : ''}`}
          role="tabpanel"
          aria-labelledby="tab-organization"
          hidden={activeTab !== 'org'}
          data-testid="panel-organization"
        >
          <div className="timeline" data-testid="timeline-org">
            {orgExperience.map((entry, index) => (
              <article className={`timeline-item reveal delay-${Math.min(index + 1, 3)} ${activeTab === 'org' ? 'is-visible' : ''}`} key={entry.title}>
                <div className="timeline-date">{entry.date}</div>
                <div className="timeline-card org-entry-grid">
                  <figure className="org-media">
                    <img src={entry.image} alt={entry.alt} />
                    <figcaption>{entry.alt}</figcaption>
                  </figure>
                  <div className="org-copy">
                    <h3>{entry.title}</h3>
                    <span className="org">{entry.org}</span>
                    <ul className="org-points">
                      {entry.points.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TableauImagePreview({
  image,
  alt,
  href,
  testId,
}: {
  image: string;
  alt: string;
  href: string;
  testId: string;
}) {
  return (
    <a
      className="tableau-image-preview"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Buka ${alt} di Tableau Public`}
      data-testid={testId}
    >
      <img src={image} alt={alt} />
      <span className="tableau-image-preview-label">Buka di Tableau Public <ArrowUpRight size={14} /></span>
    </a>
  );
}

function TableauEmbed({
  id,
  alt,
  image,
  workbook,
  mobileHeight,
  filter,
}: {
  id: string;
  alt: string;
  image: string;
  workbook: string;
  mobileHeight: number;
  filter?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const vizElement = container?.querySelector('object.tableauViz') as HTMLElement | null;
    if (!container || !vizElement) return;

    const resizeViz = () => {
      const width = container.offsetWidth;
      vizElement.style.width = '100%';
      vizElement.style.height = width > 500 ? `${width * 0.75}px` : `${mobileHeight}px`;
    };

    resizeViz();
    const resizeObserver = new ResizeObserver(resizeViz);
    resizeObserver.observe(container);

    const scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
    vizElement.parentNode?.insertBefore(scriptElement, vizElement);

    return () => {
      resizeObserver.disconnect();
      scriptElement.remove();
    };
  }, [mobileHeight]);

  return (
    <div
      ref={containerRef}
      className="tableau-embed-container"
      id={id}
      style={{ position: 'relative', width: '100%' }}
      data-testid={`${id}-embed`}
    >
      <noscript>
        <a href={image} target="_blank" rel="noreferrer">
          <img alt={alt} src={image} />
        </a>
      </noscript>
      <object className="tableauViz" style={{ display: 'none' }}>
        <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
        <param name="embed_code_version" value="3" />
        <param name="site_root" value="" />
        <param name="name" value={workbook} />
        <param name="tabs" value="no" />
        <param name="toolbar" value="yes" />
        <param name="static_image" value={image} />
        <param name="animate_transition" value="yes" />
        <param name="display_static_image" value="yes" />
        <param name="display_spinner" value="yes" />
        <param name="display_overlay" value="yes" />
        <param name="display_count" value="yes" />
        <param name="language" value="en-US" />
        {filter && <param name="filter" value={filter} />}
      </object>
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
          Lima studi yang menunjukkan rentang berpikir: memetakan peluang kawasan industri, membaca kesejahteraan regional, mengubah data mentah menjadi visibilitas, membuat keputusan persediaan lebih terukur, lalu menguji cerita ekonomi dengan metode yang ketat.
        </SectionHeading>
        <div className="project-stack">
          <article className="project-card new-project-card reveal">
            <div className="project-content">
              <div className="project-number mono-label">Project 01 / Business development</div>
              <h3>Industrial Market, Tenant &amp; Investor Opportunity Mapping</h3>
              <p>Menganalisis 100 entitas sintetis dari 10 sektor industri untuk memetakan profil industri, tenant, dan calon investor kawasan industri. Mengolah indikator investasi, kebutuhan lahan, pertumbuhan, dan sinergi ekosistem.</p>
              <div className="tag-list">
                {['Business Development', 'Market Intelligence', 'Opportunity Scoring', 'Tableau Dashboard'].map((tag) => <span className="tag" key={tag}>{tag}</span>)}
              </div>
              <TableauEmbed
                id="viz1788628665009"
                alt="Dashboard 2"
                image="https://public.tableau.com/static/images/Pr/ProjekKIM/Dashboard2/1.png"
                workbook="ProjekKIM/Dashboard2"
                mobileHeight={1477}
              />
            </div>
          </article>

          <article className="project-card new-project-card reveal delay-1">
            <div className="project-content">
              <div className="project-number mono-label">Project 02 / Regional analysis</div>
              <h3>Dashboard Kemiskinan dan Kesejahteraan Sosial Pulau Sumatra 2010–2025</h3>
              <p>Membangun dashboard berbasis data seluruh kabupaten/kota di Pulau Sumatra untuk menganalisis disparitas kemiskinan dengan mengintegrasikan indikator IPM, UHH, RLS, dan pengeluaran per kapita.</p>
              <div className="tag-list">
                {['Regional Economic Analysis', 'Data Integration', 'Interactive Mapping'].map((tag) => <span className="tag" key={tag}>{tag}</span>)}
              </div>
              <TableauEmbed
                id="viz1788628697806"
                alt="Dashboard Kemiskinan di Pulau Sumatra"
                image="https://public.tableau.com/static/images/Ke/KemiskinanSumatra/DashboardKemiskinandiPulauSumatra/1.png"
                workbook="KemiskinanSumatra/DashboardKemiskinandiPulauSumatra"
                mobileHeight={1527}
                filter="publish=yes"
              />
            </div>
          </article>

          <article className="project-card retail-card reveal">
            <div className="project-content">
              <div className="project-number mono-label">Project 03 / Interactive analysis</div>
              <h3>Retail Sales Performance Dashboard</h3>
              <p>Menganalisis jutaan baris data transaksi ritel untuk mengidentifikasi tren profitabilitas, performa kategori, dan efisiensi wilayah.</p>
              <div className="tag-list">
                {['Data Cleaning', 'Descriptive Analytics', 'Data Visualization', 'Cross-Selling Strategy'].map((tag) => <span className="tag" key={tag}>{tag}</span>)}
              </div>
              <TableauImagePreview
                image={retailDashboardImage}
                alt="Sales Performance Dashboard 2025 Toko Peralatan Dapur ABC"
                href="https://public.tableau.com/views/SalesPerformanceDashboard_17878396204710/Dashboard1?:showVizHome=no"
                testId="link-tableau-retail-preview"
              />
            </div>
          </article>

          <article className="project-card forecast-card dark-card reveal delay-1">
            <div className="project-content">
              <div className="project-number mono-label">Project 04 / Planning model</div>
              <h3>Supply Chain & Demand Forecasting</h3>
              <p>Memodelkan optimasi persediaan dan memprediksi permintaan masa depan untuk menekan Stockout Rate hingga di bawah batas kritis. Menghitung parameter Reorder Point (ROP) dan Safety Stock.</p>
              <div className="tag-list">
                {['ARIMA Time-Series Forecasting (R)', 'Inventory Planning', 'Reorder Point Calculation'].map((tag) => <span className="tag" key={tag}>{tag}</span>)}
              </div>
              <TableauImagePreview
                image={supplyChainDashboardImage}
                alt="Supply Chain Performance Dashboard"
                href="https://public.tableau.com/shared/DFGNHB7JZ"
                testId="link-tableau-forecast-preview"
              />
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
              <a
                className="irf-image-link"
                href="https://drive.google.com/file/d/1jLk5b-uzoxQ6REQIHOWJpdEadkbn8iWq/view?usp=drive_link"
                target="_blank"
                rel="noreferrer"
                aria-label="Buka grafik IRF lengkap di Google Drive"
                data-testid="link-irf-drive"
              >
                <img className="irf-image" src={irfImage} alt="Impulse response functions untuk penelitian Global Shocks" />
                <span className="irf-image-label">Buka grafik lengkap <ArrowUpRight size={14} /></span>
              </a>
            </div>
            <div className="research-copy">
              <div className="project-number mono-label">Project 05 / Macroeconomics research</div>
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
  { icon: <LineChart size={18} />, title: 'Business & Analysis', skills: ['Analisis Data', 'Market & Industry Analysis', 'Economic Analysis', 'Analytical Thinking & Problem Solving', 'Business Development'] },
  { icon: <Users size={18} />, title: 'Professional', skills: ['Leadership', 'Communication', 'Teamwork', 'Stakeholder Coordination', 'Project Coordination'] },
  { icon: <Code2 size={18} />, title: 'Tools', skills: ['Microsoft Excel', 'Tableau', 'EViews', 'SmartPLS', 'Canva'] },
];

function Skills() {
  return (
    <section className="light-section section-pad">
      <div className="section-wrap">
        <SectionHeading index="05 / Keterampilan" title="Alat yang dipakai untuk membuat hal rumit terbaca.">
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
  {
    title: 'Bootcamp Data Analyst',
    detail: 'PT. Ebiz Karisma',
    href: 'https://drive.google.com/file/d/1Z8NdIvFjm4_XHOUNBH57nNq2QecQALxv/view?usp=sharing',
  },
  {
    title: 'Sustainability Reporting & ESG: Kompetensi Baru yang Dicari Industri Modern',
    detail: 'Direktorat Bina Penempatan Tenaga Kerja',
    href: 'https://drive.google.com/file/d/16LbLAsAgdqEBe5UxBTQJhK0mcS_ladsR/view?usp=sharing',
  },
  {
    title: 'Uji Kemahiran Berbahasa Indonesia',
    detail: 'Badan Bahasa',
    href: 'https://drive.google.com/file/d/1e8UySU793i5wsm9S7kLOmt0aD36KLTmA/view?usp=drive_link',
  },
  {
    title: 'E-Learning Pengantar Manajemen Keuangan Negara',
    detail: 'Kementerian Keuangan',
    href: 'https://drive.google.com/file/d/1IfcSEfdJxGvB_MH3TCCrchVa6zMU7nx0/view?usp=drive_link',
  },
  {
    title: 'LIKE IT',
    detail: 'Bank Indonesia, OJK, Kemenkeu, dan LPS',
    href: 'https://drive.google.com/file/d/19tD8ME9xv9JLq2tInhVr6aK-e643Mr6Q/view?usp=drive_link',
  },
  {
    title: 'TOEFL Prediction',
    detail: 'Asterdam Course',
    href: 'https://drive.google.com/file/d/15_-fGrEYbeYG88ONPV2aFa3kzGctkKPk/view?usp=drive_link',
  },
  {
    title: 'E-Learning Pengenalan Kebijakan Publik',
    detail: 'Kementerian Keuangan',
    href: 'https://drive.google.com/file/d/1Wu1LF4IoyWzenDH7JaCJRCiRXD2z8Ab4/view?usp=drive_link',
  },
  {
    title: 'Dasar Microsoft Excel untuk Administrasi Perkantoran',
    detail: 'PT. Yureka Edukasi Cipta',
    href: 'https://drive.google.com/file/d/1LyKfcYHz81yJLE3_nQOrlpB1D8LML9r6/view?usp=drive_link',
  },
];

function Certifications() {
  return (
    <section id="sertifikasi" className="cert-section section-pad">
      <div className="section-wrap">
        <SectionHeading index="06 / Pelatihan dan Sertifikasi" title="Pelatihan dan sertifikasi yang memperkuat kesiapan kerja.">
          Pelatihan yang memperluas kemampuan kerja—dari data dan bahasa, sampai kebijakan publik dan sistem keuangan.
        </SectionHeading>
        <div className="cert-grid">
          {certifications.map((certification, index) => (
            <a
              className={`cert-card reveal delay-${Math.min((index % 3) + 1, 3)}`}
              href={certification.href}
              target="_blank"
              rel="noreferrer"
              key={certification.title}
              data-testid={`certification-${index}`}
            >
              <div className="cert-icon"><Award size={17} /></div>
              <div><h3>{certification.title}</h3><p>{certification.detail}</p></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const publications = [
  {
    title: 'Respons Dinamis Sektor Keuangan dan Sektor Riil Indonesia terhadap Guncangan Ketidakpastian Kebijakan Perdagangan AS-Tiongkok',
    journal: 'E-Jurnal Ekonomi dan Bisnis UNUD, Vol. 15 No. 3, 2026',
    sinta: 'SINTA 3',
    link: 'https://doi.org/10.24843/EEB.2026.v15.i03.p08',
  },
  {
    title: 'Pengaruh Faktor-Faktor Ekonomi Makro Terhadap Stabilitas Perbankan di Indonesia',
    journal: 'Jurnal Riset Ilmu Akuntansi, Vol. 3 No. 2, 2024',
    sinta: 'SINTA 3',
    link: 'https://doi.org/10.55606/akuntansi.v3i2.1987',
  },
  {
    title: 'Analisis Pengaruh Ekspor, Impor, dan Jumlah Uang Beredar di Indonesia Terhadap Kurs Rupiah/USD',
    journal: 'Jurnal Riset Ilmu Ekonomi, Vol. 3 No. 2, 2023',
    sinta: 'SINTA 3',
    link: 'https://doi.org/10.23969/jrie.v3i2.70',
  },
  {
    title: 'Comparative Study Between Conventional Pawnshops and Sharia Pawnshops',
    journal: "ADILLA: Jurnal Ilmiah Ekonomi Syari'ah, Vol. 8 No. 1, 2025",
    sinta: 'SINTA 3',
    link: 'https://doi.org/10.52166/adilla.v8i1.6655',
  },
  {
    title: "Unmasking the Hidden Hero: Strengthening North Sumatra's Iconic Commodities through Financial Services",
    journal: 'Jurnal Inovasi Ekonomi, Vol. 10 No. 1, 2025',
    sinta: 'SINTA 4',
    link: 'https://doi.org/10.22219/jiko.v10i01.39049',
  },
  {
    title: 'Analisis Pengaruh IPM, TPT, dan UMR terhadap Jumlah Penduduk Miskin di Indonesia',
    journal: 'Jurnal Pendidikan Ekonomi, Vol. 18 No. 2, 2024',
    sinta: 'SINTA 4',
    link: 'https://garuda.kemdiktisaintek.go.id/documents/detail/4309172',
  },
  {
    title: 'Analisis Faktor-faktor yang Mempengaruhi Permintaan Uang di Provinsi Bali Menggunakan ECM',
    journal: 'Jurnal Pendidikan Ekonomi (JUPE), Vol. 13 No. 1, 2025',
    sinta: 'SINTA 4',
    link: 'https://doi.org/10.26740/jupe.v13n1.p31-43',
  },
  {
    title: 'Analisis Pengaruh PMDN dan PMA terhadap PDRB di Sumatera Utara',
    journal: 'Studi Ekonomi Dan Kebijakan Publik, Vol. 2 No. 2, 2024',
    sinta: 'SINTA 5',
    link: 'https://doi.org/10.35912/sekp.v2i2.2729',
  },
  {
    title: 'Etika Ekonomi dalam Bisnis Digital: Tantangan UMKM di Era Perdagangan Global',
    journal: 'J-CEKI: Jurnal Cendekia Ilmiah, Vol. 4 No. 2, 2025',
    sinta: 'SINTA 5',
    link: 'https://al-haramjournal.co.id/JCEKI/article/view/6561',
  },
  {
    title: 'Analisis Fluktuasi Nilai Tukar Rupiah/USD serta Peran Uang Beredar dan Suku Bunga dalam Kegiatan Impor',
    journal: 'Jurnal Ekonomi dan Bisnis (EK&BI), Vol. 7 No. 2, 2024',
    sinta: 'SINTA 5',
    link: 'https://doi.org/10.37600/ekbi.v7i2.1732',
  },
  {
    title: 'Analisis Pengaruh Tingkat Literasi Koperasi dan Pengalaman Organisasi Terhadap Minat Mahasiswa',
    journal: 'Jurnal Publikasi Ekonomi Dan Akuntansi, Vol. 5 No. 3, 2025',
    sinta: 'SINTA 5',
    link: 'https://doi.org/10.51903/jupea.v5i3.4149',
  },
  {
    title: 'Analisis Dampak Jangka Pendek dan Panjang dari Inflasi, Suku Bunga, dan Pengeluaran Pemerintah',
    journal: 'Jurnal Ekonomi dan Bisnis (EK&BI), Vol. 7 No. 2, 2024',
    sinta: 'SINTA 5',
    link: 'https://doi.org/10.37600/ekbi.v7i2.1767',
  },
  {
    title: 'The Effect of Education, HDI, Economic Growth, and Minimum Wage on Unemployment',
    journal: 'Jurnal Penelitian Ekonomi Dan Akuntansi, Vol. 9 No. 2, 2024',
    sinta: 'SINTA 5',
    link: 'https://jurnalekonomi.unisla.ac.id/index.php/jpensi/article/view/2042',
  },
  {
    title: 'The Influence of Consumer Legal Literacy, Digital Contract Transparency, and Fear of Debt on Decisions to Use Online Loan Services',
    journal: 'Jakadara: Jurnal Ekonomika, Bisnis, dan Humaniora, Vol. 4 No. 2, 2025',
    sinta: 'SINTA 6',
    link: 'https://doi.org/10.36002/jd.v4i2.4051',
  },
];

function Publications() {
  return (
    <section id="publikasi" className="publication-section section-pad">
      <div className="section-wrap">
        <SectionHeading index="07 / Publikasi" title="Riset yang meninggalkan jejak.">
          Empat belas publikasi tentang ekonomi, kebijakan, dan keputusan finansial—ditulis untuk dibaca, diuji, dan digunakan.
        </SectionHeading>
        <div className="publication-list">
          {publications.map((publication, index) => (
            <article className="publication-item reveal" key={publication.title} data-testid={`publication-${index + 1}`}>
              <div className="publication-number mono-label">{String(index + 1).padStart(2, '0')}</div>
              <div className="publication-main">
                <h3 className="publication-title">{publication.title}</h3>
                <p className="publication-meta">{publication.journal}</p>
              </div>
              <div className="publication-side">
                <span className="sinta-badge">{publication.sinta}</span>
                <a
                  className="publication-link"
                  href={publication.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Buka publikasi: ${publication.title}`}
                  data-testid={`publication-link-${index + 1}`}
                >
                  <ExternalLink size={15} />
                </a>
              </div>
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
            <div className="hero-kicker mono-label">08 / Kontak</div>
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
        <Publications />
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