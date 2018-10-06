const express = require('express');
const app = express();
const cors = require('cors');
const csvToJson = require('convert-csv-to-json');
const port = parseInt(process.env.PORT || 9000);
app.use(cors());
const data = csvToJson.fieldDelimiter(',').getJsonFromCsv('recyclables.csv');

function findById(data, id) {
    for (let i = 0; i < data.length; i++) {
        let holder = data[i].id.toString();
        if (holder === id) {
            return data[i];
        }
    }
}

function findByItem(data, item) {
    for (let i = 0; i < data.length; i++) {
        let holder = data[i].item.toString();
        if (holder === item) {
            return data[i];
        }
    }
}


app.get('/', (request, response) => {
    response.json({data: data});
})


app.get("/:item", function (request, response) {
    var record = findByItem(data, request.params.item);
    if (!record){
        // response.status = 404;
        response.status(404).send({
            error: {
                message: "No record found!"
            }
        })
    } else {
        response.json({data: record});
    }
});










app.get("/:id", function (request, response) {
    var record = findById(data, request.params.id);
    if (!record){
        // response.status = 404;
        response.status(404).send({
            error: {
                message: "No record found!"
            }
        })
    } else {
        response.json({data: record});
    }
});

app.listen(port);