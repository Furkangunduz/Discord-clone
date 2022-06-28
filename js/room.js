const voice_channels = document.querySelectorAll(".voice-channel");
const coll = document.getElementsByClassName("server-category");

let queryString = window.location.search
let urlParams = new URLSearchParams(queryString)
let userName = urlParams.get("username");
if (!userName) window.location = "lobby.html"

voice_channels.forEach(voicechannel => {
  voicechannel.addEventListener("click", (e) => {
    let roomCode = e.currentTarget.id;
    window.location = `videochat.html?username=${userName}&room=${roomCode}`
  })
});

for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display !== "block") {
      content.style.display = "block";
    } else {
      content.style.display = "none";
    }
  });
}

// let displayFrame = document.getElementById('stream_box')
// let videoFrames = document.getElementsByClassName('video_container')
// let userIdInDisplayFrame = null;

// let expandVideoFrame = (e) => {
//   let child = displayFrame.children[0]
//   if (child) {
//     document.getElementById('streams_container').appendChild(child)
//   }

//   displayFrame.style.display = 'block'
//   displayFrame.appendChild(e.currentTarget)
//   userIdInDisplayFrame = e.currentTarget.id

//   for (let i = 0; videoFrames.length > i; i++) {
//     if (videoFrames[i].id != userIdInDisplayFrame) {
//       videoFrames[i].style.height = '100px'
//       videoFrames[i].style.width = '100px'
//     }
//   }

// }

// for (let i = 0; videoFrames.length > i; i++) {
//   videoFrames[i].addEventListener('click', expandVideoFrame)
// }


// let hideDisplayFrame = () => {
//   userIdInDisplayFrame = null
//   displayFrame.style.display = null

//   let child = displayFrame.children[0]
//   document.getElementById('streams_container').appendChild(child)

//   for (let i = 0; videoFrames.length > i; i++) {
//     videoFrames[i].style.height = '300px'
//     videoFrames[i].style.width = '300px'
//   }
// }

// displayFrame.addEventListener('click', hideDisplayFrame)