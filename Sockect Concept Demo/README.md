## Steps
- `npm init`
- `npm install --save express socket.io`
- One final thing is that we should keep restarting the server. When we make changes, we will need a tool called nodemon.
    - `npm install --save-dev -g nodemon`
    - Whenever you need to start the server, `instead of using the node app.js use, nodemon app.js`. This will ensure that you do not need to restart the server whenever you change a file. It speeds up the development process.

## to run the server
- `use nodemon app.js` instead of `npm app.js`