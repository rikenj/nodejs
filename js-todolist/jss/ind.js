const express = require('express');

const port = 8008;
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

let users = [];

// Home route
app.get('/', (req, res) => {
    return res.render('index', {
        title: "Index",
        pagename: "Index Page",
        users: users // Pass the users array to the view
    });
});

// Home page route
app.get('/home', (req, res) => {
    return res.render('home', {
        title: "Home Page",
        pagename: "Home Page"
    });
});

// Route to fetch all users (not a typical GET route)
app.get('/users', (req, res) => {
    return res.render('users', {
        all: users // Assuming you have a users.ejs view
    });
});

// Insert user route
app.post('/insertuser', (req, res) => {
    const { name, phone } = req.body;
    let obj = {
        id: Math.floor(Math.random() * 100000),
        name: name,
        phone: phone
    };
    users.push(obj);
    console.log("User added successfully");
    return res.redirect('/');
});

// Start the server
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is running at http://localhost:${port}`);
});
