const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://18.233.115.64:27017";

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/static", express.static(__dirname + "/public"));

app.set("views", "./views");

app.set("view engine", "pug");

app.get("/", (req, res) => {
  if (req.query.error) {
    res.render("main.pug", { error: true });
  } else {
    res.render("main.pug");
  }
});
app.post("/binaryToDecimal", async (req, res) => {
  const { username, password } = req.body;
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    let dbo = db.db("distribuidos");
    dbo
      .collection("users")
      .find({ username: username, password: password })
      .toArray((err, result) => {
        if (err) throw err;
        db.close();
        if (result.length !== 0) {
          res.render("binaryToDecimal.pug", { name: username });
        } else {
          return res.redirect("/?error=true");
        }
      });
  });
});

app.listen(3000, () => {
  console.log("Escuchando en el puerto 3000");
});
