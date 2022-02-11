const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./app/config/db.config');
const google = require('./app/lib/google');
const linkedIn = require('./app/lib/linkedIn');
const folio = require('./app/lib/folio-testio');
const serp = require('./app/lib/serp')
const form = require('./app/lib/form')


const app = express();

require('dotenv').config();

// var corsOptions = {
//     origin: 'http://127.0.0.1:8000'
// };

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const db = require('./app/models');
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(err => {
        console.log("Cannot connect to database!", err);
        process.exit();
    });

app.get('/api/check-portfolio', (req, res) => {
    folio.checkPortfolio().then(function(pic){
        res.sendFile("/Users/BrandonTaft/Desktop/Project/Server/status-pic.png")
    });
});

app.get('/api/googlejobs', (req, res) => {
    google.getJobs().then(function(titles){
        res.json(titles)
    });
    
});

app.get('/api/linkedinjobs', (req, res) => {
    linkedIn.getLinkedInJobs().then(function(info){
        res.json(info)
    });
    
})

app.get('/api/serpjobs', (req, res) => {
    const SerpApi = require('google-search-results-nodejs');
    const search = new SerpApi.GoogleSearch("d2498eb38600b5fef854d9462c8f8b1ec0cda0b4d06b3cd4e2fbbe08379730a3");
    const params = {
        engine: "google_jobs",
        google_domain: "google.com",
        q: "junior software developers",
        hl: "en",
        gl: "us",
        uule: "&uule=w+CAIQICIHQXRsYW50YQ",
        lrad: "2000",
        start: "0"
    };

    const callback = function (data) {
        let string = "Computer Science";
        let myJobs = data.jobs_results
        myJobs.forEach((job) => {
            if (job.description.includes(string) || job.title.includes("No Experience Required"))
                console.log("Name: ", job.company_name, ", Title: ", job.title )
        })
        res.json(myJobs)
    };

   search.json(params, callback);
    
    
})


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server Is Running in ${PORT}...`);
});