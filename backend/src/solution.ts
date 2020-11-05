/**
 * Get the total number of tiles in the array
 * @param tilesGrid 
 * @returns Number
 */
const getTotalTiles = (tilesGrid:{color?:string,isConnected?:boolean}[][]):number => {
   return tilesGrid.reduce((sum,innerArray)=>sum+innerArray.length,0);
}

/**
 * check if grid is a square grid
 * @param tilesGrid 
 * @returns Boolean
 */
const isNbyNGrid = (tilesGrid:{color?:string,isConnected?:boolean}[][]):boolean =>{
   let isSquareGrid = true;

   if(!Array.isArray(tilesGrid) || tilesGrid.length === 0)
      return false;

   for(let i=0; i<tilesGrid.length; i++){
      //inner grid has to be an array and be of same length as outer
      if(!Array.isArray(tilesGrid[i]) || tilesGrid[i].length !== tilesGrid.length){
         isSquareGrid = false;
         break;
      }
   }

   return isSquareGrid;
}

/**
 * Check if all tiles have colors in them
 * @param tilesGrid 
 * @returns Boolean
 */
const allTilesHaveColors = (tilesGrid:{color?:string,isConnected?:boolean}[][]):boolean =>{
   let allHasColors = true;

   for(let i=0; i<tilesGrid.length; i++){
      for(let j=0; j<tilesGrid[i].length; j++){
         if(!tilesGrid[i][j] || !tilesGrid[i][j].color){
            allHasColors = false;
            break;
         }
      }

      if(!allHasColors)
         break;
   }

   return allHasColors;
}

/**
 * Apply a color to tilesGrid and compute the maximum connected tiles
 * return the  maxConnectedTiles and updated game state
 * @param color 
 * @param tilesGrid 
 * @returns Object
 */
const applyAndGetMaxConnectedTiles = (color:string,tilesGrid:{color?:string,isConnected?:boolean}[][])=>{
   //deep clone to prevent mutating original tilesGrid which can cause problems
   let gameState:{color:string,isConnected:boolean}[][] = JSON.parse(JSON.stringify(tilesGrid));

   //ALGORITHM
   //loop through each tile
   //if tile is connected to new origin, update with new color
   //if not connected but now has same color, update connected status
   //increment the maxconnected tiles
   //tiles are connected North, East, West and South

   let maxConnectedTiles:number = 0;
   for(let i=0; i<gameState.length; i++){
      for(let j=0; j<gameState[i].length; j++){
         //get current tile 
         let currentTile:any = gameState[i][j];

         //get adjacent ones, north east west & south
         let northTile:any = (i - 1) >= 0 ? gameState[i-1][j]:{};
         let southTile:any = (i + 1) < gameState.length ? gameState[i+1][j]:{};
         let westTile:any = (j - 1) >= 0 ? gameState[i][j-1]:{};
         let eastTile:any = (j + 1) < gameState[i].length ? gameState[i][j+1]:{};

         // console.log(`Current Tile: color:${currentTile.color}, isConnected:${currentTile.isConnected}`);
         // console.log(`North Tile: color:${northTile.color}, isConnected:${northTile.isConnected}`);
         // console.log(`South Tile: color:${southTile.color}, isConnected:${southTile.isConnected}`);
         // console.log(`East Tile: color:${eastTile.color}, isConnected:${eastTile.isConnected}`);
         // console.log(`West Tile: color:${westTile.color}, isConnected:${westTile.isConnected}`);

         let connectedColor:string = '';
         if(northTile && northTile.isConnected)
            connectedColor = northTile.color;
         else if(southTile && southTile.isConnected)
            connectedColor = southTile.color;
         else if(westTile && westTile.isConnected)
            connectedColor = westTile.color;
         else if(eastTile && eastTile.isConnected)
            connectedColor = eastTile.color;

         //if a color is connected, update curent tile to same color
         //and indicate as connected, 
         //increment connected tiles
         if(currentTile.isConnected || connectedColor && connectedColor === currentTile.color){
            // console.log(`Tile ${i},${j} connected`);
            currentTile.color = color;
            currentTile.isConnected = true;
            maxConnectedTiles += 1;
         }
      }            
   }

   return {maxConnectedTiles,gameState};
}

interface SolutionResult {
   moves:number,
   history:string[]
};

/**
 * Given a nxn grid with color tiles, find the solution of the problem
 * Solution involves generating the least combination to get the lowest move using A* algorithm
 * @param {Array} color
 * @param {2D Array} problemGrid 
 * @returns Object
 */
const computeSolution = (colors:string[],problemGrid:{color?:string,isConnected?:boolean}[][]):SolutionResult =>{
   let solution:{moves:number,history:string[]} = {moves:0,history:[]};

   //perform initial validation
   if(!colors || colors.length === 0)
      throw new Error("A valid set of colors is required");
   if(!isNbyNGrid(problemGrid) || !allTilesHaveColors(problemGrid))
      throw new Error("A valid tile grid is required");

   //ALGORITHM
   //set the first tile as the solution
   //compute solution using A* algorithm and return
   //get the total number of tiles
   //for each color, choose the result that has the largest number of connected tiles
   let problem:{color?:string,isConnected?:boolean}[][] = problemGrid;

   //set solution to be first tile
   problem[0][0].isConnected = true;

   let totalTiles = getTotalTiles(problem);

   let isSolutionFound = false;
   let iterations = 0;
   while(!isSolutionFound){
      let maxConnectedTiles = 0, appliedTiles:any = null,chosenColor:string="";

      for(let i=0; i<colors.length; i++){
         //get maximum number of tiles after applying new color
         let tilesInfo = applyAndGetMaxConnectedTiles(colors[i],problem);

         // console.log(`Color:${colors[i]}, maxConnectedTiles:${tilesInfo.maxConnectedTiles}`);

         //choose the result that has the largest number of tiles
         //if not chosen, color with lowest rank is used
         if(tilesInfo && tilesInfo.maxConnectedTiles > maxConnectedTiles){
            chosenColor = colors[i];
            maxConnectedTiles = tilesInfo.maxConnectedTiles;
            appliedTiles = tilesInfo.gameState;
         }
      }

      // console.log('Chosen color:'+chosenColor);
      // console.log(appliedTiles);
      //update problem with modified tilesGrid and check solution
      problem = appliedTiles;

      //update moves && history
      solution.moves += 1;
      solution.history.push(chosenColor);

      iterations += 1;

      //check if solution found
      if(maxConnectedTiles === totalTiles){
         isSolutionFound = true;
         break;
      }

      //extra care for loop
      //no connection found break;
      if(maxConnectedTiles === 0 || iterations > 200)
         break;
   }

   return solution;
}
      
export {getTotalTiles,isNbyNGrid,allTilesHaveColors,applyAndGetMaxConnectedTiles ,computeSolution};