const express=require('express');
const { asyncHandler } = require('../middlewares/asyncHandler');
const router=express.Router();
const Article = require('../models/article.model');
const articleController=require('../controller/article.controller');
const { addArticleValidator } = require('../validators/article.auth');

module.exports= app=>{
    //Add_Article Form route
    router.get('/addArticle', function(req, res){
        res.render('add_article', {
            title:'Add Article'
        })
    })
    
    // Post an Article
    // Create an new Article
    router.post('/', addArticleValidator, articleController.addArticle)
    // retrieve a single article
    router.get('/:input', articleController.findAnArticleByAuthorOrTitle)

    // router.get('/search/?title=title', (req, res)=>{
    //     const { options } = {};
    //     if(req.query.search) {
    //         options = {
    //           ...options,
    //           where: {
    //             title: new RegExp(req.query.search.toString(), $flags, 'i')
    //           }
    //         }
    //     }
    //     Article.findArticleByAuthorOrTitle(String(options), (error, article) => {
    //         if (error) {
    //             if (error.kind === "not_found") {
    //                 res.status(404).send({
    //                     status: 'error',
    //                     message: `${options} not found`
    //                 });
    //             }else{
    //                 res.status(500).send({
    //                     status: 'error',
    //                     message: `Error in retrieving ${options}`
    //                 });
    //             }
    //         }else {
    //             res.status(200).send(article)
    //         }
    //     });
    // })
    
    // Load Edit Form
    router.get('/edit/:id', function(req, res){
        const article = new Article(title, author, body);
        // req.flash('success', 'Article Add')
        res.redirect('/')
        res.render('edit_article', {
            title: 'Edit Article',
            article:article
        })
        
    })
    
    // Update Submit POST Route
    router.put('/:id', articleController.updateArticle)
    
    // delete a article
    router.delete('/:id', articleController.deleteArticle)
    
    app.use('/api/articles', router)
}

