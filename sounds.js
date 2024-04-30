/*
==========================================================================
Dosya Adı: sounds.js
Açıklama: Bu JavaScript dosyası Enes Babekoğlu tarafından oluşturulmuştur.
Oluşturma Tarihi: 25 Nisan 2024
Versiyon: 1.0
Telif Hakkı (c) 2024 Enes Babekoğlu. Tüm hakları saklıdır.
  
İletişim: enesbabekoglu@gmail.com
==========================================================================
*/

/* 
Bu dosyamız ses dosyalarının çağırıldığı fonksiyonları barındırmaktadır.
*/

var backgroundMusic = new Audio("sounds/music.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

// Ses dosyaları ve ses çalma işlevleri
var walkSounds = ["sounds/walk1.wav", "sounds/walk2.wav"];

var walkAudios = walkSounds.map(function(sound) {
    var audio = new Audio(sound);
    audio.loop = true;
    audio.volume = 0.3;
    return audio;
});

function playWalkSounds() {
    if(ayarlar["ses"] == true){walkAudios.forEach(function(audio, index){audio.play();});}
}

function stopWalkSounds() {
    walkAudios.forEach(function(audio) {audio.pause();audio.currentTime = 0;});
}

function disabledSound(){
    var sound = new Audio("sounds/lock.wav");
    if(ayarlar["ses"] == true){sound.play();}
}

function paySound(){
    var sound = new Audio("sounds/cash.wav");
    if(ayarlar["ses"] == true){sound.play();}
}

function cashSound(){
    var sound = new Audio("sounds/odeme-sesi.wav");
    if(ayarlar["ses"] == true){sound.play();}
}

function messageSound(){
    var sound = new Audio("sounds/new-message.wav");
    if(ayarlar["ses"] == true){sound.play();}
}

function yeniSiparisSound(){
    var sound = new Audio("sounds/yeni-siparis.wav");
    if(ayarlar["ses"] == true){sound.play();}
}

function redSound(){
    var sound = new Audio("sounds/reddetme.wav");
    if(ayarlar["ses"] == true){sound.play();}
}

function onaySound(){
    var sound = new Audio("sounds/onaylama.wav");
    if(ayarlar["ses"] == true){sound.play();}
}

function mouseOverSound(){
    var sound = new Audio("sounds/touch-1.wav");
    if(ayarlar["ses"] == true){sound.play();}
}

function zilSound(){
    var sound = new Audio("sounds/zil.wav");;
    if(ayarlar["ses"] == true){sound.play();}
}

function surprizeSound(){
    var sound = new Audio("sounds/surprize.mp3");
    if(ayarlar["ses"] == true){sound.play();}
}

function buzdolabiAcSound(){
    var sound = new Audio("sounds/buzdolabi-ac.wav");
    if(ayarlar["ses"] == true){sound.play();}
}

function buzdolabiKapatSound(){
    var sound = new Audio("sounds/buzdolabi-kapat.wav");
    if(ayarlar["ses"] == true){sound.play();}
}