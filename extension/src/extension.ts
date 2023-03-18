import { commands, ExtensionContext, Webview } from "vscode";
import { HelloWorldPanel } from "./panels/HelloWorldPanel";

export function activate(context: ExtensionContext) {
  // Create the show hello world command
  const showHelloWorldCommand = commands.registerCommand("hello-world.showHelloWorld", () => {
    HelloWorldPanel.render(context.extensionUri);
  });

  const getData = commands.registerCommand('optixide.getData', (webview: Webview) => {
    console.log('optixide.getData', webview);
    webview.postMessage({
      target: 'iframe',
      message: {
        event: 'loaded',
      }
    });
  });

  // Add command to the extension context
  context.subscriptions.push(showHelloWorldCommand, getData);
}
