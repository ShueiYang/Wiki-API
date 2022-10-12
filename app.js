const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

main().catch(err => console.log(err));

async function main() {
    const { Schema } = mongoose;
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DATABASE_AUTHENTIFICATION}`);

        const articlesSchema = new Schema({
            title: String,
            content: String
        })
        const Article = mongoose.model("Article", articlesSchema);

        
        app.route("/articles")
       
            .get(async (req, res) => {
                try {
                    const articlesFound = await Article.find({});
                    if (articlesFound) {
                        res.send(articlesFound);
                    } 
                } catch(err) {
                    res.send(err)
                }
            })

            .post((req, res) => {
            
                const newArticle = new Article({
                    title: req.body.title,
                    content: req.body.content
                });
                newArticle.save(function(err) {
                    if(err) {
                        res.send(err)
                    } else {
                        res.send("Successfully added a new article")
                    }
                });
            })

            .delete(async (req, res) => {
                try {
                    const deleteResult = await Article.deleteMany({});

                    if(deleteResult) {
                        res.send(`Successfully deleted ${deleteResult.deletedCount} article`)
                    }
                } catch (err) {
                    res.send(err)
                }
            })

            ////////// Requests Targetting A Specific Article /////////////
        
        app.route("/articles/:articleTitle")
            .get(async (req, res) => {
                const requestArticleTitle = req.params.articleTitle
                try {
                    const resultFound = await Article.findOne({title: requestArticleTitle}).collation({locale:'en', strength:2}).exec();
                    if (resultFound) {
                        res.send(resultFound)
                    } else {
                        res.send(`No article matching the title "${requestArticleTitle}" was found`) 
                    }
                } catch(err) {
                    res.send(err)
                }
            })

            .put(async (req, res) => {
                const requestArticleTitle = req.params.articleTitle
                try {
                    const result = await Article.updateOne({title: requestArticleTitle},
                         {title: req.body.title, content: req.body.content});
                    if (result.modifiedCount !== 0) {
                        res.send(`${result.modifiedCount} document updated successfully`)
                    } else {
                        res.send("Failed to updated: the document does not exist") 
                    }
                } catch(err) {
                    res.send(err)
                }
            })

            .patch(async (req, res) => {
                const requestArticleTitle = req.params.articleTitle
                try {
                    const result = await Article.updateOne({title: requestArticleTitle},
                         {$set: req.body});
                    if (result.modifiedCount !== 0) {
                        res.send(`${result.modifiedCount} document updated successfully`)
                    } else {
                        res.send("Failed to updated: the document does not exist") 
                    }
                } catch(err) {
                    res.send(err)
                }
            })

            .delete(async (req, res) => {
                const requestArticleTitle = req.params.articleTitle
                try {
                    const result = await Article.deleteOne({title: requestArticleTitle});
                    if (result.deletedCount === 1) {
                        res.send(`document deleted successfully`)
                    } else {
                        res.send("Failed to deleted: the document does not exist") 
                    }
                } catch(err) {
                    res.send(err)
                }
            })

    } catch(err) {
        console.log(`Process failed... ${err}`);
        process.exit(1)
    }
}




let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000
}

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
}) 