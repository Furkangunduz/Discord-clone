const APP_ID = "f045b940d86743a5909f347100f5f577";
const TOKEN = null

let uid = sessionStorage.getItem("uid")
if (!uid) {
    uid = String(Math.floor(Math.random() * 1000000))
    sessionStorage.setItem("uid", uid);
}


let client;

let cameraButton = document.getElementById("camera")
let micButton = document.getElementById("microphone")
let leaveButton = document.getElementById("leave")

let rtmClient;
let channel;

//roomıd
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
let roomId = urlParams.get("room");
let userName = urlParams.get("username");


if (!roomId) {
    window.location = "index.html"
}

let localTracks = []
let remoteUsers = {}

let joinRoomInıt = async () => {
    rtmClient = await AgoraRTM.createInstance(APP_ID)
    await rtmClient.login({ uid, TOKEN })
    console.log(userName)
    await rtmClient.addOrUpdateLocalUserAttributes({ 'name': userName })

    channel = await rtmClient.createChannel(roomId)
    await channel.join()

    channel.on('MemberJoined', handleMemberJoined)
    channel.on('MemberLeft', handleMemberLeft)

    getMembers()

    client = await AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
    await client.join(APP_ID, roomId, TOKEN)

    await client.on("user-published", handleUserPublished)
    await client.on("user-left", handleUserLeft)
    await joinStream()
}

let joinStream = async () => {
    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks({}, {
        encoderConfig: {
            width: { min: 640, max: 1920 },
            height: { min: 480, max: 1080 },
        }
    })

    let player = `
    <div class="video_container" id="user-container-${uid}">
        <div class="video_player" id="user-${uid}"></div>
    </div > `
    document.getElementById("streams_container").insertAdjacentHTML("beforeend", player)

    // document.getElementById(`user-container-${uid}`).addEventListener('click', expandVideoFrame)
    await localTracks[1].play(`user-${uid}`)
    // localTracks[0].play(`user-${uid}`)
    await client.publish([localTracks[0], localTracks[1]])
}

let handleUserPublished = async (user, mediaType) => {

    remoteUsers[user.uid] = user

    await client.subscribe(user, mediaType)

    let player = document.getElementById(`user-${user.uid}`)
    if (!player) {
        player = `
            <div class="video_container" id="user-container-${user.uid}">
                <div class="video_player" id="user-${user.uid}"></div>
            </div > `
        document.getElementById("streams_container").insertAdjacentHTML("beforeend", player)
        // document.getElementById(`user-container-${user.uid}`).addEventListener('click', expandVideoFrame)
    }
    // document.getElementById(`user-container-${user.uid}`).addEventListener('click', expandVideoFrame)

    // if (displayFrame.style.display) {
    //     let videoFrame = document.getElementById(`user-container-${user.uid}`)
    //     videoFrame.style.height = '100px'
    //     videoFrame.style.width = '100px'
    // }

    if (mediaType === "video") {
        await user.videoTrack.play(`user-${user.uid}`)
    }
    if (mediaType === "audio") {
        await user.audioTrack.play(`user-${user.uid}`)
    }
}
let handleUserLeft = async (user) => {
    delete remoteUsers[user.uid]
    document.getElementById(`user-container-${user.uid}`).remove()

    // if (userIdInDisplayFrame === `user-container-${user.uid}`) {
    //     displayFrame.style.display = null

    //     let videoFrames = document.getElementsByClassName('video_container')
    //     for (let i = 0; videoFrames.length > i; i++) {
    //         videoFrames[i].style.height = '300px'
    //         videoFrames[i].style.width = '300px'
    //     }
    // }
}
let toggleCamera = async (e) => {
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

    // if (userIdInDisplayFrame === `user-container-${uid}`) {
    //     displayFrame.style.display = null

    //     for (let i = 0; videoFrames.length > i; i++) {
    //         videoFrames[i].style.height = '300px'
    //         videoFrames[i].style.width = '300px'
    //     }
    // }

    window.location = "lobby.html"
}

// cameraButton.addEventListener("click", toggleCamera)
// micButton.addEventListener("click", toggleMic)
// leaveButton.addEventListener("click", leaveStream)

joinRoomInıt()