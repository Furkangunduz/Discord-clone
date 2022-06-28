const voice_channels = document.querySelectorAll(".voice-channel");

voice_channels.forEach(voicechannel => {
    voicechannel.addEventListener("click", (e) => {
        let roomCode = e.currentTarget.id;
        setTimeout(() => {
        }, 1000)
        window.location = `videochat.html?username=${userName}&room=${roomCode}`
    })
});
let cameraButton = document.getElementById("camera")
let micButton = document.getElementById("microphone")
let leaveButton = document.getElementById("leave")

let toggleCamera = async (e) => {
    console.log("a")
    let button = e.currentTarget

    if (localTracks[1].muted) {
        await localTracks[1].setMuted(false)
        button.classList.add("active")
    } else {
        await localTracks[1].setMuted(true)
        button.classList.remove("active")
    }
}

let toggleMic = async (e) => {
    let button = e.currentTarget
    if (localTracks[0].muted) {
        await localTracks[0].setMuted(false)
        button.classList.add("active")
    } else {
        await localTracks[0].setMuted(true)
        button.classList.remove("active")
    }
}
let leaveStream = async (e) => {
    e.preventDefault()
    for (let i = 0; localTracks.length > i; i++) {
        localTracks[i].stop()
        localTracks[i].close()
    }
    await client.unpublish([localTracks[0], localTracks[1]])

    document.getElementById(`user-container-${uid}`).remove()



    window.location = "lobby.html"
}

cameraButton.addEventListener("click", toggleCamera)
micButton.addEventListener("click", toggleMic)
leaveButton.addEventListener("click", leaveStream)