import express from 'express';
import {computeSolution} from "../solution";

export = () =>{
   let router = express.Router();

   //testing server
   router.get("/",(req,res)=>{
      res.json({message:"Server works"});
   })

   /**
    * ========================================
    *  GENERATE COMPUTER SOLUTION for problem
    * ========================================
    */
   router.post('/get_solution', (req:any, res:any) => {
      //retrieve problem and set of colors
      let colors = req.body && req.body.colorSet ? req.body.colorSet : [];
      let problem = req.body && req.body.problemSet ? req.body.problemSet : [[]];

      try{
         //generate solution for the problem
         let solution = computeSolution(colors,problem);
         res.json({solution:solution});
      }
      catch(err){
         res.status(400).send(err.message);
      }
   });

   /**
    * ======================
    *  HANDLE 404 requests
    * ======================
    */
   router.all('*',(req,res)=>{
      res.status(404).send("Page or resource not found");      
   });

   /**
    * =====================
    *  ERROR HANDLER ROUTE
    * =====================
    */
   router.use((err:any,req:any,res:any,next:any)=>{
      res.status(500).send(" A problem occurred on the server.");      
   });

   return router;
}