# Tile Color Game
This is a one player game vs an AI. 

Three set of colours are provided. After a colour is chosen, all tiles that are connected to the origin are changed to the chosen color.

A player makes a move by choosing one of the three colors. `The goal of the game is to change all the tiles to the same color, preferably with the fewest number of moves possible.`

AI computes its solution mathematically and you either win or lose based on your number of moves. The fewer the moves, the better.

### Live Testing
To test the game live, please visit
- https://color-tile-game.web.app

### Installation
This game requires [Node.js](https://nodejs.org/) v8+ to run.

`Please install Node.js v8+ and clone project before proceeding`

###  Backend Installation and Running
```sh
$ cd projectDir
$ cd backend
$ npm install 
$ npm run start-server 
```
### Frontend Installation and Running 
```sh
$ cd projectDir
$ cd frontend
$ npm install
$ npm run start
```

## Running Backend Test
To run already written unit tests for the services, please do the following:
```sh
$ cd projectDir
$ cd backend
$ npm run test
```

## Running Frontend Test
To run already written unit tests for the services, please do the following:
```sh
$ cd projectDir
$ cd frontend
$ npm run test
```