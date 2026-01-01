import { Error } from './Error';
import { Explorer } from './Explorer';
import { MattGame } from './Mattgame';
import { Minecraft } from './Minecraft';
import { registerApp } from './registry';
import { Run } from './Run';
import { Theme } from './Theme';
import { Winver } from './Winver';

registerApp(Run);
registerApp(Winver);
registerApp(Theme);
registerApp(MattGame);
registerApp(Minecraft);
registerApp(Explorer);
registerApp(Error);