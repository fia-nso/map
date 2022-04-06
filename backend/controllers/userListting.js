const ObjectID = require("mongoose").Types.ObjectId;
const Liste = require("../models/Listting");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.filtrer = async(req, res) => {
    try {
        const room = req.body.sector;
        console.log(req.body);
        var List = [];
        if (room == "public") {
            List = await Liste.find({ Sector: { $in: ["public"] } });
            res.status(200).json(List);
        } else if (room == "private") {
            List = await Liste.find({ Sector: { $in: ["private"] } });
            res.status(200).json(List);
        } else {
            List = await Liste.find({});
            res.status(200).json(List);
        }
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
module.exports.All = async(req, res) => {
    const users = await Liste.find();
    console.log("aaslemaa");
    res.status(200).json(users);
};
// module.exports.uploadProfil = async(req, res) => {
//     try {
//         if (
//             req.file.detectedMimeType != "image/jpg" &&
//             req.file.detectedMimeType != "image/png" &&
//             req.file.detectedMimeType != "image/jpeg"
//         )
//             throw Error("invalid file");

//         if (req.file.size > 500000) throw Error("max size");
//     } catch (err) {
//         return res.status(202).json(err);
//     }
//     const fileName = req.body.name + ".jpg";

//     await pipeline(
//         req.file.stream,
//         fs.createWriteStream(${__dirname}/../../${fileName})
//     );

//     try {
//         const docs = await Liste.findByIdAndUpdate(
//             req.body.userId, { $set: { image: "./uploads/" + fileName } }, { new: true, upsert: true, setDefaultsOnInsert: true }
//         );
//         return res.status(200).json({ message: "ahla  wsahla", docs });
//     } catch (err) {
//         return res.status(500).json(err);
//     }
// };
