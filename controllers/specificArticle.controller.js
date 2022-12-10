

async function searchArticle (req, res, Article) {
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
}

async function updateArticle (req, res, Article) {
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
}

async function patchArticle (req, res, Article) {
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
}

async function deleteArticle (req, res, Article) {
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
}

module.exports = {
    searchArticle,
    updateArticle,
    patchArticle,
    deleteArticle
}    