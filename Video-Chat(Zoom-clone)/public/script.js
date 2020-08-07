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

    myPeer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video , userVideoStream)
        })
    })

    socket.on('user-connected', userId => {
        connectToNewUser(userId, stream);
    });
})

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video);
}

myPeer.on('open', id => {
    socket.emit('join-room', roomID, id);
})

// socket.emit('join-room', roomID); 



const connectToNewUser = (userId, stream) => {
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
};