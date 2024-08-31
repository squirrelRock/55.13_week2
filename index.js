//CS55.13 Week2 kdurkin

const kd_http = require("http");
const kd_fs = require("fs").promises;
const kd_path = require("path");

const requestListener = function(clientRequest, serverResponse) {

    console.log(clientRequest.url);

    if(clientRequest.url === "/") {
        
        kd_fs.readFile(__dirname + "/home.html")
            .then(
                reply => {
                    serverResponse.setHeader("Content-Type", "text/html; charset=UTF-8");
                    serverResponse.writeHead(200);
                    serverResponse.end(reply);
                }
            );
        } else if (clientRequest.url === "/home.css") { 
            kd_fs.readFile(__dirname + "/home.css")
                .then(reply => {
                    serverResponse.setHeader("Content-Type", "text/css; charset=UTF-8");
                    serverResponse.writeHead(200);
                    serverResponse.end(reply);
                })
                
        } else {

        kd_fs.readFile(__dirname + "/portfolioData.json")
            .then(
                reply => {
                    serverResponse.setHeader("Content-Type", "application/json; charset=UTF-8");
                    serverResponse.writeHead(200);
                    serverResponse.end(reply);

            }
        );
    }
};

const kd_server = kd_http.createServer(requestListener);

const kd_host = "127.0.0.1";
const kd_port = "3000";

kd_server.listen(
    kd_port,
    kd_host,
    () => {
        console.log(`server now running on http://${kd_host}:${kd_port}`);
    }
);