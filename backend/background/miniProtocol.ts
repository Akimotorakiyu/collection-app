import { protocol } from "electron";

import * as path from "path";
import { open } from "fs";
import { URL } from "url";

/**
 * 创建协议，兼容history mode和hash modde
 * @param scheme
 */
export function createMini(
  scheme: string,
  folder: string,
  basePath: string,
  asarExt: boolean = true
) {
  protocol.registerFileProtocol(
    scheme,
    (request, respond) => {
      const url = new URL(request.url);
      // console.log("url info", url);

      let pathName = url.pathname;
      pathName = decodeURI(pathName); // Needed in case URL contains spaces

      const hosts = url.hostname.split(".").reverse();
      const appName = `${hosts[2] || ""}${asarExt ? ".asar" : ""}`;

      let truePath: string;
      switch (pathName) {
        case "":
        case "/":
        case "/index":
        case "/index.html":
          truePath = path.join(folder, appName, basePath, "index.html");
          break;
        default:
          truePath = path.join(folder, appName, basePath, pathName);
          break;
      }

      // try load
      open(truePath, "r", 0o666, err => {
        if (err) {
          truePath = path.join(folder, appName, basePath, "index.html");
          console.log("open fail, fallback to /index.html, ", truePath);
        } else {
          console.log("mini app file path:", truePath);
        }
        respond(truePath);
      });
    },
    error => {
      if (error) {
        console.error(`Failed to load ${scheme} thing`, error);
      }
    }
  );
}
