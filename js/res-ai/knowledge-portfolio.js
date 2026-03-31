/**
 * Portfolio-grounded snippets with explicit source links.
 * Each snippet is designed for retrieval + evidence rendering.
 * @type {{ id: string, title: string, text: string, tags: string[], source: { label: string, url: string, kind: string } }[]}\
 */
export const PORTFOLIO_SNIPPETS = [
  // ── ReK AI ───────────────────────────────────────────────────────────
  {
    id: "rekai-overview",
    title: "ReK AI: Bilgi Erişimi ve Mimari Karar Disiplini",
    text:
      "ReK AI, Resul'un veri gizliliğini ve performansı önceliklendiren mühendislik yaklaşımının somut bir örneğidir. " +
      "Tarayıcı tabanlı 'Local RAG' mimarisini tercih ederek API maliyetlerini ve dış bağımlılıkları sıfıra indirmiştir. " +
      "Resul, bu projeyi geliştirirken Retrieval-Augmented Generation prensiplerini uçtan uca uygulayarak sistemin şeffaflığını (Diagnostics) ve güvenilirliğini (Source-backing) en üst düzeye çıkarmıştır. " +
      "Bu süreç Resul'a; kaynak kısıtlı ortamlarda (resource-constrained) mimari trade-off yapma, performans izleme ve veriden değer üretme konusunda üst düzey bir yetkinlik kazandırmıştır.",
    tags: ["rek ai", "architecture", "local rag", "privacy", "performance", "trade-offs", "engineering mindset", "data retrieval"],
    source: { label: "Portfolio · ReK AI section", url: "portfolio.html#res-ai", kind: "section" },
  },

  // ── Zeytin Projesi ───────────────────────────────────────────────────
  {
    id: "zeytin-core",
    title: "Bilgisayarlı Görü: Zeytin Olgunluk Tespiti ve Veri Yönetimi",
    text:
      "Resul, 2694 görüntülük özgün bir veri kümesi üzerinde EfficientNet-B0 mimarisini kurgulayarak tarımsal kalite kontrol süreçlerinde %84.95 başarı elde etmiştir. " +
      "Bu proje kapsamında veri temizleme, etiketleme ve sınıf dengesizliği (imbalance) yönetimi gibi kritik süreçleri uçtan uca dökümante etmiştir. " +
      "Resul'un bu projedeki başarısı; teorik ML bilgisini saha koşullarına uygulama titizliğini ve metric-based (Precision, Recall, F1) performans analiz yeteneğini kanıtlar. " +
      "Bu deneyim ona; veri odaklı problem çözme, akademik raporlandırma ve model optimizasyonu konularında derin bir disiplin katmıştır.",
    tags: ["ml", "cv", "metrics", "data processing", "efficientnet", "academic reporting", "quality control", "olive project"],
    source: { label: "Portfolio · Projeler", url: "portfolio.html#projects", kind: "project" },
  },
  {
    id: "zeytin-metrics",
    title: "Zeytin projesi — test metrikleri ve sınıf başarıları",
    text:
      "Bağımsız test setinde elde edilen genel doğruluk (accuracy): %84.95. " +
      "Sınıf bazında başarı oranları: Yeşil sınıfı %90'ın üzerinde, Siyah sınıfı %90'ın üzerinde doğrulukla sınıflandırılmıştır. " +
      "Ala Yeşil sınıfı, geçiş bölgesindeki renk benzerliği nedeniyle en zorlu sınıf olarak belirlenmiştir; bu sınıftaki başarı diğerlerine kıyasla daha düşüktür. " +
      "Değerlendirme metrikleri: Precision, Recall, F1-Score ve Confusion Matrix. " +
      "Sınıf dengesizliği (class imbalance) için class weighting uygulanmıştır. " +
      "Model, eğitim ve doğrulama kayıplarını epoch bazında izleyerek erken durdurma (early stopping) ile optimize edilmiştir.",
    tags: ["84.95", "accuracy", "f1", "precision", "recall", "confusion matrix", "ala yeşil", "siyah", "yeşil", "metrik", "test", "doğruluk", "başarı", "sınıflandırma"],
    source: { label: "Makale · Zeytin PDF", url: "assets/makale-zeytin.pdf", kind: "paper" },
  },
  {
    id: "zeytin-architecture",
    title: "Zeytin projesi — model mimarisi ve eğitim stratejisi",
    text:
      "Kullanılan model: EfficientNet-B0, ImageNet ağırlıklarıyla transfer learning yöntemiyle başlatılmıştır. " +
      "Önişleme adımları: görüntüler 224×224 piksel boyutuna yeniden boyutlandırılmış, piksel değerleri [0,1] aralığına normalize edilmiştir. " +
      "Fine-tuning stratejisi: önce tüm katmanlar dondurularak yalnızca sınıflandırma başlığı eğitilmiş, ardından üst katmanlar adım adım açılarak ince ayar yapılmıştır. " +
      "Optimizer: Adam; kayıp fonksiyonu: Categorical Cross-Entropy. " +
      "Batch size ve learning rate scheduler ile hiperparametre optimizasyonu gerçekleştirilmiştir. " +
      "Sınıf dengesizliğini ele almak için class_weight parametresi kullanılmıştır.",
    tags: ["efficientnet-b0", "transfer learning", "fine tuning", "224x224", "preprocess", "class weighting", "adam", "optimizer", "batch", "model", "mimari", "eğitim"],
    source: { label: "Makale · Yöntem", url: "assets/makale-zeytin.pdf", kind: "paper" },
  },
  {
    id: "zeytin-dataset",
    title: "Zeytin projesi — veri seti detayları",
    text:
      "Veri seti saha koşullarında (tarla ortamında) fotoğraflanmış 2694 zeytin görüntüsünden oluşmaktadır. " +
      "Üç sınıf: Yeşil, Ala Yeşil, Siyah. " +
      "Gerçek dünya koşullarını yansıtmak için farklı ışık koşulları ve açılardan çekilmiş görüntüler içerir. " +
      "Veri artırma (augmentation): yatay çevirme, döndürme, yakınlaştırma ve parlaklık kaymalarıyla veri çeşitliliği artırılmıştır. " +
      "Veri seti eğitim, doğrulama ve test alt kümelerine ayrılmıştır. " +
      "Özgün veri kümesi olup kamuya açık bir veri tabanından alınmamıştır; doğrudan toplanmış ve etiketlenmiştir.",
    tags: ["veri seti", "dataset", "2694", "zeytin", "olive", "saha", "augmentation", "etiket", "yeşil", "siyah", "ala yeşil"],
    source: { label: "Makale · Veri Seti", url: "assets/makale-zeytin.pdf", kind: "paper" },
  },

  // ── Kişisel Portföy Sitesi ───────────────────────────────────────────
  {
    id: "portfolio-site-overview",
    title: "Profesyonel Bilgi Mimarisi ve Statik Yayıncılık",
    text:
      "Resul'un frontend tarafındaki net bilgi mimarisi ve bileşen düşüncesi, bu portfolyo sitesinin statik yapısında somutlaşır. " +
      "Tailwind CDN ve özel CSS entegrasyonuyla kurgulanan tasarım, mikro-etkileşim disiplini ve erişilebilirlik (a11y) standartlarını merkeze alır. " +
      "Vanta.js gibi görsel kütüphanelerin performans bütçesini zorlamadan dahil edilmesi ve modüler JavaScript yapısı, Resul'un sistem performansına olan teknik hakimiyetini yansıtır. " +
      "Cloudflare Pages üzerinden sunulan bu statik altyapı, sıfır maliyetle maksimum hızı hedefleyen bir mühendislik tercihidir.",
    tags: ["portfolio architecture", "information architecture", "static site", "performance optimization", "a11y", "modular js", "vanta.js", "tailwind", "professional identity"],
    source: { label: "Portfolio · Ana Sayfa", url: "portfolio.html", kind: "section" },
  },

  // ── Akademik Yazım ───────────────────────────────────────────────────
  {
    id: "academic-writing",
    title: "Akademik yazım ve teknik raporlama",
    text:
      "Akademik dokümantasyon yaklaşımı: problem tanımı → yöntem → metrikler → sonuç zinciri tekrarlanabilir biçimde yapılandırılır. " +
      "Odak noktası yalnızca model performansı değil; veri setinin, deneylerin ve değerlendirme protokollerinin tam izlenebilirliğidir. " +
      "Zeytin olgunluk sınıflandırma makalesi bu yaklaşımın uygulamalı örneğidir: veri toplama, model seçimi, hiperparametre kararları ve sınıf bazında metrikler belgelere yansıtılmıştır. " +
      "DergiPark üzerinden yayınlanmış; ORCID: 0009-0006-8360-795X.",
    tags: ["academic writing", "reporting", "documentation", "dergipark", "orcid", "makale", "raporlama"],
    source: { label: "Portfolio · Akademik yazım", url: "portfolio.html#projects", kind: "project" },
  },

  // ── Mühendislik İş Akışı ─────────────────────────────────────────────
  {
    id: "engineering-workflow",
    title: "Mühendislik İş Akışı: Teslimat ve Kalite Standartları",
    text:
      "Resul'un iş akışı; 'önce net problem tanımı, sonra ölçülebilir çözüm' prensibi üzerine kurulu 5 aşamalı bir disiplindir. " +
      "(1) Keşif, (2) Tasarım, (3) Uygulama, (4) Kalite (a11y/performans) ve (5) Kontrollü Yayın (CI/CD). " +
      "Resul, bu standartları her projesinde (örn: ReK AI, TEKNOFEST) uygulayarak teknik borçsuz ve dökümantasyonu tam ürünler teslim eder. " +
      "Bu disiplin ona; zaman baskısı altında kaliteyi koruma, ekip içinde net sorumluluk paylaşımı ve sürdürülebilir yazılım geliştirme yetkinliği katmıştır.",
    tags: ["workflow", "delivery", "quality assurance", "ci/cd", "standardization", "documentation discipline", "engineering process"],
    source: { label: "Portfolio · İş akışı", url: "portfolio.html#workflow", kind: "section" },
  },

  // ── Yetenek Profili ───────────────────────────────────────────────────
  {
    id: "skills-focus",
    title: "Profesyonel Yetenek Matrisi ve Değer Önerisi",
    text:
      "Resul'un yetenekleri; React/Next.js (Frontend), SQL (Data), Kotlin (Mobile) ve ML (EfficientNet) alanlarında derinleşmiş bir mühendislik vizyonudur. " +
      "O, bir aracı sadece kullanmak değil; o aracın performans limitlerini (örn: Local RAG gecikme optimizasyonu) ve mimari kısıtlarını anlamayı önceler. " +
      "Teknik yetkinliğini B2 seviye İngilizce ve akademik yazım titizliğiyle birleştiren Resul, uluslararası stajlar ve takımlar için yüksek adaptasyon sunar. " +
      "Bu donanım ona; karmaşık sistemleri analiz etme, hızlı prototipleme ve global standartlarda teknik iletişim kurma yeteneği kazandırmıştır.",
    tags: ["skills", "expertise", "react", "nextjs", "ml", "sql", "kotlin", "international adaptability", "technical communication", "value proposition"],
    source: { label: "Portfolio · Yetenekler", url: "portfolio.html#skills", kind: "section" },
  },

  // ── Deneyim ─────────────────────────────────────────────────────────
  {
    id: "experience-focus",
    title: "Uluslararası Hareketlilik ve Profesyonel Adaptasyon",
    text:
      "Resul'un profesyonel gelişimi; uluslararası akademik standartlara uyum ve global mühendislik ekosistemine hızlı adaptasyon disipliniyle karakterize edilir. " +
      "Lodz University of Technology (Polonya) Erasmus+ deneyimi, Resul'un teknik iletişimini globale taşıma ve çok-kültürlü takım çalışmasında sorumluluk alma vizyonunu pekiştirmiştir. " +
      "Bulgaristan Erasmus+ staj kabulü ise bu akademik temeli profesyonel bir pratiğe dönüştürme başarısıdır. " +
      "Bu uluslararası süreçler Resul'a; farklı çalışma kültürlerine uyum, teknik İngilizceyi aktif kullanma ve global ölçekli projelerde bağımsız hareket etme yetkinliği katmıştır.",
    tags: ["erasmus", "international mobility", "lodz", "poland", "bulgaria", "global reach", "adaptability", "technical english", "international collaboration", "staj", "staja", "stajyer", "stajyeri", "intern", "internship", "bulgaristan", "polonya", "erasmus staj"],
    source: { label: "Portfolio · Deneyim", url: "portfolio.html#experience", kind: "section" },
  },

  // ── İletişim ──────────────────────────────────────────────────────────
  {
    id: "contact-collab",
    title: "İletişim ve Sosyal Medya Bağlantıları",
    text:
      "Staj, yazılım rolleri ve teknik iş birlikleri için bana şu kanallardan ulaşabilirsiniz:\n" +
      "- LinkedIn: https://www.linkedin.com/in/resul-kilin%C3%A7-78b54b266\n" +
      "- GitHub: https://github.com/resulkilinc\n" +
      "- Instagram: https://www.instagram.com/resulkilinc9991/\n" +
      "- E-posta: kilincresul722@gmail.com\n" +
      "- Telefon/WhatsApp: +90 531 246 99 10\n" +
      "Tüm dökümanlar ve CV portfolyo sayfası üzerinden indirilebilir.",
    tags: ["contact", "github", "linkedin", "instagram", "medium", "orcid", "dergipark", "whatsapp", "mail", "eposta", "social media", "social", "iletişim", "sosyal medya", "resul", "kılınç", "link", "profil", "adres", "reusl", "resül", "kilinc", "kilinç", "cv", "resume", "özgeçmiş", "ozgecmis", "cv indir", "cv paylaş"],
    source: { label: "Portfolio · İletişim", url: "portfolio.html#contact", kind: "section" },
  },

  // ── DergiPark ─────────────────────────────────────────────────────────
  {
    id: "dergipark-profile",
    title: "Akademik Kimlik: DergiPark Yazar Profili ve Yayınlar",
    text:
      "DergiPark üzerinde Kahramanmaraş Sütçü İmam Üniversitesi Bilgisayar Mühendisliği ile ilişkili yazar profili bulunur. " +
      "ORCID: 0009-0006-8360-795X. " +
      "Profilde yapay zekâ, yazılım mühendisliği ve bilgisayarlı görü alanlarındaki çalışmalar listelenir. " +
      "Yayın: Zeytin olgunluk sınıflandırma makalesi, EfficientNet-B0 tabanlı model, %84.95 bağımsız test doğruluğu.",
    tags: ["dergipark", "akademik", "orcid", "ksü", "yazar", "yayın", "makale"],
    source: { label: "DergiPark", url: "https://dergipark.org.tr/tr/pub/@resul-kilinc-28406", kind: "external" },
  },

  // ── Mayın Tarlası Oyunu ───────────────────────────────────────────────
  {
    id: "minesweeper-project",
    title: "Oyunlaştırma: Mayın Tarlası Mantık Oyunu",
    text:
      "1. **Proje ne yapar?**: Tarayıcı tabanlı, deterministik bir mantık oyunudur.\n" +
      "2. **Hangi problemi çözer?**: Oyun döngüsündeki tutarsızlıkları ve 'ilk adımda kaybetme' gibi edge-case senaryolarını matematiksel olarak önler.\n" +
      "3. **Kullanılan teknolojiler?**: Saf JavaScript (Vanilla JS), Event-driven DOM güncellemeleri.\n" +
      "4. **Kritik teknik veya tasarım kararları?**: Oyun mantığı 'Deterministik State Machine' modeliyle kurgulanmış, harici kütüphane bağımlılığı sıfıra indirilmiştir.\n" +
      "5. **Sonuç / etki?**: Hatasız oyun döngüsü ve tutarlı kullanıcı geri bildirimi; teknik borcu düşük bir uygulama örneği.",
    tags: ["minesweeper", "mayın", "oyun", "game", "javascript", "state machine", "deterministik", "vanilla js"],
    source: { label: "Portfolio · Projeler", url: "portfolio.html#projects", kind: "project" },
  },

  // ── Kotlin/Android ────────────────────────────────────────────────────
  {
    id: "kotlin-android",
    title: "Mobil Mimari ve Katmanlı Geliştirme Disiplini",
    text:
      "Resul'un Android ekosistemindeki yetkinliği, MVVM mimarisi ve Jetpack bileşenlerini (ViewModel, StateFlow) kullanımındaki derinlikte gizlidir. " +
      "UI-Domain-Data katman ayrımı yaparak kodun sürdürülebilirliğini ve test edilebilirliğini (testability) sağlayan disiplinli yaklaşımı, teknik borcu minimize etmeyi amaçlar. " +
      "Kotlin'in modern dil özelliklerini (coroutines, flow) bellek ve performans optimizasyonuyla birleştiren Resul, modern mobil geliştirme standartlarını projelerine profesyonelce yansıtır.",
    tags: ["kotlin", "android", "mobile architecture", "mvvm", "jetpack", "stateflow", "coroutines", "layer separation", "maintainability"],
    source: { label: "Portfolio · Projeler", url: "portfolio.html#projects", kind: "project" },
  },

  // ── Fizyoterapi/Oyun Projesi ─────────────────────────────────────────
  {
    id: "physio-game-project",
    title: "Sinyal İşleme ve Gerçek Zamanlı Geri Bildirim Disiplini",
    text:
      "Resul'un çok-disiplinli mühendislik yaklaşımı, Fizyoterapi ve Oyun entegrasyonu projesindeki teknik senkronizasyon başarısında somutlaşır. " +
      "Donanım sensörlerinden gelen ham verinin (signal processing) oyun mekanikleriyle düşük gecikmeli (low-latency) eşleşmesi, Resul'un katmanlı tasarım ve hata yönetimi konusundaki hassasiyetini gösterir. " +
      "Rehabilitasyon sürecindeki verimliliği artırmak adına kurgulanan bu model, Resul'un donanım ve yazılım katmanları arasında kurduğu analitik bağın bir sonucudur.",
    tags: ["physiotherapy tech", "signal processing", "real-time feedback", "low latency", "hardware integration", "multidisciplinary", "analytical mapping"],
    source: { label: "Portfolio · Projeler", url: "portfolio.html#projects", kind: "project" },
  },

  // ── İngilizce Hazırlık ──────────────────────────────────────────────
  {
    id: "edu-prep-year",
    title: "İngilizce hazırlık eğitimi ve dil seviyesi",
    text:
      "Bilgisayar mühendisliği lisans eğitimine başlamadan önce bir yıllık yoğun İngilizce hazırlık programını başarıyla tamamladım. " +
      "Bu süreçte teknik dokümantasyon okuma, akademik sunum ve profesyonel yazışma pratiklerine odaklandım. " +
      "Mevcut dil seviyem B2 (CEFR - Independent User); İngilizceyi teknik projelerde ve uluslararası iş birliklerinde aktif olarak kullanıyorum. " +
      "Erasmus+ Lodz dönemi bu teorik temeli pratikle birleştirme fırsatı sundu.",
    tags: ["hazırlık", "hazirlik", "ingilizce", "english", "b2", "eğitim", "dil", "cefr"],
    source: { label: "Portfolio · Eğitim", url: "portfolio.html#education", kind: "section" },
  },

  // ── TEKNOFEST İHA ───────────────────────────────────────────────────
  {
    id: "exp-uav-teknofest",
    title: "TEKNOFEST Mühendislik Yönetimi ve Koordinasyon",
    text:
      "Resul'un karmaşık sistemlerdeki mühendislik yönetimi ve dökümantasyon disiplini, TEKNOFEST Uluslararası İHA yarışma sürecinde ön plana çıkar. " +
      "Görev kırılım yapısı (WBS) ve teknik raporlama standartlarına olan bağlılığı, çok disiplinli takımlarda teknik bütünlüğün korunmasını sağlamıştır. " +
      "Resul, sistem gereksinimleri ile otonom görev planlaması arasında kurduğu analitik köprülerle, " +
      "yarışmanın her aşamasında zaman yönetimi ve koordinasyon başarısını sergilemiştir. " +
      "Bu deneyim, onun teknik raporlama disiplini ve teslimat (delivery) odaklı yaklaşımının bir kanıtıdır.",
    tags: ["iha", "uav", "teknofest", "engineering management", "wbs", "coordination", "technical reporting", "analitik yaklaşım", "delivery"],
    source: { label: "Portfolio · Deneyim", url: "portfolio.html#experience", kind: "section" },
  },

  // ── TEKNOFEST Sualtı ────────────────────────────────────────────────
  {
    id: "exp-underwater-teknofest",
    title: "İnsansız Sualtı Sistemlerinde Teknik Entegrasyon",
    text:
      "Resul'un sistem mühendisliği ve entegrasyon disiplini, TEKNOFEST İnsansız Sualtı Sistemleri projesindeki 'milestone' bazlı takip protokollerinde öne çıkar. " +
      "Donanım ve yazılım katmanları arasında kurulan açık entegrasyon sözleşmeleri (contracts), sistemin hata dayanımını ve bütünlüğünü maksimize etmiştir. " +
      "Resul, karmaşık robotik projelerde dokümantasyonun ve teknik tasarımların birleştirilmesinin (merging) kritik önemini bu süreçteki titizliğiyle kanıtlamıştır.",
    tags: ["underwater systems", "technical integration", "system integrity", "milestone tracking", "robotics", "integration contracts", "technical documentation"],
    source: { label: "Portfolio · Deneyim", url: "portfolio.html#experience", kind: "section" },
  },

  // ── Mükemmelleştirme Audit Eklemeleri ───────────────────────────────
  {
    id: "mindset-discipline",
    title: "Mühendislik Zihniyeti ve Zihinsel Disiplin",
    text:
      "Resul'un mühendislik projelerindeki sabrı, varyant analizi yeteneği ve baskı altında karar kalitesi; satrançtaki çok adımlı düşünme disiplini ve tenisteki tempo yönetimiyle doğrudan ilişkilidir. " +
      "Teknik problemleri birer varyant analizi gibi ele alan Resul, uzun soluklu teknik hedeflerde sürdürülebilir bir odak (focus) kurma başarısını bu zihinsel antrenmanlara borçludur. " +
      "Bu disiplin, onun karmaşık hata ayıklama (debugging) süreçlerinde ve sistem mimarisi tasarlarken gösterdiği analitik titizliğin temelidir.",
    tags: ["mindset", "discipline", "chess", "tennis", "analytical thinking", "focus", "decision making", "mental training"],
    source: { label: "Portfolio · İlgi Alanları", url: "portfolio.html#interests", kind: "section" },
  },
  {
    id: "react-nextjs-expertise",
    title: "Frontend Mühendisliği: React ve Next.js Mimari Yaklaşımı",
    text:
      "Resul, modern web ekosistemindeki kullanıcı deneyimi ve performans beklentilerini React ve Next.js tabanlı sürdürülebilir mimarilerle karşılar. " +
      "Next.js tarafında projenin ihtiyacına göre SSR (Server-Side Rendering), SSG (Static Site Generation) ve ISR (Incremental Static Regeneration) stratejilerini belirleyerek " +
      "hız optimizasyonunu önceler. Durum yönetimi tarafında Zustand, Context API ve Tailwind CSS ekosistemini bileşen tabanlı tasarım prensipleriyle (Component-driven design) " +
      "birleştirerek modüler ve bakımı kolay frontend yapıları kurar. Bu teknik hakimiyet ona; karmaşık arayüzleri mantıksal parçalara ayırma ve yüksek performanslı web ürünleri üretme kapasitesi katar.",
    tags: ["react", "next.js", "frontend frameworks", "ssr", "ssg", "isr", "zustand", "context api", "state management", "performance", "component-driven", "frontend architecture", "resul", "kılınç", "fronted"],
    source: { label: "Portfolio · Yetenekler", url: "portfolio.html#skills", kind: "section" },
  },
  // ── 200+ Scenario Expansion: Professional & Technical Scenarios ──────
  {
    id: "scenario-why-hire",
    title: "Mülakat: Neden Resul Kılınç ile Çalışmalısınız?",
    text:
      "Resul, teknik yetkinliği (React, Kotlin, ML) sadece bir araç olarak değil, iş hedeflerine ulaşmak için stratejik bir kaldıraç olarak kullanır. " +
      "Farkı; bulduğu kritik bug'ları (Google Antigravity) dökümante etme disiplini, kısıtlı kaynaklarla (Local RAG) yüksek performans üretme yeteneği ve " +
      "uluslararası takımlara (Erasmus) hızlı adaptasyonudur. O, her projede sadece kod değil, aynı zamanda o projenin teknik ve akademik değerini temsil eden bir dökümantasyon mirası bırakır.",
    tags: ["hiring", "value proposition", "differentiation", "professional traits", "reliability", "quality focus", "staj", "staja", "intern", "internship", "neden resul", "almalı", "alabilir", "işe al", "resulu", "resul kılınç"],
    source: { label: "Dijital İkiz · Değer Önerisi", url: "portfolio.html", kind: "perspective" },
  },
  {
    id: "scenario-technical-roadblock",
    title: "Mülakat: Teknik Bir Engeli Nasıl Aşarsınız?",
    text:
      "Resul, teknik bir engelle karşılaştığında 'Sistemli İzolasyon' metodunu uygular. Google Antigravity projesinde yaşadığı DOM bozulmasını; " +
      "adım adım minimal kod örneğine (repro) indirgeyerek, tarayıcı davranışlarını analiz ederek ve sorunu izole ederek raporlamıştır. " +
      "Bu analitik yaklaşım ona; kaotik bug'ları öngörülebilir çözüm adımlarına dönüştürme ve kök neden (root cause) analizinde ustalık kazandırmıştır.",
    tags: ["problem solving", "debugging", "analytical thinking", "technical roadblocks", "google antigravity", "root cause analysis"],
    source: { label: "Dijital İkiz · Problem Çözme", url: "portfolio.html#journal", kind: "perspective" },
  },
  {
    id: "scenario-future-vision",
    title: "Mühendislik Vizyonu: 5 Yıl İçindeki Hedefler",
    text:
      "Resul, önümüzdeki 5 yıl içinde; yapay zekâ ve frontend mimarilerini birleştiren 'Akıllı Arayüzler' (Intelligent UIs) konusunda uzmanlaşmayı hedeflemektedir. " +
      "Akademik altyapısını (Zeytin Projesi) endüstriyel standartlarla (Next.js, Cloud Native) harmanlayarak, kullanıcıya değer katan ölçeklenebilir ürünler geliştirmek ana vizyonudur. " +
      "Uluslararası tecrübesini (Erasmus) global çaplı bir mühendislik liderliğine dönüştürmek, onun profesyonel yol haritasının temelidir.",
    tags: ["career goals", "future vision", "growth mindset", "engineering leadership", "strategic planning"],
    source: { label: "Dijital İkiz · Vizyon", url: "portfolio.html", kind: "perspective" },
  },
  {
    id: "scenario-team-conflict",
    title: "Mülakat: Takım İçi Çatışma ve Koordinasyon Yönetimi",
    text:
      "Resul, TEKNOFEST süreçlerinde çok disiplinli ekiplerin koordinasyonunda; çatışmaları 'Teknik Standartlar ve Net Görev Tanımları (WBS)' üzerinden yönetmiştir. " +
      "Fikir ayrılıklarını kişisel değil, proje hedefleri ve dökümantasyon bütünlüğü çerçevesinde teknik bir tartışmaya dönüştürmeyi tercih eder. " +
      "Bu yaklaşım ona; takımı ortak bir teknik dilde buluşturma, motivasyonu koruma ve kriz anlarında sükuneti sağlayarak hedefe odaklanma yetisi katmıştır.",
    tags: ["conflict management", "teamwork", "coordination", "leadership", "soft skills", "collaboration"],
    source: { label: "Dijital İkiz · İletişim", url: "portfolio.html#experience", kind: "perspective" },
  },
  {
    id: "scenario-learning-process",
    title: "Mülakat: Yeni Bir Teknolojiyi Öğrenme Metodu",
    text:
      "Resul, yeni bir teknolojiyi (örn: Next.js) öğrenirken 'Tersine Mühendislik ve Uygulamalı Deney' metodunu kullanır. " +
      "Önce o teknolojinin 'Neden var olduğunu?' ve 'Hangi problemi çözdüğünü?' anlar, ardından ReK AI gibi gerçek bir projeye entegre ederek sınırlarını test eder. " +
      "Bu metodik öğrenme hızı ona; değişen teknoloji dünyasına hızla uyum sağlama ve öğrenilen bilgiyi anında üretim değerine dönüştürme yeteneği katar.",
    tags: ["learning methodology", "adaptability", "rapid prototyping", "growth", "technical growth"],
    source: { label: "Dijital İkiz · Gelişim", url: "portfolio.html#workflow", kind: "perspective" },
  },
  {
    id: "scenario-code-quality",
    title: "Mülakat: Kod Kalitesi ve Sürdürülebilirlik Standartları",
    text:
      "Resul için kod kalitesi; sadece çalışan kod değil, 'başkası tarafından kolayca genişletilebilen ve dökümantasyonu tam olan kod' demektir. " +
      "Git branch disiplini, anlamlı commit mesajları ve modüler bileşen yapısı (Atomic Design) onun vazgeçilmezidir. " +
      "Bu standartlara olan bağlılığı, projelerin uzun vadeli teknik borcunu azaltır ve ekip içindeki code review süreçlerini hızlandırır.",
    tags: ["code quality", "clean code", "git discipline", "sustainability", "technical debt", "standards"],
    source: { label: "Dijital İkiz · Standartlar", url: "portfolio.html#workflow", kind: "perspective" },
  },
  {
    id: "scenario-academic-balance",
    title: "Akademik ve Endüstriyel Denge: Bilimsel Yaklaşım",
    text:
      "Resul, projelerinde akademik derinlik (Zeytin Projesi metrikleri) ile endüstriyel pratikliği (Next.js performansı) dengede tutar. " +
      "Bir sorunu çözerken akademik literatürü tarama disiplini ile 'production-ready' çözüm üretme çevikliğini birleştirir. " +
      "Bu denge ona; veri temelli kararlar alma, hipotez kurma ve bu hipotezleri somut yazılım ürünleriyle doğrulama yeteneği kazandırmıştır.",
    tags: ["academic logic", "industry standards", "research", "scientific method", "software engineering"],
    source: { label: "Dijital İkiz · Metodoloji", url: "portfolio.html#projects", kind: "perspective" },
  },
  {
    id: "scenario-system-design",
    title: "Sistem Tasarımı: Ölçeklenebilirlik ve Performans",
    text:
      "Resul, sistem mimarisi tasarlarken 'Önce Performans, Sonra Ölçeklenebilirlik' prensibini benimser. " +
      "ReK AI projesindeki yerel indeksleme stratejisi, bulut maliyetlerini düşürürken kullanıcı deneyimini (latency) optimize etme başarısıdır. " +
      "Bu tasarım yaklaşımı ona; kaynak kısıtlı ortamlarda bile yüksek verimli sistemler kurma ve teknik borcu mimari aşamada engelleme yetisi kazandırır.",
    tags: ["system design", "scalability", "performance", "architecture", "cost optimization", "latency"],
    source: { label: "Dijital İkiz · Mimari", url: "portfolio.html#journal", kind: "perspective" },
  },
  {
    id: "scenario-data-governance",
    title: "Veri Yönetişimi ve İş Zekâsı Stratejisi",
    text:
      "Resul, veri ambarı ve BI süreçlerinde 'Veri Doğruluğu ve İzlenebilirlik' ilkelerini merkeze alır. " +
      "SQL şema tasarımlarında KPI tanımlarının netliği, paydaşlar arası iletişimi güçlendirir ve raporlama hatalarını minimize eder. " +
      "Bu disiplin, ham verinin stratejik bir karar destek mekanizmasına dönüşmesini sağlar.",
    tags: ["data governance", "bi", "sql", "kpi", "data strategy", "reporting"],
    source: { label: "Dijital İkiz · Veri", url: "portfolio.html#skills", kind: "perspective" },
  },
  {
    id: "scenario-ux-accessibility",
    title: "Kapsayıcı Tasarım ve Erişilebilirlik (a11y)",
    text:
      "Resul, frontend geliştirmede erişilebilirliği (a11y) bir 'ek özellik' değil, temel bir mühendislik gereksinimi olarak görür. " +
      "Klavye navigasyonu, kontrast oranları ve semantik HTML kullanımı, onun kullanıcı odaklı mühendislik anlayışının bir parçasıdır. " +
      "Bu yaklaşım, ürünlerin daha geniş bir kitleye hitap etmesini ve teknik standartlara tam uyum sağlamasını garanti eder.",
    tags: ["a11y", "inclusive design", "ux", "frontend", "accessibility", "standards"],
    source: { label: "Dijital İkiz · UX", url: "portfolio.html#journal", kind: "perspective" },
  },
  {
    id: "scenario-ci-cd-discipline",
    title: "CI/CD ve Otomasyon Kültürü",
    text:
      "Resul, yazılım teslimatında 'Sürekli Entegrasyon ve Dağıtım' (CI/CD) süreçlerini, hata riskini azaltan bir güvenlik ağı olarak kullanır. " +
      "Cloudflare Pages ve benzeri modern dağıtım araçlarıyla, manuel süreçleri otomatize ederek teslimat hızını ve güvenilirliğini artırır. " +
      "Bu disiplin, onun 'hızlı ve hatasız teslimat' vizyonunu destekler.",
    tags: ["ci/cd", "automation", "delivery", "devops", "deployment", "reliability"],
    source: { label: "Dijital İkiz · İş Akışı", url: "portfolio.html#workflow", kind: "perspective" },
  },
  {
    id: "scenario-technical-writing",
    title: "Teknik Dokümantasyon ve Bilgi Paylaşımı",
    text:
      "Resul, teknik dokümantasyonu 'projenin yaşayan hafızası' olarak tanımlar. " +
      "Zeytin projesi ve TEKNOFEST raporları, onun karmaşık teknik süreçleri sade ve anlaşılır bir dille aktarma yeteneğini kanıtlar. " +
      "Bu yetenek, ekip içi bilgi transferini hızlandırır ve teknik borcun birikmesini engeller.",
    tags: ["technical writing", "documentation", "knowledge sharing", "reporting", "communication"],
    source: { label: "Dijital İkiz · Dokümantasyon", url: "portfolio.html#projects", kind: "perspective" },
  },
  {
    id: "scenario-mobile-architecture",
    title: "Mobil Geliştirme: MVVM ve Jetpack",
    text:
      "Resul, Android projelerinde MVVM mimarisi ve Jetpack bileşenlerini kullanarak, test edilebilir ve sürdürülebilir mobil uygulamalar geliştirir. " +
      "StateFlow ve Coroutines kullanımı, uygulamanın performansını ve kullanıcı deneyimini optimize eder. " +
      "Bu teknik derinlik, onun modern mobil standartlarına olan hakimiyetini gösterir.",
    tags: ["android", "kotlin", "mvvm", "jetpack", "mobile", "performance"],
    source: { label: "Dijital İkiz · Mobil", url: "portfolio.html#projects", kind: "perspective" },
  },
  {
    id: "scenario-problem-isolation",
    title: "Hata Ayıklama: İzolasyon ve Analiz",
    text:
      "Resul, karmaşık hata ayıklama süreçlerinde 'İzolasyon' yöntemini kullanır. " +
      "Sorunu en küçük parçasına indirgeyerek, kök nedeni (root cause) belirler ve kalıcı çözüm üretir. " +
      "Bu analitik titizlik, onun yazılım geliştirme sürecindeki en güçlü yönlerinden biridir.",
    tags: ["debugging", "isolation", "analysis", "problem solving", "root cause"],
    source: { label: "Dijital İkiz · Hata Ayıklama", url: "portfolio.html#journal", kind: "perspective" },
  },
  {
    id: "scenario-international-adaptability",
    title: "Global Adaptasyon ve Kültürel Zeka",
    text:
      "Resul, Erasmus+ deneyimleri sayesinde farklı çalışma kültürlerine ve global mühendislik standartlarına hızla uyum sağlar. " +
      "Teknik İngilizceyi aktif kullanarak, uluslararası takımlarda etkin rol alır ve global ölçekli projelerde sorumluluk üstlenir. " +
      "Bu adaptasyon yeteneği, onun profesyonel sınırlarını genişletir.",
    tags: ["international", "adaptability", "cultural intelligence", "global", "english"],
    source: { label: "Dijital İkiz · Deneyim", url: "portfolio.html#experience", kind: "perspective" },
  },
  {
    id: "scenario-analytical-mapping",
    title: "Analitik Haritalama ve Sinyal İşleme",
    text:
      "Resul, donanım ve yazılım katmanları arasında kurduğu analitik bağlarla, düşük gecikmeli (low-latency) sistemler tasarlar. " +
      "Fizyoterapi projesindeki sinyal işleme başarısı, onun çok disiplinli mühendislik yeteneğinin bir kanıtıdır. " +
      "Bu yetenek, karmaşık sistemlerin senkronizasyonunda kritik rol oynar.",
    tags: ["signal processing", "low latency", "hardware", "multidisciplinary", "analytical"],
    source: { label: "Dijital İkiz · Mühendislik", url: "portfolio.html#projects", kind: "perspective" },
  },
  {
    id: "scenario-strategic-decision-making",
    title: "Stratejik Karar Alma ve Risk Yönetimi",
    text:
      "Resul, teknik kararlar alırken 'Risk-Fayda' analizini önceler. " +
      "Hangi kütüphanenin kullanılacağı veya hangi mimarinin seçileceği, projenin uzun vadeli hedefleriyle uyumlu olmalıdır. " +
      "Bu stratejik yaklaşım, projelerin başarısını ve sürdürülebilirliğini garanti altına alır.",
    tags: ["decision making", "risk management", "strategy", "planning", "engineering"],
    source: { label: "Dijital İkiz · Yönetim", url: "portfolio.html#workflow", kind: "perspective" },
  },
  {
    id: "scenario-continuous-improvement",
    title: "Sürekli İyileştirme ve Öğrenme",
    text:
      "Resul, her projeyi bir 'öğrenme fırsatı' olarak görür. " +
      "Projelerindeki teknik borçları temizlemek, performansı artırmak ve dökümantasyonu güncellemek, onun sürekli iyileştirme disiplininin bir parçasıdır. " +
      "Bu yaklaşım, onun profesyonel gelişimini hızlandırır.",
    tags: ["continuous improvement", "learning", "growth", "development", "discipline"],
    source: { label: "Dijital İkiz · Gelişim", url: "portfolio.html", kind: "perspective" },
  },
  {
    id: "scenario-team-leadership",
    title: "Takım Liderliği ve Koordinasyon",
    text:
      "Resul, TEKNOFEST gibi zorlu projelerde takım liderliği ve koordinasyon yeteneklerini sergilemiştir. " +
      "Görev dağılımı, zaman yönetimi ve teknik bütünlüğün korunması, onun liderlik tarzının temel taşlarıdır. " +
      "Bu yetenekler, onu karmaşık projelerde güvenilir bir lider yapar.",
    tags: ["leadership", "coordination", "management", "teamwork", "teknofest"],
    source: { label: "Dijital İkiz · Liderlik", url: "portfolio.html#experience", kind: "perspective" },
  },
  {
    id: "scenario-technical-integrity",
    title: "Teknik Bütünlük ve Standartlar",
    text:
      "Resul, projelerinde teknik bütünlüğü (integrity) korumak için katı standartlar uygular. " +
      "Kod standartları, test protokolleri ve dökümantasyon disiplini, onun teknik bütünlüğe olan bağlılığını gösterir. " +
      "Bu bağlılık, projelerin kalitesini ve güvenilirliğini artırır.",
    tags: ["integrity", "standards", "quality", "reliability", "engineering"],
    source: { label: "Dijital İkiz · Standartlar", url: "portfolio.html#workflow", kind: "perspective" },
  },
  {
    id: "scenario-innovation-mindset",
    title: "İnovasyon ve Yaratıcı Çözümler",
    text:
      "Resul, geleneksel yöntemlerin ötesine geçerek, yenilikçi ve yaratıcı çözümler üretir. " +
      "ReK AI ve Fizyoterapi projeleri, onun inovasyon odaklı mühendislik yaklaşımının somut örnekleridir. " +
      "Bu zihniyet, onu sektördeki diğer mühendislerden ayırır.",
    tags: ["innovation", "creativity", "problem solving", "engineering", "vision"],
    source: { label: "Dijital İkiz · İnovasyon", url: "portfolio.html#projects", kind: "perspective" },
  },
  {
    id: "journal-accessibility",
    title: "Frontend Erişilebilirlik ve Teknik Borç Disiplini",
    text:
      "Resul, frontend geliştirmede 'teknik borç biriktirmeme' prensibini, erişilebilirlik (a11y) ve odak yönetimi (focus management) standartlarıyla pekiştirir. " +
      "Mobil öncelikli arayüzlerde klavye akışını ve kontrast uyumunu tasarımın ayrılmaz bir parçası olarak kurgulayan Resul, kapsayıcı bir kullanıcı deneyimini (inclusive UX) önceler. " +
      "Bu yaklaşım, ürünün sadece görsel olarak değil, teknik mimari ve erişilebilirlik açısından da yüksek standartlara sahip olmasını sağlar.",
    tags: ["accessibility", "a11y", "frontend discipline", "technical debt", "inclusive ux", "focus management", "mobile performance"],
    source: { label: "Portfolio · Yazılım Günlüğü", url: "portfolio.html#journal", kind: "section" },
  },
  {
    id: "backend-data-modeling",
    title: "Backend, Veri ve Modelleme Stratejisi",
    text:
      "Resul'un backend ve veri tarafındaki uzmanlığı; SQL sorgu performansını optimize eden şema tasarımları ve iş zekâsı (BI) araçlarında KPI tanımları oluşturma disiplinine dayanır. " +
      "Veri ambarı sorgularında veri yönetişimi (governance) ve raporlama doğruluğunu önceliklendiren Resul, self-service BI kültürünü paydaşlarla ortak tanımlar çerçevesinde kurgular. " +
      "Bu yaklaşım, büyük ölçekli ham verinin işlenebilir ve ölçülebilir stratejik çıktılara dönüştürülmesini sağlar.",
    tags: ["backend", "data modeling", "sql optimization", "bi", "kpi", "data strategy", "reporting"],
    source: { label: "Portfolio · Yetenekler", url: "portfolio.html#skills", kind: "section" },
  },
  {
    id: "services-offered",
    title: "Sunulan Hizmetler ve Teknik Uzmanlık Alanları",
    text:
      "Resul, profesyonel bir yazılım mühendisi adayı olarak şu hizmetleri ve çözümleri sunmaktadır:\n" +
      "1. **Modern Frontend Geliştirme**: React ve Next.js tabanlı, yüksek performanslı ve erişilebilir web uygulamaları.\n" +
      "2. **Mobil Uygulama Çözümleri**: Kotlin ve MVVM mimarisiyle sürdürülebilir Android uygulamaları.\n" +
      "3. **Yapay Zekâ Entegrasyonu**: Özel veri setleriyle model eğitimi (EfficientNet) ve tarayıcı tabanlı AI (RAG) çözümleri.\n" +
      "4. **Teknik Danışmanlık ve Raporlama**: Akademik standartlarda teknik dökümantasyon ve mimari analiz.",
    tags: ["ürün", "hizmet", "neler yapıyorsun", "hizmetler", "servis", "service", "offering", "solutions", "yazılım geliştirme", "frontend freelancer", "mobile automation", "ml consulting"],
    source: { label: "Portfolio · Yetenekler", url: "portfolio.html#skills", kind: "section" },
  },
  {
    id: "customer-support-redirect",
    title: "Destek ve İletişim Kanalları",
    text:
      "Müşteri desteği veya teknik yardım talepleriniz için doğrudan Resul ile iletişime geçebilirsiniz. " +
      "Resul, projeleri için doğrudan iletişim modelini benimser:\n" +
      "- **E-posta**: kilincresul722@gmail.com\n" +
      "- **WhatsApp/Telefon**: +90 531 246 99 10\n" +
      "- **LinkedIn**: Profesyonel ağ üzerinden hızlı geri dönüş.\n" +
      "Herhangi bir teknik sorun veya iş birliği için bu kanallar üzerinden '7/24 mesaj' bırakabilirsiniz.",
    tags: ["destek", "support", "yardım", "help", "iletişim", "contact support", "müşteri hizmetleri", "nasıl ulaşırım", "soru", "yardim"],
    source: { label: "Portfolio · İletişim", url: "portfolio.html#contact", kind: "section" },
  },

  // ── PERSONA-SPECIFIC SNIPPETS (HR / TECH / STUDENT / ACADEMIC) ─────
  {
    id: "persona-hr-hire-resul",
    title: "İK: Neden Resul Kılınç ile Çalışmalısınız?",
    text:
      "Resul, teknik yetkinliğini (React, Kotlin, ML) 'iş teslimi' ve 'ölçülebilir başarı' disipliniyle birleştirir. " +
      "Resul ile çalışmak şu avantajları sağlar:\n" +
      "1. **Hızlı Adaptasyon**: Erasmus ve uluslararası projelerle kanıtlanmış global uyum.\n" +
      "2. **Düşük Teknik Borç**: Yazdığı her kodu dökümante eder ve sürdürülebilir mimariler (MVVM, Next.js) kurar.\n" +
      "3. **Proaktif Problem Çözme**: Google Antigravity örneğinde olduğu gibi, hataları tespit edip çözümle raporlar.\n" +
      "O, sadece bir kod yazarı değil, projenin mühendislik kalitesini yükselten bir takım oyuncusudur.",
    tags: ["hr", "hiring", "why hire", "recruiter", "values", "impact", "mülakat", "neden", "staj", "staja", "stajyer", "stajyeri", "stajyera", "intern", "internship", "almalı", "alabilir", "almalısın", "çalışmalı", "neden resul", "resulu", "resul kılınç", "işe al", "ise al", "teklif", "hire resul", "işe almalı"],
    source: { label: "Dijital İkiz · İK", url: "portfolio.html", kind: "perspective" },
  },
  {
    id: "persona-tech-architecture",
    title: "Teknik: Mimari Kararlar ve Mühendislik Yaklaşımı",
    text:
      "Resul, projelerinde 'Önce Mimari' prensibini benimser. Next.js üzerinde SSR/SSG kararlarını SEO ve LCP (Largest Contentful Paint) metriklerine göre belirler. " +
      "Durum yönetiminde (State Management) 'Over-engineering'den kaçınarak; basit işler için Context API, karmaşık veri akışları için Zustand tercih eder. " +
      "Mobil tarafta MVVM ve Clean Architecture prensiplerini uygulayarak, UI ve Data katmanlarını kesin sınırlarla ayırır. Bu yaklaşım, kodun test edilebilirliğini ve ekip içindeki bakım kolaylığını %100 sağlar.",
    tags: ["tech", "architecture", "engineering thinking", "mimari", "next.js", "zustand", "mvvm", "clean architecture"],
    source: { label: "Dijital İkiz · Teknik", url: "portfolio.html#skills", kind: "perspective" },
  },
  {
    id: "persona-student-mentor",
    title: "Öğrenci: Öğrenme Yolu ve Mentorluk Tavsiyeleri",
    text:
      "Selam arkadaşım! Resul'un öğrenme metodolojisi 'Tersine Mühendislik' üzerine kurulu. " +
      "Önce bir projeyi (örn: Mayın Tarlası) bozup sonra tamir ederek öğreniyor. " +
      "Sana tavsiyeleri:\n" +
      "- **Dokümantasyon Oku**: Video izlemek yerine resmi dökümanları taramak seni derinleştirir.\n" +
      "- **Paylaş**: Öğrendiklerini Medium'da yazmak bilgiyi kalıcı kılar.\n" +
      "- **Erasmus**: Polonya (Lodz) dönemi sadece dil değil, vizyon kattı; mutlaka kovala!",
    tags: ["student", "learning", "advice", "mentorshp", "öğrenci", "tavsiye", "öğrenme yolu"],
    source: { label: "Dijital İkiz · Öğrenci", url: "portfolio.html#journal", kind: "perspective" },
  },
  {
    id: "persona-academic-vision",
    title: "Akademik: Araştırma Alanları ve Hedefler",
    text:
      "Araştırma vizyonu; Yapay Zeka'nın (Deep Learning) endüstriyel kalite kontrol süreçlerine (örn: Zeytin projesi) entegrasyonu üzerine yoğunlaşmıştır. " +
      "Akademik hedefleri:\n" +
      "1. Veri kısıtlı ortamlarda Transfer Learning optimizasyonu.\n" +
      "2. Bilgisayarlı Görü sistemlerinde gerçek zamanlı (Edge AI) performans analizi.\n" +
      "Resul, mühendislik pratiğini bilimsel metodolojiyle (ORCID: 0009-0006-8360-795X) desteklemeyi temel ilke edinmiştir.",
    tags: ["academic", "research", "vision", "hedef", "vizyon", "akademik", "makale", "dergipark"],
    source: { label: "Dijital İkiz · Akademik", url: "https://dergipark.org.tr/tr/pub/@resul-kilinc-28406", kind: "external" },
  },
];
