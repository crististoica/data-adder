const express = require("express");
const morgan = require("morgan");
const app = express();

const fs = require("fs");

app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/adauga-date", (req, res) => {
  res.render("data");
});

app.post("/adauga-date", (req, res) => {
  const blob = {
    question: req.body.question,
    options: [
      req.body.option_1,
      req.body.option_2,
      req.body.option_3,
      req.body.option_4,
    ],
    correctAnswer: req.body.correct_answer,
  };

  fs.readFile("data.json", (err, data) => {
    if (err && err.code === "ENOENT") {
      fs.writeFile("data.json", JSON.stringify([blob]), (error) => {
        console.log(error);
      });
    } else if (err) {
      console.log(err);
    } else {
      try {
        const fileData = JSON.parse(data);
        fileData.push(blob);
        fs.writeFile("data.json", JSON.stringify(fileData, null, 2), (error) =>
          console.log(error)
        );
      } catch (exception) {
        console.error(exception);
      }
    }
    res.redirect("/adauga-date");
  });
});

app.listen(3000, () => {
  console.log("Server Up! 💓  💓  💓  💓  💓  💓  💓");
});
