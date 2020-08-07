const socket = io('/')

const videoGrid = document.getElementById('video-grid');

const myVideo = document.createElement('video');
myVideo.muted = true;

const myPeer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '3000'
  })

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

myPeer.on('open', id => {
    socket.emit('join-room', roomID, id); 
})

// socket.emit('join-room', roomID); 

socket.on('user-connected', userId => {
    console.log('kbhhhiijijj')
    connectToNewUser(userId);
});

const connectToNewUser = (userId) => {
    console.log(`New user connected with id ${userId}`)
};