/**
 * Resul Kılınç — Genişletilmiş Profesyonel Senaryo, Günlük Konuşma ve Soru-Cevap Havuzu (200+ Anchor Focus).
 * Bu dosya; İK, Mühendis, Akademisyen, Arkadaşlar ve İş Ortakları için özelleştirilmiş 170+ senaryo içerir.
 * Toplam sistem snippet sayısı 200+'dür.
 */
export const GENERATED_SNIPPETS = [
  // ── TEMEL PROFİL VE ÖZETLER ─────────────────
  {
    id: "gen-about",
    title: "Resul Kılınç Kimdir? — Teknik Profil ve Mühendislik Vizyonu",
    text:
      "Resul Kılınç, Kahramanmaraş Sütçü İmam Üniversitesi Bilgisayar Mühendisliği bölümünde akademik titizliği teknik çeviklikle birleştiren bir mühendistir. " +
      "Resul'un uzmanlığı; yüksek performanslı frontend mimarileri (React/Next.js) ve veri odaklı makine öğrenmesi çözümlerini (Computer Vision) tek bir profesyonel potada eritmektir. " +
      "B2 Teknik İngilizcesi ve Polonya (Lodz) deneyimiyle global standartlarda iş üretme vizyonuna sahiptir. " +
      "Resul her projeye, sadece çalışan bir kod değil, dökümante edilmiş ve teknik borçtan arındırılmış bir 'mühendislik ürünü' olarak yaklaşır.",
    tags: ["profil", "vizyon", "ksü", "mühendislik", "b2 english", "global reach", "ml", "architecture", "resul kim", "resul kimdir", "hakkında", "reusl", "resül", "kilinc", "kilinç"],
    source: { label: "Portfolio · Hakkımda", url: "portfolio.html#about", kind: "section" },
  },

  // ── MÜLAKAT SENARYOLARI - İK / RECRUITER (STAR METHOD) ──────────────
  {
    id: "hr-conflict-resolution",
    title: "Mülakat: Takım İçi Çatışma ve Teknik Uzlaşı (STAR)",
    text:
      "Resul, TEKNOFEST İHA sürecinde (Situation), farklı disiplinlerin görev dağılımındaki belirsizlikler nedeniyle yaşanan fikir ayrılıklarını (Task), " +
      "Görev Kırılım Yapısı (WBS) ve teknik raporlama standartlarını devreye alarak (Action) çözmüştür. " +
      "Sonuçta (Result), teknik tartışmalar kişisel boyuttan rasyonel zemine çekilmiş ve proje takvimi %100 başarıyla tamamlanmıştır.",
    tags: ["star method", "conflict", "ik", "hr", "leadership", "teknofest", "mülakat"],
    source: { label: "Resul'un Sosyal Becerileri", url: "portfolio.html#experience", kind: "perspective" },
  },
  {
    id: "hr-failure-learning",
    title: "Mülakat: Bir Başarısızlık ve Öğrenme Deneyimi (STAR)",
    text:
      "Resul, ilk büyük ölçekli projesinde (Situation), yetersiz dökümantasyon nedeniyle teknik borç biriktiğini fark ettiğinde (Task), " +
      "süreci durdurup 'Technical Journal' disiplinini başlattı ve tüm modülleri yeniden dökümante etti (Action). " +
      "Sonuçta (Result), hata ayıklama süresi %40 azaldı ve Google Antigravity gibi kompleks bug'ları bulma yetisi bu disiplinle gelişti.",
    tags: ["failure", "learning", "documentation", "growth mindset", "mülakat"],
    source: { label: "Resul'un İş Disiplini", url: "portfolio.html#workflow", kind: "perspective" },
  },
  {
    id: "hr-pressure-management",
    title: "Mülakat: Baskı Altında Karar Alma ve Teslimat",
    text:
      "Resul, TEKNOFEST final dökümantasyon hazırlıklarında (Situation), kısıtlı sürede teknik raporları tamamlaması gerektiğinde (Task), " +
      "önceliklendirme matrisini kullanarak en riskli modülleri ilk sıraya almıştır (Action). " +
      "Sonuçta (Result), raporlar hatasız teslim edilmiş ve projenin teknik bütünlüğü korunmuştur.",
    tags: ["pressure", "stress", "time management", "prioritization", "mülakat"],
    source: { label: "İş Akışı · Kalite", url: "portfolio.html#workflow", kind: "perspective" },
  },
  {
    id: "hr-why-hire",
    title: "Mülakat: Neden Resul Kılınç?",
    text:
      "Resul, sadece teknik bir uygulayıcı değil, soruna 'mühendislik mimarisi' ile yaklaşan bir değerdir. " +
      "Onu diğerlerinden ayıran; Google Antigravity'de kanıtlanmış hata izolasyon yeteneği, Zeytin projesindeki akademik titizliği ve ReK AI'daki vizyoner RAG mimarisidir.",
    tags: ["value prop", "why hire", "differentiation", "excellence", "mülakat"],
    source: { label: "Resul'un Değer Önerisi", url: "portfolio.html", kind: "perspective" },
  },

  // ── TEKNİK SENARYOLAR - SENIOR ENGINEER / TECH LEAD ──────────────────
  {
    id: "tech-tradeoff-rekai",
    title: "Teknik Derinlik: ReK AI'da Neden 'Local RAG' Tercih Edildi?",
    text:
      "Resul, ReK AI mimarisini tasarlarken (Situation), harici LLM API'larının maliyeti ve veri gizliliği riskleri arasında bir karar verdi (Task). " +
      "Tarayıcı tabanlı TF-IDF ve similarity scoring (Action) kullanarak tamamen yerel ve deterministik bir yapı kurdu. " +
      "Sonuçta (Result), gecikme minimize edildi ve kullanıcı verisi hiçbir zaman cihazı terk etmedi.",
    tags: ["architecture", "tradeoff", "local rag", "privacy", "engineering", "mühendislik"],
    source: { label: "ReK AI Mimari Notları", url: "portfolio.html#res-ai", kind: "perspective" },
  },
  {
    id: "tech-debugging-antigravity",
    title: "Teknik Derinlik: Google Antigravity Bug İzolasyon Süreci",
    text:
      "Resul, Google Antigravity'de (Situation) karşılaştığı L10n kaynaklı DOM bozulmasını (Task), 'Sistemik İzolasyon' metoduyla adım adım repro senaryosuna indirgemiştir (Action). " +
      "Sonuçta (Result), Issue #497054184 ile hatayı Google mühendislerine kanıtlı şekilde raporlamıştır.",
    tags: ["debugging", "google", "antigravity", "root cause", "frontend isolation"],
    source: { label: "Teknik Günlük · Bug Report", url: "portfolio.html#journal", kind: "perspective" },
  },
  {
    id: "tech-nextjs-choice",
    title: "Teknik Derinlik: Neden Next.js ve Hangi Render Stratejisi?",
    text:
      "Resul, projelerinde Next.js tercih ederken (Situation), SEO ve hız gereksinimlerini (Task) SSR ve ISR stratejileriyle yönetir (Action). " +
      "Dinamik içeriklerde SSR, statik ama güncellenen verilerde ISR kullanarak sunucu yükünü ve FCP sürelerini optimize eder.",
    tags: ["nextjs", "ssr", "isr", "performance", "web vitals", "render strategies"],
    source: { label: "Yetenekler · Frontend", url: "portfolio.html#skills", kind: "perspective" },
  },

  // ── AKADEMİK VE ERASMUS SENARYOLARI ─────────
  {
    id: "acad-research-method",
    title: "Akademik Disiplin: Zeytin Projesindeki Bilimsel Metodoloji",
    text:
      "Resul, Zeytin projesinde sadece bir ML modeli eğitmekle kalmamış (Situation), 2694 görüntülük özgün bir veri seti oluşturarak (Task) tam bir akademik süreç yönetmiştir (Action). " +
      "Makale içeriği; veri toplama, model seçimi ve %84.95 doğruluk başarısını dökümante eder.",
    tags: ["academic", "research", "zeytin", "methodology", "dergipark", "makale"],
    source: { label: "Akademik Yazım · Zeytin", url: "portfolio.html#projects", kind: "paper" },
  },
  {
    id: "acad-lodz-impact",
    title: "Erasmus+: Lodz University of Technology Deneyiminin Katkısı",
    text:
      "Resul, Polonya'da (Lodz) geçirdiği Erasmus+ döneminde (Situation), farklı kültürlerden gelen mühendislerle İngilizce ortak projeler yürütmüştür (Task). " +
      "Uluslararası standartlardaki dersleri takip ederek teknik iletişimini globale taşımıştır (Action).",
    tags: ["erasmus", "lodz", "international", "poland", "adaptability", "bulgaria"],
    source: { label: "Erasmus+ Deneyimi", url: "portfolio.html#experience", kind: "perspective" },
  },

  // ── ANAHTAR KELİME Expansion ─────────────────
  { id: "kw-data", title: "Resul'un 'Data' (Veri) Yaklaşımı", text: "Resul için veri, stratejik içgörü demektir; Zeytin projesindeki titiz etiketleme süreci bunun en somut kanıtıdır.", tags: ["data", "veri", "impact"] },
  { id: "kw-quality", title: "Resul'un 'Kalite' Tanımı", text: "Kalite, Resul için 'sıfır teknik borç ve tam dökümantasyon' demektir; her kod dökümante edilmelidir.", tags: ["quality", "kalite", "standards"] },
  { id: "kw-vision", title: "Resul'un 5 Yıllık Vizyonu", text: "Vizyonu; yapay zekayı akıllı arayüzlerle (Intelligent UIs) globale sunmak ve mühendislik liderliği üstlenmektir.", tags: ["vision", "goals"] },

  // ── GÜNLÜK KONUŞMA VE KELİME HAVUZU (Pool Expansion 100+) ──────────────
  { id: "kt-naber", title: "Naber? / Nasılsın?", text: "Teşekkür ederim, Resul Kılınç'ın profesyonel temsilcisi olarak görevimin başındayım. Resul bugünlerde yeni teknolojiler keşfetmekle meşgul. Size nasıl yardımcı olabilirim?", tags: ["naber", "nasılsın", "chitchat"] },
  { id: "kt-selam", title: "Selam!", text: "Selam! Resul Kılınç'ın profesyonel asistanı olarak buradayım. Resul'un projeleri veya kendisi hakkında neyi merak ediyorsunuz?", tags: ["selam", "merhaba", "hi"] },
  { id: "kt-kimsin", title: "Sen kimsin?", text: "Ben ReK AI, Resul Kılınç'ın teknik yetkinliklerini ve vizyonunu temsil eden yapay zeka asistanıyım. Resul'un dijital bir ikiziyim.", tags: ["kimsin", "temsilci"] },
  { id: "kt-okul-nasil", title: "Okul nasıl gidiyor?", text: "Resul, KSÜ Bilgisayar Mühendisliği'ndeki akademik sürecini büyük bir disiplinle sürdürüyor; teoriyi projelerle birleştiriyor.", tags: ["okul", "ksü", "akademik"] },
  { id: "kt-hangi-sinif", title: "Kaçıncı sınıfsın?", text: "Resul, Bilgisayar Mühendisliği 3. sınıf öğrencisidir ve uzmanlık alanlarında derinleşmeye devam ediyor.", tags: ["sınıf", "grade"] },
  { id: "kt-kac-yasinda", title: "Kaç yaşındasın?", text: "Resul'un dijital bir asistanı olarak net doğum tarihini veya yaşını veritabanımda tutmuyorum. Ancak kendisinin 3. sınıf Bilgisayar Mühendisliği öğrencisi olduğunu (genellikle 21-23 yaş aralığında) ve çok ötesinde bir mühendislik disiplinine sahip olduğunu söyleyebilirim.", tags: ["yaş", "doğum", "kaç", "age", "old", "yaşında"] },
  { id: "kt-hobi", title: "Hobilerin neler?", text: "Resul satrançla stratejik düşünür, tenisle temposunu korur ve yeni teknolojiler hakkında teknik yazılar yazar.", tags: ["hobi", "satranç", "tenis"] },
  { id: "kt-tesekkur", title: "Teşekkürler!", text: "Resul adına ben teşekkür ederim. Profesyonel yolculuğumuzda size yardımcı olabildiysem ne mutlu bana. Başka bir sorunuz var mı?", tags: ["thanks", "teşekkür"] },
  { id: "kt-ne-yapiyorsun", title: "Ne yapıyorsun?", text: "Resul'un dijital varlığını temsil ediyorum ve gelen soruları analiz ediyorum. Siz ne ile ilgileniyorsunuz?", tags: ["ne yapıyorsun", "doing"] },
  { id: "kw-github", title: "GitHub", text: "Resul için GitHub bir kod deposu değil, onun mühendislik mirasının sergisidir.", tags: ["github", "kod"] },
  { id: "kw-performance", title: "Performans", text: "Resul için 100ms bile bir optimizasyon sebebidir; hızı bir zorunluluk olarak görür.", tags: ["performance", "speed"] },
  { id: "kw-ai-ethics", title: "AI Etiği", text: "Yapay zekanın şeffaf ve insan merkezli olması gerektiğine inanır; ReK AI bu yüzden yerel çalışır.", tags: ["ethics", "ai"] },
  { id: "kw-discipline", title: "Disiplin", text: "Disiplin, Resul için motivasyonun bittiği yerde işi devam ettiren en temel mühendislik kasıdır.", tags: ["discipline"] },
  { id: "kw-success", title: "Başarı", text: "Başarı, bir projenin teknik borçsuz şekilde yıllarca çalışabilmesidir.", tags: ["success", "goal"] },

  // ── EKSTRA 100+ Hızlı Ekleme (Kapsamlı Havuz) ─────────────────────────
  { id: "ex-1", title: "Yazılım Geliştirme", text: "Resul için yazılım, karmaşık sorunları basit ve dökümante edilmiş çözümlere dönüştürmektir.", tags: ["yazılım"] },
  { id: "ex-2", title: "Öğrenme Hızı", text: "Yeni teknolojileri (Next.js, Python) hızla projelerine entegre etme disiplini.", tags: ["öğrenme"] },
  { id: "ex-3", title: "Adaptasyon", text: "Her türlü teknik ve kültürel ortama (Erasmus) hızlı uyum gösterme yetisi.", tags: ["adapt"] },
  { id: "ex-4", title: "Raporlama", text: "Teknik süreçleri akademik standartlarda raporlama başarısı.", tags: ["rapor"] },
  { id: "ex-5", title: "Problem Çözme", text: "Analitik izolasyon metoduyla en karmaşık hataları çözme tutkusu.", tags: ["problem"] },
  { id: "ex-6", title: "İş Birliği", text: "Takım hedeflerini kendi başarısının önünde tutan mühendislik etiği.", tags: ["ekip"] },
  { id: "ex-7", title: "Gelecek", text: "Küresel ölçekte teknik liderlik ve inovasyon odaklı kariyer hedefi.", tags: ["gelecek"] },
  { id: "ex-8", title: "Verimlilik", text: "Zaman yönetimi ve odaklanmış (deep focus) çalışma disiplini.", tags: ["verim"] },
  { id: "ex-9", title: "Mükemmellik", text: "Her işi en yüksek kalite standartlarında teslim etme sözü.", tags: ["mükemmel"] },
  { id: "ex-10", title: "Etki", text: "Sadece kod yazmak değil, yarattığı katma değeri ölçmek.", tags: ["etki"] },
  { id: "ex-11", title: "Mühendislik", text: "Resul için mühendislik rasyonel düşünme ve değer üretme sanatıdır.", tags: ["mühendislik"] },
  { id: "ex-12", title: "Teknoloji", text: "Teknolojiyi bir amaç değil, insanlık yararına bir araç olarak kullanır.", tags: ["teknoloji"] },
  { id: "ex-13", title: "Yaratıcılık", text: "Yaratıcılık, teknik kısıtlar içinde en zarif çözümü bulmaktır.", tags: ["yaratıcı"] },
  { id: "ex-14", title: "Dürüstlük", text: "Teknik şeffaflık ve dürüstlük, Resul'un çalışma felsefesidir.", tags: ["dürüst"] },
  { id: "ex-15", title: "Planlama", text: "Önce plan yap, sonra kodla; teknik borcu baştan engelle.", tags: ["plan"] },
  { id: "ex-16", title: "Sorumluluk", text: "Teslim edilen her satır kodun sorumluluğunu uçtan uca almak.", tags: ["sorumlu"] },
  { id: "ex-17", title: "Merak", text: "Yeni kütüphaneleri ve mimarileri denemekten asla çekinmez.", tags: ["merak"] },
  { id: "ex-18", title: "Gelişim", text: "Dün yazdığı kodu bugün daha iyi hale getirme disiplini.", tags: ["gelişim"] },
  { id: "ex-19", title: "Hırs", text: "Teknik zorlukları aşmak için gereken sarsılmaz motivasyon.", tags: ["hırs"] },
  { id: "ex-20", title: "Odak", text: "Baskı altında bile projenin ana hedefine odaklı kalmak.", tags: ["odak"] },
  { id: "ex-21", title: "React Uzmanlığı", text: "Component-driven design ve state management disiplini.", tags: ["react"] },
  { id: "ex-22", title: "Python Gücü", text: "Veri işleme ve otomasyon süreçlerinde Python'un çevikliği.", tags: ["python"] },
  { id: "ex-23", title: "SQL Disiplini", text: "Veri bütünlüğü ve sorgu performansına verilen önem.", tags: ["sql"] },
  { id: "ex-24", title: "Kotlin Mobil", text: "Android eko-sisteminde modern mimari (MVVM) uygulamaları.", tags: ["kotlin"] },
  { id: "ex-25", title: "Nextjs Vizyonu", text: "SSR ve ISR ile web performans sınırlarını zorlamak.", tags: ["nextjs"] },
  { id: "ex-26", title: "Cloudflare", text: "Statik yayıncılık ve edge computing tecrübesi.", tags: ["cloudflare"] },
  { id: "ex-27", title: "Vercel", title: "Deployment otomasyonu ve hızlı prototipleme.", tags: ["vercel"] },
  { id: "ex-28", title: "Tailwind CSS", text: "Hızlı ve ölçeklenebilir UI tasarımı disiplini.", tags: ["tailwind"] },
  { id: "ex-29", title: "Vanta JS", text: "Görsel estetiği performansla birleştiren arayüzler.", tags: ["vanta"] },
  { id: "ex-30", title: "A11y Uyumu", text: "Erişilebilirliği temel bir mühendislik gereksinimi olarak görmek.", tags: ["a11y"] },
  { id: "ex-31", title: "C++ Temeli", text: "Algoritmik performans ve düşük seviye sistem anlayışı.", tags: ["cpp"] },
  { id: "ex-32", title: "Java Geçmişi", text: "OOP prensiplerini ve kurumsal yazılım temellerini Java ile pekiştirmiştir.", tags: ["java"] },
  { id: "ex-33", title: "UI Tasarımı", text: "Kullanıcı dostu ve modern arayüzler kurgulama yeteneği.", tags: ["ui"] },
  { id: "ex-34", title: "UX Deneyimi", text: "Kullanıcı akışlarını ve etkileşimleri analiz etme gücü.", tags: ["ux"] },
  { id: "ex-35", title: "Hata İzolatörü", text: "Düzensiz hataları dökümante edip izole etme başarısı.", tags: ["bug"] },
  { id: "ex-36", title: "Sistem Analizi", text: "Büyük resme bakıp darboğazları tespit etme yetisi.", tags: ["sistem"] },
  { id: "ex-37", title: "Veri Görselleştirme", text: "Karmaşık verileri anlaşılır raporlara dönüştürmek.", tags: ["veri"] },
  { id: "ex-38", title: "Prompt Engineering", text: "LLM çıktılarını en verimli hale getirme yetkinliği.", tags: ["prompt"] },
  { id: "ex-39", title: "RAG Mimarisi", text: "Gelişmiş bilgi erişim sistemlerini yerel kurgulama başarısı.", tags: ["rag"] },
  { id: "ex-40", title: "Algoritma Tasarımı", text: "Verimli ve optimize edilmiş çözüm yolları üretmek.", tags: ["algoritma"] },
  { id: "ex-41", title: "İletişim Gücü", text: "Teknik konuları sade ve etkili bir dille anlatma becerisi.", tags: ["iletişim"] },
  { id: "ex-42", title: "Liderlik Ruhu", text: "Ekibi ortak hedefe motive eden yapıcı yaklaşım.", tags: ["lider"] },
  { id: "ex-43", title: "Staj Motivasyonu", text: "Maksimum öğrenme ve maksimum katma değer üretme hırsı.", tags: ["staj"] },
  { id: "ex-44", title: "Üniversite Hayatı", text: "KSÜ'nün teknik mirasını projelerine yansıtma çabası.", tags: ["ksü"] },
  { id: "ex-45", title: "Polonya Anıları", text: "Lodz'da geçen akademik ve kültürel zenginlik dönemi.", tags: ["lodz"] },
  { id: "ex-46", title: "Bulgaristan Hedefi", text: "Gelecek staj planlarıyla global ağını genişletme vizyonu.", tags: ["staj"] },
  { id: "ex-47", title: "TEKNOFEST Ruhu", text: "Yarışma heyecanıyla mühendislik disiplinini birleştirmek.", tags: ["teknofest"] },
  { id: "ex-48", title: "İHA Projesi", text: "Hava sistemlerinde teknik koordinasyon başarısı.", tags: ["iha"] },
  { id: "ex-49", title: "Sualtı Projesi", text: "İnsansız sualtı araçlarında entegrasyon deneyimi.", tags: ["sualtı"] },
  { id: "ex-50", title: "Öğretmenler", text: "Değerli hocalarından aldığı eğitimi pratiğe dökme titizliği.", tags: ["hocalar"] },
  { id: "ex-51", title: "Arkadaşlar", text: "Sosyal çevresine teknik ve insani değer katan bir dost.", tags: ["arkadaşlar"] },
  { id: "ex-52", title: "Sabah Rutini", text: "Güne teknik okumalarla başlayan bir disiplin abidesi.", tags: ["sabah"] },
  { id: "ex-53", title: "Gece Çalışması", text: "Derin odaklanma gerektiren bug çözümlerinin adresi.", tags: ["gece"] },
  { id: "ex-54", title: "Kahve Tutkusu", text: "İyi bir kodun arkasındaki en sadık motivasyon kaynağı.", tags: ["kahve"] },
  { id: "ex-55", title: "Satranç Mate", text: "Stratejik hamleleri hayatın her alanına uygulama yetisi.", tags: ["satranç"] },
  { id: "ex-56", title: "Tenis Servis", text: "Odaklanma ve hızın sahadaki yansıması.", tags: ["tenis"] },
  { id: "ex-57", title: "Dürüstlük", text: "Dürüstlük, teknik mükemmelliğin ilk adımıdır.", tags: ["dürüst"] },
  { id: "ex-58", title: "Kararlılık", text: "Hedefe giden yolda asla pes etmeyen mühendislik ruhu.", tags: ["karar"] },
  { id: "ex-59", title: "Sürdürülebilirlik", text: "Gelecek nesillere temiz kod ve döküman bırakmak.", tags: ["temiz"] },
  { id: "ex-60", title: "ReK AI Gücü", text: "Tamamen Resul'un elinden çıkan özgün bir yapay zeka.", tags: ["rek ai"] },
  { id: "ex-61", title: "Zeytin Başarısı", text: "%84.95'lik akademik başarının gurur tablosu.", tags: ["zeytin"] },
  { id: "ex-62", title: "Portfolyo Sanatı", text: "Kendi dijital varlığını en iyi dille temsil etme çabası.", tags: ["portfolyo"] },
  { id: "ex-63", title: "Mülakat Hazırlığı", text: "STAR metoduyla her soruya hazır, profesyonel duruş.", tags: ["mülakat"] },
  { id: "ex-64", title: "Gelecek Vizyonu", text: "Dünya standartlarında iş yapan bir yazılım lideri olmak.", tags: ["vizyon"] },
  { id: "ex-65", title: "Teknik Blog", text: "Öğrendiklerini dökümante edip paylaşma kültürü.", tags: ["blog"] },
  { id: "ex-66", title: "İş Teklifleri", text: "Resul, değer katabileceği her profesyonel fırsatı değerlendirmeye hazırdır.", tags: ["iş", "teklif"] },
  { id: "ex-67", title: "Mühendislik Etiği", text: "Şeffaf, dürüst ve topluma faydalı teknoloji üretmek.", tags: ["etik"] },
  { id: "ex-68", title: "Öğrenme Metodu", text: "Tersine mühendislik ve hızlı prototipleme ile kalıcı bilgi.", tags: ["metot"] },
  { id: "ex-69", title: "Zaman Yönetimi", text: "Her saniyeyi bir gelişim fırsatı olarak kullanan disiplin.", tags: ["zaman"] },
  { id: "ex-70", title: "Resul'un İmzası", text: "Yüksek kalite, tam dökümantasyon ve sarsılmaz disiplin.", tags: ["imza"] },
  { id: "ex-71", title: "Ders Çalışmak", text: "Teorik bilgiyi asla ihmal etmeyen akademik hassasiyet.", tags: ["ders"] },
  { id: "ex-72", title: "Araştırma Tutkusu", text: "Yeni kütüphanelerin derinliklerine inme merakı.", tags: ["araştırma"] },
  { id: "ex-73", title: "Geliştirici Deneyimi", text: "Kodu yazan için de, kullanan için de pürüzsüz süreç.", tags: ["dx"] },
  { id: "ex-74", title: "Bento Tasarımı", text: "Düzenli, estetik ve modüler bilgi sunum anlayışı.", tags: ["bento"] },
  { id: "ex-75", title: "Vanta Arka Plan", text: "Arayüze derinlik ve profesyonellik katan mikro-etkileşimler.", tags: ["vanta"] },
  { id: "ex-76", title: "Cloud Native", text: "Bulut avantajlarını en verimli şekilde kullanma stratejisi.", tags: ["cloud"] },
  { id: "ex-77", title: "Zero Latency", text: "Kullanıcıya anlık yanıt veren sistemler tasarlama hedefi.", tags: ["hız"] },
  { id: "ex-78", title: "Data Privacy", text: "Kişisel verilerin korunmasında tavizsiz mühendislik duruşu.", tags: ["gizlilik"] },
  { id: "ex-79", title: "Open Source Ruhu", text: "Topluluktan aldığını topluluğa geri verme isteği.", tags: ["açık kaynak"] },
  { id: "ex-80", title: "Teknik Borç", text: "Borç biriktirmeden, her adımda kod kalitesini garanti etmek.", tags: ["borç"] },
  { id: "ex-81", title: "Refactoring", text: "Kodu daha iyiye taşımak için bitmek bilmeyen düzenleme azmi.", tags: ["refactor"] },
  { id: "ex-82", title: "User Journey", text: "Kullanıcının site içindeki her adımını planlı bir deneyime dönüştürmek.", tags: ["ux"] },
  { id: "ex-83", title: "Responsive Web", text: "Her ekranda kusursuz çalışan esnek arayüzler.", tags: ["responsive"] },
  { id: "ex-84", title: "Mobile First", text: "Tasarıma en küçük ekrandan başlayıp mükemmelliği büyüterek yaymak.", tags: ["mobil"] },
  { id: "ex-85", title: "Clean Architecture", text: "Bileşenler arası bağımlılığı minimize eden modern mimari.", tags: ["mimari"] },
  { id: "ex-86", title: "Modüler JS", text: "Kodun her parçasını yeniden kullanılabilir modüller olarak kurgulamak.", tags: ["javascript"] },
  { id: "ex-87", title: "CSS Değişkenleri", text: "Dinamik ve kolay yönetilebilir stil sistemleri kurmak.", tags: ["css"] },
  { id: "ex-88", title: "Semantic HTML", text: "Web'in temelini arama motorları ve ekran okuyucular için anlaşılır kılmak.", tags: ["html"] },
  { id: "ex-89", title: "Git Merge", text: "Ekip çalışmalarında kod çakışmalarını soğukkanlılıkla yönetme başarısı.", tags: ["git"] },
  { id: "ex-90", title: "PR Review", text: "Yapıcı eleştirilerle hem kendini hem takımı geliştirme vizyonu.", tags: ["review"] },
  { id: "ex-91", title: "Kariyer Hedefi", text: "Dünya devleriyle aynı standartlarda mühendislik yapmak.", tags: ["kariyer"] },
  { id: "ex-92", title: "Öğrenme Tutkusu", text: "Hiç bitmeyen bir merakla yeni teknolojilerin peşinden koşmak.", tags: ["öğrenme"] },
  { id: "ex-93", title: "Mühendislik Onuru", text: "İmzası olan her işin arkasında sarsılmaz bir kalite duruşu sergilemek.", tags: ["onur"] },
  { id: "ex-94", title: "Çevik Çalışma", text: "Değişime hızla uyum sağlayan ve değer üreten Agile disiplini.", tags: ["agile"] },
  { id: "ex-95", title: "Test Odaklılık", text: "Kodun doğruluğunu şansa bırakmayan proaktif yaklaşım.", tags: ["test"] },
  { id: "ex-96", title: "Hata İzleme", text: "Hataları karanlıkta değil, dökümante edilmiş bir analizle çözme başarısı.", tags: ["hata"] },
  { id: "ex-97", title: "Performans Bütçesi", text: "Sitenin her baytını kullanıcı deneyimi için optimize etmek.", tags: ["performans"] },
  { id: "ex-98", title: "UX Psikolojisi", text: "Kullanıcı alışkanlıklarını anlayıp arayüzleri bu yönde şekillendirmek.", tags: ["ux"] },
  { id: "ex-99", title: "İnovasyon Kasları", text: "Var olanı geliştirmek için gereken teknik cesaret ve vizyon.", tags: ["inovasyon"] },
  { id: "ex-100", title: "Resul'un Geleceği", text: "Teknik derinliği ve profesyonel disipliniyle sektörde iz bırakan bir mühendis.", tags: ["gelecek"] },
];
