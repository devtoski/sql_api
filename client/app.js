const express=require('express')
const app=express()
const path = require('path')
const cors=require('cors')
const PORT=process.env.PORT || 5000
// const flash = require('connect-flash')
const userRoute = require('./backend_src/routes/user.route'); 
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use('/api/articles', articleRoute);
app.use('/api/users', userRoute);
// const cookie=require('cookie-parser')
// middleware
app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// Express Messages Middleware
// app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// load view engine
app.set('views', path.join(__dirname + '/backend_src', 'views'))

app.set('view engine', 'pug')

// Set Public Folder
app.use(express.static(path.join(__dirname + '/backend_src', 'public')))
const db=require('./backend_src/confiq/db.confiq')
const { addArticleValidator } = require('./backend_src/validators/article.auth');
const { getAllArticle:getAllArticleQuery } = require('./backend_src/database/queries');
// home route
app.get('/', (req, res)=>{
    db.query(getAllArticleQuery, (err, articles) => {
        if (err) throw err
        if (res==0) {
            res.status(400).send({
                message: `No Article`
            });
        }else{
            res.status(201).render('index', {
                title: "Articles",
                articles: articles
            });
        }
    })
})



require('./backend_src/routes/article.route')(app);


app.listen(PORT, ()=>console.log(`server running on http://localhost:${PORT}`))