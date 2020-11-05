# Tile Color Game
This game is played by selecting the colours to fill the tiles in the main grid until all tiles of the board have the same color.

A player makes a move by choosing one of the three colors. The goal of the game is to change all the tiles to the same color, preferably with the fewest number of moves possible.

### Live Testing
To test the game live, please visit
- https://everreal-test.web.app

### Installation
This game requires [Node.js](https://nodejs.org/) v8+ to run.

`Please install Node.js v8+ before proceeding`

###  Backend Installation and Running
Install the dependencies and devDependencies
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

## Running Test Backend Test
To run already written unit tests for the services, please do the following:
```sh
$ cd projectDir
$ cd backend
$ npm run test
```

### Building for production
For frontend production release:
```sh
$ cd projectDir
$ cd frontend
$ npm run build
```

### Upload to Hosting Server
- Copy files in your frontend build directory to hosting server.
- Deploy backend to production server and start
