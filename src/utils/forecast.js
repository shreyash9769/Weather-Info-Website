const request = require("request")
const forecast = (longitude, latitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=6eedb58539235c72329fc0a0589eeac8&query=" + latitude + "," + longitude + "&units=f"
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to the weather server", undefined)
        }
        else if (body.error) {
            callback("Unable to find the location", undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " feels like " + body.current.feelslike + " degrees")
        }
    })
}
module.exports = forecast