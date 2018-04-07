var express = require("express");
var app = express();
var port = 8080;

app.use(express.static('./WebContent/'));

app.listen(port, function(){
    console.info("http://localhost:" + port);
});