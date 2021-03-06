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
    var update = "New client connection, IP address: " + client.ip + (client.auth && client.auth.token ? ", Auth token: " + client.auth.token : "");
    console.log(update);
    io.emit('d2gsi message update', update);

    client.on('player:activity', function(activity) {
        if (activity == 'playing') {
            update = "Game started!";
            console.log(update);
            io.emit('d2gsi message update', update);
        }
    });

    client.on('hero:level', function(level) {
        update = heroes[client.gamestate.hero.name] + " is now level " + client.gamestate.hero.level;
        console.log(update);
        io.emit('d2gsi message update', update);
    });

    client.on('abilities:ability0:can_cast', function(can_cast) {
        if (can_cast) {
            update = abilities[client.gamestate.abilities.ability0.name] + " [" + client.gamestate.abilities.ability0.level + "] off cooldown!";
            console.log(update);
            io.emit('d2gsi message update', update);
        }
    });

    client.on('abilities:ability1:can_cast', function(can_cast) {
        if (can_cast) {
            update = abilities[client.gamestate.abilities.ability1.name] + " [" + client.gamestate.abilities.ability1.level + "] off cooldown!";
            console.log(update);
            io.emit('d2gsi message update', update);
        }
    });

    client.on('abilities:ability2:can_cast', function(can_cast) {
        if (can_cast) {
            update = abilities[client.gamestate.abilities.ability2.name] + " [" + client.gamestate.abilities.ability2.level + "] off cooldown!";
            console.log(update);
            io.emit('d2gsi message update', update);
        }
    });

    client.on('abilities:ability3:can_cast', function(can_cast) {
        if (can_cast) {
            update = abilities[client.gamestate.abilities.ability3.name] + " [" + client.gamestate.abilities.ability3.level + "] off cooldown!";

            console.log(update);
            io.emit('d2gsi message update', update);
        }
    });

    client.on('abilities:ability4:can_cast', function(can_cast) {
        if (can_cast) {
            update = abilities[client.gamestate.abilities.ability4.name] + " [" + client.gamestate.abilities.ability4.level + "] off cooldown!";

            console.log(update);
            io.emit('d2gsi message update', update);
        }
    });

    client.on('abilities:ability5:can_cast', function(can_cast) {
        if (can_cast) {
            update = abilities[client.gamestate.abilities.ability5.name] + " [" + client.gamestate.abilities.ability5.level + "] off cooldown!";

            console.log(update);
            io.emit('d2gsi message update', update);
        }
    });

    client.on('items:slot1:can_cast', function(can_cast) {
        if (can_cast) {
            update = items[client.gamestate.items.slot1.name] + " off cooldown!";

            console.log(update);
            io.emit('d2gsi message update', update);
        }
    });

    client.on('items:slot2:can_cast', function(can_cast) {
        if (can_cast) {
            update = items[client.gamestate.items.slot1.name] + " off cooldown!";

            console.log(update);
            io.emit('d2gsi message update', update);
        }
    });

    client.on('items:slot3:can_cast', function(can_cast) {
        if (can_cast) {
            update = items[client.gamestate.items.slot1.name] + " off cooldown!";

            console.log(update);
            io.emit('d2gsi message update', update);
        }
    });

    client.on('items:slot4:can_cast', function(can_cast) {
        if (can_cast) {
            update = items[client.gamestate.items.slot1.name] + " off cooldown!";

            console.log(update);
            io.emit('d2gsi message update', update);
        }
    });

    client.on('items:slot5:can_cast', function(can_cast) {
        if (can_cast) {
            update = items[client.gamestate.items.slot1.name] + " off cooldown!";

            console.log(update);
            io.emit('d2gsi message update', update);
        }
    });

    client.on('items:slot6:can_cast', function(can_cast) {
        if (can_cast) {
            update = items[client.gamestate.items.slot1.name] + " off cooldown!";

            console.log(update);
            io.emit('d2gsi message update', update);
        }
    });

    client.on('player:gpm', function(gpm) {
        console.log("GPM: " + gpm);
        io.emit('d2gsi gpm update', gpm);
    });

    client.on('player:xpm', function(xpm) {
        console.log("XPM: " + xpm);
        io.emit('d2gsi xpm update', xpm);
    });

    client.on('player:kills', function(kills) {
        console.log("Kills: " + kills);
        io.emit('d2gsi kills update', kills);
    });

    client.on('player:deaths', function(deaths) {
        console.log("Deaths: " + deaths);
        io.emit('d2gsi deaths update', deaths);
    });

    client.on('player:assists', function(assists) {
        console.log("Assists: " + assists);
        io.emit('d2gsi assists update', assists);
    });

    client.on('hero:name', function(name) {
        var hero = heroes[name];
        console.log("Hero picked: " + hero);
        io.emit('d2gsi hero update', hero);
    });

    client.on('abilities:ability1:name', function(name) {
        var ability = abilities[name];
        io.emit('d2gsi ability1 update', ability);

        var update = "Ability " + ability + " acquired. TODO: FIND OUT IF THIS IS EMITTED ON THE FIRST SKILL POINT OR ON PICK";
        console.log(update);
        io.emit('d2gsi message update', update);
    });

    client.on('abilities:ability2:name', function(name) {
        var ability = abilities[name];
        io.emit('d2gsi ability2 update', ability);

        var update = "Ability " + ability + " acquired. TODO: FIND OUT IF THIS IS EMITTED ON THE FIRST SKILL POINT OR ON PICK";
        console.log(update);
        io.emit('d2gsi message update', update);
    });

    client.on('abilities:ability3:name', function(name) {
        var ability = abilities[name];
        io.emit('d2gsi ability3 update', ability);

        var update = "Ability " + ability + " acquired. TODO: FIND OUT IF THIS IS EMITTED ON THE FIRST SKILL POINT OR ON PICK";
        console.log(update);
        io.emit('d2gsi message update', update);
    });

    client.on('abilities:ability4:name', function(name) {
        var ability = abilities[name];
        io.emit('d2gsi ability4 update', ability);

        var update = "Ability " + ability + " acquired. TODO: FIND OUT IF THIS IS EMITTED ON THE FIRST SKILL POINT OR ON PICK";
        console.log(update);
        io.emit('d2gsi message update', update);
    });

    client.on('items:slot1:name', function(name) {
        var item = items[name];
        io.emit('d2gsi item1 update', item);

        var update = "Item " + item + " acquired.";
        console.log(update);
        io.emit('d2gsi message update', update);
    });

    client.on('items:slot2:name', function(name) {
        var item = items[name];
        io.emit('d2gsi item2 update', item);

        var update = "Item " + item + " acquired.";
        console.log(update);
        io.emit('d2gsi message update', update);
    });

    client.on('items:slot3:name', function(name) {
        var item = items[name];
        io.emit('d2gsi item3 update', item);

        var update = "Item " + item + " acquired.";
        console.log(update);
        io.emit('d2gsi message update', update);
    });

    client.on('items:slot4:name', function(name) {
        var item = items[name];
        io.emit('d2gsi item4 update', item);

        var update = "Item " + item + " acquired.";
        console.log(update);
        io.emit('d2gsi message update', update);
    });

    client.on('items:slot5:name', function(name) {
        var item = items[name];
        io.emit('d2gsi item5 update', item);

        var update = "Item " + item + " acquired.";
        console.log(update);
        io.emit('d2gsi message update', update);
    });

    client.on('items:slot6:name', function(name) {
        var item = items[name];
        io.emit('d2gsi item6 update', item);

        var update = "Item " + item + " acquired.";
        console.log(update);
        io.emit('d2gsi message update', update);
    });

    client.on('items:stash1:name', function(name) {
        var item = items[name];
        io.emit('d2gsi stash1 update', item);

        var update = "Stash " + item + " acquired.";
        console.log(update);
        io.emit('d2gsi message update', update);
    });

    client.on('items:stash2:name', function(name) {
        var item = items[name];
        io.emit('d2gsi stash2 update', item);

        var update = "Stash " + item + " acquired.";
        console.log(update);
        io.emit('d2gsi message update', update);
    });

    client.on('items:stash3:name', function(name) {
        var item = items[name];
        io.emit('d2gsi stash3 update', item);

        var update = "Stash " + item + " acquired.";
        console.log(update);
        io.emit('d2gsi message update', update);
    });

    client.on('items:stash4:name', function(name) {
        var item = items[name];
        io.emit('d2gsi stash4 update', item);

        var update = "Stash " + item + " acquired.";
        console.log(update);
        io.emit('d2gsi message update', update);
    });

    client.on('items:stash5:name', function(name) {
        var item = items[name];
        io.emit('d2gsi stash5 update', item);

        var update = "Stash " + item + " acquired.";
        console.log(update);
        io.emit('d2gsi message update', update);
    });

    client.on('items:stash6:name', function(name) {
        var item = items[name];
        io.emit('d2gsi stash6 update', item);

        var update = "Stash " + item + " acquired.";
        console.log(update);
        io.emit('d2gsi message update', update);
    });

    client.on('map:gamestate', function(gamestate) {
        var update = "map:gamestate - " + gamestate;
        console.log(update);
        io.emit('d2gsi message update', update);
    });

    client.on('map:win_team', function(win_team) {
        var update = "map:win_team - " + win_team;
        console.log(update);
        io.emit('d2gsi message update', update);
    });

    client.on('map:ward_purchase_cooldown', function(ward_purchase_cooldown) {
        var update = "map:ward_purchase_cooldown - " + ward_purchase_cooldown;
        console.log(update);
        io.emit('d2gsi message update', update);
    });

    client.on('player:team_name', function(team_name) {
        var update = "player:team_name - " + team_name;
        console.log(update);
        io.emit('d2gsi message update', update);
    });

    clients.push(client);
});

setInterval(function() {
    clients.forEach(function(client, index) {
    });

    // io.emit('d2gsi message update', "Test");

// Just test data
    // io.emit('d2gsi hero update', heroes["npc_dota_hero_abaddon"]);
    // io.emit('d2gsi ability1 update', abilities["abaddon_death_coil"]);
    // io.emit('d2gsi ability2 update', abilities["abaddon_aphotic_shield"]);
    // io.emit('d2gsi ability3 update', abilities["abaddon_frostmourne"]);
    // io.emit('d2gsi ability4 update', abilities["abaddon_borrowed_time"]);
    // io.emit('d2gsi ability5 update', abilities["abaddon_frostmourne"]);
    // io.emit('d2gsi ability6 update', abilities["abaddon_borrowed_time"]);
    // io.emit('d2gsi item1 update', items["item_ultimate_scepter"]);
    // io.emit('d2gsi item2 update', items["item_greater_crit"]);
    // io.emit('d2gsi item3 update', items["item_travel_boots_2"]);
    // io.emit('d2gsi item4 update', items["item_gem"]);
    // io.emit('d2gsi item5 update', items["item_sheepstick"]);
    // io.emit('d2gsi item6 update', items["item_sange_and_yasha"]);
    // io.emit('d2gsi stash1 update', items["item_dagon_4"]);
    // io.emit('d2gsi stash2 update', items["item_bracer"]);
    // io.emit('d2gsi stash3 update', items["item_ward_sentry"]);
    // io.emit('d2gsi stash4 update', items["item_recipe_desolator"]);
    // io.emit('d2gsi stash5 update', items["item_rapier"]);
    // io.emit('d2gsi stash6 update', items["item_tango"]);
    // io.emit('d2gsi gpm update', "467");
    // io.emit('d2gsi xpm update', "591");
    // io.emit('d2gsi kills update', "7");
    // io.emit('d2gsi deaths update', "3");
    // io.emit('d2gsi assists update', "18");
//Will remove when the page layout/formatting is correct

}, 1 * 1000); // Every second

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(path.join(__dirname, 'public')));

http.listen(8081, function() {
    console.log("Initialising dictionaries");

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

    console.log("Ready to send events to clients on port 8081");
});