import {
  app,
  BrowserWindow,
  ipcMain,
  BrowserWindowConstructorOptions,
  Event
} from "electron";
import * as path from "path";
import config from "../../config";

const preload = path.join(config.status.basePath, "temp", "preload.js");
// 只要不是生产模式，全都是开发模式
const isDevelopment = process.env.NODE_ENV !== "production";

const schemes = new Map<string, string>();

export function createWindow(urlPath: string) {
  // Create the browser window.

  windowInterceptor(urlPath);
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
export const myWindows = new Set<BrowserWindow>();

const consoleWindow = new Set<BrowserWindow>();

function consoleToWindow() {
  ["log", "info", "warn", "error"].forEach(key => {
    const tempValue: (...args: any[]) => void = Reflect.get(
      console,
      key,
      console
    );

    const newValue = (...args: any[]) => {
      tempValue(...args);
      consoleWindow.forEach(ele => {
        ele.webContents.send("console", key, ...args);
      });
    };

    Reflect.set(console, key, newValue, console);
  });
}

consoleToWindow();

function windowInterceptor(url: string, event?: Event) {
  const urlInfo = new URL(url);
  console.log("urlInfo", urlInfo);

  const protocolString = urlInfo.protocol.endsWith(":")
    ? urlInfo.protocol.slice(0, -1)
    : urlInfo.protocol;

  if (schemes.has(protocolString)) {
    console.log("mini app");
    const miniFolder = schemes.get(protocolString);
    if (!miniFolder) {
      throw "未定义的mini协议";
    }

    const miniWin = new BrowserWindow({
      width: 1080,
      height: 600,
      frame: false,
      webPreferences: {
        preload
      }
    });

    // see docs
    if (event) {
      event.preventDefault();
      (event as any).newGuest = miniWin;
    }

    miniWin.loadURL(url);
  } else {
    let win: BrowserWindow;
    if (["127.0.0.1", "localhost"].includes(urlInfo.hostname)) {
      win = new BrowserWindow({
        width: 1080,
        height: 600,
        frame: false,
        webPreferences: {
          preload
        }
      });
    } else {
      win = new BrowserWindow({
        width: 1080,
        height: 600
      });
    }
    win.loadURL(url);
    // see docs
    if (event) {
      event.preventDefault();
      (event as any).newGuest = win;
    }
  }
}

export function miniInterceptor(scheme: string, miniFolder: string) {
  schemes.set(scheme, miniFolder);
}

app.on("browser-window-created", (event, win) => {
  console.log("interceptor watching...");
  win.webContents.on(
    "new-window",
    (event, url, frameName, disposition, options) => {
      console.log("new window", url);
      windowInterceptor(url, event);
    }
  );
});

app.on("browser-window-created", (event, win) => {
  myWindows.add(win);
  win.removeMenu();

  // 只要不是生产模式，全都是开发模式
  const isDevelopment = process.env.NODE_ENV !== "production";
  if (isDevelopment) {
    console.log(
      "after create myWindows",
      Array.from(myWindows).map(ele => ele.id)
    );
    win.webContents.openDevTools();
  }
  // win.webContents.openDevTools();
  win.on("closed", (event: { sender: BrowserWindow }) => {
    myWindows.delete(event.sender);
    consoleWindow.delete(event.sender);
    console.log(
      "after cloes myWindows",
      Array.from(myWindows).map(ele => ele.id)
    );
  });
});

ipcMain.handle("registerConsoleWindow", event => {
  const win = Array.from(myWindows).find(
    win => win.webContents == event.sender
  ); //除非明确需要修改，否则不应(此处有issue，id不一定准) @author 昝磊

  consoleWindow.add(win);

  return "success";
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Exit cleanly on request from parent process in development mode.
// todo, test it
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
