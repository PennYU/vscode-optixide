import { Webview } from 'vscode';

export class FunctionProvider {
  constructor(
    private readonly id: string,
    private readonly webview: Webview
  ) {}

  callFunction(func: string, ...params: any[]) {
    if (func === 'sayHello') {
      this.sayHello(params);
    } else if (func === 'listProjects') {
      this.listProjects();
    }
  }

  sayHello(name: any) {
    this.reply([{name: `hi! ${name}`}]);
  }

  listProjects() {
    this.reply({ projects: [{name: 'myproject'}] });
  }

  reply(data: any) {
    this.webview.postMessage({ target: 'iframe', message: { id: this.id, ...data} });
  }
}