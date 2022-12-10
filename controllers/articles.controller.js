

async function getArticles (req, res, Article) {
    try {
        const articlesFound = await Article.find({});
            if(articlesFound) {
                res.send(articlesFound);
            } 
    } catch (err) {
        res.send(err)
    }
};


function createArticle (req, res, Article) {
    
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save(function(err) {
        if(err) {
            res.send(`Unable to create article: ${err}`)
        } else {
            res.send("Successfully added a new article")
        }
    });    
};  


async function deleteAllArticles (req, res, Article) {
   try {
        const deleteResult = await Article.deleteMany({});

        if(deleteResult) {
            res.send(`Successfully deleted ${deleteResult.deletedCount} article`)
        }
    } catch (err) {
        res.send(err)
    } 
}

module.exports = {
    getArticles,
    createArticle,
    deleteAllArticles
};  