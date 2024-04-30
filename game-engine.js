/*
==========================================================================
Dosya Adı: game-engine.js
Açıklama: Bu JavaScript dosyası Enes Babekoğlu tarafından oluşturulmuştur.
Oluşturma Tarihi: 25 Nisan 2024
Versiyon: 1.0
Telif Hakkı (c) 2024 Enes Babekoğlu. Tüm hakları saklıdır.
  
İletişim: enesbabekoglu@gmail.com
==========================================================================
*/

/* 
Bu dosyamız oyunumuzdaki işlemlerin yönetilmesi için kullanılır. 
Örneğin; bir siparişin iptal edilmesi, kabul edilmesi, süresinin dolması vb. 
*/

function elineAl(urunKodu) { // Bir ürünü elimize almamızı sağlayan fonksiyondur

    elimizdekiDiv.innerHTML = (urunKodu == 0) ? word['text_eller_bos'] : word[urunKodu]+" <text style='margin-left: 5px;'>(X)</text>";
    elimizdeki = (urunKodu == 0) ? "" : urunKodu; // Ürünü elimize alıyoruz
    closeModal(); // Tüm modalları kapatıyoruz
    
}

function satinAl(urunKodu){ // Marketten bir ürün satın almamızı sağlayan fonksiyondur

    if(urunKodu in marketFiyatlar){ // Bu ürün ürün satın alınabilir bir ürün ise

        if((envanter['cash']-blokeEnvanter['cash']) >= marketFiyatlar[urunKodu]){ // Yeterli cashmız varsa

            envanter[urunKodu] += 1; // Ürünü envantere ekliyoruz
            envanter['cash'] -= marketFiyatlar[urunKodu]; // Envanterimizden ürünün fiyatı kadar cash siliyoruz

            paySound(); // Ses çalar

        }else{ // Yetersiz bakiye

            disabledSound(); // Ses çalar

        }

    }else{ // Bu ürün satın alınamaz bir üründür

        disabledSound(); // Ses çalar

    }

}

function dukkanAcKapat(deger) { // Dükkanı açıp/kapatmak için bu fonksiyon kullanılır
    
    var dukkanStatuElement = document.getElementById("dukkanStatu"); // Dükkanın anlık durumunu gösteren DOM elemanını çekiyoruz

    if (deger == 0){ // Eğer gelen değer 0 ise dükkanı kapatacağımız anlamına gelir

        dukkanStatuElement.setAttribute("onclick", "dukkanAcKapat(1);");
        dukkanStatuElement.src = "images/butonlar/kapali.png";
        ayarlar["dukkan_open"] = false; // Dükkan kapalı

    } else if (deger == 1){ // Eğer gelen değer 1 ise dükkanı açacağımız anlamına gelir

        dukkanStatuElement.setAttribute("onclick", "dukkanAcKapat(0);");
        dukkanStatuElement.src = "images/butonlar/acik.png";
        ayarlar["dukkan_open"] = true; // Dükkan açık

    }

}

function sesAyarla(tip) { // Ses türüne göre sesleri açıp kapatan fonksiyonumuz

    var element = document.getElementById(tip); // İlgili ses tipinin DOM Elemanını çekiyoruz

    if (ayarlar[tip] == true){ // Eğer ilgili ses tipi şuanda çalışıyorsa artık çalışmayacaktır

        element.style.filter = "grayscale(100%)"; // DOM gri filtre uyguluyoruz
        ayarlar[tip] = false; // Ses artık çalmayacak

        if(tip == "muzik"){
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        }

    } else if (ayarlar[tip] == false){ // Eğer ilgili ses tipi şuanda çalışmıyorsa artık çalışacaktır

        element.style.filter = "none"; // DOM gri filtreyi kaldırıyoruz
        ayarlar[tip] = true; // Ses artık çalacak

        if(tip == "muzik"){
            backgroundMusic.play();
        }

    }

}

function yeniSiparis() { // Rastgele yeni bir sipariş oluşturan fonksiyondur

    if(ayarlar["dukkan_open"] == true){ // Yalnızca dükkan açıksa çalışır

        var siparisRandom = rastgeleSayi(1, ayarlar["siparis_gelme_orani"]); // Sipariş verildi mi verilmedi mi kararı rastgele olarak belirleniyor

        if (siparisRandom == 1) { // Eğer rastgele gelen sayı değeri 1 ise sipariş verildi anlamına gelir

            var musteriIndex = rastgeleSayi(0, musteriler.length - 1); // Hangi müşterinin sipariş vereceğine rastgele karar veriyoruz
            var musteriAdi = musteriler[musteriIndex]["ad"]; // Rastgele seçilen müşterinin adını çekiyoruz

            for (var i = 0; i < siparisler.length; i++) { // Tüm siparişleri döngüye sokuyoruz

                if (siparisler[i].musteri == musteriAdi && siparisler[i].statu == 1) {  // Bu kullanıcının şuanda aktif bir siparişi var mı kontrol ediyoruz
                    siparisVarMi = true;
                    break;
                }
                
            }

            if (!siparisVarMi) { // Aynı anda aynı kişi tarafından mükerrer aktif sipariş verilmemelidir

                var urunler = [], yemekIndex, siparis, siparisVarMi = false;
                var yemekTipleri = Object.keys(siparisVerilebilenUrunler);
                const simdikiZaman = new Date();

                yemekTipleri.forEach(function (yemekTipi) { // Yemek tiplerinin olduğu diziyi döngüye sokuyoruz

                    yemekIndex = rastgeleSayi(0, siparisVerilebilenUrunler[yemekTipi].length - 1); // Yemek tipinin içindeki yemeklerden rastgele bir tanesini seçiyoruz

                    if (siparisVerilebilenUrunler[yemekTipi][yemekIndex] !== "") { // Eğer rastgele gelen yemek boş değilse o yemeği siparişe ekliyoruz bazen müşteri o yemek tipinden yemek almayabilir
                        urunler.push(siparisVerilebilenUrunler[yemekTipi][yemekIndex]);
                    }

                });

                // Yeni sipariş objesi oluşturuyoruz
                var siparis = { "musteri": musteriIndex, "urunler": urunler, "hazirlananUrunler": [], "siparisZamani": simdikiZaman, "bitisZamani": new Date(simdikiZaman.getTime() + ayarlar["siparis_onay_suresi"]), "onay": 0, "goruldu": 0, "statu": 1};
                
                siparisler.push(siparis); // Sipariş objemizi siparişler dizimize ekliyoruz

                yeniSiparisSound(); // Yeni bir sipariş alındığında ses çalar

            }

        }

    }
    
}

function siparisiDenetle() { // Gelen ve kabul edilen siparişlerin sürelerinin dolması durumunda işlemler yapar

    const simdikiZaman = new Date(); // Şimdiki zamanı alır

    for (let i = siparisler.length - 1; i >= 0; i--) { // Siparişler dizimizi tek tek dolaşarak gerekli kontrolleri sağlar

        const siparis = siparisler[i]; // İlgili sipariş dizisini alır

        if(siparis["statu"] == 1){ // Siparişin durumu aktif ise

            const bitisZamani = new Date(siparis["bitisZamani"]); // Siparişin kalan süresini Date objesi olarak al

            if (simdikiZaman > bitisZamani && siparis["onay"] == 0) { // Eğer siparişin onaylama süresi dolmuş ve onaylanmamışsa

                siparis["statu"] = 0; // Siparişi pasife alıyoruz
                document.getElementById("siparis"+i).remove(); // Siparişi DOM'dan siliyoruz

            }else if(simdikiZaman > bitisZamani && siparis["onay"] == 1){ // Sipariş onaylanmış ama vaktinde hazırlanamamışsa

                siparis["statu"] = 2; // Siparişi vaktinde tamamlayamazsak statu değeri 2 olur
                document.getElementById("siparis"+i).remove(); // Siparişi DOM'dan siliyoruz

                siparis["hazirlananUrunler"].forEach(function (urun) { // Tüm hazırlanan ürünleri döngüye sokuyoruz

                    blokeEnvanter[urun] -= 1; // Az önce bloke ettiğimiz ürünün blokesini kaldırıyoruz
                    
                });

            }
                
        }

    }

}

function siparisSureleriniGuncelle(){ // Gelen ve kabul edilen siparişlerin kalan sürelerini hesaplar ve kalan süre yüzdesini değiştirir

    for (let siparis of siparisler) { // Siparişler dizimizi döngüye sokuyoruz

        if(siparis["statu"] == 1){ // Eğer sipariş aktifse

            var siparisIndex = siparisler.indexOf(siparis); // Siparişin index değerini alıyoruz
            var siparisDiv = document.getElementById("siparisOranSay"+siparisIndex); // Siparişin yüzdelik DOM id değerini kullanarak tespit ediyoruz

            if(siparisDiv){ // Eğer DOM mevcutsa

                var oran = tarihFarkiniYuzdeHesapla(new Date(siparis['siparisZamani']), new Date(siparis['bitisZamani'])); // Kalan süre yüzdeliği
                siparisDiv.style.width = 100 - oran.toFixed(2)+"%"; // Yüzdelik DOM'un genişliğini güncelliyoruz

            }

        }

    }

}

function siparisOnayRed(siparisIndex, islem) { // Siparişi onaylama/reddetme gibi işlemler bu fonksiyon altında yapılır

    var siparis = siparisler[siparisIndex]; // Siparişimizin detaylarını dizimizden siparişin index değeriyle çekiyoruz

    if (islem == "onay") { // Sipariş onaylanıyorsa

        siparis["urunler"].forEach(function(urun) { // Sipariş verilen ürünleri döngüye sokuyoruz

            if (urun in hazirlanabilenler) { // Sipariş verilen ürünün hazırlama tezgahında üretilen bir ürün olup olmadığını kontrol ediyoruz

                var hazirlanacakUrunGerekenler = hazirlanabilenler[urun]; // Sipariş verilen ürünü üretmek için gereken ürünlerin neler olduğunu çekiyoruz
                var gerekenler = {}; // Sipariş verilen ürünü üretmek için gereken ürünlerin kaydını tutmak için boş bir liste oluşturuyoruz

                for (var gereken in hazirlanacakUrunGerekenler) { // Gereken ürünleri döngüye sokuyoruz tek tek gerekenler listemize ekleyeceğiz
                    gerekenler[gereken] = 0; // Gereken ürünleri tek tek listemize ekliyoruz ve 0 değerini veriyoruz 0 değeri henüz bu ürün eklenmedi anlamına gelir
                }

                var hazirlanacakDetay = {"urun": urun,"siparis_id": siparisIndex,"gerekenler": gerekenler}; // Hazırlanması gereken ürünün detaylarını liste haline getiriyoruz
                hazirlanacaklar.push(hazirlanacakDetay); // Hazırlanması gereken ürünü hazırlanacaklar dizimize ekliyoruz

            }

        });

        siparis["onay"] = 1; // Siparişin onaylandığını 1 ile belirtiyoruz dizimizde güncelliyoruz
        siparis["bitisZamani"] = new Date(siparis["bitisZamani"].getTime() + ayarlar["siparis_hazirlama_suresi"]); // Siparişin hazırlanma süresine şimdi+(sipariş süresi) kadar ekliyoruz
        onaySound();

    } else if (islem == "red") { // Sipariş reddedildiyse

        siparis["onay"] = 2; // Siparişin reddedildiğini 2 ile belirtiyoruz dizimizde güncelliyoruz
        siparis["statu"] = 0; // Siparişin artık pasif olduğunu belirtiyoruz dizimizde güncelliyoruz
        redSound();

    }

    var siparisDiv = document.getElementById("siparis" + siparisIndex);
    if (siparisDiv){siparisDiv.remove();} // Siparişi DOM'dan kaldırıyoruz

}

function teslimEt(siparisIndex, urun){ // Sipariş verilen bir ürünü bu fonksiyon ile teslimat noktasında teslim ediyoruz

    if(elimizdeki == urun){ // Elimizdeki ürün ile teslim edilecek ürünün aynı olduğunu kontrol ediyoruz

        if((envanter[urun]-blokeEnvanter[urun]) >= 1){  // Eğer envanterimizde 1 veya 1'den fazla bu üründen varsa

            var siparis = siparisler[siparisIndex]; // Siparişimizin detaylarını dizimizden siparişin index değeriyle çekiyoruz

            if(siparis["urunler"].includes(urun) && !siparis["hazirlananUrunler"].includes(urun)){ // Siparişte bu ürün varsa ve henüz teslim edilmemişse

                siparis["hazirlananUrunler"].push(urun); // Ürünü teslim ediyoruz ve listeye ekleniyor
                blokeEnvanter[urun] += 1; // Üründen 1 tane bloke ediyoruz eğer siparişin tamamını yetiştiremezsek bloke kalkacaktır

                elineAl(0);

                if(siparis["hazirlananUrunler"].length == siparis["urunler"].length){ // Eğer siparişteki ürün sayısı ve hazırlanan ürün sayısı eşit ise sipariş tamamlandı demektir

                    var kazanc = 0;

                    siparis["hazirlananUrunler"].forEach(function (urun) { // Tüm hazırlanan ürünleri döngüye sokuyoruz
                        kazanc += urunFiyatlar[urun];
                        envanter[urun] -= 1; // Envanterden hazırlanan ürünü siliyoruz
                        blokeEnvanter[urun] -= 1; // Az önce bloke ettiğimiz ürünün blokesini kaldırıyoruz
                    });

                    siparis["statu"] = 3; // Siparişi tamamlandı olarak işaretliyoruz

                    envanter["cash"] += kazanc; // Siparişten kazandığımız parayı ekliyoruz

                    var oran = tarihFarkiniYuzdeHesapla(new Date(siparis['siparisZamani']), new Date(siparis['bitisZamani']))
                    envanter["yildiz"] += Math.ceil(3*(oran/100)); // Siparişten kazandığımız yıldızı ekliyoruz

                    var siparisDiv = document.getElementById("siparis" + siparisIndex);
                    if (siparisDiv) {siparisDiv.remove();} // Siparişi DOM'dan kaldırıyoruz

                    cashSound();

                }else{

                    surprizeSound();

                }

            }else{ // Bu ürün zaten teslim edildi

                disabledSound(); // Ses çalar

            }

        }else{ // Envanterde yeterli ürün yok

            disabledSound(); // Ses çalar

        }

    }else{ // Ürün elimizde değil

        disabledSound(); // Ses çalar

    }

}

function hazirlamayaEkle(hazirlanacakIndis, urun){ // Hazırlama alanında hazırlanacak bir ürüne bu fonksiyon ile gereken ürünü ekliyoruz

    if(elimizdeki == urun){ // Elimizdeki ürün ile teslim edilecek ürünün aynı olduğunu kontrol ediyoruz

        if((envanter[urun]-blokeEnvanter[urun]) >= 1){ // Eğer envanterimizde 1 veya 1'den fazla bu üründen varsa

            var hazirlanacak = hazirlanacaklar[hazirlanacakIndis]; // Hazırlanacak olan ürünün detaylarını dizimizden hazırlanacak index değeriyle çekiyoruz

            if(hazirlanacak["gerekenler"].hasOwnProperty(urun) && hazirlanacak["gerekenler"][urun] < hazirlanabilenler[hazirlanacak["urun"]][urun]){ 
                
                // Hazırlanacak ünün gerekenler listesinde bu ürün varsa ve hazırlanacak ürün için gereken ürün sayısı gereken sayıdan azsa (yani hala eklenmediyse)

                hazirlanacak["gerekenler"][urun] += 1; // Gereken ürünün hazırlanacak ürüne eklendiğini belirtiyoruz
                blokeEnvanter[urun] += 1; // Üründen 1 tane bloke ediyoruz eğer bu ürünü hazırlamayı yetiştiremezsek bloke kalkacaktır

                elineAl(0);

                var eklendi = 0; // Eklenmiş olan gereken ürün sayısı

                for (var gereken in hazirlanacak["gerekenler"]) { // Gereken ürünleri döngüye sokuyoruz ve tek tek eklenip eklenmediğini kontrol ediyoruz
                    if((hazirlanacak["gerekenler"][gereken] == hazirlanabilenler[hazirlanacak["urun"]][gereken])){eklendi++;}
                }

                var gerekenlerSayisi = Object.keys(hazirlanacak["gerekenler"]).length; // Gerekenler listemizdeki ürün sayısı

                if(eklendi == gerekenlerSayisi){ // Eğer eklenen ve gereken ürün sayısı eşitse bu ürün tamamlandı demektir

                    envanter[hazirlanacak["urun"]] += 1; // Bu ürünü envanterimize ekliyoruz
                    
                    elineAl(hazirlanacak["urun"]); // Hazırladığımız ürünü elimize alalım

                    for (var gereken in hazirlanacak["gerekenler"]) { // Gerekenleri tekrar döngüye sokuyoruz ve envanterimizden siliyoruz
                        envanter[gereken] -= hazirlanacak["gerekenler"][gereken]; // Envanterden eklenen ürünü siliyoruz
                        blokeEnvanter[gereken] -= hazirlanacak["gerekenler"][gereken]; // Az önce bloke ettiğimiz ürünün blokesini kaldırıyoruz
                    }

                    messageSound();

                }else{

                    surprizeSound();

                }

            }else{ // Gereken ürün zaten eklendi

                disabledSound(); // Ses çalar

            }

        }else{ // Yetersiz ürün

            disabledSound(); // Ses çalar

        }

    }else{ // Ürün elimizde değil

        disabledSound(); // Ses çalar

    }

}

/* KAREKTERİN YÜRÜME FONKSİYONLARI */

window.addEventListener("keyup", function(event) { // Karakterin yürüme işlemi bittiğinde çalışır

    delete keysPressed[event.key]; // Son basılan tuşun kaydını siler
    karakter.walking = false; // Karakterin yürüyormu değerini hayır olarak değiştirir
    stopWalkSounds(); // Karakterin yürüme sesini durdurur (ayak sesleri çalmaz)
    
});

function karakteriTasi(dx, dy) { // Karakterimizin bulunduğu konumdan gelen x, y değerleri kadar etmesini sağlar

    var newX = karakter.x + dx; // Karakterin mevcut X konumuna +X eklenerek yeni X konumu belirlenir
    var newY = karakter.y + dy; // Karakterin mevcut Y konumuna +Y eklenerek yeni Y konumu belirlenir

     // Karakterin canvas sınırlarının dışına çıkmasını engelliyoruz
    newX = Math.max(0, Math.min(newX, canvas.width*1.04 - karakter.width));
    newY = Math.max(0, Math.min(newY, canvas.height*1.04 - karakter.height));

    for (var i = 0; i < mobilyalar.length; i++) { // Karakterin çarptığı şeylere temas edip etmediğini kontrol ediyoruz bunun için tüm mobilyaları döngüye sokuyoruz
        
        var mobilya = mobilyalar[i]; // Kontrol edilen mobilya özelliklerini alıyoruz

        if((mobilya.arkasindaGozukur == true)){
            
            // Bu mobilyanın üzerinden geçilebiliyor
            
        }else if((newX <= mobilya.x + (mobilya.width/1.5) && newX + (karakter.width/2.5) >= mobilya.x && newY <= mobilya.y +(mobilya.height/2.5) &&newY + (karakter.height/1.2) >= mobilya.y)){

            /* Bir mobilyaya temas edildi */
            
            temasEdilenMobilya = mobilya.name; // Son temas edilen mobilyayı değişkene kaydediyoruz

            if((mobilya.uzerindenGecilebilir == false)){ // Mobilyanın üzerinden geçilemiyorsa
    
                if(mobilya.statu == "off"){ // Mobilya şuanda kapalı durumdaysa

                    if(mobilya.panelAcilir != false && mobilya.panelAcilirTus == "temas"){ // Mobilya bir paneli açabiliyorsa ve açma yöntemi temas ise

                        mobilya.statu = "on"; // Mobilyayı açık duruma getir
                        openModal(mobilya); // Mobilyaya bağlı paneli aç

                    }

                    if (mobilya.type == "buzdolabi") { // Eğer temas edilen mobilyanın tipi buzdolabı ise
                        mobilyaAnimasyon("acilis", mobilya, {}); // Mobilyanın açılma animasyonunu başlat
                    }

                }

                return; // Karakter çarptı bu yönde hareket etmeyecek!

            }else{

                // Bu mobilyanın üzerinden geçilebiliyor

            }

        }else{ // Mobilyaya temas edilmiyorsa

            if(mobilya.statu == "on"){ // Mobilya en son açık olarak işaretlendiyse

                if(mobilya.panelAcilir != false && mobilya.panelAcilirTus == "temas"){ // Mobilya bir paneli açabiliyorsa ve açma yöntemi temas ise

                    mobilya.statu = "off"; // Mobilyayı kapalı duruma getir
                    closeModal(); // Açık olan tüm panelleri kapat

                }

                if (mobilya.type == "buzdolabi") { // Eğer temas edilen mobilyanın tipi buzdolabı ise
                    mobilyaAnimasyon("kapanis", mobilya, {});  // Mobilyanın kapanma animasyonunu başlat
                }

                temasEdilenMobilya = ""; // Son temas edilen mobilyayı boş olarak güncelle

            }

        }

    }

    karakter.x = newX; // Karakteri yeni X konumuna güncelliyoruz
    karakter.y = newY; // Karakteri yeni Y konumuna güncelliyoruz
    
}

window.addEventListener("keydown", function(event) {

    keysPressed[event.key] = true;

    if(oyunBasladi == true){ // Sadece oyun başlatıldıysa çalışır

        if (keysPressed["ArrowRight"] && keysPressed["ArrowUp"]) { // Sağ ve Yukarı Yön Tuşlarına Basarak Sağ Yukarı Doğru Çapraz Yürüme

            karakteriTasi(karakter.speed, -karakter.speed); // Karakterin konumunu değiştiriyoruz
            karakter.facing = "right"; // Karakterin yüzünü sağa döndürüyoruz
            karakter.walking = true; // Karakterin şuanda yürüdüğünü belirtiyoruz
            playWalkSounds(); // Yürüme sesini çal

        } else if (keysPressed["ArrowRight"] && keysPressed["ArrowDown"]) { // Sağ ve Aşağı Yön Tuşlarına Basarak Sağ Aşağı Doğru Çapraz Yürüme

            karakteriTasi(karakter.speed, karakter.speed); // Karakterin konumunu değiştiriyoruz
            karakter.facing = "right"; // Karakterin yüzünü sağa döndürüyoruz
            karakter.walking = true; // Karakterin şuanda yürüdüğünü belirtiyoruz
            playWalkSounds(); // Yürüme sesini çal

        } else if (keysPressed["ArrowLeft"] && keysPressed["ArrowUp"]) {  // Sol ve Yukarı Yön Tuşlarına Basarak Sol Yukarı Doğru Çapraz Yürüme

            karakteriTasi(-karakter.speed, -karakter.speed); // Karakterin konumunu değiştiriyoruz
            karakter.facing = "left"; // Karakterin yüzünü sola döndürüyoruz
            karakter.walking = true; // Karakterin şuanda yürüdüğünü belirtiyoruz
            playWalkSounds(); // Yürüme sesini çal

        } else if (keysPressed["ArrowLeft"] && keysPressed["ArrowDown"]) { // Sol ve Aşağı Yön Tuşlarına Basarak Sol Aşağı Doğru Çapraz Yürüme

            karakteriTasi(-karakter.speed, karakter.speed); // Karakterin konumunu değiştiriyoruz
            karakter.facing = "left"; // Karakterin yüzünü sola döndürüyoruz
            karakter.walking = true; // Karakterin şuanda yürüdüğünü belirtiyoruz
            playWalkSounds(); // Yürüme sesini çal
            
        } else { // Eğer aynı anda iki tuşa basılmıyorsa

            switch(event.key) { // Basılan tuşa göre işlemler yapma

                case "ArrowUp": // Yukarı yön tuşuna basılıyorsa

                    karakteriTasi(0, -karakter.speed); // Karakterin Y konumunu güncelle
                    karakter.walking = true; // Karakterin şuanda yürüdüğünü belirtiyoruz
                    playWalkSounds(); // Yürüme sesini çal
                    break;

                case "ArrowDown": // Aşağı yön tuşuna basılıyorsa

                    karakteriTasi(0, karakter.speed); // Karakterin Y konumunu güncelle
                    karakter.walking = true; // Karakterin şuanda yürüdüğünü belirtiyoruz
                    playWalkSounds(); // Yürüme sesini çal
                    break;

                case "ArrowLeft": // Sol yön tuşuna basılıyorsa

                    karakteriTasi(-karakter.speed, 0);
                    karakter.facing = "left"; // Karakterin yüzünü sola döndürüyoruz
                    karakter.walking = true; // Karakterin şuanda yürüdüğünü belirtiyoruz
                    playWalkSounds(); // Yürüme sesini çal
                    break;

                case "ArrowRight": // Sağ yön tuşuna basılıyorsa

                    karakteriTasi(karakter.speed, 0);
                    karakter.facing = "right"; // Karakterin yüzünü sağa döndürüyoruz
                    karakter.walking = true; // Karakterin şuanda yürüdüğünü belirtiyoruz
                    playWalkSounds(); // Yürüme sesini çal
                    break;

                case "p": // Eğer P tuşunda basılıyorsa

                    var pTusuMobilyalar = {"izgara": 7, "ocak": 4}; // Temas edilip P tuşuna basılırsa çalışan mobilyalar

                    if(pTusuMobilyalar.hasOwnProperty(temasEdilenMobilya)){ // Temas edilen mobilya yukarıdaki listede varsa

                        const mobilya = mobilyalar.find(mobilya => mobilya.name == temasEdilenMobilya); // Şuan temas edilen mobilyanın detaylarını çekiyoruz

                        if(pisirilebilenler[temasEdilenMobilya].includes(elimizdeki) && mobilya.kullanimda == false){ // Mobilya şuan kullanılmıyorsa ve elimizdeki ürün temas edilen mobilyada pişebilen bir şeyse

                            pisirmeSuresi = (mobilya.hazirlamaSuresi)*1000; // Mobilyanın ürünü pişirme/hazırlama süresi (saniye)

                            /* Ürünü Pişiriyoruz/Hazırlıyoruz */

                            mobilya.kullanimda = true; // Mobilya artık kullanılıyor
                            mobilya.kullanimBitis = new Date(simdikiZaman.getTime() + pisirmeSuresi); // Mobilya X tarihe kadar kullanılacak
                            mobilya.hazirlananUrun = elimizdeki; // Mobilyada hazırlanan ürün elimizdeki üründür

                            blokeEnvanter[mobilya.hazirlananUrun] += 1; // Hazırladığımız ürüne güvenlik amacıyla bloke koyuyoruz

                            // Mobilyanın çalışma sesini ayarlıyoruz ve çalıştırıyoruz
                            if(ayarlar["ses"] == true){
                                var mobilyaSound = new Audio(mobilya.sound);
                                mobilyaSound.volume = 0.3;
                                mobilyaSound.play();
                            }

                            mobilya.image = "images/animasyonlar/"+mobilya.type+"/"+mobilya.hazirlananUrun+"/"+mobilya.type+"-"+mobilya.hazirlananUrun+"-1.png"; // Mobilyanın çalışma anının ilk karesi
                            mobilyaAnimasyon("pisiyor", mobilya, {"sure": pisirmeSuresi, "urun": elimizdeki, "kareSayisi": 3}); // Mobilyanın çalışma animasyonu
                            
                            elineAl(0); // Elimizdeki ürünü bırakıyoruz
                            messageSound();

                            setTimeout(function() { // Hazırlama süresi tamamlanınca çalışacak kısım
                                
                                mobilya.kullanimBitis = "hazir"; // Mobilyadaki hazırlanan ürünün hazırlandığını belirtiyoruz
                                mobilya.image = "images/animasyonlar/"+mobilya.type+"/"+mobilya.hazirlananUrun+"/"+mobilya.type+"-"+mobilya.hazirlananUrun+"-"+pTusuMobilyalar[mobilya.type]+".png"; // Mobilyadaki ürünün hazır halini mobilyada gösteriyoruz

                                if(ayarlar["ses"] == true){mobilyaSound.pause(); zilSound();} // Mobilyanın çalışma sesini kapatıyoruz ve ürünün hazır olduğunu haber veren zil sesini çalıyoruz
                                                            
                            }, pisirmeSuresi);

                        }else if(mobilya.kullanimda == true && mobilya.kullanimBitis == "hazir"){ // Mobilya şuan kullanılıyorsa ve mobilyadaki ürün hazırsa

                            var hazirlandi = pisinceGelen[mobilya.hazirlananUrun]; // Verilen ürüne karşılık hazırlanan ürünü listemizden alıyoruz

                            envanter[hazirlandi] += 1; // Hazırladığımız ürünü arttırıyoruz
                            envanter[mobilya.hazirlananUrun] -= 1; // Kullandığımız ürünü eksiltiyoruz
                            blokeEnvanter[mobilya.hazirlananUrun] -= 1; // Kullandığımız ürünün blokesini kaldırıyoruz
                            mobilya.kullanimda = false; // Mobilya artık kullanılmıyor
                            mobilya.image = "images/mobilyalar/"+mobilya.type+".png"; // Mobilyayı ilk görüntüsüne geri döndürüyoruz

                            elineAl(hazirlandi); // Hazırladığımız ürünü elimize alıyoruz

                            surprizeSound(); // Mobilyadan ürünün alındığını belirten sesi çalıyoruz

                        }else{ // Mobilya şuan çalışıyorsa ve ürün henüz hazır değilse

                            disabledSound();

                        }

                    }else{ // Bu mobilya P tuşuyla çalışmıyorsa

                        disabledSound();

                    }

                    break;

            }
            
        }

    }

});

function gameLoop() { // Oyun döngüsü fonksiyonumuz

    document.getElementById("cash").innerHTML = (envanter['cash']-blokeEnvanter['cash']).toFixed(2); // Güncel paramızı gösteriyoruz
    document.getElementById("yildiz").innerHTML = (envanter['yildiz']-blokeEnvanter['yildiz']); // Güncel yıldızımızı gösteriyoruz

    arkaplaniCiz(); // Arka plan görselini sadece bir kez çiziyoruz

    for (var i = 0; i < mobilyalar.length; i++) { // Karakterimizin önünde gözüken mobilyaları çiziyoruz
        if (!mobilyalar[i].arkasindaGozukur) {mobilyaCiz(mobilyalar[i]);}
    }

    if (karakter.walking) { // Eğer karakterimiz şuan yürüyorsa 
        yurumeAnimasyonu(karakter); // Yürüdüğünü gösteren animasyonu çalıştırıyoruz
    } else { // Şuanda yürümüyorsa
        karakteriCiz(karakter); // Nefes aldığı animasyonu çalıştırıyoruz
    }

    for (var i = 0; i < mobilyalar.length; i++) { // Karakterimizin arkasında gözüken mobilyaları çiziyoruz
        if (mobilyalar[i].arkasindaGozukur) {mobilyaCiz(mobilyalar[i]);}
    }

}