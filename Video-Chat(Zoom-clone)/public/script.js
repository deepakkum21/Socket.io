const socket = io('/')

const videoGrid = document.getElementById('video-grid');

const myVideo = document.createElement('video');
myVideo.muted = true;

let myVideoStream;

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
})

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(myVideo);
}

socket.emit('join-room', roomID); 

socket.on('user-connected', roomID => {
    console.log('kbhhhiijijj')
    connectToNewUser();
});

const connectToNewUser = () => {
    console.log('New user connected')
};