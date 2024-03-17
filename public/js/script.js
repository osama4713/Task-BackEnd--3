var form = document.getElementById("form1")
var addr = document.getElementById("address")


var loca = document.getElementById("location")
var forc = document.getElementById("forecast")
var err = document.getElementById("error")

form.addEventListener("submit" , (e) => {
    e.preventDefault()
    weatherFunction()
    form.reset()
})
let weatherFunction = async () => {
    try{
        const Address = addr.value
        const res = await fetch ("http://localhost:3000/weather?address="+Address)
        const data = await res.json()
        console.log(data)

        if(data.error){
            err.innerText = data.error
            loca.innerText = ''
            forc.innerText = ''
        }else{
            loca.innerText = data.locaion
            forc.innerText = data.forcast
            err.innerText = ''
        }

    }catch(e){
        console.log(e)
    }
}

