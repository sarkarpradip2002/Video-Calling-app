const socket=io('/');
const videoGrid=document.getElementById('video-grid');

const peer=new Peer(undefined,{
    host : '/',
    port : '3001',
})

const myVideo=document.createElement('video');
myVideo.muted=true;

navigator.mediaDevices.getUserMedia({
    video : true,
    audio : true,
}).then(stream =>{
Addvideostream(myVideo,stream);

    peer.on('call',function(call){
     call.answer(stream);
     const video=document.createElement('video');
     call.on('stream',userVideoStream=>{
        Addvideostream(video,userVideoStream);
    })
    })

socket.on('user-connected',userId=>{
    ConnectNewUser(userId,stream);
})
})

peer.on('open',(id)=>{
    socket.emit('join-room', ROOM_ID ,id);

})

ConnectNewUser=(userId,stream)=>{
const call=peer.call(userId,stream);
const video=document.createElement('video');
call.on('stream',userVideoStream=>{
    Addvideostream(video,userVideoStream);
})
call.on('close',()=>{
    video.remove();
})
}

   Addvideostream=(video,stream)=>{
       video.srcObject=stream;
       video.addEventListener('loadedmetadata',()=>{
           video.play();
       })
       videoGrid.appendChild(video);
       console.log('connected....');
   }
