import {assert } from "chai";
import {
   getTotalTiles,isNbyNGrid,allTilesHaveColors,
   applyAndGetMaxConnectedTiles ,computeSolution
} from "../solution";
import 'mocha';

//Unit TESTS
describe('Unit Test Suite',function(){
   it('gets total tiles correctly',function(){
      const tileData = [
         [{color:'Red'},{color:'Blue'}]
      ]

      return assert.equal(getTotalTiles(tileData),2);
   });

   it('gets total tiles correctly again',function(){
      const tileData = [
         [{color:'Red'},{color:'Blue'}],
         [{color:'Blue'},{color:'Blue'}]
      ]

      return assert.equal(getTotalTiles(tileData),4);
   });

   it('returns true for isNByN using square matrix',function(){
      const tileData = [
         [{color:'Red'},{color:'Blue'}],
         [{color:'Blue'},{color:'Blue'}]
      ]

      return assert.isTrue(isNbyNGrid(tileData));
   });

   it('returns false for isNByN using rectangular matrix',function(){
      const tileData = [
         [{color:'Red'},{color:'Blue'}]
      ]

      return assert.isFalse(isNbyNGrid(tileData));
   });

   it('returns true when all tiles have color property',function(){
      const tileData = [
         [{color:'Red'},{color:'Blue',}]
      ]

      return assert.isTrue(allTilesHaveColors(tileData));
   });
   
   it('returns false when some tiles have color property',function(){
      const tileData = [
         [{color:'Red'},{colorszz:'Blue',}]
      ]

      return assert.isFalse(allTilesHaveColors(tileData));
   });

   it('apply and get max connection works correctly',function(){
      const tileData = [
         [{color:'Red',isConnected:true},{color:'Blue',isConnected:false}],
         [{color:'Blue',isConnected:false},{color:'Blue',isConnected:false}]
      ]

      return assert.include(applyAndGetMaxConnectedTiles('Blue',tileData),{maxConnectedTiles:4});
   });

   it('fails when an empty colors array is provided',function(){
      const colorSet:string[] = [];
      const tileData = [
         [{color:'Blue',isConnected:true}]
      ]

      //should throw an error
      return assert.throws(function(){
         computeSolution(colorSet,tileData);
      },"A valid set of colors is required");
   });

   it('fails when tilesGrid is not N by N array is provided',function(){
      const colorSet:string[] = ['Red','Blue'];
      const tileData = [
         [{color:'Red'},{color:'Red'},{color:'Blue'}],
         [{color:'Blue'}]
      ]

      //should throw an error
      return assert.throws(function(){
         computeSolution(colorSet,tileData);
      },"A valid tile grid is required");
   });

   it('computes solution correctly for one tile grid',function(){
      const colorSet:string[] = ['Blue'];
      const tileData = [
         [{color:'Blue'}]
      ]

      return assert.hasAllKeys(computeSolution(colorSet,tileData),['moves','history']);
   });

   it('computes solution correctly for 2x2 tile grid by returning 1 move',function(){
      const colorSet:string[] = ['Blue','Red'];
      const tileData = [
         [{color:'Red'},{color:'Blue'}],
         [{color:'Blue'},{color:'Blue'}]
      ]
      let solution = computeSolution(colorSet,tileData);
      return assert.deepInclude(solution,{moves:1,history:['Blue']});
   });
   
   it('computes solution correctly for 4x4 tile grid',function(){
      const colorSet:string[] = ['Blue','Red','Green'];
      const tileData = [
         [{color:"Blue"},{color:"Red"},{color:"Green"},{color:"Blue"}],
         [{color:"Green"},{color:"Green"},{color:"Red"},{color:"Green"}],
         [{color:"Red"},{color:"Red"},{color:"Green"},{color:"Blue"}],
         [{color:"Red"},{color:"Blue"},{color:"Red"},{color:"Red"}]   
      ]
      let solution = computeSolution(colorSet,tileData);
      return assert.deepInclude(solution,{moves:5,history:['Green','Red','Green','Blue','Red']});
   });   
})
