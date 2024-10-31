const audio = document.getElementById("audio");
const playPauseButton = document.getElementById("play-pause");
const albumArt = document.querySelector(".album-art");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");

const songs = [
    { title: "naal naal", artist:"prabh gill ", src: "song1.mp3", cover: "song1.jpeg" },
    { title: "Kasam", artist: "Garry Sandhu", src: "song2.mp3", cover: "song2.jfif" },
    { title: "mohabbat krne chla", artist: "Arijeet singh", src: "song3.mp3", cover: "song3.jfif" },
    { title: "60MUKADME", artist: "Masoom Sharma", src: "song4.mp3", cover: "song4.jfif" },
    { title: "Sifar Safar", artist: "Karan Aujla", src: "song5.mp3", cover: "song5.jfif" },
    

];


let songIndex = 0;

function loadSong(song) {
    document.getElementById("title").textContent = song.title;
    document.getElementById("artist").textContent = song.artist;
    audio.src = song.src;
    document.getElementById("album-cover").src = song.cover;
    audio.pause();
}

function playSong() {
    audio.play();
    albumArt.style.animationPlayState = "running";
    playPauseButton.textContent = "⏸️";
}

function pauseSong() {
    audio.pause();
    albumArt.style.animationPlayState = "paused";
    playPauseButton.textContent = "▶️";
}

function togglePlayPause() {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress() {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percent}%`;
}

function setProgress(e) {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);

loadSong(songs[songIndex]);
