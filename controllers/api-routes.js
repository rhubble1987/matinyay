const db = require('../models');

module.exports = function (app) {


    app.post("/api/parties", function (req, res) {
        console.log(req.body.viewDay);
        console.log(req.body.viewTime);
        db.ViewParty.create({
            imdbId: req.body.imdbId,
            roomName: req.body.roomName,
            viewerNumber: 0,
            viewDay: req.body.viewDay,
            viewTime: req.body.viewTime
        }).then(function (dbViewParty) {
            res.json(dbViewParty);
        });
    });

    app.delete("/api/parties/:id", function (req, res) {
        db.ViewParty.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbViewParty) {
            res.json(dbViewParty);
        });
    });

    app.put("/api/parties/:id", function (req, res) {
        db.ViewParty.update({
            viewerNumber: 0,
            viewDay: req.body.viewDay,
            viewTime: req.body.viewTime
        }, {
            where: {
                id: req.params.id
            }
        }).then(function (dbViewParty) {
            res.json(dbViewParty);
        });
    });

    app.post("/api/chats", function (req, res) {
        db.Chat.create({
            author: null,
            body: req.body.message,
            movieTicketNumber: req.body.movieTicketNumber,
            ViewPartyId: req.body.viewId
        }).then(function (dbChat) {
            res.json(dbChat);
        });
    });

    app.post('/api/movies', function(req,res) {
        db.Movie.create({
            imdbId: req.body.imdbId
        }).then(function(){
            res.sendStatus(200);
        });
    });

    app.get('/api/movies', function(req,res) {
        db.Movie.findAll({}).then(function(data) {
            res.json(data);
        });
    });
}