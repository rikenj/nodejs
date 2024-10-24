const express = require('express');

const port = 8008;
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

let users = [];

app.get('/', (req, res) => {
    return res.render('index', {
        title: "Index",
        pagename: "Index Page",
        users: users
    });
});

app.get('/home', (req, res) => {
    return res.render('home', {
        title: "Home Page",
        pagename: "Home Page"
    });
});

app.get('/users', (req, res) => {
    return res.render('index', {
        users: users 
    });
});

app.get('/edituser', (req, res) => {
    let single = users.find(val => val.id == req.query.id);
    
    if (!single) {
        return res.status(404).send('User not found');
    }

    return res.render('edit', { single: single });
});

app.post('/updateuser', (req, res) => {
    const { editid, name, phone } = req.body;
    users = users.map((val) => {
        if (val.id == editid) {
            return { id: val.id, name: name, phone: phone }; 
        }
        return val;
    });

    console.log('Record updated successfully');
    return res.redirect('/');
});

app.post('/insertuser', (req, res) => {
    const { name, phone } = req.body;

    let obj = {
        id: Date.now(), 
        name: name,
        phone: phone 
    };

    users.push(obj);
    console.log("User added successfully");
    return res.redirect('/');
});

app.get('/deleteuser', (req, res) => {
    let id = req.query.deleteid;
    users = users.filter(val => val.id != id);
    console.log('User successfully deleted');
    res.redirect('/');
});

app.listen(port, (err) => {
    if (err) {
        console.error(err);
        return false;
    }
    console.log(`Server is running at http://localhost:${port}`);
});
