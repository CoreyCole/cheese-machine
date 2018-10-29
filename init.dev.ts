import * as bst from 'bespoken-tools';
import { yellow } from 'colors';

const server = new bst.LambdaServer('./src/index', 10000, true);
server.start(() => console.log(yellow('[init.dev]: server started and listening on port 10000!')));
