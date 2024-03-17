
const express = require("express")
const path = require("path")
const hbs = require("hbs")

const app = express()

app.set('view engine', 'hbs');

const port = process.env.PORT || 3000

const puplicDirectory = path.join(__dirname, "../public")
app.use(express.static(puplicDirectory))

const viewDiractor = path.join(__dirname, "../temp1/views")
app.set("views", viewDiractor)

const partialsPath = path.join(__dirname, "../temp1/partials")

hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
    res.render("index", {
        title: "Home",
        desc: "This IS Home Page"
    })
})

app.get('/services', (req, res) => {
    res.render("services", {
        title: "SERVICES",
        name: "Osama",
        city: "Tama",
        age: 22,
        img: "Images/osama.jpg"
    })
})

app.get('/team', (req, res) => {
    res.render("team", {
        title: "TEAM",
        name: "Fady",
        city: "sohag",
        age: 16,
        img2: "Images/fady.jpg"
    })
})

// #####################################################################################################################################
// #####################################################################################################################################

const forcast = require("./data1/forecast");
const geocode = require("./data1/geocode");


app.get('/weather', (req, res) => {
    if (!req.query.address) {

        return res.send({
            Error: "you must provide an address"
        })

    }
    else {

        geocode(req.query.address, (error, data) => {
            
            if (error) {
                res.send({ error })
            }

            forcast(data.latitude, data.longitude, (error, data) => {
                if (error) {
                    res.send({ error })
                }

                res.send({
                    forcast: data,
                    Address: req.query.address
                })
            })
        })

    }
})

// #####################################################################################################################################

app.get('/*', (req, res) => {
    res.send("404 The Page Not Found")
})

app.listen(port, () => {
    console.log(`app is listening on por ${port}`)
})

