let http = require('http')

let port = 8080

const fs = require('fs')

const RequestHandler = (req,res)=>{
    let filename = ""
    switch (req.url) {
        case '/':
            filename="./index.html"
            break;
    
        case '/home':
            filename="./home.html"
            break;
    
        case '/about':
            filename="./about.html"
            break;
    
        case '/product':
            filename="./product.html"
            break;
        case '/contact':
            filename="./contact.html"
            break;
    }
    fs.readFile(filename,(err,data)=>{
        if(err){
            console.log(err);
            return false
        }
        res.end(data)
    })
}
const server = http.createServer(RequestHandler)
server.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false
        }
        console.log(`server is running at :- ${port}`);
        
})