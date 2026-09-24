/* =========================================
   EKAL PIXEL WORLD
========================================= */

const CORRECT_PIN = "12345";

let enteredPin = "";




/* =========================================
   ELEMENTS
========================================= */

const pinScreen = document.getElementById("pinScreen");
const introScreen = document.getElementById("introScreen");
const mainScreen = document.getElementById("mainScreen");

const pinCharacter = document.getElementById("pinCharacter");
const pinTitle = document.getElementById("pinTitle");
const pinMessage = document.getElementById("pinMessage");

const pinDots = document.querySelectorAll("#pinDots span");
const pinButtons = document.querySelectorAll(".pin-button[data-number]");
const deletePin = document.getElementById("deletePin");

const introCharacter = document.getElementById("introCharacter");

const wordButtons = document.querySelectorAll(".word-button");
const transitionScreen =
    document.getElementById("transitionScreen");
    const memoryIntro =
    document.getElementById("memoryIntro");

const memoryTyping =
    document.getElementById("memoryTyping");

const memoryText =
    "HALO, INI KITA BIKIN BUAT ISI FOTO-FOTO KEBERSAMAAN KITA ♡";


function startMemoryTyping() {

    memoryTyping.textContent = "";

    let index = 0;

    const typing = setInterval(() => {

        memoryTyping.textContent += memoryText[index];
        index++;

        if (index >= memoryText.length) {

            clearInterval(typing);

            setTimeout(() => {
                memoryIntro.classList.remove("show");
                memoryIntro.classList.add("hide");
            }, 2000);
            document.querySelector(".welcome-section").scrollIntoView({
    behavior: "smooth",
    block: "start"
});

        }

    }, 70);
}

continueButton.addEventListener(
    "click",
    () => {

        if (continueButton.disabled) {
            return;
        }

        // sembunyikan intro
        introScreen.classList.add("hidden");

        // tampilkan animasi bunga + love
        transitionScreen.classList.remove("hidden");

        // tunggu animasi selesai
        setTimeout(() => {

    transitionScreen.classList.add("hidden");

    mainScreen.classList.remove("hidden");

    memoryIntro.classList.add("show");

    startMemoryTyping();

}, 3500);

    }
);

const introText = document.getElementById("introText");
const introHint = document.getElementById("introHint");

const playButton = document.getElementById("playButton");

const whatsappButton = document.getElementById("whatsappButton");


/* =========================================
   PIN DOTS
========================================= */

function updatePinDots() {

    pinDots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index < enteredPin.length
        );

    });
}


/* =========================================
   ADD NUMBER
========================================= */

function addNumber(number) {

    if (enteredPin.length >= 5) {
        return;
    }

    enteredPin += number;

    updatePinDots();

    if (enteredPin.length === 5) {
        checkPin();
    }
}


/* =========================================
   DELETE NUMBER
========================================= */

function removeNumber() {

    if (enteredPin.length === 0) {
        return;
    }

    enteredPin =
        enteredPin.slice(0, -1);

    updatePinDots();
}


/* =========================================
   CHECK PIN
========================================= */

function checkPin() {

    if (enteredPin === CORRECT_PIN) {

        correctPin();

    } else {

        wrongPin();

    }
}


/* =========================================
   CORRECT PIN
========================================= */

function correctPin() {

    pinTitle.textContent =
        "yayyy! ♡";

    pinMessage.textContent =
        "nahh passwordnya benar ✦";

    pinCharacter.classList.remove(
        "pin-angry"
    );

    pinCharacter.classList.add(
        "happy"
    );

    createPixelBurst();

    setTimeout(() => {

        pinScreen.classList.add("hidden");

        introScreen.classList.remove("hidden");

        introCharacter.classList.add("happy");

    }, 1200);
}


/* =========================================
   WRONG PIN
========================================= */

function wrongPin() {

    pinTitle.textContent =
        "salah! 😠";

    pinMessage.textContent =
        "kamu siapaaa!";

    pinCharacter.classList.add(
        "pin-angry"
    );

    pinScreen.classList.add(
        "pin-error"
    );

    createAngryParticles();

    setTimeout(() => {

        pinScreen.classList.remove(
            "pin-error"
        );

    }, 500);

    setTimeout(() => {

        enteredPin = "";

        updatePinDots();

        pinCharacter.classList.remove(
            "pin-angry"
        );

        pinTitle.textContent =
            "secret pin ♡";

        pinMessage.textContent =
            "try again, little pixel friend...";

    }, 900);
}


/* =========================================
   PIN BUTTONS
========================================= */

pinButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            addNumber(
                button.dataset.number
            );

        }
    );

});

deletePin.addEventListener(
    "click",
    removeNumber
);


/* =========================================
   KEYBOARD
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            pinScreen.classList.contains(
                "hidden"
            )
        ) {
            return;
        }

        if (/^[0-9]$/.test(event.key)) {

            addNumber(event.key);

        }

        if (
            event.key === "Backspace" ||
            event.key === "Delete"
        ) {

            removeNumber();

        }

    }
);


/* =========================================
   FIVE WORD BUTTONS
========================================= */

let clickedWords =
    new Set();

const wordMessages = [

    "hallo,kamu kamu sudah sampai ♡",

    "selamat datang di dunia kecil kita ✦",

    "disini ada cerita tentang kita...",

    "beberapa moment layak untuk di simpan ♡",

    "yuk kita mulai ✨"

];


wordButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const index =
                Number(
                    button.dataset.word
                );

            clickedWords.add(index);

            button.classList.add(
                "clicked"
            );


            /* character reaction */

            introCharacter.classList.remove(
                "react"
            );

            void introCharacter.offsetWidth;

            introCharacter.classList.add(
                "react"
            );


            /* happy face */

            introCharacter.classList.add(
                "happy"
            );


            /* change text */

            introText.textContent =
                wordMessages[index];

            introHint.textContent =
                "something changed... ✦";


            /* restart text animation */

            introText.style.animation =
                "none";

            void introText.offsetWidth;

            introText.style.animation =
                "textPop 0.45s ease";


            /* particles */

            createSmallBurst(button);


            /* special reaction */

            if (index === 0) {

                introHint.textContent =
                    "the little world is waking up ♡";

            }

            if (index === 1) {

                introHint.textContent =
                    "you discovered something ✦";

            }

            if (index === 2) {

                introHint.textContent =
                    "don't stop now... ✨";

            }

            if (index === 3) {

                introHint.textContent =
                    "the character is happy! ♡";

                createPixelBurst();

            }

            if (index === 4) {

                introHint.textContent =
                    "one last step... ✦";

            }


            /* all clicked */

            if (
                clickedWords.size === 5
            ) {

                unlockContinue();

            }

        }
    );

});


/* =========================================
   UNLOCK CONTINUE
========================================= */

function unlockContinue() {

    continueButton.disabled =
        false;

    introText.textContent =
        "ayoo masuk ajaaa! ♡";

    introHint.textContent =
        "the door is ready to open ✦";

    introCharacter.classList.add(
        "happy"
    );

    createPixelBurst();

}


/* =========================================
   CONTINUE
========================================= */

continueButton.addEventListener(
    "click",
    () => {

        if (
            continueButton.disabled
        ) {
            return;
        }

        introScreen.classList.add(
            "hidden"
        );

        mainScreen.classList.remove(
            "hidden"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        createPixelBurst();

    }
);


/* =========================================
   PIXEL BURST
========================================= */

function createPixelBurst() {

    const symbols = [
        "✦",
        "♡",
        "✧",
        "★",
        "·"
    ];

    for (
        let i = 0;
        i < 28;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );

        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        particle.style.position =
            "fixed";

        particle.style.left =
            "50%";

        particle.style.top =
            "50%";

        particle.style.zIndex =
            "9999";

        particle.style.pointerEvents =
            "none";

        particle.style.fontSize =
            (12 +
            Math.random() * 20) +
            "px";

        particle.style.color =
            Math.random() > 0.5
                ? "#ff8fbd"
                : "#73caff";

        document.body.appendChild(
            particle
        );


        const angle =
            Math.random() *
            Math.PI * 2;

        const distance =
            80 +
            Math.random() * 220;

        const x =
            Math.cos(angle) *
            distance;

        const y =
            Math.sin(angle) *
            distance;


        particle.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0)",
                    opacity: 0
                },

                {
                    transform:
                        "translate(-50%, -50%) scale(1)",
                    opacity: 1,
                    offset: 0.2
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        )
                        rotate(180deg)
                        scale(0.6)`,

                    opacity: 0
                }
            ],
            {
                duration:
                    900 +
                    Math.random() * 600,

                easing:
                    "cubic-bezier(.2,.8,.2,1)"
            }
        ).onfinish = () => {

            particle.remove();

        };

    }

}


/* =========================================
   SMALL BURST
========================================= */

function createSmallBurst(button) {

    const rect =
        button.getBoundingClientRect();

    for (
        let i = 0;
        i < 10;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );

        particle.textContent =
            i % 2 === 0
                ? "✦"
                : "♡";

        particle.style.position =
            "fixed";

        particle.style.left =
            rect.left +
            rect.width / 2 +
            "px";

        particle.style.top =
            rect.top +
            rect.height / 2 +
            "px";

        particle.style.zIndex =
            "9999";

        particle.style.pointerEvents =
            "none";

        particle.style.color =
            i % 2 === 0
                ? "#ff8fbd"
                : "#73caff";

        particle.style.fontSize =
            "18px";


        const x =
            (Math.random() - 0.5) *
            120;

        const y =
            (Math.random() - 0.5) *
            120;


        particle.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0)",
                    opacity: 0
                },

                {
                    transform:
                        "translate(-50%, -50%) scale(1)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        )
                        scale(0)`,

                    opacity: 0
                }
            ],
            {
                duration: 650,
                easing: "ease-out"
            }
        ).onfinish = () => {

            particle.remove();

        };


        document.body.appendChild(
            particle
        );

    }

}


/* =========================================
   ANGRY PARTICLES
========================================= */

function createAngryParticles() {

    const symbols = [
        "!",
        "×",
        "💢"
    ];

    for (
        let i = 0;
        i < 8;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );

        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];

        particle.style.position =
            "fixed";

        particle.style.left =
            "50%";

        particle.style.top =
            "38%";

        particle.style.zIndex =
            "9999";

        particle.style.pointerEvents =
            "none";

        particle.style.fontSize =
            "24px";

        particle.style.color =
            "#ff6f9f";

        document.body.appendChild(
            particle
        );


        const x =
            (Math.random() - 0.5) *
            180;

        const y =
            (Math.random() - 0.5) *
            130;


        particle.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0)",
                    opacity: 0
                },

                {
                    transform:
                        "translate(-50%, -50%) scale(1)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        )
                        scale(0)`,

                    opacity: 0
                }
            ],
            {
                duration: 650,
                easing: "ease-out"
            }
        ).onfinish = () => {

            particle.remove();

        };

    }

}


/* =========================================
   MUSIC PLAYLIST
========================================= */

const myAudio = document.getElementById("myAudio");
const musicBar = document.querySelector(".music-bar span");

const currentSongTitle =
    document.getElementById("currentSongTitle");

const currentSongArtist =
    document.getElementById("currentSongArtist");

const playlistElement =
    document.getElementById("playlist");

const prevButton =
    document.getElementById("prevButton");

const nextButton =
    document.getElementById("nextButton");

const shuffleButton =
    document.getElementById("shuffleButton");

const repeatButton =
    document.getElementById("repeatButton");


/* =========================================
   DAFTAR LAGU
========================================= */

const songs = [   
    {
        title: "Jatuh Suka",
        artist: "TULUS",
        file: "music.mp3.mp3"
    },
    {
        title: "Kahitna",
        artist: "Kahitna",
        file: "kahitna.mp3.mp3"
    },
    {
        title: "Sal Priadi",
        artist: "Sal Priadi",
        file: "salpriadi.mp3.mp3"
    },
    {
        title: "Album Tulus",
        artist: "TULUS",
        file: "albumtulus.mp3.mp3"
    },
    {
        title: "Oasis",
        artist: "Oasis",
        file: "oasis.mp3.mp3"
    }
];
   



let currentSong = 0;
let shuffle = false;
let repeat = false;


/* =========================================
   LOAD LAGU
========================================= */

function loadSong(index, autoPlay = false) {

    if (!songs[index]) {
        return;
    }

    currentSong = index;

    const song = songs[currentSong];

    myAudio.src = song.file;

    currentSongTitle.textContent =
        song.title;

    currentSongArtist.textContent =
        song.artist;

    musicBar.style.width = "0%";

    renderPlaylist();

    if (autoPlay) {

        myAudio.play()
            .then(() => {
                playButton.textContent = "❚❚";
            })
            .catch(() => {
                playButton.textContent = "▶";
            });

    } else {

        playButton.textContent = "▶";

    }
}


/* =========================================
   TAMPILKAN PLAYLIST
========================================= */

function renderPlaylist() {

    playlistElement.innerHTML = "";

    songs.forEach((song, index) => {

        const item =
            document.createElement("button");

        item.type = "button";

        item.className =
            "playlist-item";

        if (index === currentSong) {
            item.classList.add("active");
        }

        item.innerHTML = `
            <span class="playlist-number">
                ${index + 1}
            </span>

            <span class="playlist-song">
                <strong>${song.title}</strong>
                <small>${song.artist}</small>
            </span>

            <span class="playlist-play">
                ${index === currentSong && !myAudio.paused ? "❚❚" : "▶"}
            </span>
        `;

        item.addEventListener("click", () => {

            loadSong(index, true);

        });

        playlistElement.appendChild(item);

    });
}


/* =========================================
   PLAY / PAUSE
========================================= */

playButton.addEventListener("click", async () => {

    if (myAudio.paused) {

        try {
            await myAudio.play();

            playButton.textContent = "❚❚";

            renderPlaylist();

        } catch (error) {

            console.error("Gagal memutar lagu:", error);

            playButton.textContent = "▶";

        }

    } else {

        myAudio.pause();

        playButton.textContent = "▶";

        renderPlaylist();

    }

});

/* =========================================
   PROGRESS BAR
========================================= */

myAudio.addEventListener("timeupdate", () => {

    if (!myAudio.duration) {
        return;
    }

    const percentage =
        (myAudio.currentTime /
        myAudio.duration) * 100;

    musicBar.style.width =
        percentage + "%";

});


/* =========================================
   LAGU SELESAI
========================================= */

myAudio.addEventListener("ended", () => {

    if (repeat) {

        loadSong(currentSong, true);
        return;

    }

    nextSong();

});


/* =========================================
   NEXT
========================================= */

function nextSong() {

    let nextIndex;

    if (shuffle && songs.length > 1) {

        do {

            nextIndex =
                Math.floor(
                    Math.random() * songs.length
                );

        } while (nextIndex === currentSong);

    } else {

        nextIndex =
            (currentSong + 1) % songs.length;

    }

    loadSong(nextIndex, true);

}


/* =========================================
   PREVIOUS
========================================= */

function previousSong() {

    const previousIndex =
        (currentSong - 1 + songs.length)
        % songs.length;

    loadSong(previousIndex, true);

}


/* =========================================
   BUTTON CONTROLS
========================================= */

nextButton.addEventListener(
    "click",
    nextSong
);

prevButton.addEventListener(
    "click",
    previousSong
);


shuffleButton.addEventListener(
    "click",
    () => {

        shuffle = !shuffle;

        shuffleButton.classList.toggle(
            "active",
            shuffle
        );

    }
);


repeatButton.addEventListener(
    "click",
    () => {

        repeat = !repeat;

        repeatButton.classList.toggle(
            "active",
            repeat
        );

    }
);
loadSong(0);


/* =========================================




/* ========================================= 
    FOTO KITA 
========================================= */ 
 
fotoKitaButton.addEventListener("click", () => { 
    fotoKitaSection.classList.remove("hidden"); 
 
    loadPhotos(); 
 
    fotoKitaSection.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
    }); 
});
/* =========================================
    PHOTO PREVIEW
========================================= */

const photoInput = document.getElementById("photoInput");
const uploadStatus = document.getElementById("uploadStatus");

photoInput.addEventListener("change", () => {

    const file = photoInput.files[0];

    if (!file) {
        return;
    }

    if (!file.type.startsWith("image/")) {
        uploadStatus.textContent = "pilih file gambar ya ♡";
        photoInput.value = "";
        return;
    }

    const previewUrl = URL.createObjectURL(file);

    uploadStatus.innerHTML = `
        <div class="photo-card">
            <img src="${previewUrl}" alt="Preview foto">
        </div>

        <p>foto siap dikirim ♡</p>
    `;
});

/* =========================================
    UPLOAD PHOTO TO SUPABASE
========================================= */

const uploadPhotoButton =
    document.getElementById("uploadPhotoButton");

uploadPhotoButton.addEventListener("click", async () => {

    const file = photoInput.files[0];

    if (!file) {
        uploadStatus.textContent = "pilih foto dulu ya ♡";
        return;
    }

    uploadPhotoButton.disabled = true;
    uploadPhotoButton.textContent = "mengirim... ♡";

    const fileName =
        Date.now() + "-" +
        Math.random().toString(36).substring(2, 8) +
        "-" +
        file.name;

    const { error } = await supabaseClient
        .storage
        .from("memory-photos")
        .upload(fileName, file);

    if (error) {
        console.error(error);

        uploadStatus.textContent =
            "foto gagal dikirim :(";

        uploadPhotoButton.disabled = false;
        uploadPhotoButton.textContent =
            "♡ KIRIM FOTO ♡";

        return;
    }

    uploadStatus.textContent =
        "foto berhasil dikirim ♡";

    photoInput.value = "";

    uploadPhotoButton.disabled = false;
    uploadPhotoButton.textContent =
        "♡ KIRIM FOTO ♡";
});

/* =========================================
   LOAD SEMUA FOTO DARI SUPABASE
========================================= */

async function loadPhotos() {

    const photoGallery =
        document.getElementById("photoGallery");

    photoGallery.innerHTML =
        "<p>memuat foto... ♡</p>";

    const { data, error } =
        await supabaseClient
            .storage
            .from("memory-photos")
            .list("", {
                limit: 1000,
                sortBy: {
                    column: "created_at",
                    order: "desc"
                }
            });

    if (error) {
        console.error("Gagal mengambil foto:", error);

        photoGallery.innerHTML =
            "<p>gagal memuat foto :(</p>";

        return;
    }

    photoGallery.innerHTML = "";

    if (!data || data.length === 0) {

        photoGallery.innerHTML =
            "<p>belum ada foto ♡</p>";

        return;
    }

    data.forEach((file) => {

        const { data: publicUrlData } =
            supabaseClient
                .storage
                .from("memory-photos")
                .getPublicUrl(file.name);

        const photoCard =
            document.createElement("div");

        photoCard.className = "photo-card";

        photoCard.innerHTML = `
            <img
                src="${publicUrlData.publicUrl}"
                alt="Foto kenangan"
                loading="lazy"
            >
        `;

        photoGallery.appendChild(photoCard);
    });
}

/* =========================================
   WHATSAPP
========================================= */

const whatsappNumber =
    "082138807612";

whatsappButton.href =
    "https://wa.me/" +
    whatsappNumber;


/* =========================================
   START
========================================= */

updatePinDots();

console.log(
    "♡ Ekal Pixel World loaded ♡"
);


const themeToggle = document.getElementById("themeToggle");


/* =========================================
   SUPABASE
========================================= */

const SUPABASE_URL = "https://tkfcgzodifasupydtgkf.supabase.co";
const SUPABASE_KEY = "sb_publishable_D9UdWeIWhQa6dEF5vJa29g_-8nkD6Fa";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("♡ Supabase connected ♡");