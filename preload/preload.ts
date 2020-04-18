import { Process, IpcRenderer } from "./types";

const { ipc } = (<Process>(<any>window).process).electronBinding("ipc");
const v8Util = (<Process>(<any>window).process).electronBinding("v8_util");

const ipcRenderer = v8Util.getHiddenValue<IpcRenderer>(global, "ipc");
const internal = false;

ipcRenderer.send = function(channel: string, ...args: any[]) {
  return ipc.send(internal, channel, args);
};

ipcRenderer.sendSync = function(channel: string, ...args: any[]) {
  return ipc.sendSync(internal, channel, args)[0];
};

ipcRenderer.sendToHost = function(channel: string, ...args: any[]) {
  return ipc.sendToHost(channel, args);
};

ipcRenderer.sendTo = function(
  webContentsId: number,
  channel: string,
  ...args: any[]
) {
  return ipc.sendTo(internal, false, webContentsId, channel, args);
};

ipcRenderer.invoke = async function<T>(channel: string, ...args: any[]) {
  const { error, result } = await ipc.invoke<T>(internal, channel, args);
  if (error) {
    throw new Error(`Error invoking remote method '${channel}': ${error}`);
  }
  return result;
};

ipcRenderer.broadcast = function(channel: string, ...args: any[]) {
  return ipc.send(internal, "broadcast", [channel, ...args]);
};

Reflect.set(window, "electron", {
  ipcRenderer
});
