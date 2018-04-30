let express = require("express");
let mongoose = require("mongoose");
let size = require('./models/size')(mongoose);
let app = express();
let port = 8082;

app.route('/api/getParcelSize').get(function (req, res) {
    let self = JSON.parse(req.query.parcelsize);
    if (self) {
        let input = self.parcellength + 2 * self.parcelwidth + 2 * self.parcelheight;
        size.findOne({from: {$lte: input}, to: {$gte: input}}, function (err, size) {
            if (err) res.status(503).send(err);
            else if (!size) res.json({size: "---"});
            else res.json({size: size.title});
        });
    } else res.status(428).send("Keine Größe übergeben.");
});

let promise = mongoose.connect('mongodb://localhost/pcs', function () {
    app.listen(port, function () {
        console.info("http://localhost:" + port);
    })
})

console.info(promise);

process.on("SIGNINT", function () {
    process.kill(process.pid, "SIGTERM");
    mongoose.connection.close();
})