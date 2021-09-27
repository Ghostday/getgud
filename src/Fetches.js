import APIKey from "./api"

const fetchUrl = (region) => `https://${region}.api.riotgames.com/lol`


const calls = {
    fetchBySummonerName: (region, name) => fetchUrl(region)+`/summoner/v4/summoners/by-name/${name}?api_key=${APIKey}`,
    fetchMasteriesById: (region, id) => fetchUrl(region)+`/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${APIKey}`,
    fetchLastMatches: (region, puuid) => fetchUrl(region)+`/match/v5/matches/by-puuid/${puuid}/ids`,
    fetchMatchDetails: (region, matchId) => fetchUrl(region)+`/match/v5/matches/${matchId}`,
    fetchRankedDetails: (region, id) => fetchUrl(region)+`/league/v4/entries/by-summoner/${id}?api_key=${APIKey}`,
}

export default calls