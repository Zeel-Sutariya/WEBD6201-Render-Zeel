"use strict";
// imports for server
import http from 'http';
import  fs from 'fs';
import mime from "mime-types";

//variables
const hostname = '127.0.0.1';
const port = process.env.PORT||3000;
let lookup = mime.lookup;

//creating server
const server = http.createServer((req, res) => {
    let path : string = req.url as string;
    if(path === "/"||path==="/home"){
        path ="/index.html";
    }
    let mime_type :string =lookup(path.substring(1)) as string;
    fs.readFile(__dirname + path,function (err, data){
        if (err){
            res.writeHead(404);
            res.end("Error 404 - File not Found "+ err.message);
            return;
        }
        res.setHeader("X-Content-Type_options","nosniff");
        res.writeHead(200,{'Content-Type': mime_type});
        res.end(data);
    });
});

//listening for requests
server.listen(port,  () => {
    console.log(`Server running on ${hostname}:${port}/`);
});