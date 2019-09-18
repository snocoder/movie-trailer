const request = require('request-promise')

const baseURL = 'https://api.themoviedb.org/3'
const apiKey = 'api_key=c7030e7145a9c11ff588a71792ab3020'

const getOptions = url => {
    return {
        method: 'GET',
        url: url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.75 Safari/537.36'
        }
    }
}

// bnd

const sendTrailer = async (trailerName) => {
    try {
        const searchUrl = `${baseURL}/search/movie?${apiKey}&query=${trailerName}`
        const searchRes = await request.get(getOptions(searchUrl))
        console.log('###### ',searchRes)
        const movieId = JSON.parse(searchRes).results[0].id
        const traileUrl = `${baseURL}/movie/${movieId}/videos?${apiKey}`
        const vRes = await request.get(getOptions(traileUrl))
        const youtubeId = JSON.parse(vRes).results[0].key
        return youtubeId
    } catch (error) {
        return undefined
    }
    
}

module.exports = sendTrailer