const db=require('../confiq/db.confiq')
const { createNewArticle: createNewArticleQuery, findArticleByAuthorOrTitle: findArticleByAuthorOrTitleQuery, getAllArticle:getAllArticleQuery, updateArticleByTitle:updateArticleByTitleQuery, DeleteArticle:DeleteArticleQuery } = require('../database/queries');

class Article {
    constructor(title, author, body) {
        this.title = title;
        this.author = author;
        this.body = body;
    }
    static createArticle=(newArticle, cb)=> {
        db.query(createNewArticleQuery ,[ newArticle.title, newArticle.author, newArticle.body], (err, res)=>{
            if (err) {
                console.log('error', err)
                cb(err, null)
                return
            }
            cb(null, { id: res.insertId, ...newArticle })
        })
    }
    
    static findArticleByAuthorOrTitle=(input, cb)=> {
        db.query(findArticleByAuthorOrTitleQuery, [input], (err, res) => {
            if (err) {
                console.log(err, {message:'mysql error'})
                cb(null, err);
                return;
            }
            if (res.length) {
                console.log('found user', res[0])
                cb(null, res[0]);
                return;
            }
            cb({ kind: 'not found'}, null)
        })
    }
    
    static getAllArticle=()=> {
        db.query(getAllArticleQuery, (err, res) => {
            if (err) {
                console.log('error', err)
                throw err;
            }
            console.log('articles: ', res)
            res;
        })
    }
    
    static updateArticleByTitle=(id, article, cb)=> {
        db.query(updateArticleByTitleQuery, [article.title, article.author, article.body, id], (err, res) => {
            if (err) {
                console.log('error', err)
                cb(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                console.log({ kind: 'not_found' }, null)
                return;
            }
    
            console.log('updated article', { id: id, ...article })
            cb(null, {id: id, ...article});
        })
    }
    
    static deleteArticle=(id, cb)=> {
        db.query(DeleteArticleQuery, [id], (err, res) => {
            if (err) {
                console.log('error', err)
                cb(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                cb({ kind: `${id} not found` }, null)
                return;
            }
    
            console.log('deleted article with id:', id)
            cb(null, res)
        })
    }
}



module.exports = Article;