const randomNames = [
    "snowballitself",
    "essexmongoose",
    "giggleassumption",
    "rebelsoothe",
    "thriftyvocal",
    "charactersyrup",
    "motorwaypurpur",
    "noticeartiste",
    "freeboardcrummy",
    "sorrowfulhousehold",
    "meticuloussailing",
    "rindshads",
    "vitalnecklace",
    "starkplastic",
    "newsattack",
    "biscuitsbake",
    "voluminousanyway",
    "sailingintel",
    "gaudychives",
    "themerace",
    "scudguard",
    "courtrobust",
    "patienceappraiser",
    "moneysplendid",
    "territoryquiet",
    "regimethree",
    "onceorchestra",
    "harpistmall",
    "latecaviar",
    "alarmedfervent",
    "voiceodd",
    "apparentchimney",
    "thousandpink",
    "reporterrestore",
    "sombreroirritating",
    "storescandalous",
    "dashingvirtual",
    "supercargocardinal",
    "definiteshoddy",
    "alfalfaadoring",
    "grouchyguardsman",
    "flavornewspaper",
    "howeverbeets",
    "mitttamarin",
    "stadiumdisease",
    "shrimpveins",
    "unfinishedrot",
    "selectiontry",
    "recruitnoun",
    "bookspanker",
]

let userName;
let joinBtn = document.getElementById("join")
if (joinBtn)
    joinBtn.addEventListener('click', (e) => {
        userName = document.getElementById("userName").value
        console.log(userName)
        if (userName) {
            setTimeout(() => {
                window.location = `index.html?username=${userName}`
            }, 1000);
        } else {
            alert("Lütfen isim belirleyiniz.")
        }
    })
