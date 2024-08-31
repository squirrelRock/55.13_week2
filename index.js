//CS55.13 Week2 kdurkin

const http = require("http");
const fs = require("fs").promises;

const requestListener = function(clientRequest, serverResponse) {

    console.log(clientRequest.url);

    if(clientRequest === "/") {
        
        fs.readFile(__dirname + "/homePage.html")
            .then(
                contents => {
                    serverResponse.setHeader("Content-Type", "text/html; charset=UTF-8");
                    serverResponse.writeHead(200);
                    serverResponse.end(contents);
                }
            );
    } else {

        fs.readFile(__dirname + "/data.json")
            .then(
                contents => {
                    serverResponse.setHeader("Content-Type", "application/json; charset=UTF-8");
                    serverResponse.writeHead(200);
                    serverResponse.end(contents);

            }
        );
    }
};

const server = http.createServer(requestListener);

const host = "127.0.0.1";
const port = "3000";

server.listen(
    port,
    host,
    () => {
        console.log(`server now running on http://${host}:${port}`);
    }
);