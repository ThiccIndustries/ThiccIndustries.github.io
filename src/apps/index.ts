import { MattGame } from './Mattgame';
import { registerApp } from './registry';
import { Run } from './Run';
import { Theme } from './Theme';
import { Winver } from './Winver';

registerApp(Run);
registerApp(Winver);
registerApp(Theme);
registerApp(MattGame);