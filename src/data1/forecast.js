
const request = require ("request")

const forecast = ( longitude , latitude , callback ) => {

    const url = "https://api.weatherapi.com/v1/current.json?key=ae595f8cb6c047528a181511242702&q="+ longitude +","+ latitude

    request({ url , json : true } , (error , response) => {

        if (error){

            callback("ERROR HAS OCCERINS" , undefined)

        }else if (response.body.error){

            callback(response.body.error.message , undefined)

        }else{
            callback(undefined , response.body.location.name + " it is : " + response.body.current.condition.text + " and temperature is : " + response.body.current.temp_c )
        }
    })
}

module.exports = forecast