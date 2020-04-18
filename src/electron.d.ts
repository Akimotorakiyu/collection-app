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

interface IpcRendererEvent extends Event {
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

interface IpcRenderer extends EventEmitter {
  broadcast(channel: string, ...args: any[]): void;

  invoke<T = any>(channel: string, ...args: any[]): Promise<T>;
  // Docs: http://electronjs.org/docs/api/ipc-renderer

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

declare namespace electron {
  const ipcRenderer: IpcRenderer;
}
