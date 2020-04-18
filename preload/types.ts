declare class EventEmitter {
  addListener(event: string, listener: Function): this;
  on(event: string, listener: Function): this;
  once(event: string, listener: Function): this;
  removeListener(event: string, listener: Function): this;
  removeAllListeners(event?: string): this;
  setMaxListeners(n: number): this;
  getMaxListeners(): number;
  listeners(event: string): Function[];
  emit(event: string, ...args: any[]): boolean;
  listenerCount(type: string): number;
  prependListener(event: string, listener: Function): this;
  prependOnceListener(event: string, listener: Function): this;
  eventNames(): Array<string | symbol>;
}

export interface IpcRenderer extends EventEmitter {
  broadcast(channel: string, ...args: any[]): void;

  // Docs: http://electronjs.org/docs/api/ipc-renderer

  /**
     * Resolves with the response from the main process.
     *
     * Send a message to the main process via `channel` and expect a result
     * asynchronously. Arguments will be serialized with the Structured Clone
     * Algorithm, just like `postMessage`, so prototype chains will not be included.
     * Sending Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an
     * exception.
     *
     * > **NOTE**: Sending non-standard JavaScript types such as DOM objects or special
     * Electron objects is deprecated, and will begin throwing an exception starting
     * with Electron 9.
     *
     * The main process should listen for `channel` with `ipcMain.handle()`.
     * 
For example:
     */
  invoke(channel: string, ...args: any[]): Promise<any>;

  /**
   * Listens to channel, when a new message arrives listener would be called with
   * listener(event, args...).
   */
  on(
    channel: string,
    listener: (event: IpcRendererEvent, ...args: any[]) => void
  ): this;
  /**
   * Adds a one time listener function for the event. This listener is invoked only
   * the next time a message is sent to channel, after which it is removed.
   */
  once(
    channel: string,
    listener: (event: IpcRendererEvent, ...args: any[]) => void
  ): this;
  /**
   * Removes all listeners, or those of the specified channel.
   */
  removeAllListeners(channel: string): this;
  /**
   * Removes the specified listener from the listener array for the specified
   * channel.
   */
  removeListener(channel: string, listener: Function): this;
  /**
   * Send a message to the main process asynchronously via channel, you can also send
   * arbitrary arguments. Arguments will be serialized in JSON internally and hence
   * no functions or prototype chain will be included. The main process handles it by
   * listening for channel with ipcMain module.
   */
  send(channel: string, ...args: any[]): void;
  /**
   * Send a message to the main process synchronously via channel, you can also send
   * arbitrary arguments. Arguments will be serialized in JSON internally and hence
   * no functions or prototype chain will be included. The main process handles it by
   * listening for channel with ipcMain module, and replies by setting
   * event.returnValue. Note: Sending a synchronous message will block the whole
   * renderer process, unless you know what you are doing you should never use it.
   */
  sendSync(channel: string, ...args: any[]): any;
  /**
   * Sends a message to a window with webContentsId via channel.
   */
  sendTo(webContentsId: number, channel: string, ...args: any[]): void;
  /**
   * Like ipcRenderer.send but the event will be sent to the <webview> element in the
   * host page instead of the main process.
   */
  sendToHost(channel: string, ...args: any[]): void;
}

interface Event {
  // Docs: http://electronjs.org/docs/api/structures/event

  preventDefault: () => void;
}

export interface IpcRendererEvent extends Event {
  // Docs: http://electronjs.org/docs/api/structures/ipc-renderer-event

  /**
   * The IpcRenderer instance that emitted the event originally
   */
  sender: IpcRenderer;
  /**
   * The webContents.id that sent the message, you can call
   * event.sender.sendTo(event.senderId, ...) to reply to the message, see for more
   * information. This only applies to messages sent from a different renderer.
   * Messages sent directly from the main process set event.senderId to 0.
   */
  senderId: number;
}

export interface IpcBinding {
  send(internal: boolean, channel: string, args: any[]): void;
  sendSync(internal: boolean, channel: string, args: any[]): any;
  sendToHost(channel: string, args: any[]): void;
  sendTo(
    internal: boolean,
    sendToAll: boolean,
    webContentsId: number,
    channel: string,
    args: any[]
  ): void;
  invoke<T>(
    internal: boolean,
    channel: string,
    args: any[]
  ): Promise<{ error: string; result: T }>;
}

interface V8UtilBinding {
  getHiddenValue<T>(obj: any, key: string): T;
  setHiddenValue<T>(obj: any, key: string, value: T): void;
  deleteHiddenValue(obj: any, key: string): void;
  requestGarbageCollectionForTesting(): void;
}

export interface Process {
  electronBinding(name: "ipc"): { ipc: IpcBinding };
  electronBinding(name: "v8_util"): V8UtilBinding;
}
