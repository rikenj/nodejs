const express = require("express");

let code = 8000;

let app = express();

const db = require("./config/db")

app.set("view engine","ejs")

const book = require("./model/bookModel")

app.use(express.urlencoded());

// View book

app.get("/view", (req, res) => { 
    book.find({})
    .then((data) => {
        return res.render("view", {
            record : data
        })
    }).catch((err) => {
        console.log(err);
        return false     
    })
})

// Add book
app.get("/", (req, res) => {
    return res.render("add")
})

// Delete book

app.get("/delEntry",(req,res)=>{
    let id = req.query.delId;
    book.findByIdAndDelete(id)
    .then((data)=>{
        console.log("Book Deleted SuccessFully");
        return res.redirect("/view")
    }).catch((err)=>{
        console.log("err");
        return false;
    })
})

// Edit book

app.get("/editBook",(req,res)=>{
    let id = req.query.editId;
    book.findById(id)
    .then((single)=>{
        return res.render("edit",{
            data : single 
        })
    }).catch((err)=>{
        console.log(err);
        return false;
    })
})

// Update bookDetail

app.post("/updateBook",(req,res)=>{
    const {id,name,price,pages,author} = req.body;
    book.findByIdAndUpdate(id,{
        name : name,
        price : price,
        pages : pages,
        author : author
    }).then((data)=>{
        console.log("Book Updated");
        return res.redirect('/view');
    }).catch((err)=>{
        console.log(err);
        return false;
    })
})

// Insert BookDetail

app.post("/insertBook", (req, res) => {
    const { name, price, pages, author } = req.body;

    book.create({
        name: name,
        price: price,
        pages: pages,
        author: author
    }).then((data, err) => {
        if (err) {
            console.log(err);
            return false
        }
        console.log("Book Added");
        return res.redirect("/")
    })
});

app.listen(code, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(` Server Running on : ${code} `);

});