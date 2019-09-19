const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const sendTrailer = require('./getTrailer')



const app = express();
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: true })); 

app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index')
});



app.post('/getTrailer', async (req, res) => {
    const body = req.body;
    const trailerName = body.trailer
    if(trailerName){
        sendTrailer(trailerName).then((data) => {
            if(data) {
                // console.log('data', data)

                const youTubeId = data.youtubeId
                const about = data.about

                // console.log('yid: ', youTubeId) 

                url = `https://www.youtube.com/watch?v=${youTubeId}`
                res.render('video', {id: youTubeId, url: url, about: about})
            } else {
                res.render('index', {error: 'Movie Trailer Not Found'})
            }
        }) 
    }
    else{
        res.render('index', {error: 'Please Enter Valid Movie Name'})
    }

});

var port = 3000 || process.env.PORT;
app.listen(port, () => console.log('Listening on port 3000..'))


// AIzaSyBJUgsn9cYSQcGvSjOTb__VE9fYQtXv1bk