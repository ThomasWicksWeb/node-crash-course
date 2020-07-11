const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// Express app
const app = express();

// Connect to MongoDB
const dbURI =
  "mongodb+srv://test:test123@node-tutorial.2hcje.mongodb.net/node-tuts?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connected to DB");
    // Listen for requests
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

// Register view engine
app.set("view engine", "ejs");

// Middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // Needed for accepting form data
app.use(morgan("dev"));

// app.get("/add-blog", (req, res) => {
// const blog = new Blog({
//     title: "third blog!",
//     snippet: "About my new third blog",
//     body:
//       "More about my first new big blog because it's so incredibly interesting!",
//   });

//   blog
//     .save()
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/single-blog", (req, res) => {
//   Blog.findById("5f08c0a7a7d53caa5d98b1ca")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// Routing
app.get("/", (req, res) => {
  res.redirect("/blogs");

  // Now we want to render a view
  // res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  // res.send('<p>About</p>')
  // res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

// Handling new blog posts
app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Blog routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
      console.log("Called /blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create" });
});

// 404 pages
app.use((req, res) => {
  // res.status(404).sendFile("./views/404.html", { root: __dirname });
  res.status(404).sendFile("/404", { title: "404!!" });
});

console.log("Hello");
