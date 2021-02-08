import cors from "cors";
import bodyParser from "body-parser";
import express from 'express';

export = () =>{
   let router = express.Router();

   //define configuration for app
   router.use(bodyParser.urlencoded({ extended:true}));
   router.use(bodyParser.json());

   //origins to be allowed
   const originsWhitelist = ['http://localhost:3000','https://color-tile-game.web.app'];

   let corsOptions = {
      origin: function(origin:any, callback:any){
            var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
            callback(null, isWhitelisted);
      },
      credentials:true
    };

   //use cors
   router.use(cors(corsOptions));

    //use other settings
   router.use((req, res, next)=> {        
      res.header("Access-Control-Allow-Credentials", "true");

      //control methods to be allowed
      res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");

      //allow headers
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      next();
    });

   return router;
};

