var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var d2gsi = require('dota2-gsi');
var fs = require("fs");
var path = require('path')
var itemsJSON = require("./data/items");
var heroesJSON = require("./data/heroes");
var abilitiesJSON = require("./data/abilities");
var server = new d2gsi();
var clients = [];

var heroes = {}; // Dict to map console object name -> Actual hero name
var items = {}; // Dict to map console object name -> Actual item name
var abilities = {}; // Dict to map console object name -> Actual ability name

server.events.on('newclient', function(client) {
    var update = "New client connection, IP address: " + client.ip;
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
    });

    client.on('abilities:ability1:can_cast', function(can_cast) {
        if (can_cast) {
            update = abilities[client.gamestate.abilities.ability1.name] + " [" + client.gamestate.abilities.ability1.level + "] off cooldown!";
            console.log(update);
            io.emit('d2gsi general update', update);
        }
    });

    client.on('abilities:ability2:can_cast', function(can_cast) {
        if (can_cast) {
            update = abilities[client.gamestate.abilities.ability2.name] + " [" + client.gamestate.abilities.ability2.level + "] off cooldown!";
            console.log(update);
            io.emit('d2gsi general update', update);
        }
    });

    client.on('items:slot1:can_cast', function(can_cast) {
        if (can_cast) {
            update = items[client.gamestate.items.slot1.name] + " off cooldown!";

            console.log(update);
            io.emit('d2gsi general update', update);
        }
    });

    client.on('items:slot2:can_cast', function(can_cast) {
        if (can_cast) {
            update = items[client.gamestate.items.slot1.name] + " off cooldown!";

            console.log(update);
            io.emit('d2gsi general update', update);
        }
    });

    client.on('items:slot3:can_cast', function(can_cast) {
        if (can_cast) {
            update = items[client.gamestate.items.slot1.name] + " off cooldown!";

            console.log(update);
            io.emit('d2gsi general update', update);
        }
    });

    client.on('items:slot4:can_cast', function(can_cast) {
        if (can_cast) {
            update = items[client.gamestate.items.slot1.name] + " off cooldown!";

            console.log(update);
            io.emit('d2gsi general update', update);
        }
    });

    client.on('items:slot5:can_cast', function(can_cast) {
        if (can_cast) {
            update = items[client.gamestate.items.slot1.name] + " off cooldown!";

            console.log(update);
            io.emit('d2gsi general update', update);
        }
    });

    client.on('items:slot6:can_cast', function(can_cast) {
        if (can_cast) {
            update = items[client.gamestate.items.slot1.name] + " off cooldown!";

            console.log(update);
            io.emit('d2gsi general update', update);
        }
    });

    client.on('abilities:ability3:can_cast', function(can_cast) {
        if (can_cast) {
            update = abilities[client.gamestate.abilities.ability3.name] + " [" + client.gamestate.abilities.ability3.level + "] off cooldown!";

            console.log(update);
            io.emit('d2gsi general update', update);
        }
    });

    client.on('player:gpm', function(gpm) {
        if (gpm) {
            console.log("GPM: " + gpm);
            io.emit('d2gsi gpm update', gpm);
        }
    });

    client.on('player:xpm', function(xpm) {
        if (xpm) {
            console.log("XPM: " + xpm);
            io.emit('d2gsi xpm update', xpm);
        }
    });

    clients.push(client);
});

setInterval(function() {
    clients.forEach(function(client, index) {
    });

    //io.emit('d2gsi general update', "Test");
}, 10 * 1000); // Every 10 seconds, update gpm and xpm

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(path.join(__dirname, '/public')));

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
});