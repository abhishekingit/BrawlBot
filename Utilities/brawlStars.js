const fetch = require('node-fetch');
const {brawlToken} = require("../config.json");
const API_TOKEN = brawlToken;
let bearer = 'Bearer ' + API_TOKEN;


async function GetPlayerInfo(playerTag) {
    let detag = playerTag.replace('#', '23');
    
    let response = await fetch(`https://api.brawlstars.com/v1/players/%${detag}`,{
        headers: {
            'authorization': bearer,
        }
        
    }).then();    
    if(response.status != 200) { return false; }
    let data = await response.json();
    return data;
    
}

async function GetBattleLog(playerTag) {
    let detag = playerTag.replace('#', '23');
    
    let response = await fetch(`https://api.brawlstars.com/v1/players/%${detag}/battlelog`,{
        headers: {
            'authorization': bearer,
        }
        
    }).then();    
    if(response.status != 200) { return false; }
    let data = await response.json();
    return data;
    
}

async function GetClubMembers(clubTag) {
    let detag = clubTag.replace('#', '23');

    let response = await fetch(`https://api.brawlstars.com/v1/clubs/%${detag}/members`, {
        headers: {
            'authorization': bearer,
        }
    }).then();

    if(response.status != 200) { return false; }
    let data = await response.json();
    return data;    

}

// let playerInfo = GetPlayerInfo("#28J8LPGQ2");
// playerInfo.then((data) => {
//     console.log(data);

// });
// console.log(playerInfo);

module.exports = {GetPlayerInfo, GetBattleLog, GetClubMembers}
