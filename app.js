const restify = require('restify');
const builder = require('botbuilder');
const config = require('./config');

//setup Restify server
var server = restify.createServer();
server.listen(process.env.port|| process.env.PORT || 3978, function(){
    console.log('%s listening to %s', server.name, server.url);
});

//create chat bot

const connector = new builder.ChatConnector({
    appId:config.appId,
    appPassword: config.appPassword
});

const bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());


//bot dialog
//sending hello world all the time
// bot.dialog('/', function(session){
//     session.send('Hello World');
// })

bot.dialog('/', [
    (session)=> {
        builder.Prompts.text(session, 'Hi, what is your name?');
    }, (session, results) => {
        session.send('Hello %s!', results.response);
    }
])
