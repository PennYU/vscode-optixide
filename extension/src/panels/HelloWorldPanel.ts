import * as vscode from "vscode";
import { getUri } from "../utilities/getUri";
import { getNonce } from "../utilities/getNonce";
import { FunctionProvider } from '../function-provider';

/**
 * This class manages the state and behavior of HelloWorld webview panels.
 *
 * It contains all the data and methods for:
 *
 * - Creating and rendering HelloWorld webview panels
 * - Properly cleaning up and disposing of webview resources when the panel is closed
 * - Setting the HTML (and by proxy CSS/JavaScript) content of the webview panel
 * - Setting message listeners so data can be passed between the webview and extension
 */
export class HelloWorldPanel {
  public static currentPanel: HelloWorldPanel | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];

  /**
   * The HelloWorldPanel class private constructor (called only from the render method).
   *
   * @param panel A reference to the webview panel
   * @param extensionUri The URI of the directory containing the extension
   */
  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;

    // Set an event listener to listen for when the panel is disposed (i.e. when the user closes
    // the panel or when the panel is closed programmatically)
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Set the HTML content for the webview panel
    this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri);

    // Set an event listener to listen for messages passed from the webview context
    this._setWebviewMessageListener(this._panel.webview);
    setTimeout(() => {
      panel.webview.postMessage({
        target: 'iframe',
        message: {
          event: 'loaded',
        }
      })
    }, 1500)
  }

  /**
   * Renders the current webview panel if it exists otherwise a new webview panel
   * will be created and displayed.
   *
   * @param extensionUri The URI of the directory containing the extension.
   */
  public static render(extensionUri: vscode.Uri) {
    if (HelloWorldPanel.currentPanel) {
      // If the webview panel already exists reveal it
      HelloWorldPanel.currentPanel._panel.reveal(vscode.ViewColumn.One);
    } else {
      // If a webview panel does not already exist create and show a new one
      const panel = vscode.window.createWebviewPanel(
        // Panel view type
        "showHelloWorld",
        // Panel title
        "Hello World",
        // The editor column the panel should be displayed in
        vscode.ViewColumn.One,
        // Extra panel configurations
        {
          // Enable JavaScript in the webview
          enableScripts: true,
          // Restrict the webview to only load resources from the `out` and `webview-ui/build` directories
          localResourceRoots: [vscode.Uri.joinPath(extensionUri, "out"), vscode.Uri.joinPath(extensionUri, "assets")],
          retainContextWhenHidden: true,
        }
      );

      HelloWorldPanel.currentPanel = new HelloWorldPanel(panel, extensionUri);
    }
  }

  /**
   * Cleans up and disposes of webview resources when the webview panel is closed.
   */
  public dispose() {
    HelloWorldPanel.currentPanel = undefined;

    // Dispose of the current webview panel
    this._panel.dispose();

    // Dispose of all disposables (i.e. commands) for the current webview panel
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  getTheme() {
    const workbench = vscode.workspace.getConfiguration('workbench') || {};
    return (workbench.colorTheme || '').toLowerCase().includes('light')
      ? 'light'
      : 'dark';
  }

  /**
   * Defines and returns the HTML that should be rendered within the webview panel.
   *
   * @remarks This is also the place where references to the Vue webview build files
   * are created and inserted into the webview HTML.
   *
   * @param webview A reference to the extension webview
   * @param extensionUri The URI of the directory containing the extension
   * @returns A template string literal containing the HTML that should be
   * rendered within the webview panel
   */
  private _getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri) {
    // The CSS file from the Vue build output
    const stylesUri = getUri(webview, extensionUri, ["assets", "main.css"]);
    // The JS file from the Vue build output
    const scriptUri = getUri(webview, extensionUri, ["assets", "main.js"]);

    const nonce = getNonce();
    const theme = this.getTheme();
    const iframeId = `optixide-${vscode.env.sessionId}`;
    // Tip: Install the es6-string-html VS Code extension to enable code highlighting below
    return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" type="text/css" href="${stylesUri}">
          <title>Hello World</title>
        </head>
        <body>
          <div id="app"></div>
          <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
          <script>
            function execCommand(data) {
              document.getElementById('${iframeId}').contentWindow.postMessage(data, '*');
            }
            const vscode = acquireVsCodeApi();
            window.onmessage = function(e) {
              console.log('message', e);
              if (!e.data) {
                return;
              }
              if (e.data.target === 'vscode') {
                vscode.postMessage(e.data.message);
              } else if (e.data.target === 'iframe') {
                execCommand(e.data.message);
              }
            };
          </script>
          <iframe id="${iframeId}" src="http://localhost:3000?theme=${theme}"
                width="100%"
                height="100%"
                frameborder="0"
                style="border: 0; left: 0; right: 0; bottom: 0; top: 0; position:absolute;" />
            </body>
      </html>
    `;
  }

  /**
   * Sets up an event listener to listen for messages passed from the webview context and
   * executes code based on the message that is recieved.
   *
   * @param webview A reference to the extension webview
   * @param context A reference to the extension context
   */
  private _setWebviewMessageListener(webview: vscode.Webview) {
    webview.onDidReceiveMessage(
      (message: any) => {
        const id = message.id;
        const action = message.action;
        const name = message.name;
        const params = message.parameters || [];
        if (!action) {
          vscode.window.showErrorMessage('no action.');
          return;
        }

        if (!name) {
          vscode.window.showErrorMessage('no name.');
          return;
        }
        
        if (action === 'executeCommand') {
          vscode.commands.executeCommand(name, ...params);
        } else if (action === 'callFunction') {
          const provider = new FunctionProvider(id, webview);
          provider.callFunction(name, ...params);
        } else {
          vscode.window.showErrorMessage('unknown action: ' + action);
        }
      },
      undefined,
      this._disposables
    );
  }
}
