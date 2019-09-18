const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const sendTrailer = require('./getTrailer')



const app = express();
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: true })); 

app.set('view engine', 'pug')

app.get('/', (req, res) => {
    console.log(req.query)
    res.render('index')
});


// app.get()

app.post('/getTrailer', async (req, res) => {
    const body = req.body;
    const trailerName = body.trailer
    if(trailerName){
        sendTrailer(trailerName).then(youTubeId => {
            if(youTubeId) {
                // console.log(youTubeId)
                url = `https://www.youtube.com/watch?v=${youTubeId}`
                res.render('video', {id: youTubeId, url: url})
            } else {
                res.send('Trailer not found')
            }
        }) 
    }
    else{
        res.send('Invalid TrailerName')
    }
    // res.send('snocoder')

});


// app.get('/getTrailer', async (req, res) => {
//     const body = req.params;
//     console.log(body)
//     const trailerName = body.trailer
//     if(trailerName){
//         sendTrailer(trailerName).then(youTubeId => {
//             console.log(youTubeId)
//             res.render('video', {id: youTubeId})
//         }) 
//     }
//     else{
//         res.send('Invalid TrailerName')
//     }
//     // res.send('snocoder')

// });

app.listen(3000, () => console.log('Listening on port 3000..'))


// AIzaSyBJUgsn9cYSQcGvSjOTb__VE9fYQtXv1bk