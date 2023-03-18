export function postMessage(message: any) {
  window.parent.postMessage({target: 'vscode', message}, '*');
}
