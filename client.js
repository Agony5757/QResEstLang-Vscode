const vscode = require('vscode');
const { LanguageClient } = require('vscode-languageclient/node');
const { TransportKind } = require('vscode-languageclient/node');

function activate(context) {
  const serverOptions = {
    run: {
      module: context.asAbsolutePath('server.js'), // 指向服务器文件
      transport: TransportKind.ipc
    },
    debug: {
      module: context.asAbsolutePath('server.js'),
      transport: TransportKind.ipc
    }
  };

  const client = new LanguageClient(
    'yourLanguageServer',
    'Your Language Server',
    serverOptions,
    {
      documentSelector: [{ scheme: 'file', language: 'qresest' }]
    }
  );

  context.subscriptions.push(client.start());
}

exports.activate = activate;
