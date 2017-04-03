var restify = require('restify');
var builder = require('botbuilder');


//setup Restify server
var server = restify.createServer();
server.listen(process.env.port|| process.env.PORT || 3000, function(){
    console.log('%s listening to %s', server.name, server.url);
});

//create chat bot

var connecter = new builder.ChatConnector({
    appId:
});