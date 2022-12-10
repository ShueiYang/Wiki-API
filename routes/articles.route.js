
const express = require('express');
const articlesRouter = express.Router();

const { getArticles, createArticle, deleteAllArticles } = require('../controllers/articles.controller');
const { searchArticle, updateArticle, patchArticle, deleteArticle } = require('../controllers/specificArticle.Controller');
const { Article } = require('../model/article.model')

articlesRouter.route("/")

    .get((req, res) => {
        getArticles(req, res, Article)
    })
    .post((req, res) => {
        createArticle(req, res, Article)
    })
    .delete((req, res) => {
        deleteAllArticles(req, res, Article)
    })

////////// Requests Targetting A Specific Article /////////////

articlesRouter.route("/:articleTitle")

    .get((req, res) => {
        searchArticle(req, res, Article)
    })

    .put((req, res) => {
        updateArticle(req, res, Article)
    })

    .patch((req, res) => {
        patchArticle(req, res, Article)
    })

    .delete((req, res) => {
        deleteArticle(req, res, Article)
    })

module.exports = articlesRouter;