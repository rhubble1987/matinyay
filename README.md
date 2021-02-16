# Movie Chat

## Table of Contents
[Description](#description)

[Installation](#installation)

[Usage](#usage)

## Description
For our second group project, we had to build a fully functional app hosted in Heroku. Our MVP is a functioning instant messaging web app that allows people to create watch parties and discuss with others in real-time. Users can use the chat to discuss their favorite scenes, behind the scenes trivia, and other engaging aspects of a movie with other film enthusiasts. The app implements Express.js for sever-side functionality, Sequelize.js and MySQL for database, Express-Handlebars.js for the HTML templating, and Socket.io to power the instant messaging feature. This is very much just an MVP, and I have plans to add much more functionality to the app in the coming months. Updates to be made include account creation and authentication, ability to add movies in addition to view parties for a set list of movies, and much more!

## Installation
Downloading respository. In directory run npm install. This program requires mysql.
Run schema.sql in mysql to create database.
Edit config file in way of choosing to tie database name, username and password of mysql.

## Usage
The application is deployed to https://rocky-shore-62647.herokuapp.com/.
Server can be run in test usage with node server.js command, or npm run start.

### Components Used
Node

npm packages
mysql
express
express-handlebars
dotenv
eslint
socket.io
sequelize-cli