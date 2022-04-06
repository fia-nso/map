const ObjectID = require("mongoose").Types.ObjectId;
const List = require("../models/Listting");
module.exports.createListing = async(req, res) => {
    //console.log(req).file;
    const Listing = new List({
        name: req.body.name,
        address: req.body.address,
        Latitude: req.body.Latitude,
        Longitude: req.body.Longitude,
        description: req.body.description,
        image: req.body.image,
        Sector: req.body.Sector,
    });
    //
    try {
        console.log("helloss")
        const post = await Listing.save();

        console.log("aas/lema", post);
        return res.status(201).json(post);
    } catch (err) {
        return res.status(402).send(err);
    }
};
module.exports.deleteList = async(req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        const room = await List.findByIdAndDelete(req.params.id);
        res.status(200).json(room);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};
module.exports.updateList = async(req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    const { name, address, description, Latitude, Longitude, Sector, image } =
    req.body;

    console.log(req.body.image);

    try {
        const room = await List.findByIdAndUpdate(req.params.id, req.body);

        res.status(200).json(req.body);
    } catch (err) {
        return res.status(402).json({ message: err });
    }
};
