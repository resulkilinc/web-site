/**
 * Portfolio-grounded snippets with explicit source links.
 * Each snippet is designed for retrieval + evidence rendering.
 * @type {{ id: string, title: string, text: string, tags: string[], source: { label: string, url: string, kind: string } }[]}\
 */
export const PORTFOLIO_SNIPPETS = [
  // ── ReK AI ───────────────────────────────────────────────────────────
  {
    id: "rekai-overview",
    title: "ReK AI Mimarisi ve Bilgi Erişimi",
    text:
      "Resul'un yapay zeka ve bilgi mimarisi yaklaşımının bir ürünü olan ReK AI, kullanıcı gizliliğini merkeze alan 'Local RAG' (Retrieval-Augmented Generation) disiplini üzerine kuruludur. " +
      "Dış sunucu bağımlılığını ve API maliyetlerini sıfıra indiren bu sistem, tarayıcı tarafında çalışan modüler bir pipeline (tokenize -> retrieve -> rank -> compose) kullanır. " +
      "Resul, sistemin güvenilirliğini sağlamak adına 'Guard Threshold' ve 'Source-First' modlarını entegre ederek, düşük güven skorlu yanıtlarda bile dökümantasyon bütünlüğünü korumayı tercih etmiştir. " +
      "Gecikme süresi (latency) ve skor şeffaflığı sağlayan Diagnostics arayüzü, Resul'un teknik şeffaflık ve performans izleme disiplinini yansıtır.",
    tags: ["rek ai", "representative", "portfolio", "architectural choice", "local knowledge", "source-backed", "rag", "retrieval", "local", "privacy", "zero-cost"],
    source: { label: "Portfolio · ReK AI section", url: "portfolio.html#res-ai", kind: "section" },
  },

  // ── Zeytin Projesi ───────────────────────────────────────────────────
  {
    id: "zeytin-core",
    title: "Zeytin Olgunluk Sınıflandırmasında Akademik Yaklaşım",
    text:
      "Resul'un bilgisayarlı görü ve derin öğrenme alanındaki teknik disiplini, Zeytin olgunluk sınıflandırma projesindeki veri odaklı yaklaşımıyla öne çıkar. " +
      "EfficientNet-B0 mimarisinin transfer learning yöntemleriyle optimize edilmesi ve saha koşullarını yansıtmak adına oluşturulan 2694 görüntülük özgün veri kümesi, " +
      "Resul'un gerçek dünya problemlerini matematiksel modellerle harmanlama başarısını kanıtlar. " +
      "Proje, tarımsal üretim hatlarında manuel kalite kontrolün getirdiği hata payını minimize eden, " +
      "doğruluğu akademik olarak doğrulanmış (%84.95 accuracy) bir mühendislik çözümüdür.",
    tags: ["zeytin", "olive", "classification", "ripeness", "dataset", "computer vision", "ml", "academic rigor", "field conditions", "2694"],
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
    tags: ["84.95", "accuracy", "f1", "precision", "recall", "confusion matrix", "ala yeşil", "siyah", "yeşil", "metrik", "test", "doğruluk", "başarı", "sınıf"],
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
    title: "Mühendislik iş akışı ve çalışma disiplini",
    text:
      "İş akışı 5 aşamadan oluşur: (1) Keşif — problem ve hedef tanımı; (2) Tasarım — mimari ve görev kırılımı; " +
      "(3) Uygulama — kod standartları, code review ve commit disiplini; " +
      "(4) Kalite — test, erişilebilirlik (a11y) ve performans kontrolü; (5) Yayın — CI/CD mantığıyla kontrollü deploy ve izleme. " +
      "Bu süreç hem bireysel projelerde (portföy, ReK AI) hem de takım çalışmalarında (TEKNOFEST) uygulanmıştır.",
    tags: ["workflow", "code review", "quality", "release", "a11y", "performance", "testing", "iş akışı", "ci/cd", "deploy"],
    source: { label: "Portfolio · İş akışı", url: "portfolio.html#workflow", kind: "section" },
  },

  // ── Yetenek Profili ───────────────────────────────────────────────────
  {
    id: "skills-focus",
    title: "Yetenek profili — teknik stack",
    text:
      "Frontend: React, Next.js (SSR/SSG/ISR), JavaScript/TypeScript (Zustand, Context API, ESM), HTML/CSS. " +
      "ML ve veri: Python, TensorFlow, PyTorch, SQL — veri hazırlama, model eğitimi, metrik analizi. " +
      "Mobil: Kotlin (Android, lifecycle farkındalığı, katmanlı mimari). " +
      "Sistem: Java, C++ (algoritmik doğruluk ve düşük seviye performans). " +
      "Araçlar: Git (branch disiplini, commit izlenebilirliği, code review odaklı teslimat). " +
      "Dil: İngilizce B2 (teknik dokümantasyon, sözlü iletişim, akademik yazım).",
    tags: ["javascript", "python", "sql", "kotlin", "git", "frontend", "backend", "ml", "tensorflow", "pytorch", "java", "c++", "yetenek", "skill", "stack"],
    source: { label: "Portfolio · Yetenekler", url: "portfolio.html#skills", kind: "section" },
  },

  // ── Deneyim ─────────────────────────────────────────────────────────
  {
    id: "experience-focus",
    title: "Uluslararası Hareketlilik ve Profesyonel Adaptasyon",
    text:
      "Resul'un profesyonel gelişimi, uluslararası akademik standartlara uyum ve teknik adaptasyon disipliniyle karakterize edilir. " +
      "Lodz University of Technology (Polonya) Erasmus+ deneyimi, Resul'un teknik iletişimini globale taşıma ve çok-kültürlü takım çalışmasında sorumluluk alma vizyonunu pekiştirmiştir. " +
      "South-West University (Bulgaristan) Erasmus+ staj kabulü ise bu akademik temeli Avrupa mühendislik ekosisteminde denetimli bir pratiğe dönüştürme başarısıdır. " +
      "Teknik yetkinliği (B2 İngilizce, Kotlin, Python, JS) ve uluslararası ağ yeteneği, Resul'u yeni nesil global mühendislik projeleri için güçlü bir aday yapar.",
    tags: ["erasmus", "international mobility", "lodz", "poland", "bulgaria", "technical communication", "adaptability", "b2 english", "global engineer"],
    source: { label: "Portfolio · Deneyim", url: "portfolio.html#experience", kind: "section" },
  },

  // ── İletişim ──────────────────────────────────────────────────────────
  {
    id: "contact-collab",
    title: "İletişim ve iş birliği",
    text:
      "Staj, yazılım rolleri ve teknik iş birlikleri için açığım. " +
      "E-posta: kilincresul722@gmail.com. Telefon/WhatsApp: +90 531 246 99 10. " +
      "LinkedIn, GitHub ve DergiPark profilleri portföy sayfasında bağlantılıdır. " +
      "CV Türkçe ve İngilizce PDF olarak portföy üzerinden indirilebilir.",
    tags: ["contact", "collaboration", "internship", "software role", "email", "whatsapp", "iletişim", "staj", "cv"],
    source: { label: "Portfolio · İletişim", url: "portfolio.html#contact", kind: "section" },
  },

  // ── DergiPark ─────────────────────────────────────────────────────────
  {
    id: "dergipark-profile",
    title: "DergiPark yazar profili ve akademik kimlik",
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
    id: "quality-google-report",
    title: "Kalite Güvencesi ve Google Teknik Raporlama",
    text:
      "Resul'un ürün kalitesine olan teknik hassasiyeti, Google Antigravity platformunda tespit ettiği L10n kaynaklı DOM bozulması ve Issue #497054184 raporuyla somutlaşır. " +
      "Sorunu izole etme, yeniden üretilebilir (reproducible) adımları dökümante etme ve teknik bir senaryo sunma disiplini, Resul'un profesyonel dökümantasyon standartlarını yansıtır. " +
      "Bu süreç, onun sadece kod yazmaya değil, kullanılan ürünlerin kararlılık ve kalite standartlarının korunmasına da sunduğu mühendislik katkısının bir kanıtıdır.",
    tags: ["google", "antigravity", "bug report", "quality assurance", "l10n", "dom corruption", "reproducible", "technical documentation", "issue 497054184"],
    source: { label: "Portfolio · Yazılım Günlüğü", url: "portfolio.html#journal", kind: "section" },
  },
  {
    id: "journal-performance",
    title: "Performans Trade-off'ları ve ReK AI Analizi",
    text:
      "ReK AI'ın tarayıcı tarafında (client-side) çalışan yerel indexing mimarisi, gizlilik ve gecikme süresi (latency) arasındaki stratejik bir mühendislik kararıdır. " +
      "Resul, harici bulut servislerine bağımlılığı ve maliyetleri sıfıra indirmeyi hedeflerken, arama performansını TF-IDF tabanlı bir retrieval hattı ile optimize etmeyi tercih etmiştir. " +
      "Bu kararlar, Resul'un kaynak kısıtlı ortamlarda (resource-constrained) yüksek performanslı ve sürdürülebilir sistemler tasarlama yetkinliğini gösterir.",
    tags: ["performance", "trade-off", "latency", "local index", "client-side ml", "rag strategy", "efficiency", "optimization"],
    source: { label: "Portfolio · Yazılım Günlüğü", url: "portfolio.html#journal", kind: "section" },
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
    tags: ["backend", "data modeling", "sql optimization", "bi", "kpi", "data governance", "schema design", "performance"],
    source: { label: "Portfolio · Yetenekler", url: "portfolio.html#skills", kind: "section" },
  },
  {
    id: "react-nextjs-expertise",
    title: "Modern Frontend Frameworkleri ve React Mimari Yaklaşımı",
    text:
      "Resul, modern web ekosistemindeki kullanıcı deneyimi ve performans beklentilerini React ve Next.js tabanlı sürdürülebilir mimarilerle karşılar. " +
      "Next.js tarafında projenin ihtiyacına göre SSR (Server-Side Rendering), SSG (Static Site Generation) ve ISR (Incremental Static Regeneration) stratejilerini belirleyerek " +
      "SEO ve hız optimizasyonunu önemsiz kılar. Durum yönetimi tarafında Zustand, Context API ve Tailwind CSS ekosistemini bileşen tabanlı tasarım prensipleriyle (Component-driven design) " +
      "birleştirerek modüler ve bakımı kolay frontend yapıları kurar.",
    tags: ["react", "next.js", "frontend frameworks", "ssr", "ssg", "isr", "zustand", "context api", "state management", "performance", "component-driven"],
    source: { label: "Portfolio · Yetenekler", url: "portfolio.html#skills", kind: "section" },
  },
];
