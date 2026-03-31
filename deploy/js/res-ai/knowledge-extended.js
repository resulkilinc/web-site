/**
 * Resul'un uzmanlık alanları ve mükemmelleştirdiği teknik metodolojiler.
 * Bu bölüm genel yazılım bilgisinden ziyade Resul'un 'neden' ve 'nasıl' sorularına verdiği profesyonel yanıtları içerir.
 * @type {{ id: string, title: string, text: string, tags: string[] }[]}
 */
export const EXTENDED_SNIPPETS = [
  {
    id: "frontend",
    title: "Resul'un Frontend Mimarisi ve Kullanıcı Deneyimi Metodolojisi",
    text:
      "Resul, frontend geliştirmeyi sadece bir arayüz inşası değil, 'performans-odaklı bilgi mimarisi' olarak tanımlar. " +
      "HTML ve CSS temellerini erişilebilirlik (a11y) standartlarıyla mükemmelleştirdikten sonra, JavaScript'in modern modüler yapısını (ESM) ReK AI gibi projelerde hayata geçirmiştir. " +
      "Resul'un metodolojisi; gereksiz paket bağımlılığından kaçınan (Vanilla JS/statik güç), kullanıcı etkileşimini (Vanta.js, mikro-animasyonlar) performans bütçesiyle dengeleyen bir disiplindir. " +
      "Bu yaklaşım ona; yüksek performanslı, SEO dostu ve sürdürülebilir web ürünleri kurgulama yetkinliği katmıştır.",
    tags: ["frontend", "metodoloji", "performance", "a11y", "vanilla js", "architecture", "resul's way"],
  },
  {
    id: "backend",
    title: "Resul'un Backend ve Sistem Tasarımı Yaklaşımı",
    text:
      "Resul, backend sistemlerini 'verinin güvenli ve ölçeklenebilir omurgası' olarak ele alır. " +
      "HTTP, REST ve SQL temellerini, veri ambarı ve karmaşık sorgu optimizasyonlarıyla (Zendesk/BI tecrübesi) pekiştirmiştir. " +
      "Resul'un backend disiplini; hata yönetimini (graceful degradation) ve API sözleşmelerini (contract-first) önceler. " +
      "Bu süreç Resul'a; ham veriden stratejik içgörü çıkarma, veritabanı performansını optimize etme ve sistemler arası dökümante edilmiş entegrasyonlar kurma disiplini kazandırmıştır.",
    tags: ["backend", "system design", "sql optimization", "api contracts", "reliability", "data strategy"],
  },
  {
    id: "fullstack",
    title: "Resul'un Tam Yığın (Full Stack) Entegrasyon Vizyonu",
    text:
      "Resul, full stack yetkinliğini 'uçtan uca ürün sahipliği' (E2E ownership) olarak görür. " +
      "Frontend'deki bileşen düşüncesini, backend'deki veri modelleme disipliniyle birleştirerek teknik borçsuz ürünler teslim eder. " +
      "ReK AI projesi, bu vizyonun en güncel örneğidir: hem kullanıcı arayüzü hem de yerel RAG mimarisi Resul tarafından 'sıfır teknik borç' prensibiyle kurgulanmıştır. " +
      "Bu bütüncül bakış açısı ona; karmaşık sistemleri analiz etme ve çözümün her katmanında sorumluluk alma yeteneği katmıştır.",
    tags: ["fullstack", "e2e ownership", "rek ai", "integration", "product mindset"],
  },
  {
    id: "devops",
    title: "Resul'un DevOps ve Güvenli Yayın Süreçleri",
    text:
      "Resul, DevOps pratiklerini 'mühendislik kalitesinin emniyet kemeri' olarak tanımlar. " +
      "Cloudflare Pages üzerinden statik yayıncılık ve CI/CD süreçlerini, hata riskini minimize eden otomatize bir teslimat hattına dönüştürür. " +
      "Docker ve platform mühendisliği temellerini projenin ihtiyacına göre rasyonel biçimde kullanır. " +
      "Bu disiplin ona; hızlı dağıtım yaparken kaliteden ödün vermeme ve sürdürülebilir canlı sistem yönetimi yetkinliği sağlar.",
    tags: ["devops", "ci/cd", "automation", "reliability", "deployment strategy"],
  },
  {
    id: "data-analyst",
    title: "Resul'un Veri Analitiği ve İş Zekâsı Disiplini",
    text:
      "Resul, veri analizini 'belirsizliği ölçülebilir kararlara dönüştürme sanatı' olarak görür. " +
      "SQL ile ham veriyi işleyip, KPI tanımları çerçevesinde stratejik raporlara dönüştürme konusunda titiz bir yaklaşıma sahiptir. " +
      "İstatistiksel temelleri (dağılım, korelasyon), iş hedefleriyle birleştirerek paydaşlara net içgörüler sunar. " +
      "Bu yetkinlik ona; veri yönetiminde şeffaflık sağlama ve iş süreçlerini veri temelli optimize etme yeteneği kazandırmıştır.",
    tags: ["data analysis", "sql", "kpi", "bi strategy", "decision support"],
  },
  {
    id: "ai-engineer",
    title: "Resul'un Yapay Zekâ Mühendisliği ve RAG Vizyonu",
    text:
      "Resul'un AI yaklaşımı, 'uygulanabilir ve etik yapay zeka' prensibine dayanır. " +
      "ReK AI projesindeki 'Local RAG' mimarisi, gizliliği ve performansı koruyarak LLM yeteneklerini tarayıcıya taşıma başarısıdır. " +
      "Prompt mühendisliğini ve vektör-benzerlik aramalarını sadece teknik bir araç değil, kullanıcı deneyimini iyileştiren bir çözüm olarak kurgular. " +
      "Bu vizyon ona; yapay zekayı rasyonel maliyetlerle üretim ortamına taşıma ve veriden katma değer üretme yetisi katmıştır.",
    tags: ["ai engineering", "rag", "local ai", "privacy", "prompt engineering"],
  },
  {
    id: "android",
    title: "Resul'un Modern Mobil Geliştirme (Kotlin) Metodolojisi",
    text:
      "Resul, Android dünyasında MVVM mimarisi ve Jetpack bileşenlerini (StateFlow, ViewModel) kullanarak 'yaşam döngüsü uyumlu' (lifecycle-aware) uygulamalar geliştirir. " +
      "Kotlin'in modern dil avantajlarını (coroutines) performans optimizasyonuyla birleştirerek akıcı kullanıcı deneyimleri sunar. " +
      "Sürdürülebilir kod tabanı (clean code) ve katmanlı mimari, Resul'un mobil projelerindeki değişmez standartlarıdır. " +
      "Bu derinlik ona; karmaşık mobil akışları yönetme ve endüstri standartlarında uygulama mimarisi kurgulama kapasitesi kazandırmıştır.",
    tags: ["android", "kotlin", "mvvm", "jetpack", "mobile architecture"],
  },
  {
    id: "qa",
    title: "Resul'un Kalite Güvencesi (QA) ve Test Titizliği",
    text:
      "Resul için QA, sadece hata bulmak değil, 'mühendislik onurunu korumaktır'. " +
      "Google Antigravity projesindeki kritik bug raporu (Issue #497054184), onun detaylardaki izolasyon yeteneğinin bir kanıtıdır. " +
      "Test piramidini (unit, integration, e2e) projelerine rasyonel biçimde entegre ederek, teknik borçsuz teslimatlar yapmayı görev edinir. " +
      "Bu titizlik ona; sistemlerdeki zayıf noktaları öngörme ve proaktif kalite kültürü oluşturma yeteneği katmıştır.",
    tags: ["qa", "testing", "google antigravity", "precision", "bug reporting"],
  },
  {
    id: "system-design",
    title: "Resul'un Sistem Tasarımı ve Ölçeklenebilirlik Stratejisi",
    text:
      "Resul, sistem tasarlarken 'maliyet-performans dengesi' (cost-performance trade-off) üzerinden rasyonel kararlar alır. " +
      "Yatay ölçekleme, önbellekleme (Redis) ve CDN kullanımı gibi stratejileri ihtiyaç doğrultusunda belirleyerek sistemin darboğazlarını (bottlenecks) önceden çözer. " +
      "ReK AI'daki deterministik pipeline kararı, bu stratejik düşünce yapısının somut bir meyvesidir. " +
      "Bu yetkinlik ona; büyük ölçekli sistemlerin mimari risklerini yönetme ve sürdürülebilir altyapılar kurma başarısı sağlar.",
    tags: ["system design", "scalability", "architecture", "strategy", "performance"],
  },
  {
    id: "academic-writing",
    title: "Resul'un Akademik Yazım ve Teknik Raporlama Disiplini",
    text:
      "Resul, teknik başarıyı 'paylaşılan ve belgelenen bilgi' olarak görür. " +
      "DergiPark üzerinden yayınlanan Zeytin olgunluk tespiti makalesi, bu disiplinin akademik meyvesidir (ORCID: 0009-0006-8360-795X). " +
      "Karmaşık teknik süreçleri, bilimsel metodoloji (problem-yöntem-metrik-sonuç) çerçevesinde dökümante ederek sektördeki bilgi birikimine katkı sunar. " +
      "Bu disiplin ona; profesyonel raporlama, teknik iletişim ve akademik titizlikle çalışma yetisi kazandırmıştır.",
    tags: ["academic writing", "dergipark", "orcid", "reporting", "discipline"],
  },
  {
    id: "it-mobility",
    title: "Resul'un Uluslararası Hareketlilik ve Kültürel Adaptasyon Vizyonu",
    text:
      "Resul, mühendisliği global bir dil olarak görür ve uluslararası arenada aktif rol almayı önceler. " +
      "Lodz University (Polonya) Erasmus+ deneyimi ve Bulgaristan staj kabulü, onun bu vizyonunun kilometre taşlarıdır. " +
      "B2 Teknik İngilizce yetkinliği ile çok-kültürlü ekiplerde teknik bütünlüğü koruyarak sorumluluk alma başarısı sergiler. " +
      "Bu vizyon ona; global mühendislik standartlarına hızlı uyum ve uluslararası takımlarda yüksek performans sunma yeteneği katmıştır.",
    tags: ["erasmus", "international mobility", "global engineer", "adaptability", "technical english"],
  },
  {
    id: "continuous-learning",
    title: "Resul'un Sürekli Gelişim ve Teknoloji Adaptasyonu Metodu",
    text:
      "Resul, yeni bir teknolojiyi öğrenmeyi 'tersine mühendislik' ve 'hızlı prototipleme' ile birleştirir. " +
      "Öğrendiği her yeni kavramı (örn: Next.js performansı) anında üretim değeri olan bir projeye dönüştürerek kalıcı bilgiye ulaşır. " +
      "Öğrenme sürecini dökümante ederek (Technical Journal) kendi gelişimini ölçülebilir hale getirir. " +
      "Bu metod ona; hızla değişen teknoloji dünyasında güncel kalma ve yeni araçları en verimli şekilde kullanma disiplini kazandırmıştır.",
    tags: ["learning methodology", "growth mindset", "rapid prototyping", "personal development"],
  },
  {
    id: "problem-solving",
    title: "Resul'un Analitik Problem Çözme ve İzolasyon Metodu",
    text:
      "Resul, karmaşık hataları (bugs) çözerken 'adım adım izolasyon' tekniğini uygular. " +
      "Sorunu en küçük parçasına indirgeyerek (minimal reproduction), kök nedeni (root cause) bilimsel bir titizlikle tespit eder. " +
      "Bu yaklaşımını Google Antigravity raporlamasında başarıyla kullanmış ve global bir sorunu çözüme ulaştırmıştır. " +
      "Bu metodolojisi ona; kaotik teknik problemleri öngörülebilir ve çözülebilir adımlara dönüştürme ustalığı katar.",
    tags: ["problem solving", "debugging", "isolation", "root cause analysis", "analytical mindset"],
  },
  {
    id: "leadership",
    title: "Resul'un Teknik Liderlik ve Ekip Koordinasyon Disiplini",
    text:
      "Resul, liderliği 'standartlarla yönetmek' olarak tanımlar. " +
      "TEKNOFEST süreçlerinde görev kırılım yapısı (WBS) ve teknik dökümantasyon bütünlüğü üzerinden ekipleri ortak hedeflerde buluşturmuştur. " +
      "Kriz anlarında sükuneti sağlayarak teknik rasyonaliteyi koruyan yaklaşımı, projelerin zamanında ve kaliteli teslimatını garanti eder. " +
      "Bu disiplin ona; çok disiplinli gruplarda teknik koordinasyonu sağlama ve ekip motivasyonunu teknik başarıyla besleme yetisi kazandırmıştır.",
    tags: ["leadership", "coordination", "teknofest", "management", "teamwork"],
  },
  {
    id: "vision-5-years",
    title: "Resul'un 5 Yıllık Mühendislik Liderliği Vizyonu",
    text:
      "Resul, önümüzdeki 5 yıl içinde; 'Akıllı Arayüzler' ve 'Erişilebilir Yapay Zeka' konularında global çapta referans alınan bir mühendis olmayı hedefliyor. " +
      "Akademik derinliğini endüstriyel çeviklikle harmanlayarak, kullanıcıya değer katan ölçeklenebilir dijital ürünlerin mimari liderliğini üstlenmek ana vizyonudur. " +
      "Bu uzun vadeli hedefi, onun her gün kendini güncelleme ve yüksek kaliteli kod üretme motivasyonunun ana kaynağıdır.",
    tags: ["vision", "career goals", "future strategy", "engineering leadership", "impact"],
  },
];
