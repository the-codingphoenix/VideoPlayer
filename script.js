const video = document.querySelector('video'); //selecting the video element itself
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const nextBtn = document.getElementById('next-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const speed = document.querySelector('.player-speed');
const fullscreenBtn = document.querySelector('.fullscreen');

// Array of video URLs
const videoPlaylist = [
    './200m-race.mp4',
    './relay-race.mp4',
    './women-100m.mp4'
];

let currentVideoIndex = 0;

// Play & Pause ----------------------------------- //
function showPlayIcon() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}

function showPauseIcon() {
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
}

function togglePlay() {
    //ternary statement
    video.paused 
    ? (video.play(), showPauseIcon())
    : (video.pause(), showPlayIcon());
}

// Event listeners for play&pause
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
// on video end, show play icon
video.addEventListener('ended', showPlayIcon);

// Progress Bar ---------------------------------- //
// Calculate display time format
function displayTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
}

// Update progress as video plays
function updateProgress() {
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
}

// Set video current time to progress range click position
function setProgress(e) {
    const newTime = e.offsetX / progressRange.offsetWidth;
    video.currentTime = newTime * video.duration;
}

// Event listeners for progress 
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);

// Volume Controls --------------------------- //
//change volume icon

function changeVolumeIcon(volume) {
    volumeIcon.className = 'fa-solid';
    if (volume === 0) {
        volumeIcon.classList.add('fa-volume-mute');
    } else if (volume <= 0.7) {
        volumeIcon.classList.add('fa-volume-down');
    } else {
        volumeIcon.classList.add('fa-volume-up');
    }
}
// Volume bar
function changeVolume(e) {
    let volume = e.offsetX / volumeRange.offsetWidth;
    volume = volume < 0.1 ? 0 : volume > 0.9 ? 1 : volume; // Rounding volume up or down
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;
    changeVolumeIcon(volume);
    // // change volume icon depending on volume
    // volumeIcon.className = '';
    // if (volume === 0) {
    //     volumeIcon.classList.add('fa-solid', 'fa-volume-off');
    // } else if (volume <= 0.7) {
    //     volumeIcon.classList.add('fa-solid', 'fa-volume-down');
    // } else {
    //     volumeIcon.classList.add('fa-solid', 'fa-volume-up');
    // }
}
// Mute/Unmute ---------------------------------- //
function toggleMute() {
    if (video.volume > 0) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = '0%';
        volumeIcon.className = 'fa-solid';
        volumeIcon.classList.add('fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
    } else {
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        changeVolumeIcon(lastVolume);
        volumeIcon.setAttribute('title', 'Unmute');
    }
}

//Event listeners for volume
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);

// Change Playback Speed -------------------- //
function changeSpeed() {
    video.playbackRate = speed.value;
}
// Event listener for playback speed
speed.addEventListener('change', changeSpeed);

// Fullscreen ------------------------------- //
function toggleFullscreen() {
    if (!document.fullscreenElement &&    // Standard syntax
        !document.webkitFullscreenElement && // Safari/Chrome
        !document.mozFullScreenElement && // Firefox
        !document.msFullscreenElement) {  // IE/Edge
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) { // Safari/Chrome
            video.webkitRequestFullscreen();
        } else if (video.mozRequestFullScreen) { // Firefox
            video.mozRequestFullScreen();
        } else if (video.msRequestFullscreen) { // IE/Edge
            video.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // Safari/Chrome
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
}
// Event listener for fullscreen control
fullscreenBtn.addEventListener('click', toggleFullscreen);
