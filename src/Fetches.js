import APIKey from "./api"



const calls = {
    fetchUrl: () => `https://oc1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Ghostday?api_key=${APIKey}`,
    fetchBySummonerName: (name) => {
        fetch(`https://oc1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${APIKey}`)
        .then(response => response.json())
        .then(data => {
            const name = data.name
            console.log(data)
            return name
        })
        .catch(error => console.error(error))
    }
}

export default calls