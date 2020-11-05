import express from 'express';
import ServerConfig from "./config/serverConfig";
import defaultRoute from "./routes/default-route";

const app = express();

//SET SERVER CONFIGUATION
app.use(ServerConfig());

//DEFINE ALL ROUTES
app.use(defaultRoute());

const PORT =  process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running at localhost:${PORT}`);
});