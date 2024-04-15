import yargs from 'yargs';
import express from 'express';
import expressWs from 'express-ws';
import bodyParser from 'body-parser';
import restRoutes from 'app/rest_routes';
import wsRoutes from 'app/ws_routes';

const app = express();
expressWs(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(restRoutes);
app.use(wsRoutes);

const args = yargs(process.argv.slice(2))
  .option({
    port: { type: 'number', default: 5000, describe: 'Port to serve on' },
  })
  .help()
  .parseSync();

app.listen(args.port, () => {
  console.log(`Soul Machines Async Skill started on port ${args.port}.`);
});
