'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').ApiAiApp;
const functions = require('firebase-functions');

// API.AI Constants

const Actions = {
  WELCOME:  'welcome',
  EXIT:     'exit',
  GIVE_TIP: 'give_tip'
} 
const Parameters = {}
const Contexts = {}

// Handlers

const welcomeHandler = app => {
  app.ask('Welcome to Life Pro Tips! Today\'s protip is brought to you by: ');
}

const tipHandler = app => {
  app.tell("Here's a tip");
}

// Class setup

const actionMap = new Map();
actionMap.set('welcome', welcomeHandler);

const lifeProTips = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));
  app.handleRequest(actionMap);
});

module.exports = {
  lifeProTips
}
