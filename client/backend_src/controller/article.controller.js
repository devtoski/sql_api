const Article = require('../models/article.model');
// const flash = require('connect-flash')

exports.addArticle = (req, res) => {
    const { title, author, body } = req.body;
    const article = new Article(title, author, body);
    if (!req.body) {
        res.status(400).send({
            status: "error",
            message: 'please fill all fields'
        });
    }
    
    Article.createArticle(article, (error, data) => {
        if (error) {
            res.status(500).send({
                status: "error",
                message: error.message
            });
        } else {
            console.log(data)
            res.status(201).send({
                status: "success",
                data: {
                    title:data.title, 
                    author:data.author, 
                    body:data.body
                }
            });
        } 
        // req.flash('success', 'Article Add')
        // res.redirect('/')
    });
    
};

// Find an article
exports.findAnArticleByAuthorOrTitle = (req, res) => {
    const { input } = req.params;
    Article.findArticleByAuthorOrTitle(String(input), (error, data) => {
        if (error) {
            if (error.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `${input} not found`
                });
            }else{
                res.status(500).send({
                    status: 'error',
                    message: `Error in retrieving ${input}`
                });
            }
        }else {
            res.status(200).send({
                data: {
                    title:data.title, 
                    author:data.author, 
                    body:data.body
                }
            })
        }
    });

}

// Retrieving all articles from database
exports.findAll = (req, res) => {
    const title = req.body.title
    Article.getAllArticle=(title, (error, articles)=>{
        if(error){
            res.status(500).send({
                status: "error",
                message: error.message
            });
        }
        if(articles.length==0){
            res.status(401).send({ status: `No articles`});
            console.log(`No ${articles}`)
            // res.render('index', {
            //     title:'Articles'
            // })
        }else{
            res.status(201).send(articles);
            // console.log(articles)
            // res.render('index', {
            //     title:'Articles', 
            //     articles: articles
            // })
        }
    })
}

exports.updateArticle = (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({
            message: 'Content can not be empty'
        })
    }
    const { title, author, body } = req.body;
    Article.updateArticleByTitle(
        Number(req.params.id), 
        new Article(title, author, body),
        (error, data)=>{
            if (error) {
                if (error.kind== 'not_found') {
                    res.status(400).send({
                        message: `Not found Article with id ${req.params.id}.`
                    })
                } else {
                    res.status(500).send({
                        message: 'error updating Article with id' + req.params.id
                    })
                }
            } else {
                res.status(200).send({
                    'success': 'Article Updated', data
                })
                // req.flash('success', 'Article Updated')
                // res.redirect('/')
            }
        }
    )
}

exports.deleteArticle = (req, res) => {
    Article.deleteArticle(Number(req.params.id),(error, data)=>{
        if (error) {
            if (error.kind== 'not_found') {
                res.status(400).send({
                    message: `Not found Article with id ${req.params.id}.`
                })
            } else {
                res.status(500).send({
                    message: 'Could not delete Article with id' + req.params.id
                })
            }
        } else {
            res.send({message: 'Article was deleted successfully'})
        }
    })
}