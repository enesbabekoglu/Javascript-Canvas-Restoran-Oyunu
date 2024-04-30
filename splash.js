/*
==========================================================================
Dosya Adı: splash.js
Açıklama: Bu JavaScript dosyası Enes Babekoğlu tarafından oluşturulmuştur.
Oluşturma Tarihi: 25 Nisan 2024
Versiyon: 1.0
Telif Hakkı (c) 2024 Enes Babekoğlu. Tüm hakları saklıdır.
  
İletişim: enesbabekoglu@gmail.com
==========================================================================
*/

/* 
Bu dosyamız oyunumuzun giriş ekranı ve oyunun başlatılması gibi olayları barındırır.
*/

var elimizdekiDiv = document.getElementById("elimizdeki");
var oyunBasladi = false;

function kaydirmayiEngelle(event) { // Klavye olay dinleyicisi

    const yonTuslari = {37: true, 38: true, 39: true, 40: true}; // Yön tuşları ile oyun çalışırken sayfamızda scroll yapılmasını engelleyeceğiz

    if (yonTuslari[event.keyCode]) { // Eğer basılan tuş dizide varsa

        event.preventDefault(); // Tuşun varsayılan davranışını engelliyoruz
        return false;

    }

}

function oyunBaslarken(){

    elimizdekiDiv.innerHTML = word['text_eller_bos'];
    
}

/* Oyuna başlama ekranındaki id değeri playButton olan DOM elemanına tıklandığında oyunumuz başlayacaktır */
document.getElementById("playButton").addEventListener("click", function() {

    document.getElementById("yukleniyor").style.display = "block"; // Yüklenme kısmını gösteriyoruz
    document.getElementById("playButton").style.display = "none"; // Giriş düğmesini gizliyoruz

    gorsellerinYuklenmesiniBekle(function() { // Görseller yüklendikten sonra oyun döngüsünü başlat
        
        backgroundImage.src = "images/mobilyalar/mutfak-bg.png"; // background için src tanımlanıyor
        gameLoop(); // Oyun döngüsünü başlat

        document.getElementById("gameDiv").style.display = "none"; // Oyun giriş ekranını gizliyoruz
        document.getElementById("playDiv").style.display = "block"; // Görünmez olan oyun canvasını görünür hale getiriyoruz

        if(ayarlar["muzik"] == true){ // Eğer müzik özelliği açıksa
            backgroundMusic.play(); // Arkaplan müziğini başlatıyoruz
        }

        oyunBasladi = true;
        document.getElementById("menu").style.display = "flex";

        urunFiyatlariniHesapla(); // Oyun başlatılırken ürünlerden kazanılacak fiyatları hesaplatıyoruz
        
        /* Yeni Sipariş Oluşturma */
        setInterval(function(){yeniSiparis();}, 10000); // Her 10 saniyede bir çalışacaktır

        /* Mevcut Siparişleri Kontrol Etme */
        setInterval(function(){siparisiDenetle();}, 1000); // Her 1 saniyede bir çalışacaktır

        /* Mevcut Siparişlerin Sürelerini Kontrol Etme (UI Açısından) */
        setInterval(function(){siparisSureleriniGuncelle();}, 1000); // Her 1 saniyede bir çalışacaktır

        document.addEventListener('keydown', kaydirmayiEngelle, false); // Oyun içinde işlem yapılan tuşları olay dinleyicisi kullanarak dinlemeye başlıyoruz

    });

});

/* GİRİŞTEKİ KARAKTERİN ANİMASYONUNU GERÇEKLEŞTİREN KODLARIMIZ ve DEĞİŞKENLER */

const girisKarakter = document.getElementById("oyun_acilis_animasyonu");

let kareIndex = 1, bosSayisi = 0, zipladimi = true, ziplamaIndex = 1, kostumu = true, kosuIndex = 1;
    
const bosKare = 10; // Toplam Idle kare sayısı
const ziplamaKare = 12; // Toplam Jump kare sayısı
const kosuKare = 8; // Toplam Run kare sayısı

const bosAnimasyonTekrarSayisi = 7; // Idle animasyonunun tekrar sayısı

/* Oyuna başlangıç ekranında yer alan karakterin animasyonlu bir şekilde görünmesini sağlayan fonksiyonumuz */
const girisKarakterAnimasyon = () => {
    
    if (!zipladimi && !kostumu) {
        // Idle animasyonunu oynat
        const imgSrc = `Idle (${kareIndex}).png`;
        const imgAlt = `Idle ${kareIndex}`;
        girisKarakter.src = `images/animasyonlar/karakter/${imgSrc}`;
        girisKarakter.alt = imgAlt;
        
        kareIndex = kareIndex % bosKare + 1; // 1 ile bosKare arasında döngü
        
        if (kareIndex === 1) { // Idle animasyonunun tekrar sayısını kontrol et
            bosSayisi++;
        }
        
        if (bosSayisi >= bosAnimasyonTekrarSayisi) { // Idle animasyonu tamamlandıysa ve Jump animasyonu başlamalıysa
            zipladimi = true;
            ziplamaIndex = 1; // Jump animasyonunun başlangıç indeksi
        }

    } else if (zipladimi) {
        // Jump animasyonunu oynat
        const imgSrc = `Jump (${ziplamaIndex}).png`;
        const imgAlt = `Jump ${ziplamaIndex}`;
        girisKarakter.src = `images/animasyonlar/karakter/${imgSrc}`;
        girisKarakter.alt = imgAlt;
        
        ziplamaIndex++; // Sonraki kareye geç
        
        if (ziplamaIndex > ziplamaKare) { // Jump animasyonu tamamlandıysa

            zipladimi = false;
            kostumu = true; // Run animasyonunu başlat
            kosuIndex = 1;

        }

    } else if (kostumu) { // Run animasyonunu oynat
        
        const imgSrc = `Run (${kosuIndex}).png`;
        const imgAlt = `Run ${kosuIndex}`;

        girisKarakter.src = `images/animasyonlar/karakter/${imgSrc}`;
        girisKarakter.alt = imgAlt;

        kosuIndex++; // Sonraki kareye geç
        
        if (kosuIndex > kosuKare) { // Run animasyonu tamamlandıysa
            kostumu = false;
            bosSayisi = 0; // Idle animasyonuna geri dön
            kareIndex = 1; // Idle animasyonunda baştan başla
        }

    }

};

/* Fonksiyonlarımızı Çağırıyoruz */
oyunBaslarken();
setInterval(girisKarakterAnimasyon, 100);