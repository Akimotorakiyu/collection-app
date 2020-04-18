import { app, protocol } from "electron";
// import "./upgrade";
import {
  createMini,
  createWindow,
  myWindows,
  miniInterceptor
} from "./background/index";
import config from "../config";
import * as path from "path";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

app.allowRendererProcessReuse = false;

console.log("NODE_ENV", process.env.NODE_ENV);
// 只要不是生产模式，全都是开发模式
const isDevelopment = process.env.NODE_ENV !== "production";

const miniBasePath = path.join(config.status.basePath, "temp");

app.on("ready", async () => {
  createMini("app", path.resolve(app.getAppPath()), "temp", false);
  miniInterceptor("app", miniBasePath);
  createWindow(isDevelopment ? "http://127.0.0.1:8080" : "app://app.app");
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (myWindows.size === 0) {
    createWindow(isDevelopment ? "http://127.0.0.1:8080" : "app://app.app");
  }
});
