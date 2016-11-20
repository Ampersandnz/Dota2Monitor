var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var d2gsi = require('dota2-gsi');
var fs = require("fs");
var itemsJSON = require("./data/items");
var heroesJSON = require("./data/heroes");
var abilitiesJSON = require("./data/abilities");
var server = new d2gsi();
var clients = [];

var heroes = {}; // Dict to map console object name -> Actual hero name
var items = {}; // Dict to map console object name -> Actual item name
var abilities = {}; // Dict to map console object name -> Actual ability name

server.events.on('newclient', function(client) {
    var update = "New client connection, IP address: " + client.ip + ", Auth token: " + client.auth.token;
    console.log(update);
    io.emit('d2gsi general update', update);

    client.on('player:activity', function(activity) {
        if (activity == 'playing') {
            update = "Game started!";
            console.log(update);
            io.emit('d2gsi general update', update);
        }
    });

    client.on('hero:level', function(level) {
        update = heroes[client.gamestate.hero.name] + " is now level " + client.gamestate.hero.level;
        console.log(update);
        io.emit('d2gsi general update', update);
    });

    client.on('abilities:ability0:can_cast', function(can_cast) {
        if (can_cast) {
            update = abilities[client.gamestate.abilities.ability0.name] + " [" + client.gamestate.abilities.ability0.level + "] off cooldown!";
            console.log(update);
            io.emit('d2gsi general update', update);
        }
    })

    client.on('abilities:ability1:can_cast', function(can_cast) {
        if (can_cast) {
            update = abilities[client.gamestate.abilities.ability1.name] + " [" + client.gamestate.abilities.ability1.level + "] off cooldown!";
            console.log(update);
            io.emit('d2gsi general update', update);
        }
    })

    client.on('abilities:ability2:can_cast', function(can_cast) {
        if (can_cast) {
            update = abilities[client.gamestate.abilities.ability2.name] + " [" + client.gamestate.abilities.ability2.level + "] off cooldown!";
            console.log(update);
            io.emit('d2gsi general update', update);
        }
    })

    client.on('abilities:ability3:can_cast', function(can_cast) {
        if (can_cast) {
            update = abilities[client.gamestate.abilities.ability3.name] + " [" + client.gamestate.abilities.ability3.level + "] off cooldown!";

            console.log(update);
            io.emit('d2gsi general update', update);
        }
    })

    clients.push(client);
});

setInterval(function() {
    clients.forEach(function(client, index) {
        console.log(heroes[client.gamestate.hero.name] + " GPM: " + client.gamestate.player.gpm + ", XPM: " + client.gamestate.player.xpm);

        io.emit('d2gsi gpm update', client.gamestate.player.gpm);
        io.emit('d2gsi xpm update', client.gamestate.player.xpm);
    });
}, 10 * 1000); // Every 10 seconds, update gpm and xpm

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

http.listen(8081, function() {
    console.log("Ready to send events to clients on port 8081");

	var itemsArray = itemsJSON.items[0];
	var heroesArray = heroesJSON.heroes[0];
	var abilitiesArray = abilitiesJSON.abilities[0];

	for (var item in itemsArray) {
	    items[item] = itemsArray[item];
	}

	for (var hero in heroesArray) {
	    heroes[hero] = heroesArray[hero];
	}

	for (var ability in abilitiesArray) {
	    abilities[ability] = abilitiesArray[ability];
	}

	console.log(abilities);
});