import { Webview } from 'vscode';

export class FunctionProvider {
  constructor(private readonly webview: Webview) {}

  callFunction(func: string, ...params: any[]) {
    if (func === 'sayHello') {
      this.sayHello(params);
    }
  }

  sayHello(name: any) {
    this.reply([{name: `hi! ${name}`}]);
  }

  reply(message: any) {
    this.webview.postMessage({ target: 'iframe', message });
  }
}