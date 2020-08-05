const {app} = require('./app');
const repository = require("../server/db/repository");

const port = process.env.PORT || 8080;

app.listen(port, () => {
    repository.initWithSomeItems();
    console.log('Started server on port ' + port);
});