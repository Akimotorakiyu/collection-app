import { ipcMain, webContents, BrowserWindow } from "electron";
import { myWindows } from "./windowsManage";

/**
 * @author 昝磊
 */

/**
 * 广播到 ipnRender
 * @param from - 从哪来的webContents
 * @param channel - 信道
 * @param args - 参数
 */
export function broadcast(from: webContents, channel: string, ...args: any[]) {
  // console.log("from", from.id);
  // console.log(
  //   "on broadcast",
  //   Array.from(windows).map(ele => ele.id)
  // );

  const windows: BrowserWindow[] = Array.from(myWindows).filter(
    win => win.webContents != from
  ); //除非明确需要修改，否则不应(此处有issue，id不一定准) @author 昝磊
  windows.forEach(win => {
    win.webContents.send(channel, ...args);
  });
}

/**
 * 广播转发
 */
ipcMain.on("broadcast", (event, channel: string, ...args: []) => {
  broadcast(event.sender, channel, ...args);
});

ipcMain.handle("windowShowControl", (event, command, option) => {
  const win = Array.from(myWindows).find(
    win => win.webContents == event.sender
  ); //除非明确需要修改，否则不应(此处有issue，id不一定准) @author 昝磊

  if (win) {
    switch (command) {
      case "mini":
        win.minimize();
        break;
      case "max":
        win.maximize();
        break;
      case "unmax":
        win.unmaximize();
        break;
      case "close":
        win.close();
        break;
      case "devtool":
        win.webContents.openDevTools();
        break;
      case "setSize":
        if (option) {
          win.setSize(option.width, option.height);
        }
        break;

      default:
        break;
    }
  }
});
