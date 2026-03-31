/**
 * Yazılım alanları ve beceriler — özet öğrenme yolları (özgün metin).
 * @type {{ id: string, title: string, text: string, tags: string[] }[]}
 */
export const EXTENDED_SNIPPETS = [
  {
    id: "frontend",
    title: "Frontend (ön yüz) geliştirici yolu",
    text:
      "Temel sıra: HTML (anlamsal yapı) → CSS (düzen, responsive, Flexbox/Grid) → JavaScript (DOM, olaylar, asenkron). " +
      "Ardından paket yöneticisi ve derleyici (npm, Vite) ve bir çatı (React, Vue veya Angular) seçip küçük uygulamalar yapın. " +
      "Erişilebilirlik (a11y), performans (Core Web Vitals) ve TypeScript ile tiplemeyi erken dönemde tanıyın. " +
      "İlerlemeyi küçük arayüz projeleri ve kontrol listeleriyle takip etmek işe yarar.",
    tags: ["frontend", "ön yüz", "on yuz", "react", "vue", "angular", "javascript", "typescript", "html", "css", "web", "ui"],
  },
  {
    id: "backend",
    title: "Backend (arka uç) geliştirici yolu",
    text:
      "HTTP, REST veya GraphQL, kimlik doğrulama (JWT, OAuth), oturum ve çerez kavramlarını öğrenin. " +
      "Bir dil/ekosistem seçin (Node.js, Java/Spring, Python/Django veya FastAPI, Go, .NET). " +
      "İlişkisel veritabanı (PostgreSQL), migrasyon, indeks ve transaction konularına zaman ayırın. " +
      "Loglama, hata yönetimi ve API sözleşmesi (OpenAPI) üretim kalitesi için önemlidir.",
    tags: ["backend", "arka", "api", "rest", "graphql", "node", "spring", "django", "go", "dotnet", "sunucu", "server"],
  },
  {
    id: "fullstack",
    title: "Full stack geliştirici",
    text:
      "Ön yüz ve arka uçun birlikte düşünüldüğü rol: kullanıcı arayüzünden veritabanına kadar uçtan uca özellik teslimi. " +
      "Önce bir yığında derinleşip sonra diğer tarafa geçmek genelde daha verimlidir (ör. önce frontend veya önce backend). " +
      "Dağıtım (basit VPS veya serverless), ortam değişkenleri ve güvenli yapılandırma full stack için kritiktir. " +
      "Ön yüz ve arka uçu birlikte düşünen uçtan uca bir özellik teslimi ile pratik pekiştirin.",
    tags: ["fullstack", "full stack", "full-stack", "tam yığın", "yigin", "hepsi"],
  },
  {
    id: "devops",
    title: "DevOps ve platform mühendisliği",
    text:
      "Linux temelleri, kabuk betikleri, SSH ve süreç yönetimi ile başlayın. " +
      "Docker imaj ve konteyner, docker-compose; ardından Kubernetes temelleri (Pod, Service, Deployment). " +
      "CI/CD (GitHub Actions, GitLab CI) ile otomatik test ve dağıtım hatları kurun. " +
      "Gözlemlenebilirlik: log, metrik, uyarı (ör. Prometheus/Grafana kavramları). İaC için Terraform’a giriş yaygındır.",
    tags: ["devops", "docker", "kubernetes", "k8s", "ci", "cd", "terraform", "linux", "aws", "pipeline", "deploy"],
  },
  {
    id: "devsecops",
    title: "DevSecOps",
    text:
      "Güvenliği geliştirme ve dağıtım sürecinin içine gömme yaklaşımıdır. " +
      "Bağımlılık taraması (SCA), statik analiz (SAST), gizli anahtar sızıntısı önleme ve en az ayrıcalık ilkesi temel başlıklardır. " +
      "Konteyner imajlarını minimize etmek ve taban imajı güncel tutmak pratik güvenlik kazanımları sağlar. " +
      "OWASP Top 10’u web ve API yüzeyleri için mutlaka okuyun.",
    tags: ["devsecops", "güvenlik", "guvenlik", "security", "owasp", "sast", "sca", "secret"],
  },
  {
    id: "data-analyst",
    title: "Veri analisti",
    text:
      "SQL ile güçlü sorgulama, temizleme ve raporlama becerisi çekirdektir. " +
      "Excel/Sheets sonrası Python (pandas) veya R ile analiz; görselleştirme (matplotlib, seaborn, Power BI/Tableau kavramları). " +
      "İş sorusunu netleştirme ve paydaşlara anlamlı özet sunma yumuşak becerilerdir. " +
      "İstatistik temelleri (ortalama, dağılım, hipotez düşüncesi) yanlış yorum riskini azaltır.",
    tags: ["data analyst", "analist", "sql", "pandas", "rapor", "bi", "istatistik", "veri analizi"],
  },
  {
    id: "data-engineer",
    title: "Veri mühendisi",
    text:
      "Veri boru hatları (ETL/ELT), batch ve stream işleme, veri ambarı ve göl (lake) kavramları. " +
      "Dağıtık sistemler, mesaj kuyruğu (Kafka benzeri düşünce) ve şema yönetimi. " +
      "Bulut depolama ve büyük veri çerçeveleri (Spark’a giriş) sık geçen konulardır. " +
      "Veri kalitesi, idempotency ve gözlemlenebilirlik hatlarda hata ayıklamayı kolaylaştırır.",
    tags: ["data engineer", "etl", "elt", "pipeline", "kafka", "spark", "warehouse", "veri mühendisi"],
  },
  {
    id: "data-scientist",
    title: "Veri bilimci / AI-Data bilim",
    text:
      "Matematik (lineer cebir, olasılık), Python, pandas ve makine öğrenmesi modelleri (scikit-learn ile başlangıç). " +
      "Deney tasarımı, model seçimi, eğitim/doğrulama ayrımı ve aşırı öğrenmeyi anlama. " +
      "Derin öğrenme ihtiyacı proje ölçeğine göre gelir; önce klasik ML sağlam olsun. " +
      "Sonuçları iş diline çevirmek ve etik / önyargı farkındalığı önemlidir.",
    tags: ["data science", "veri bilim", "scientist", "pandas", "ml", "model", "istatistik", "ai data"],
  },
  {
    id: "ai-engineer",
    title: "AI mühendisi",
    text:
      "Üretim ortamında model veya LLM tabanlı özellikleri çalıştırma: API, gecikme, maliyet, günlükleme ve geri alma (rollback). " +
      "Prompt mühendisliği, RAG mimarisi, vektör veritabanı ve değerlendirme (evaluation) setleri. " +
      "MLOps ile deney izleme, model kayıt ve sürekli dağıtım kavramları. " +
      "Güvenlik: istemci tarafına API anahtarı koymama, jailbreak ve veri sızıntısı riskleri.",
    tags: ["ai engineer", "yapay zeka", "llm", "rag", "prompt", "mlops", "üretim", "production"],
  },
  {
    id: "ml",
    title: "Machine Learning (makine öğrenmesi)",
    text:
      "Denetimli / denetimsiz öğrenme, özellik mühendisliği, metrikler (precision, recall, F1, RMSE). " +
      "Çapraz doğrulama ve düzenlileştirme (regularization). " +
      "Kütüphaneler: scikit-learn, PyTorch veya TensorFlow’ya kademeli geçiş. " +
      "Matematiksel temel için türev ve optimizasyon (gradient descent) sezgisini güçlendirin.",
    tags: ["machine learning", "ml", "makine", "öğrenme", "ogrenme", "pytorch", "tensorflow", "sklearn"],
  },
  {
    id: "android",
    title: "Android geliştirme",
    text:
      "Kotlin dili, Android Studio, Activity/Fragment veya Jetpack Compose ile modern UI. " +
      "Yaşam döngüsü, Intent, izinler ve arka plan kısıtlamaları. " +
      "Room veya veri katmanı, Retrofit ile ağ, MVVM mimarisi. " +
      "Material Design ve erişilebilirlik yönergeleri kullanıcı kalitesini artırır.",
    tags: ["android", "kotlin", "mobile", "mobil", "play", "jetpack", "compose"],
  },
  {
    id: "ios",
    title: "iOS geliştirme",
    text:
      "Swift dili, Xcode, SwiftUI veya UIKit ile arayüz. " +
      "Combine/async-await ile asenkron akışlar; Core Data veya basit kalıcılık. " +
      "App Store süreçleri, imzalama ve gizlilik etiketleri. " +
      "İnsan arayüzü yönergelerine (HIG) uyum Apple ekosisteminde önemlidir.",
    tags: ["ios", "swift", "swiftui", "uikit", "apple", "iphone", "mobile", "mobil"],
  },
  {
    id: "blockchain",
    title: "Blockchain",
    text:
      "Dağıtık defter, hash zinciri, konsensüs ve akıllı sözleşme kavramlarını anlayın. " +
      "Solidity ve EVM zincirleri yaygın başlangıç noktasıdır; test ağları ve güvenlik denetimi kritiktir. " +
      "Cüzdan, gaz ücreti ve özel anahtar yönetiminde dikkatli olun. " +
      "Spekülasyon yerine protokol ve uygulama katmanı öğrenimine odaklanmak daha sürdürülebilir.",
    tags: ["blockchain", "solidity", "web3", "ethereum", "smart contract", "kripto", "defi"],
  },
  {
    id: "qa",
    title: "QA ve test mühendisliği",
    text:
      "Test piramidi: birim, entegrasyon, uçtan uca. " +
      "Manuel test senaryoları, regresyon ve hata raporlama disiplini. " +
      "Otomasyon: Selenium/Playwright/Cypress benzeri araçlardan biri; CI’da test koşturma. " +
      "API testi (Postman, contract test) ve performans testine giriş (yük testi kavramları).",
    tags: ["qa", "test", "quality", "cypress", "selenium", "playwright", "otomasyon", "kalite"],
  },
  {
    id: "software-architect",
    title: "Yazılım mimarı",
    text:
      "Büyük sistemlerde sınırlar (bounded context), olay güdümlü düşünce, ölçeklenebilirlik ve güvenilirlik kararları. " +
      "Teknik borç, evrimsel mimari ve trade-off belgelendirme. " +
      "Diagram-as-code ve ADR (Architecture Decision Record) alışkanlığı. " +
      "Genelde kıdemli geliştiricilik ve çoklu proje deneyiminden sonra doğal geçiş.",
    tags: ["architect", "mimari", "architecture", "system design", "adr", "ölçek", "scale"],
  },
  {
    id: "cyber",
    title: "Siber güvenlik",
    text:
      "Ağ temelleri, şifreleme, kimlik doğrulama ve yetkilendirme (RBAC/ABAC). " +
      "Penetrasyon testi etiği ve yasal çerçeve; zafiyet taraması ve sızma testi ayrımı. " +
      "SIEM, SOC süreçleri ve olay müdahalesi kurumsal tarafta öne çıkar. " +
      "CTF ve lab ortamları (ör. DVWA, HackTheBox türü) pratik için kullanılır.",
    tags: ["cyber", "security", "siber", "güvenlik", "penetration", "owasp", "ctf", "soc"],
  },
  {
    id: "ux",
    title: "UX tasarımı",
    text:
      "Kullanıcı araştırması, persona, yolculuk haritası ve bilgi mimarisi. " +
      "Tel çerçeve ve prototip (Figma vb.), kullanılabilirlik testi. " +
      "Erişilebilirlik renk kontrastı ve ekran okuyucu uyumu. " +
      "Geliştiricilerle ortak dil: tasarım sistemi ve bileşen spesifikasyonları.",
    tags: ["ux", "design", "figma", "kullanılabilirlik", "kullanilabilirlik", "arayüz", "ui", "product design"],
  },
  {
    id: "tech-writer",
    title: "Teknik yazarlık",
    text:
      "API dokümantasyonu, öğreticiler ve sürüm notları için net, tarafsız dil. " +
      "Docs-as-code (Markdown, statik site üreteçleri) ve örnek kod blokları. " +
      "Kullanıcı geri bildirimiyle dokümanı sürekli iyileştirme. " +
      "Geliştirici deneyimi (DX) ürün benimsemesinde kritik rol oynar.",
    tags: ["technical writer", "dokümantasyon", "dokuman", "docs", "api docs", "yazar"],
  },
  {
    id: "game-dev",
    title: "Oyun geliştirme (istemci)",
    text:
      "Oyun döngüsü, fizik ve çarpışma, varlık yönetimi. " +
      "Motorlar: Unity (C#), Unreal (C++/Blueprint), Godot (GDScript/C#). " +
      "Performans: draw call, LOD, varlık boyutu. " +
      "Küçük oyun jam’leri ve Git ile sürüm kontrolü disiplini kazandırır.",
    tags: ["game", "oyun", "unity", "unreal", "godot", "gamedev", "indie"],
  },
  {
    id: "game-server",
    title: "Sunucu tarafı oyun geliştirme",
    text:
      "Çok oyunculu senkronizasyon, gecikme telafisi, hile önleme ve otoriter sunucu modeli. " +
      "Ölçekleme: oda örnekleri, matchmaking, durum saklama. " +
      "Ağ protokolleri ve ikili serileştirme. " +
      "İstemci motoru bilgisine ek olarak dağıtık sistem deneyimi faydalıdır.",
    tags: ["game server", "multiplayer", "netcode", "sunucu oyun", "backend game"],
  },
  {
    id: "mlops",
    title: "MLOps",
    text:
      "Model eğitiminden üretime giden yol: veri sürümleri, deney takibi, model kayıt ve dağıtım. " +
      "Konteynerleştirme ve GPU kaynak yönetimi. " +
      "İzleme: veri ve model kayması (drift) uyarıları. " +
      "GitOps benzeri disiplinler ML hatlarına uyarlanır.",
    tags: ["mlops", "model", "deployment", "experiment", "tracking", "drift"],
  },
  {
    id: "product-manager",
    title: "Ürün yöneticisi (PM)",
    text:
      "Problem tanımı, önceliklendirme (RICE, MoSCoW gibi çerçeveler), yol haritası ve paydaş iletişimi. " +
      "Teknik borç ile özellik teslimi arasında denge. " +
      "Metrikler: aktivasyon, tutma, dönüşüm. " +
      "Geliştirici olmayan PM’ler için temel teknik okuryazarlık (API, veri) faydalıdır.",
    tags: ["product manager", "pm", "ürün", "urun", "roadmap", "öncelik", "prioritization"],
  },
  {
    id: "engineering-manager",
    title: "Mühendislik yöneticiliği",
    text:
      "Ekip büyütme, performans görüşmeleri ve kariyer gelişimi. " +
      "Teknik strateji ile teslimat hızını dengeleme. " +
      "Bire bir toplantılar ve güvenli geri bildirim kültürü. " +
      "Genelde kıdemli mühendislik ve liderlik deneyimi sonrası rol.",
    tags: ["engineering manager", "em", "yönetici", "yonetici", "lead", "lider", "ekip"],
  },
  {
    id: "devrel",
    title: "Developer Relations",
    text:
      "Geliştirici topluluğu, örnek projeler, konferans konuşmaları ve dokümantasyon iş birliği. " +
      "Ürün geri bildirimini içeri aktarma. " +
      "İçerik üretimi ve sosyal teknik iletişim becerisi öne çıkar. " +
      "Açık kaynak ve öğretici yazılar görünürlük sağlar.",
    tags: ["devrel", "developer relations", "advocate", "community", "topluluk"],
  },
  {
    id: "bi-analyst",
    title: "BI analisti",
    text:
      "İş zekâsı araçlarında pano tasarımı, KPI tanımı ve veri modelleme (yıldız şema kavramı). " +
      "SQL ile veri ambarı sorguları; self-service BI kültürü. " +
      "Veri yönetişimi ve raporlama doğruluğu için paydaşlarla ortak tanımlar.",
    tags: ["bi", "business intelligence", "dashboard", "kpi", "power bi", "tableau"],
  },
  {
    id: "sql",
    title: "SQL",
    text:
      "SELECT, JOIN, alt sorgu, indeks ve EXPLAIN ile sorgu analizi. " +
      "Transaction, izolasyon seviyeleri ve kilitlenme fikri. " +
      "PostgreSQL veya MySQL ile pratik; raporlama ve veri analitiği için temel taş.",
    tags: ["sql", "mysql", "postgres", "postgresql", "sorgu", "join", "veritabanı", "database"],
  },
  {
    id: "cs",
    title: "Bilgisayar bilimleri temeli",
    text:
      "Karmaşıklık (Big-O), temel veri yapıları (dizi, liste, ağaç, öncelik kuyruğu, hash tablosu). " +
      "Sıralama ve arama algoritmaları; graf gezinimi (BFS/DFS). " +
      "İşletim sistemi: süreç, iş parçacığı, bellek. " +
      "LeetCode/HackerRank tarzı pratik mülakat hazırlığında yardımcıdır.",
    tags: ["computer science", "cs", "algoritma", "algorithm", "veri yapısı", "data structure", "leetcode", "mülakat", "mulakat"],
  },
  {
    id: "react",
    title: "React",
    text:
      "Bileşenler, props/state, hooks (useState, useEffect, useMemo). " +
      "Yönlendirme (React Router), durum yönetimi (Context, Zustand, Redux ihtiyaca göre). " +
      "Sunucu bileşenleri ve meta çerçeveler (Next.js) ile tam uygulama inşa etme. " +
      "TypeScript ile birlikte öğrenmek endüstride yaygındır.",
    tags: ["react", "next", "nextjs", "hooks", "jsx", "frontend"],
  },
  {
    id: "vue",
    title: "Vue.js",
    text:
      "Tek dosya bileşenleri, reactivity API, Composition API. " +
      "Vue Router ve Pinia ile durum. " +
      "Nuxt ile tam yığın veya SSR ihtiyaçları. " +
      "Öğrenme eğrisi genelde React’a göre yumuşak kabul edilir.",
    tags: ["vue", "nuxt", "pinia", "frontend"],
  },
  {
    id: "angular",
    title: "Angular",
    text:
      "TypeScript zorunluluğu, modül ve bileşen yapısı, dependency injection. " +
      "RxJS ile reaktif akışlar kurumsal projelerde sık görülür. " +
      "CLI ile yapı iskeleti; büyük ekipler için kurallı mimari.",
    tags: ["angular", "rxjs", "typescript", "frontend", "enterprise"],
  },
  {
    id: "nodejs",
    title: "Node.js",
    text:
      "Olay döngüsü, asenkron IO, CommonJS/ESM modülleri. " +
      "Express veya Fastify ile HTTP API; güvenlik middleware’leri. " +
      "npm ekosistemi ve sürüm çakışmalarını yönetme. " +
      "Frontend geliştiricilerin backend’e geçişinde popüler yol.",
    tags: ["node", "nodejs", "express", "fastify", "npm", "backend", "javascript"],
  },
  {
    id: "python",
    title: "Python",
    text:
      "Sözdizimi, sanal ortam (venv), paket yönetimi (pip/poetry). " +
      "Scripting, otomasyon, veri (pandas), web (Django/FastAPI), ML (scikit-learn). " +
      "Tip ipuçları ve test (pytest) alışkanlığı erken kazanılmalı. " +
      "İş ilanlarında en çok aranan dillerden biridir.",
    tags: ["python", "django", "fastapi", "pandas", "pytest", "script"],
  },
  {
    id: "java",
    title: "Java",
    text:
      "Nesne yönelimli tasarım, koleksiyonlar, generics, stream API. " +
      "Spring Boot ile REST servisleri, JPA/Hibernate ile ORM. " +
      "JVM ve çöp toplayıcı sezgisini anlamak performans için faydalıdır. " +
      "Kurumsal backend ve Android (Kotlin geçişi) ekosisteminde güçlü.",
    tags: ["java", "spring", "spring boot", "jvm", "backend", "enterprise"],
  },
  {
    id: "go",
    title: "Go (Golang)",
    text:
      "Basit sözdizimi, goroutine ve kanallar ile eşzamanlılık. " +
      "Statik ikili derleme ve hızlı dağıtım; bulut yerel araçlarda (Kubernetes, Docker) yaygın. " +
      "Hata yönetimi açıkça if err != nil ile yapılır. " +
      "API ve CLI araçları için güçlü seçenek.",
    tags: ["go", "golang", "goroutine", "cloud", "backend", "microservice"],
  },
  {
    id: "rust",
    title: "Rust",
    text:
      "Bellek güvenliği ve sahiplik (ownership) modeli; öğrenme eğrisi dik ama ödül yüksek. " +
      "Sistem programlama, WebAssembly ve performans kritik servisler. " +
      "Cargo ile proje yönetimi. " +
      "C++ alternatifleri arayanlar için modern seçenek.",
    tags: ["rust", "cargo", "wasm", "systems", "sistem", "memory"],
  },
  {
    id: "cpp",
    title: "C++",
    text:
      "Bellek, işaretçiler, STL; oyun motorları ve gömülü sistemlerde sık. " +
      "Modern C++ (smart pointer, RAII) ile güvenli kalıplar. " +
      "Derleyici ve bağlayıcı temelleri. " +
      "Performans kritik alanlarda tercih edilir.",
    tags: ["c++", "cpp", "stl", "embedded", "gömülü", "performance", "oyun"],
  },
  {
    id: "csharp",
    title: "C# ve .NET",
    text:
      "ASP.NET Core ile web API, Entity Framework ile veri erişimi. " +
      "Windows ekosistemi ve kurumsal .NET yığını. " +
      "LINQ ve async/await ile verimli sorgu ve IO. " +
      "Unity ile oyun tarafında da kullanılır.",
    tags: ["c#", "csharp", "dotnet", "asp.net", "aspnet", "backend", "microsoft"],
  },
  {
    id: "php",
    title: "PHP",
    text:
      "Laravel veya Symfony ile modern web; Composer ile bağımlılık. " +
      "Güvenlik: SQL enjeksiyonu, XSS, CSRF önlemleri. " +
      "WordPress eklenti teması için PHP bilgisi hâlâ talep görür. " +
      "Sunucu taraflı şablonlama ve CMS ekosistemi güçlüdür.",
    tags: ["php", "laravel", "symfony", "wordpress", "web", "backend"],
  },
  {
    id: "ruby",
    title: "Ruby ve Rails",
    text:
      "Rails ile hızlı prototip ve CRUD uygulamaları; convention over configuration. " +
      "Aktif kayıt ve migrasyonlar. " +
      "Test kültürü (RSpec) güçlü toplulukta önemli. " +
      "Startup ve MVP senaryolarında tarihsel olarak popülerdi; hâlâ niş işlerde geçer.",
    tags: ["ruby", "rails", "ror", "web", "mvc"],
  },
  {
    id: "api-design",
    title: "API tasarımı",
    text:
      "REST kaynak modeli, durum kodları, idempotent PUT/DELETE, sayfalama ve filtreleme. " +
      "GraphQL: şema, resolver, N+1 problemine dikkat. " +
      "Sürümleme ve geriye dönük uyumluluk stratejileri. " +
      "OpenAPI ile sözleşme ve istemci üretimi.",
    tags: ["api", "rest", "graphql", "openapi", "swagger", "tasarım", "design"],
  },
  {
    id: "spring-boot",
    title: "Spring Boot",
    text:
      "Otomatik yapılandırma, starter bağımlılıklar, Spring Web ve Spring Data. " +
      "Güvenlik (Spring Security) ve JWT entegrasyonu yaygın ödev. " +
      "Profil ve yapılandırma yönetimi (application.yml). " +
      "Java backend iş ilanlarında sık geçer.",
    tags: ["spring", "spring boot", "java", "backend", "jwt", "jpa"],
  },
  {
    id: "flutter",
    title: "Flutter",
    text:
      "Dart dili, widget ağacı, durum yönetimi (Provider, Riverpod, Bloc). " +
      "Tek kod tabanı ile mobil ve masaüstü hedefleme. " +
      "Material ve Cupertino bileşenleri. " +
      "Firebase veya REST ile arka uç bağlama.",
    tags: ["flutter", "dart", "mobile", "mobil", "cross", "android", "ios"],
  },
  {
    id: "system-design",
    title: "Sistem tasarımı",
    text:
      "Ölçekleme yatay/dikey, önbellek (Redis), CDN, veritabanı replikası ve bölümleme (sharding) kavramları. " +
      "Yük dengeleyici, oturumsuz (stateless) servisler. " +
      "Tutarlılık ve kullanılabilirlik trade-off’ları (CAP sezgisel). " +
      "Mülakatlarda beyaz tahta diyagramları için pratik şart.",
    tags: ["system design", "sistem tasarım", "tasarim", "scale", "redis", "cdn", "load balancer", "mülakat", "mulakat"],
  },
  {
    id: "graphql-topic",
    title: "GraphQL",
    text:
      "Tek uç noktadan esnek sorgu; aşırı veya eksik getirme (over/under fetching) azaltma iddiası. " +
      "Şema tanımı, resolver performansı ve DataLoader ile N+1 önleme. " +
      "REST ile birlikte hibrit kullanım yaygın.",
    tags: ["graphql", "apollo", "resolver", "schema", "api"],
  },
  {
    id: "mongodb",
    title: "MongoDB",
    text:
      "Belge tabanlı model, indeksleme ve toplama boru hattı (aggregation). " +
      "İlişkisel olmayan şema esnekliği ve tutarlılık modelleri. " +
      "Mongo ile birlikte ihtiyaç halinde PostgreSQL tamamlayıcı olabilir.",
    tags: ["mongo", "mongodb", "nosql", "document", "database"],
  },
  {
    id: "postgres",
    title: "PostgreSQL",
    text:
      "İlişkisel model, JSON desteği, tam metin arama ve genişletilebilirlik. " +
      "Transaction ve MVCC ile güçlü tutarlılık. " +
      "ORM’lerle (Prisma, TypeORM, Hibernate) sık kullanılır. " +
      "Açık kaynak ve üretimde çok tercih edilir.",
    tags: ["postgres", "postgresql", "sql", "database", "relational", "veritabanı"],
  },
  {
    id: "linux-shell",
    title: "Linux ve Shell",
    text:
      "Dosya sistemi, izinler, süreçler, pipe ve redirection. " +
      "bash/zsh betikleri ile otomasyon. " +
      "ssh, systemd temelleri ve sunucu yönetimi. " +
      "DevOps ve backend için neredeyse zorunlu temel.",
    tags: ["linux", "bash", "shell", "terminal", "ssh", "unix", "devops"],
  },
  {
    id: "kubernetes",
    title: "Kubernetes",
    text:
      "Pod, Deployment, Service, Ingress; yapılandırma ConfigMap/Secret. " +
      "Kaynak limitleri ve sağlık kontrolleri (liveness/readiness). " +
      "Helm ile paketleme. " +
      "Önce Docker ile konteyner deneyimi edinmek öğrenmeyi hızlandırır.",
    tags: ["kubernetes", "k8s", "helm", "pod", "container", "orchestration"],
  },
  {
    id: "docker",
    title: "Docker",
    text:
      "İmaj katmanları, Dockerfile yazımı, çok aşamalı derleme. " +
      "docker-compose ile çoklu servis geliştirme ortamı. " +
      "Kayıt (registry) ve imaj güvenliği taraması. " +
      "Yerel-parite (dev ile prod yakın) için standart araç.",
    tags: ["docker", "container", "compose", "image", "konteyner"],
  },
  {
    id: "aws",
    title: "AWS ve bulut",
    text:
      "IAM, VPC, EC2/S3 temelleri; serverless (Lambda) ve yönetilen veritabanları (RDS). " +
      "Maliyet ve güvenlik en iyi uygulamaları. " +
      "Altyapıyı kod olarak (Terraform/CDK) tanımlama eğilimi. " +
      "Azure ve GCP benzer kavramlarla karşılaştırmalı öğrenilebilir.",
    tags: ["aws", "amazon", "cloud", "bulut", "lambda", "s3", "ec2", "terraform"],
  },
  {
    id: "terraform",
    title: "Terraform",
    text:
      "Bildirimsel altyapı, durum dosyası ve modüller. " +
      "Plan/apply akışı ve uzaktan durum (remote state). " +
      "Çoklu bulut sağlayıcıları için ortak dil. " +
      "Versiyon kontrolünde kod incelemesi ile altyapı değişiklikleri yönetilir.",
    tags: ["terraform", "iac", "infrastructure", "devops", "hashicorp"],
  },
  {
    id: "git",
    title: "Git ve GitHub",
    text:
      "Dal (branch), birleştirme (merge/rebase), çatışma çözümü. " +
      "Anlamlı commit mesajı ve pull request süreci. " +
      "GitHub Actions ile hafif CI. " +
      "Açık kaynak katkısı için fork ve issue kültürü.",
    tags: ["git", "github", "gitlab", "version control", "branch", "commit", "pr", "açık kaynak"],
  },
  {
    id: "redis",
    title: "Redis",
    text:
      "Bellek içi anahtar-değer, önbellek ve oturum deposu olarak kullanım. " +
      "Süre sonu (TTL), liste ve sıra veri yapıları. " +
      "Tek örnek ve küme modları; kalıcılık seçenekleri. " +
      "Yüksek okuma senaryolarında performans katmanı.",
    tags: ["redis", "cache", "önbellek", "onbellek", "session", "memory"],
  },
  {
    id: "dsa",
    title: "Veri yapıları ve algoritmalar",
    text:
      "Diziler, bağlı listeler, yığın, kuyruk, ikili ağaç, heap, hash tablosu. " +
      "İkili arama, graf algoritmaları, dinamik programlamaya giriş. " +
      "Zaman-karmaşıklığı analizi mülakatların kalbidir. " +
      "Haftalık düzenli problem çözümü önerilir.",
    tags: ["dsa", "data structures", "algorithms", "algoritma", "leetcode", "mülakat", "mulakat", "sınav"],
  },
  {
    id: "nextjs",
    title: "Next.js",
    text:
      "React üzerine dosya tabanlı yönlendirme, SSR/SSG/ISR kavramları. " +
      "API rotaları ve tam yığın düzenekler. " +
      "Görüntü optimizasyonu ve çekirdek web vitals iyileştirmeleri. " +
      "Vercel dağıtımı ile sık kullanılan kombinasyon.",
    tags: ["next", "nextjs", "react", "ssr", "vercel", "frontend"],
  },
  {
    id: "kotlin",
    title: "Kotlin",
    text:
      "Java sanal makinesi ve Android birinci sınıf dil. " +
      "Boş güvenliği ve özlü sözdizimi. " +
      "Sunucu tarafı Ktor veya Spring ile de kullanılabilir. " +
      "Java ile birlikte öğrenme yaygın geçiş yolu.",
    tags: ["kotlin", "android", "jvm", "java", "mobile"],
  },
  {
    id: "html-css",
    title: "HTML ve CSS",
    text:
      "Anlamsal HTML5 etiketleri, erişilebilirlik (başlık hiyerarşisi, alt metin). " +
      "CSS: kutu modeli, konumlandırma, Flexbox, Grid, değişkenler. " +
      "Responsive tasarım ve mobil öncelik. " +
      "Modern CSS (container queries) ile güncel kalın.",
    tags: ["html", "css", "responsive", "flexbox", "grid", "a11y", "web"],
  },
  {
    id: "swift-ui",
    title: "Swift ve SwiftUI",
    text:
      "Swift dilinde opsiyonel ve protokol yönelimli kalıplar. " +
      "SwiftUI ile bildirimsel UI; önizleme ve durum bağlama. " +
      "Combine ile olay akışları. " +
      "UIKit ile birlikte kademeli geçiş gerçek projelerde olur.",
    tags: ["swift", "swiftui", "ios", "apple", "mobile"],
  },
  {
    id: "laravel",
    title: "Laravel",
    text:
      "PHP çatısı; Eloquent ORM, migrasyon, rota ve middleware. " +
      "Blade şablonları veya API odaklı projeler. " +
      "Kuyruk ve zamanlanmış işler ile arka plan. " +
      "Hızlı CRUD ve startup prototipleri için verimli.",
    tags: ["laravel", "php", "eloquent", "mvc", "web"],
  },
  {
    id: "django",
    title: "Django",
    text:
      "Python web çatısı; ORM, admin paneli, formlar ve şablonlar. " +
      "Güvenlik odaklı varsayılanlar (CSRF, XSS). " +
      "Django REST framework ile API. " +
      "İçerik yönetimi ve kurumsal iç siteler için uygun.",
    tags: ["django", "python", "web", "orm", "rest"],
  },
  {
    id: "aspnet-core",
    title: "ASP.NET Core",
    text:
      "Çapraz platform .NET web çatısı; middleware boru hattı. " +
      "Minimal API veya denetleyici tabanlı yapı. " +
      "Entity Framework Core ile veri. " +
      "Windows ve Linux’ta dağıtım.",
    tags: ["asp.net", "aspnet", "dotnet", "core", "c#", "web api"],
  },
  {
    id: "prompt-eng",
    title: "Prompt mühendisliği",
    text:
      "Net talimat, bağlam verme ve çıktı biçimini şablonlamak (ör. JSON). " +
      "Few-shot örnekleri ve sınırlandırma (guardrails). " +
      "Halüsinasyon riskini azaltmak için kaynaklı RAG düşüncesi. " +
      "AI Engineer yol haritalarında sık yer alır.",
    tags: ["prompt", "prompt engineering", "llm", "chatgpt", "rag", "ai"],
  },
  {
    id: "cloudflare",
    title: "Cloudflare",
    text:
      "DNS, CDN, DDoS koruması ve Workers ile uçta sunucusuz JS. " +
      "Statik siteler ve API proxy desenleri. " +
      "Performans ve güvenlik katmanı olarak yaygın. " +
      "Küçük projelerde maliyet avantajı sağlayabilir.",
    tags: ["cloudflare", "cdn", "workers", "edge", "dns"],
  },
  {
    id: "code-review",
    title: "Kod incelemesi",
    text:
      "Küçük değişiklikler, yapıcı ton ve test beklentisi. " +
      "Otomatik lint/format ile gürültüyü azaltma. " +
      "Güvenlik ve performans için kontrol listeleri. " +
      "Takım kalitesi ve bilgi yayılımı için kritik süreç.",
    tags: ["code review", "inceleme", "pr", "lint", "quality", "best practices"],
  },
  {
    id: "elasticsearch",
    title: "Elasticsearch",
    text:
      "Tam metin arama ve analitik motoru; indeks ve shard kavramları. " +
      "Log ve gözlemlenebilirlik yığınlarında sık. " +
      "Sorgu DSL öğrenmesi gerektirir. " +
      "Operasyonel karmaşıklık ve kaynak kullanımına dikkat.",
    tags: ["elasticsearch", "search", "arama", "log", "observability"],
  },
  {
    id: "wordpress",
    title: "WordPress",
    text:
      "İçerik yönetimi, tema ve eklenti geliştirme (PHP). " +
      "Güvenlik güncellemeleri ve yedekleme rutini şart. " +
      "Küçük işletme sitelerinde hâlâ dominant. " +
      "Headless WordPress + modern frontend de mümkün.",
    tags: ["wordpress", "cms", "php", "blog", "içerik"],
  },
  {
    id: "design-arch",
    title: "Tasarım ve mimari",
    text:
      "SOLID ilkeleri, temiz mimari katmanları, bağımlılık enjeksiyonu. " +
      "Domain-driven design’a giriş kavramları (bounded context). " +
      "Olay güdümlü ve mikro hizmet ayrımı kararları. " +
      "Büyük kod tabanlarında okunabilirlik ve test edilebilirlik hedeflenir.",
    tags: ["design", "architecture", "solid", "clean", "ddd", "mimari", "patterns"],
  },
  {
    id: "react-native",
    title: "React Native",
    text:
      "React bilgisiyle mobil; köprü ve yeni mimari (Fabric/Turbo) tartışmalarını takip edin. " +
      "Expo ile hızlı başlangıç. " +
      "Yerel modül gereksiniminde platform kanalı. " +
      "Performans ve liste sanallaştırma (virtualized lists) önemli.",
    tags: ["react native", "expo", "mobile", "mobil", "cross", "javascript"],
  },
  {
    id: "design-system",
    title: "Tasarım sistemi",
    text:
      "Bileşen kütüphanesi, token (renk, tipografi, aralık) ve dokümantasyon (Storybook). " +
      "Tutarlı UX ve geliştirici-hızı. " +
      "Erişilebilirlik ve tema (karanlık mod) desteği. " +
      "Büyük ürün ekiplerinde standartlaştırma aracı.",
    tags: ["design system", "storybook", "components", "tokens", "ui kit"],
  },
];
