# 🇹🇷 Atatürk Projesi: Yankı 19 (Simülasyon Oyunu)

 
Proje, "Yankı 10" adlı web tabanlı bir simülasyon oyunu olarak tasarlanmıştır. Amacı, kullanıcılara Atatürk ve silah arkadaşlarının Kurtuluş Savaşı'ndaki mücadelesini interaktif bir anlatımla sunmak ve o dönemin zorlu kararlarına tanıklık etmelerini sağlamaktır.
---

 

## 🌟 Öne Çıkan Özellikler

* **Senaryo Tabanlı Simülasyon:** Kullanıcılar, Kurtuluş Savaşı'nın kilit cephelerinde ve kongrelerinde Atatürk ile silah arkadaşlarının karşılaştığı zorlukları temel alan interaktif senaryoları deneyimler.
* **Tarihi Karar Anları:** Oyun, (Sivas Kongresi, cephe stratejileri vb. gibi) tarihi olaylara dayalı kritik anlar sunar. Bu anlarda verilen kararlar, hikayenin ilerleyişini ve tarihi sonuçları interaktif olarak gösterir.
* **Görev Odaklı İlerleme:** Proje, kronolojik bir "zaman çizelgesi" yerine, oyuncuların tamamlaması gereken görevler (misyonlar) üzerinden ilerler.
* **Kilitlenebilir Arşiv (Dinamik Galeri):** Oyunda belirli görevler tamamlandıkça veya önemli anlara ulaşıldıkça açılan, döneme ait yüksek çözünürlüklü fotoğraflar, belgeler ve karakter biyografileri.
* **Duyarlı Tasarım (Responsive):** React tabanlı arayüz, hem masaüstü tarayıcılarda hem de mobil cihazlarda kusursuz bir oyun deneyimi sunar.

## 📸 Ekran Görüntüleri ve Proje Demosu

 

Projenin nasıl çalıştığını gösteren kısa bir animasyon:

![Proje Çalışma Demosu](./img/demo.gif)

---

## 🛠️ Kullanılan Teknolojiler

Bu projenin geliştirilmesinde aşağıdaki modern web teknolojilerinden yararlanılmıştır:

* **React (v18+):** Kullanıcı arayüzü (UI) kütüphanesi.
* **JavaScript (ES6+):** Projenin ana programlama dili.
* **HTML5:** Web sayfalarının yapısal iskeleti.
* **CSS3:** Tasarım ve animasyonlar için (Belki *Styled Components*, *Sass* veya *Tailwind* kullandıysanız belirtebilirsiniz).
* **React Router:** Sayfalar arası geçiş (routing) yönetimi için.
* **npm / yarn:** Paket yönetimi ve proje bağımlılıkları için.

---

## 📂 Proje Yapısı (Örnek)
Elbette. Projenizin React tabanlı bir simülasyon oyunu olduğunu göz önünde bulundurarak, standart ve organize bir proje yapısı şablonu aşağıdadır.

Bu yapı, "Yankı 10" projeniz için bileşenleri (components), sayfaları (pages) ve oyun verilerini (data) net bir şekilde ayırmanızı sağlar.

Aşağıdaki kodu kopyalayıp README.md dosyanızdaki ilgili yere yapıştırabilirsiniz:

Markdown

## 📂 Proje Yapısı

Proje, modern React uygulamaları için standart hale gelmiş, bileşen tabanlı bir dosya yapısını takip etmektedir. Bu yapı, kodun modülerliğini ve bakım kolaylığını artırır.

/ ├── public/ # Statik dosyaların (index.html, favicon) bulunduğu yer │ ├── index.html │ └── favicon.ico │ ├── src/ # Ana React uygulama kodunun tamamı │ │ │ ├── assets/ # Tüm statik varlıklar │ │ ├── images/ # Ekran görüntüleri, logolar, arayüz grafikleri │ │ ├── photos-gallery/ # Simülasyonda kullanılan tarihi fotoğraflar │ │ └── styles/ # Global CSS dosyaları (App.css, index.css) │ │ │ ├── components/ # Tekrar kullanılabilir küçük React bileşenleri │ │ ├── Button.js # Özel buton bileşeni │ │ ├── Navbar.js # Ana navigasyon çubuğu │ │ ├── DecisionBox.js # Karar anları için diyalog kutusu │ │ └── CharacterCard.js # Silah arkadaşları için karakter kartı │ │ │ ├── data/ # Statik oyun verileri │ │ ├── gameScenarios.json # Oyun senaryoları ve diyaloglar │ │ ├── timelineEvents.json # Tarihi olayların verisi │ │ └── characters.json # Karakter biyografileri │ │ │ ├── pages/ # Ana sayfa görünümleri (View'ler) │ │ ├── Home.js # Ana karşılama sayfası │ │ ├── Simulation.js # Ana oyun/simülasyon ekranı │ │ ├── Gallery.js # Kilidi açılan fotoğrafların galerisi │ │ └── About.js # Proje hakkında sayfası │ │ │ ├── App.js # Ana uygulama bileşeni (Routing burada yapılır) │ ├── index.js # Uygulamanın DOM'a bağlandığı giriş noktası │ └── index.css # Ana global stil dosyası │ ├── .gitignore # Git tarafından takip edilmeyecek dosyalar (node_modules vb.) ├── package.json # Proje bağımlılıkları ve scriptleri └── README.md # Proje tanıtım dosyası (Şu an düzenlediğiniz dosya)

Bu yapı, projenizi geliştirmeye devam ederken yeni özellikler eklemenizi çok kolaylaştıracaktır.
