import React, { useState,useEffect } from 'react';
import './Main.css';
import DisplayHistory from "./DisplayHistory";
import axios from "axios";
import {SERVER_URL} from "../config/serverUrl";

interface StateData {
   aiMoves:number,
   aiHistory:string[]
   userMoves:number,
   userHistory:string[],
   gameData:{color:string,isConnected:boolean}[][]
};

const Main: React.FC<any> = (props) => {

   const [isSolutionFound,updateSolution] = useState(false);
   const [colorsData,updateColors] = useState(['red','gold','blue']);

   //randomize game data
   const randomizeGameData = ():{color:string,isConnected:boolean}[][] => {
      //return 10x10
      //random three colors red, gold, blue
      let tileData:{color:string,isConnected:boolean}[][] = []
      let colors:string[] = colorsData;
      
      for(let i=0; i<10; i++){
         let rowGrid:{color:string,isConnected:boolean}[] = [];

         for(let j=0; j<10; j++){
            //insert random colours in each position
            let randomIndex = Math.floor(Math.random() * Math.floor(3)); //0,1 or 2
            rowGrid.push({color:colors[randomIndex],isConnected:false});
         }

         tileData.push(rowGrid);
      }

      //set the origin to top-left
      tileData[0][0].isConnected = true;

      return tileData;
   }

   //create initial state data
   const initalData:StateData = {
      aiMoves:0,
      aiHistory:[],
      userMoves: 0,
      userHistory:[],
      gameData:randomizeGameData()
   };
   const [stateData,updateStateData] = useState(initalData);

   //get ai solution once on startup
   useEffect(()=>{
      getAISolution();
   },[]);

   // useEffect(() => {
   // },[stateData.userHistory]);
   
   const resetGame = () =>{
      let newState:StateData = {
         aiMoves:0, aiHistory:[],
         userMoves: 0, userHistory:[],
         gameData:randomizeGameData()
      }

      //reset and stop
      updateStateData(newState);
      updateSolution(false);

      // //compute solution on server by sending game data to server and update ai moves
      getAISolution();      
   }

   //get AI solution from server
   const getAISolution = () =>{
      //retrieve solution from server with data set
      let form = {
         colorSet:colorsData,
         problemSet:stateData.gameData
      };

      //submit request to server
      axios.post(SERVER_URL+"/get_solution",form)
         .then((response)=>{
            let {data} = response;
            if(data.solution){
               let moves = data.solution.moves;
               let history = data.solution.history;

               //update ai moves
               updateAIMoves(moves,history);
            }
         })
         .catch(err=>{
            console.log(err);
         });
   }

   const updateAIMoves = (moves:number,history:string[])=>{
      //update ai moves
      updateStateData((state)=>{
         return {...state,aiMoves:moves,aiHistory:history}
      });
   }

   const updateUserHistory = (color:string)=>{
      updateStateData((state)=>{
         return {...state,userMoves:state.userMoves+1,userHistory:[...state.userHistory,color]}
      });
   }

   const computeNewOrigin = (color:string) => {
      //only update if solution hasn't been found
      if(!isSolutionFound){
         //compute new origin/solution and update tiles
         let gameState:{color:string,isConnected:boolean}[][] = JSON.parse(JSON.stringify(stateData.gameData));

         //loop through each tile
         //if tile is in solution ie connected to new origin, update with new color
         //if not connected but now in contact connected, update connected status
         //update state with final value
         //tiles are connected North, East, West and South
         let isSolutionReached = true;
         for(let i=0; i<gameState.length; i++){
            for(let j=0; j<gameState[i].length; j++){
               //get current tile 
               let currentTile:any = gameState[i][j];

               //get adjacent ones, north east west & south
               let northTile:any = (i - 1) >= 0 ? gameState[i-1][j]:{};
               let southTile:any = (i + 1) < gameState.length ? gameState[i+1][j]:{};
               let westTile:any = (j - 1) >= 0 ? gameState[i][j-1]:{};
               let eastTile:any = (j + 1) < gameState[i].length ? gameState[i][j+1]:{};

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
               //and indicate as connected
               if(currentTile.isConnected || connectedColor && connectedColor === currentTile.color){
                  currentTile.color = color;
                  currentTile.isConnected = true;
               }
               else {
                  isSolutionReached = false;
               }
            }            
         }

         //update game state and solution
         updateStateData((state)=>{
            return {...state,gameData:gameState}
         });

         //update if solution is reached
         if(isSolutionReached){
            updateSolution(true);
         }

         //update history and moves
         updateUserHistory(color);
      }
   }

   return (
      <div>
         <header className="text-center">
            <h2>Tile Color Game</h2>
            <h4>This game is played by selecting the colours to fill the tiles in the main box</h4>
         </header>
         <div className="colour-section text-center">
            <div className="color-box red" onClick={(e)=>{computeNewOrigin(colorsData[0])}}></div>
            <div className="color-box gold" onClick={(e)=>{computeNewOrigin(colorsData[1])}}></div>
            <div className="color-box blue" onClick={(e)=>{computeNewOrigin(colorsData[2])}}></div>
            <div className="text-center">Choose color by clicking any of the three colours.</div>
         </div>
         <div className="game-stats clearfix">
            <h4 className="float-left">Total Moves: {stateData.userMoves}</h4>
            <div className="float-right">
               <button className="btn btn-primary" onClick={resetGame}> Reset Game </button>
            </div>
         </div>
         <div id="game-box">
            <div className="game-container">
               {stateData && stateData.gameData && stateData.gameData.map((row,rowInd)=>{
                  return <div key={rowInd} className="row-grid">
                     {row && row.map((column,colIndex)=>{
                        return <div key={rowInd+'_'+colIndex} 
                           className={'tile '+ column.color + " " + (column.isConnected ? "deeper":"")}>
                           <div className="inner"></div>
                        </div>
                     })}               
                  </div>
               })}
            </div>
         </div>
         {isSolutionFound && stateData.aiMoves > 0 && stateData.userMoves <= stateData.aiMoves &&
            <div className="text-center">
               <h3>Cheers, you won!</h3>
               <DisplayHistory userMoves={stateData.userMoves} userHistory={stateData.userHistory}
                  aiMoves={stateData.aiMoves} aiHistory={stateData.aiHistory} />
            </div>               
         }
         {stateData.aiMoves > 0 && stateData.userMoves > 0 && stateData.aiMoves < stateData.userMoves &&
            <div className="text-center">
               <h3>Sorry, you lost!</h3>
               <DisplayHistory userMoves={stateData.userMoves} userHistory={stateData.userHistory}
                  aiMoves={stateData.aiMoves} aiHistory={stateData.aiHistory} />
            </div>               
         }
      </div>
   );
}

export default Main;
