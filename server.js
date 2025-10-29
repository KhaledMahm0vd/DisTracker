// Import the built-in HTTP module
const http = require('http');

// Define the hostname and port for the server
const hostname = '127.0.0.1'; // This is localhost
const port = 3000;

// Create the HTTP server
const server = http.createServer((req, res) => {
    // Set the response HTTP header with HTTP status and content type
    res.statusCode = 200; // OK
    res.setHeader('Content-Type', 'text/plain');

    // Send the response body "Hello, World!"
    res.end('Khaled was not here!\n');
});

// Make the server listen on the specified port and hostname
server.listen(port, hostname, () => {
    // Log a message to the console once the server is running
    console.log(`Server running at http://${hostname}:${port}/`);
});
