require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.set('strictQuery', false);

const articlesRouter = require('./routes/articles.route');
const formRoute = require("./routes/form")

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("IT'S WORKING !!! :)")
})

app.use("/articles", articlesRouter);
app.use("/form", formRoute);


app.all("*", (req, res) => {
    res.status(404).json({ message: "This route does not exist" });
});

async function startServer() {
    
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DATABASE_AUTHENTIFICATION}`);

    } catch(err) {
        console.log(`Process failed... ${err}`);
        process.exit(1)
    }
}


const PORT = process.env.PORT || 8000;

startServer().then(() => {
    app.listen(PORT, () => {
        console.log(`app is running on port ${PORT}...`)
    });  
}).catch(err => console.log(err));