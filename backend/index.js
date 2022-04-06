const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const Routes = require("./routes/ListRoutes");
mongoose.connect(
    process.env.MONGO_URL, {useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
    console.log("successfully connected");
}).catch((e) => {
    console.log("not connected",e);
})


app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors({}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origine", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,PATCH");
        return res.status(200).json({});
    }
    next();
});
app.use(Routes);
const port=5000
app.listen(port, () => {
    console.log(port);
});
