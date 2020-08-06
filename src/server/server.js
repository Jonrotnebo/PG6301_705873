//Disclaimer: i did not write this file, its altered primaly from linked part, some of it is retrieved from other parts and altered.
//Link: https://github.com/arcuri82/web_development_and_api_design/blob/master/les07/server_client_together/src/server/server.js

const {app} = require('./app');
const repository = require("../server/db/repository");

const port = process.env.PORT || 8080;

app.listen(port, () => {
    repository.initWithSomeItems();
    console.log('Started server on port ' + port);
});