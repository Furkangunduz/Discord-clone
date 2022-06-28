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
    let channelUserList = document.getElementById("voice-channel-users")
    if (!channelUserList) {
        channelUserList = document.createElement("div")
        channelUserList.setAttribute("id", "voice-channel-users")
        channelUserList.setAttribute("class", "voice-channel-users")
        insertAfter(channelUserList, document.getElementById(`${roomId}`))
    }
    channelUserList.insertAdjacentHTML("beforeend", member)

}

const insertAfter = (newNode, existingNode) => {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
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