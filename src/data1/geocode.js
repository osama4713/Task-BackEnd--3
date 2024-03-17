
const request = require ("request")

const geocode = (location, callback) => {
    const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + location + ".json?access_token=pk.eyJ1IjoiaXNsYW0yODQiLCJhIjoiY2wwamEzNmFhMGFtNTNkb3pqaXk4bXNnYSJ9.qYlrWIqo41gXgNNc4h8yIw"

    request({ url: geocodeUrl, json: true }, (error, request) => {

        if (error) {
            callback("There is an error geocode service", undefined)
        } else if (request.body.message) {
            callback(request.body.message, undefined)
        } else if (request.body.features.length == 0) {
            callback("There is no country with this name", undefined)
        } else {
            callback(undefined, {
                longitude: request.body.features[0].center[0],
                latitude: request.body.features[0].center[1]
            })
        }
    })
}

module.exports = geocode