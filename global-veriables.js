/*
==========================================================================
Dosya Adı: global-veriables.js
Açıklama: Bu JavaScript dosyası Enes Babekoğlu tarafından oluşturulmuştur.
Oluşturma Tarihi: 25 Nisan 2024
Versiyon: 1.0
Telif Hakkı (c) 2024 Enes Babekoğlu. Tüm hakları saklıdır.
  
İletişim: enesbabekoglu@gmail.com
==========================================================================
*/

/* 
Bu dosyamız oyunumuzdaki global değişkenlerimizin, dizilerimizin vb. tutulduğu dosyadır.
*/

var simdikiZaman = new Date(); // Şimdiki zamanı global olarak alır
var temasEdilenMobilya; // Temas ettiğimiz son mobilya
var elimizdeki = 0; // Elimizdeki ürünü tutar

var siparisler = []; // Oyunda verilen tüm siparişler bu dizide tutulur
var hazirlanacaklar = []; // Onaylanan siparişlerde hazırlanması gereken ürünler ve ürünleri hazırlaamk için gerekenler bu dizide liste olarak tutulur sipariş
var blokeEnvanter = {}; // Envanterden silinme ihtimali olan ürünleri geçici olarak bloke eden listemiz

/* Genel Oyun Ayarları */
var ayarlar = {
    "dukkan_open": false, 
    "ses": true, 
    "muzik": true, 
    "siparis_gelme_orani": 4, // Minimum 2 yani %50 eğer 3 olursa %33 olur (sayı ne kadar artarsa gelme oranı o kadar düşer)
    "siparis_onay_suresi": 60000, 
    "siparis_hazirlama_suresi": 300000
};

/* Oyundaki müşterilerin tutulduğu listemizdir görsel koyulabilir */
var musteriler = [
    {"ad": "Enes", "img": "images/profiles/enes.jpg"},
    {"ad": "Özgen", "img": ""},
    {"ad": "Emircan", "img": ""},
    {"ad": "Turgay", "img": ""},
    {"ad": "Umut", "img": ""},
    {"ad": "Sanem", "img": ""},
    {"ad": "Ahmet", "img": ""},
    {"ad": "Mehmet", "img": ""},
    {"ad": "Zehra", "img": ""},
    {"ad": "Ayşe", "img": ""},
    {"ad": "Fatma", "img": ""},
    {"ad": "Ceyhun", "img": ""},
    {"ad": "Ali", "img": ""},
    {"ad": "Murat", "img": ""},
    {"ad": "Emre", "img": ""},
    {"ad": "Selin", "img": ""},
    {"ad": "Mustafa", "img": ""},
    {"ad": "Zeynep", "img": ""},
    {"ad": "Gizem", "img": ""},
    {"ad": "Yağmur", "img": ""},
    {"ad": "Can", "img": ""},
    {"ad": "İrem", "img": ""},
    {"ad": "Aysu", "img": ""},
    {"ad": "Cem", "img": ""},
    {"ad": "Aslı", "img": ""},
    {"ad": "Hakan", "img": ""},
    {"ad": "Ece", "img": ""},
    {"ad": "Barış", "img": ""},
    {"ad": "Sude", "img": ""},
    {"ad": "Kadir", "img": ""},
    {"ad": "Serra", "img": ""},
    {"ad": "Kaan", "img": ""}
];

/* Oyundaki dolapların içindeki ürünleri dizi halinde tutan listemiz */
var urunler = {
    "et_dolabi": ["kofte", "pirzola", "sucuk", "biftek"], 
    "sebze_dolabi": ["domates", "sogan", "patates", "peynir"], 
    "ekmek_dolabi": ["ekmek", "hamburger_ekmegi", "lavas"], 
    "icecek_dolabi": ["ayran", "limonata", "kola", "su"],
    "hazirlanmis_urunler_dolabi": ["pismis_kofte", "pismis_pirzola", "kozlenmis_domates", "pismis_sucuk", "pismis_biftek", "patates_kizartmasi", "salata", "sogan_halkasi", "peynirli_patates_kizartmasi", "tost", "karisik_tabak", "peynirli_salata", "durum", "biftek_tabagi", "sucuk_ekmek", "hamburger", "kofte_ekmek", "pirzola_tabagi"]
};

/* Pişirilebilen ürünlerin olduğu ürün dizisini ve ilgili mobilya tipini tutan listemiz */
var pisirilebilenler = {
    "izgara": ["kofte", "pirzola", "sucuk", "biftek", "domates"], 
    "ocak": ["sogan", "patates"]
};

/* Hazırlama alanında hazırlanabilen ürünlerin ve bu ürünler için gereken ürünler ile sayısının tutulduğu listemiz */
var hazirlanabilenler = {
    "kofte_ekmek": {"pismis_kofte": 1, "ekmek": 1}, 
    "pirzola_tabagi": {"pismis_pirzola": 1, "kozlenmis_domates": 1, "sogan": 1, "lavas": 1},
    "hamburger": {"pismis_kofte": 1, "peynir": 1, "sogan": 1, "hamburger_ekmegi": 1},
    "sucuk_ekmek": {"pismis_sucuk": 1, "ekmek": 1},
    "biftek_tabagi": {"pismis_biftek": 1, "kozlenmis_domates": 1, "sogan": 1, "lavas": 1},
    "karisik_tabak": {"pismis_pirzola": 1, "pismis_kofte": 1, "kozlenmis_domates": 1, "sogan": 1, "ekmek": 1},
    "tost": {"pismis_sucuk": 1, "peynir": 1, "ekmek": 1},
    "peynirli_patates_kizartmasi": {"patates_kizartmasi": 1, "peynir": 1},
    "salata": {"domates": 1, "sogan": 1},
    "peynirli_salata": {"domates": 1, "sogan": 1, "peynir": 1},
    "durum": {"pismis_kofte": 1, "sogan": 1, "domates": 1, "lavas": 1}
};

/* Yemek tipine göre sipariş verilebilen ürünlerimiz (ana yemek kesinlikle gelir boş değerler o üründen sipariş verilmeyebileceği anlamına gelir) */
var siparisVerilebilenUrunler = {
    "anaYemek": ["kofte_ekmek", "pirzola_tabagi", "tost", "hamburger", "sucuk_ekmek", "biftek_tabagi", "karisik_tabak", "durum"],
    "patatesKizartmasi": ["", "patates_kizartmasi", "peynirli_patates_kizartmasi"],
    "atistirmalik": ["", "sogan_halkasi", "salata", "peynirli_salata"],
    "icecek": ["", "ayran", "kola", "su", "limonata"]
};

/* Bir ürünü ızgara yada ocakta pişirince gelecek olan pişmiş ürünün kodunu tutan listemiz */
var pisinceGelen = {
    "kofte": "pismis_kofte", 
    "pirzola": "pismis_pirzola", 
    "sucuk": "pismis_sucuk", 
    "biftek": "pismis_biftek", 
    "domates": "kozlenmis_domates", 
    "sogan": "sogan_halkasi", 
    "patates": "patates_kizartmasi"
};

/* Markette satılabilen ürünleri ve fiyatlarını tutan listemiz */
var marketFiyatlar = {
    "kofte": 50, 
    "pirzola": 70, 
    "sucuk": 40, 
    "biftek": 60, 
    "domates": 12, 
    "sogan": 12, 
    "patates": 15, 
    "peynir": 15, 
    "ekmek": 10, 
    "hamburger_ekmegi": 15, 
    "lavas": 12, 
    "ayran": 10, 
    "limonata": 12, 
    "kola": 15, 
    "su": 5
};

var urunFiyatlar = {};
var karMarji = 35; // % olarak kar marjımız

/* Sahip olduğumuz ürünleri ve miktarlarını tutan listemiz (envanterimiz) */
var envanter = {
    "cash": 500, 
    "yildiz": 0, 
    "kofte": 0, 
    "pirzola": 0, 
    "sucuk": 0, 
    "biftek": 0, 
    "kozlenmis_domates": 0, 
    "domates": 0, 
    "sogan": 0, 
    "patates": 0, 
    "peynir": 0, 
    "ekmek": 0, 
    "hamburger_ekmegi": 0, 
    "lavas": 0, 
    "ayran": 0, 
    "limonata": 0, 
    "kola": 0, 
    "su": 0, 
    "pismis_kofte": 0, 
    "pismis_pirzola": 0, 
    "pismis_sucuk": 0, 
    "pismis_biftek": 0, 
    "patates_kizartmasi": 0, 
    "salata": 0, 
    "sogan_halkasi": 0, 
    "peynirli_patates_kizartmasi": 0, 
    "tost": 0, 
    "karisik_tabak": 0, 
    "peynirli_salata": 0, 
    "durum": 0, 
    "biftek_tabagi": 0, 
    "sucuk_ekmek": 0, 
    "hamburger": 0, 
    "kofte_ekmek": 0, 
    "pirzola_tabagi": 0
};

/* Bloke envanter dizimizi bir döngü yardımıyla envanter dizimizden her elemanı 0 olacak şekilde kopyalıyoruz */
for (var anahtar in envanter) {blokeEnvanter[anahtar] = 0;};

var canvas = document.getElementById("gameCanvas"); // Oyunun canvas DOM elemanı
var context = canvas.getContext("2d"); // Canvas elemanı üzerinde 2d çizimler yapılacak değişken

var backgroundImage = new Image(); // Oyunun arkaplan görseli için bir görsel objesi oluşturuyoruz
backgroundImage.src = "images/mobilyalar/mutfak-bg.png"; // Arkaplan görselinin yolunu tanımlıyoruz

var keysPressed = {}; // Klavye tuşlarına basma olayları

/* Karakterimizin özelliklerinin tutulduğu liste değişkenimiz */
var karakter = {
    x: canvas.width / 2.3, // Karakterimizin başlangıç X konumu
    y: 250,  // Karakterimizin başlangıç Y konumu
    width: 175, // Karakterimizin genişliği
    height: 140, // Karakterimizin yüksekliği
    speed: 10, // Karakterimizin yürüme hızı
    facing: "right", // Karakterimizin başlangıçta hangi yöne doğru bakacağı
    walking: false // Karakterimizin yürüyüp yürümediğini tutar
};

/* Yürüme animasyonu görsellerini tutan dizimiz */
var yurumeAnimasyonlari = {
    genel: Array.from({ length: 8 }, (_, i) => "images/animasyonlar/karakter/Run (" + (i + 1) + ").png")
};

var mobilyaAnimasyonlari = { // Mobilya animasyonları {mobilya-style: [kare sayısı, mobilya_tipi]}
    "buzdolabi-sebzeler": [11, "buzdolabi-sebzeler", false], 
    "buzdolabi": [11, "buzdolabi", false], 
    "buzdolabi-icecekler": [11, "buzdolabi-icecekler", false], 
    "izgara-domates": [4, "izgara", "domates"], 
    "izgara-biftek": [4, "izgara", "biftek"], 
    "izgara-sucuk": [4, "izgara", "sucuk"], 
    "izgara-kofte": [4, "izgara", "kofte"], 
    "izgara-pirzola": [4, "izgara", "pirzola"], 
    "ocak-patates": [4, "ocak", "patates"], 
    "ocak-sogan": [4, "ocak", "sogan"], 
};

/* 
Tüm yönlerin aynı animasyonları paylaşması için tanımlamalar yapıyoruz.
Her yön için farklı bir animasyonda kullanabiliriz. 
Örneğin arkası dönük olduğunda farklı bir animasyon oynatılabilir. 
Ancak burada sadece tek yönde bir animasyonu kullandık:
*/
yurumeAnimasyonlari.up = yurumeAnimasyonlari.genel;
yurumeAnimasyonlari.down = yurumeAnimasyonlari.genel;
yurumeAnimasyonlari.left = yurumeAnimasyonlari.genel;
yurumeAnimasyonlari.right = yurumeAnimasyonlari.genel;

/* Oyun sahnesinde karakterimizle etkileşim kuracak olan objelerin tutulduğu ve objelerin özelliklerini liste halinde tutan dizimiz */
var mobilyalar = [
    {
        name: "izgara",
        x: 0,
        y: 40,
        width: 150,
        height: 150,
        type: "izgara",
        style: "izgara",
        statu: "off",
        uzerindenGecilebilir: false,
        arkasindaGozukur: false,
        panelAcilir: true,
        panelAcilirTus: "p",
        image: "images/mobilyalar/izgara.png",
        sound: "sounds/izgara-pisiyor.wav",
        kullanimda: false,
        kullanimBitis: "",
        hazirlananUrun: "",
        hazirlamaSuresi: 20, // Saniye
        animasyonZamanlayicisi: null
    },
    {
        name: "ocak",
        x: 150,
        y: 40,
        width: 150,
        height: 150,
        type: "ocak",
        style: "ocak",
        statu: "off",
        uzerindenGecilebilir: false,
        arkasindaGozukur: false,
        panelAcilir: true,
        panelAcilirTus: "p",
        image: "images/mobilyalar/ocak.png",
        sound: "sounds/kizartma.wav",
        kullanimda: false,
        kullanimBitis: "",
        hazirlananUrun: "",
        hazirlamaSuresi: 12, // Saniye
        animasyonZamanlayicisi: null
    },
    {
        name: "et_dolabi",
        x: 300,
        y: 40,
        width: 150,
        height: 150,
        type: "buzdolabi",
        style: "buzdolabi",
        statu: "off",
        uzerindenGecilebilir: false,
        arkasindaGozukur: false,
        panelAcilir: "dolap_modal",
        panelAcilirTus: "temas",
        image: "images/animasyonlar/buzdolabi/buzdolabi-1.png",
        kullanimda: false,
        kullanimBitis: "",
        hazirlananUrun: "",
        animasyonZamanlayicisi: null
    },
    {
        name: "sebze_dolabi",
        x: 450,
        y: 40,
        width: 150,
        height: 150,
        type: "buzdolabi",
        style: "buzdolabi-sebzeler",
        statu: "off",
        uzerindenGecilebilir: false,
        arkasindaGozukur: false,
        panelAcilir: "dolap_modal",
        panelAcilirTus: "temas",
        image: "images/animasyonlar/buzdolabi-sebzeler/buzdolabi-sebzeler-1.png",
        kullanimda: false,
        kullanimBitis: "",
        hazirlananUrun: "",
        animasyonZamanlayicisi: null
    },
    {
        name: "icecek_dolabi",
        x: 600,
        y: 40,
        width: 150,
        height: 150,
        type: "buzdolabi",
        style: "buzdolabi-icecekler",
        statu: "off",
        uzerindenGecilebilir: false,
        arkasindaGozukur: false,
        panelAcilir: "dolap_modal",
        panelAcilirTus: "temas",
        image: "images/animasyonlar/buzdolabi-icecekler/buzdolabi-icecekler-1.png",
        kullanimda: false,
        kullanimBitis: "",
        hazirlananUrun: "",
        animasyonZamanlayicisi: null
    },
    {
        name: "ekmek_dolabi",
        x: 732,
        y: 40,
        width: 175,
        height: 150,
        type: "ekmek-dolabi",
        style: "ekmek-dolabi",
        statu: "off",
        uzerindenGecilebilir: false,
        arkasindaGozukur: false,
        panelAcilir: "dolap_modal",
        panelAcilirTus: "temas",
        image: "images/mobilyalar/ekmek-dolabi.png",
        kullanimda: false,
        kullanimBitis: "",
        hazirlananUrun: "",
        animasyonZamanlayicisi: null
    },
    {
        name: "kasa",
        x: canvas.width - 300,
        y: 270,
        width: 300,
        height: 250,
        type: "kasa",
        style: "kasa",
        statu: "off",
        uzerindenGecilebilir: false,
        arkasindaGozukur: true,
        panelAcilir: false,
        panelAcilirTus: "",
        image: "images/mobilyalar/kasa.png",
        kullanimda: false,
        kullanimBitis: "",
        hazirlananUrun: "",
        animasyonZamanlayicisi: null
    },
    {
        name: "kasa_duvar",
        x: canvas.width - 350,
        y: 450,
        width: 400,
        height: 130,
        type: "duvar",
        style: "duvar",
        statu: "off",
        uzerindenGecilebilir: false,
        arkasindaGozukur: false,
        panelAcilir: false,
        panelAcilirTus: "",
        image: "images/null.png",
        kullanimda: false,
        kullanimBitis: "",
        hazirlananUrun: "",
        animasyonZamanlayicisi: null
    },
    {
        name: "yeni_siparisler_kasa",
        x: canvas.width - 310,
        y: 440,
        width: 75,
        height: 130,
        type: "duvar",
        style: "duvar",
        statu: "off",
        uzerindenGecilebilir: false,
        arkasindaGozukur: false,
        panelAcilir: "yeni_siparisler_modal",
        panelAcilirTus: "temas",
        image: "images/null.png",
        kullanimda: false,
        kullanimBitis: "",
        hazirlananUrun: "",
        animasyonZamanlayicisi: null
    },
    {
        name: "teslim_noktasi",
        x: canvas.width - 150,
        y: 440,
        width: 120,
        height: 130,
        type: "duvar",
        style: "duvar",
        statu: "off",
        uzerindenGecilebilir: false,
        arkasindaGozukur: false,
        panelAcilir: "teslim_noktasi_modal",
        panelAcilirTus: "temas",
        image: "images/null.png",
        kullanimda: false,
        kullanimBitis: "",
        hazirlananUrun: "",
        animasyonZamanlayicisi: null
    },
    {
        name: "tezgah",
        x: -10,
        y: 270,
        width: 400,
        height: 250,
        type: "tezgah",
        style: "tezgah",
        statu: "off",
        uzerindenGecilebilir: false,
        arkasindaGozukur: true,
        panelAcilir: false,
        panelAcilirTus: "",
        image: "images/mobilyalar/tezgah.png",
        kullanimda: false,
        kullanimBitis: "",
        hazirlananUrun: "",
        animasyonZamanlayicisi: null
    },
    {
        name: "tezgah_duvar",
        x: -50,
        y: 450,
        width: 600,
        height: 130,
        type: "duvar",
        style: "duvar",
        statu: "off",
        uzerindenGecilebilir: false,
        arkasindaGozukur: false,
        panelAcilir: false,
        panelAcilirTus: "",
        image: "images/null.png",
        kullanimda: false,
        kullanimBitis: "",
        hazirlananUrun: "",
        animasyonZamanlayicisi: null
    },
    {
        name: "hazirlanmis_urunler_dolabi",
        x: 0,
        y: 440,
        width: 100,
        height: 130,
        type: "duvar",
        style: "duvar",
        statu: "off",
        uzerindenGecilebilir: false,
        arkasindaGozukur: false,
        panelAcilir: "hazir_urunler_modal",
        panelAcilirTus: "temas",
        image: "images/null.png",
        kullanimda: false,
        kullanimBitis: "",
        hazirlananUrun: "",
        animasyonZamanlayicisi: null
    },
    {
        name: "hazirlama_alani",
        x: 220,
        y: 440,
        width: 100,
        height: 130,
        type: "duvar",
        style: "duvar",
        statu: "off",
        uzerindenGecilebilir: false,
        arkasindaGozukur: false,
        panelAcilir: "hazirlama_alani_modal",
        panelAcilirTus: "temas",
        image: "images/null.png",
        kullanimda: false,
        kullanimBitis: "",
        hazirlananUrun: "",
        animasyonZamanlayicisi: null
    },
    {
        name: "masa_1",
        x: 100,
        y: canvas.height - 200,
        width: 220,
        height: 150,
        type: "masa",
        style: "masa",
        statu: "off",
        uzerindenGecilebilir: false,
        arkasindaGozukur: false,
        panelAcilir: false,
        panelAcilirTus: "",
        image: "images/mobilyalar/masa.png",
        kullanimda: false,
        kullanimBitis: "",
        hazirlananUrun: "",
        animasyonZamanlayicisi: null
    },
    {
        name: "masa_2",
        x: 500,
        y: canvas.height - 200,
        width: 220,
        height: 150,
        type: "masa",
        style: "masa",
        statu: "off",
        uzerindenGecilebilir: false,
        arkasindaGozukur: false,
        panelAcilir: false,
        panelAcilirTus: "",
        image: "images/mobilyalar/masa.png",
        kullanimda: false,
        kullanimBitis: "",
        hazirlananUrun: "",
        animasyonZamanlayicisi: null
    },
];