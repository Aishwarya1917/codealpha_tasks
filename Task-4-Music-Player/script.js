/* =========================================================
   MUSIC PLAYER
========================================================= */

// Audio element
const audio = document.getElementById("audio");

// Player buttons
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

// Song information
const songTitle = document.getElementById("song-title");
const artistName = document.getElementById("artist-name");

// Time information
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

// Controls
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

// Playlist
const playlist = document.getElementById("playlist");
const playlistCount = document.getElementById("playlist-count");

// Album disc
const albumDisc = document.querySelector(".album-disc");

const albumCover = document.getElementById("album-cover");
/* =========================================================
   SONG DATA
========================================================= */

const songs = [
    {
        title: "Memories",
        artist: "Mixkit",
        src: "songs/memories.mp3",
        cover: "images/memories.jpg"
    },
    {
        title: "One More Dance",
        artist: "Arulo",
        src: "songs/one-more-dance.mp3",
        cover: "images/one-more-dance.jpg"
    },
    {
        title: "Beautiful Dream",
        artist: "Diego Nava",
        src: "songs/beautiful-dream.mp3",
        cover: "images/beautiful-dream.jpg"
    }
];

let currentSong = 0;


/* =========================================================
   LOAD SONG
========================================================= */

function loadSong(index) {

    currentSong = index;

    const song = songs[currentSong];

    // Update song information
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;

    // Load audio file
    audio.src = song.src;
     albumCover.src = song.cover;
    // Reset progress
    progress.value = 0;

    currentTime.textContent = "0:00";
    duration.textContent = "0:00";

    // Update playlist
    updatePlaylist();
}


/* =========================================================
   PLAY SONG
========================================================= */

function playSong() {

    audio.play();

    playBtn.textContent = "❚❚";
    playBtn.setAttribute("aria-label", "Pause");

    albumDisc.classList.add("playing");
    document.body.classList.add("music-playing");
}


/* =========================================================
   PAUSE SONG
========================================================= */

function pauseSong() {

    audio.pause();

    playBtn.textContent = "▶";
    playBtn.setAttribute("aria-label", "Play");

    albumDisc.classList.remove("playing");
    document.body.classList.remove("music-playing");
}


/* =========================================================
   PLAY / PAUSE BUTTON
========================================================= */

playBtn.addEventListener("click", () => {

    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }

});


/* =========================================================
   NEXT SONG
========================================================= */

function nextSong() {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    playSong();
}

nextBtn.addEventListener("click", nextSong);


/* =========================================================
   PREVIOUS SONG
========================================================= */

function previousSong() {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    playSong();
}

prevBtn.addEventListener("click", previousSong);


/* =========================================================
   SONG ENDS → PLAY NEXT
========================================================= */

audio.addEventListener("ended", () => {

    nextSong();

});


/* =========================================================
   AUDIO DURATION
========================================================= */

audio.addEventListener("loadedmetadata", () => {

    duration.textContent = formatTime(audio.duration);

    progress.max = audio.duration;

});


/* =========================================================
   UPDATE PROGRESS
========================================================= */

audio.addEventListener("timeupdate", () => {

    progress.value = audio.currentTime;

    currentTime.textContent =
        formatTime(audio.currentTime);

});


/* =========================================================
   PROGRESS BAR SEEK
========================================================= */

progress.addEventListener("input", () => {

    audio.currentTime = progress.value;

});


/* =========================================================
   VOLUME CONTROL
========================================================= */

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});

// Set initial volume
audio.volume = volume.value;


/* =========================================================
   FORMAT TIME
========================================================= */

function formatTime(time) {

    if (isNaN(time)) {
        return "0:00";
    }

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
}


/* =========================================================
   CREATE PLAYLIST
========================================================= */

function createPlaylist() {

    playlist.innerHTML = "";

    playlistCount.textContent =
        `${songs.length} Songs`;


    songs.forEach((song, index) => {

        const songItem =
            document.createElement("div");

        songItem.classList.add("song-item");


        // Highlight current song
        if (index === currentSong) {
            songItem.classList.add("active");
        }


       songItem.innerHTML = `
    <img
        class="playlist-cover"
        src="${song.cover}"
        alt="${song.title} cover"
    >

    <div class="song-number">
        ${String(index + 1).padStart(2, "0")}
    </div>

    <div class="song-info">

        <div class="song-title">
            ${song.title}
        </div>

        <div class="song-artist">
            ${song.artist}
        </div>

    </div>

    <div class="song-play">
        ▶
    </div>
`;


        // Click playlist song
        songItem.addEventListener("click", () => {

            currentSong = index;

            loadSong(currentSong);

            playSong();

        });


        playlist.appendChild(songItem);

    });

}


/* =========================================================
   UPDATE PLAYLIST
========================================================= */

function updatePlaylist() {

    document
        .querySelectorAll(".song-item")
        .forEach((item, index) => {

            item.classList.toggle(
                "active",
                index === currentSong
            );

        });

}


/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

document.addEventListener("keydown", (event) => {


    // Space → Play / Pause
    if (
        event.code === "Space" &&
        event.target.tagName !== "INPUT"
    ) {

        event.preventDefault();

        if (audio.paused) {
            playSong();
        } else {
            pauseSong();
        }

    }


    // Right Arrow → Next
    if (event.code === "ArrowRight") {

        nextSong();

    }


    // Left Arrow → Previous
    if (event.code === "ArrowLeft") {

        previousSong();

    }

});


/* =========================================================
   INITIALIZE PLAYER
========================================================= */

loadSong(currentSong);

createPlaylist();