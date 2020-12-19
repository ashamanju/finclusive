const express = require('express');
const bodyParser = require('body-parser');
const config = require('./lib/config');
const app = express();
const apiRouter = require('./routes/v1/api-routes');
const port = '5001';
const cors = require('cors')
console.log(port);



app.use('/api/v1/',apiRouter);
app.use(cors());

//start server
app.listen(port, () => {
    console.log('Server is up Port : %d',port);
}
);
module.exports = app;