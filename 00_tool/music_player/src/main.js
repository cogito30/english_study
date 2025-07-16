const fileInput = document.getElementById('fileInput');
const currentTrackEl = document.getElementById('currentTrack');
const playlistEl = document.getElementById('playlist');
const audio = document.getElementById('audio');

const playPauseBtn = document.getElementById('playPause');
const rewindBtn = document.getElementById('rewind');
const forwardBtn = document.getElementById('forward');
const toggleLoopBtn = document.getElementById('toggleLoop');
const speedControl = document.getElementById('speedControl');
const prevTrackBtn = document.getElementById('prevTrack');
const nextTrackBtn = document.getElementById('nextTrack');

let playlist = [];
let currentIndex = -1;

fileInput.addEventListener('change', (e) => {
    playlist = Array.from(e.target.files);
    currentIndex = 0;
    renderPlaylist();
    if (playlist.length > 0) {
    playTrack(currentIndex);
    }
});

function renderPlaylist() {
    playlistEl.innerHTML = '';
    playlist.forEach((file, index) => {
    const li = document.createElement('li');
    li.textContent = file.name;
    if (index === currentIndex) li.classList.add('active');
    li.addEventListener('click', () => {
        playTrack(index);
    });
    playlistEl.appendChild(li);
    });
}

function playTrack(index) {
    if (index < 0 || index >= playlist.length) return;
    currentIndex = index;
    audio.src = URL.createObjectURL(playlist[currentIndex]);
    currentTrackEl.textContent = `🎵 재생 중: ${playlist[currentIndex].name}`;
    audio.play();
    renderPlaylist();
}

playPauseBtn.addEventListener('click', () => {
    if (!audio.src) return;
    if (audio.paused) {
    audio.play();
    } else {
    audio.pause();
    }
});

rewindBtn.addEventListener('click', () => {
    audio.currentTime = Math.max(0, audio.currentTime - 3);
});

forwardBtn.addEventListener('click', () => {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 3);
});

toggleLoopBtn.addEventListener('click', () => {
    audio.loop = !audio.loop;
    toggleLoopBtn.textContent = `🔁 반복: ${audio.loop ? 'On' : 'Off'}`;
});

speedControl.addEventListener('change', () => {
    audio.playbackRate = parseFloat(speedControl.value);
});

prevTrackBtn.addEventListener('click', () => {
    if (playlist.length > 0) {
    playTrack((currentIndex - 1 + playlist.length) % playlist.length);
    }
});

nextTrackBtn.addEventListener('click', () => {
    if (playlist.length > 0) {
    playTrack((currentIndex + 1) % playlist.length);
    }
});

// 자동 다음곡 재생
audio.addEventListener('ended', () => {
    if (!audio.loop) {
    nextTrackBtn.click();
    }
});

// 키보드 단축키
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
    e.preventDefault();
    playPauseBtn.click();
    } else if (e.code === 'ArrowLeft') {
    rewindBtn.click();
    } else if (e.code === 'ArrowRight') {
    forwardBtn.click();
    } else if (e.code === 'KeyL') {
    toggleLoopBtn.click();
    } else if (e.code === 'ArrowUp') {
    prevTrackBtn.click();
    } else if (e.code === 'ArrowDown') {
    nextTrackBtn.click();
    }
});