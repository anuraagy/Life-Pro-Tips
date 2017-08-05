'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').ApiAiApp;
const functions = require('firebase-functions');


// Handlers

const welcomeHandler = app => {
  const json = JSON.parse(require('fs').readFileSync('data.json', 'utf8'));
  const num = Math.floor((Math.random() * 969) + 1);

  const title = json[num].title;
  const author = json[num].author;

  app.ask('Welcome to Life Pro Tips! Here your tip of the day: ' + title + '. Would you like another tip?' );
}

const tipHandler = app => {
  const json = JSON.parse(require('fs').readFileSync('data.json', 'utf8'));
  const num = Math.floor((Math.random() * 969) + 1);

  const title = json[num].title;
  const author = json[num].author;

  app.ask(title + " brought to you by: " + author + ". Would you like another tip?");
}

const actionMap = new Map();

actionMap.set('welcome', welcomeHandler);
actionMap.set('give_tip', tipHandler);

const lifeProTips = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));
  app.handleRequest(actionMap);
});

module.exports = {
  lifeProTips
}
