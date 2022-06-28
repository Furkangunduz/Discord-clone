const handleMemberJoined = async (memberId) => {
    console.log("new user ", memberId)
    addMemberList(memberId)
}

const addMemberList = async (memberId) => {
    let { name } = await rtmClient.getUserAttributesByKeys(memberId, ['name'])

    let member = `
    <div class="user" id="member-${memberId}">
        <img src="./image/User-img/Picture-1.svg" alt="">
        <h5>${name}</h5>
    </div`
    document.getElementById("voice-channel-users").insertAdjacentHTML("beforeend", member)

}

let getMembers = async () => {
    let members = await channel.getMembers()

    members.forEach(member => {
        addMemberList(member)
    })
}


let handleMemberLeft = async (memberId) => {
    let memberWrapper = document.getElementById(`member-${memberId}`)
    memberWrapper.remove()
}

let leaveChannel = async () => {
    await channel.leave()
    await rtmClient.logout()
}
window.addEventListener('beforeunload', leaveChannel)