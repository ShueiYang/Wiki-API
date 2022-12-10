require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

const articlesRouter = require('./routes/articles.route');

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use('/articles', articlesRouter)

app.get('/', (req, res) => {
    res.send("IT'S WORKING !!! :)")
})

async function startServer() {
    
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DATABASE_AUTHENTIFICATION}`);

    } catch(err) {
        console.log(`Process failed... ${err}`);
        process.exit(1)
    }
}


const PORT = process.env.PORT || 8080;

startServer().then(() => {
    app.listen(PORT, () => {
        console.log(`app is running on port ${PORT}...`)
    });  
}).catch(err => console.log(err));