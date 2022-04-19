const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require("./routes/articles");
const methodOverride = require('method-override')
const app = express();
const Article = require('./models/article')

mongoose.connect("mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

app.get("/", async (req, res) => {
  // res.send('hello world')
  // articles box content
  // const articles = [
  //   {
  //     title: "Test Article",
  //     createdAt: new Date(),
  //     description: "Test description",
  //   },
  //   {
  //     title: "Test Article 2",
  //     createdAt: new Date(),
  //     description: "Test description 2",
  //   },
  // ];
    const articles = await Article.find().sort({
      createdAt: 'desc'
    })
    
  res.render("articles/index", { articles: articles });
  // it's render the index.ejs so we have to initilize correctle where folder is
});
app.use("/articles", articleRouter);
app.listen(5000);
