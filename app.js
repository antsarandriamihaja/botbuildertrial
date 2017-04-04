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

//Unstored user data
// bot.dialog('/', [
//     (session)=> {
//         builder.Prompts.text(session, 'Hi, what is your name?');
//     }, (session, results) => {
//         session.send('Hello %s!', results.response);
//     }
// ])

//store user info for session

bot.dialog('/', [
    (session, args, next) => {
        if (!session.userData.name){
            session.beginDialog('/profile');
        }
        else {
            next();
        }
    },
    (session, results) => {
        session.send('Hello %s', session.userData.name)
    }
]);

bot.dialog('/profile', [
    (session) => {
        builder.Prompts.text(session, 'Hi what is your name?');
    },
    (session, results) => {
        session.userData.name = results.response;
        session.endDialog();
    }
]);