# Dota2Monitor

>Note: Project on hold. The release of [version 7.00](http://dota2.com/700), particularly the addition of hero talent trees, has put the Node GSI server out of date. 

This is a little side-project to play around with the [Dota 2 Game State Integration](https://www.npmjs.com/package/dota2-gsi) service, using Node.js.

Setup:
- Use npm to install express, socket.io, and dota2-gsi
- Add a gamestate_integration_*.cfg file to steamapps\common\dota 2 beta\game\dota\cfg\gamestate_integration\ (an example is provided)
- Run node dota2monitor.js and open up both http://localhost:8081/ and dota itself
