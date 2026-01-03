import { img } from '../ui/util/files';
import { Error } from './Error';
import { Explorer } from './explorer/Explorer';
import { Hmm } from './Hmm';
import { MattGame } from './Mattgame';
import { Minecraft } from './Minecraft';
import { Plaza } from './plaza/Plaza';
import { registerApp } from './registry';
import { Run } from './Run';
import { Theme } from './Theme';
import { Winver } from './Winver';

registerApp(Run);
registerApp(Winver);
registerApp(Theme);
registerApp(MattGame);
registerApp(Minecraft);
registerApp(Error);
registerApp(Hmm);
registerApp(Plaza);

registerApp(Explorer, {title: "Games", id: "games", command: "games", showInStart: "downloads", icon16: img("apps/explorer/icons/games.png")});
registerApp(Explorer, {title: "Software", id: "software", command: "software", showInStart: "downloads", icon16: img("apps/explorer/icons/exe.png")});
registerApp(Explorer, {title: "Windows Installers", id: "windows", command: "windows", showInStart: "downloads", icon16: img("apps/explorer/icons/windows.png")});
registerApp(Explorer, {title: "Mac OS Installers", id: "mac", command: "mac", showInStart: "downloads", icon16: img("apps/explorer/icons/mac.png")});