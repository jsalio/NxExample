/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
// const app = express();

// app.use('/assets', express.static(path.join(__dirname, 'assets')));

// app.get('/api', (req, res) => {
//   res.send({ message: 'Welcome to dashboard!' });
// });

// const port = process.env.PORT || 3333;
// const server = app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}/api`);
// });
// server.on('error', console.error);

import * as bodyParser from 'body-parser';

import { Container } from 'inversify';
import { interfaces, InversifyExpressServer, TYPE } from 'inversify-express-utils';

// declare metadata by @controller annotation
import "./controllers/Auth.controller";
import { IProDoctivityAuth } from '@Capure/lib/models';

// set up container
let container = new Container();

// set up bindings
container.bind<IProDoctivityAuth>('FooService').to(undefined);

// create server
let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  // add body parser
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});

let app = server.build();
app.listen(3000);
