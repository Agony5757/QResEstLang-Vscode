const { createConnection, TextDocuments } = require('vscode-languageserver/node');
const { TextDocument } = require('vscode-languageserver-textdocument');
const vscode = require('vscode');

const connection = createConnection(); // 修复点：添加参数
const documents = new TextDocuments(TextDocument);

connection.onInitialize(() => ({
    capabilities: {
      textDocumentSync: 1,
      completionProvider: {}
    }
  }));

connection.onCompletion((params) => {
  const triggerCharacter = params.context?.triggerCharacter;
  const text = documents.get(params.textDocument.uri).getText();

  // 根据上下文提供补全建议
  return [
    { label: 'QRegs', kind: 14 },  // 关键字
    { label: 'Params', kind: 14 },
    { label: 'TempRegs', kind: 14 },
    { label: 'Submodules', kind: 14 },
    { label: 'len=', kind: 14 }
  ];
});


documents.listen(connection);

// 在 connection.listen() 前添加
connection.onInitialized(() => {
    console.log('Language server initialized'); // 调试日志
  });
  
  connection.onError((error) => {
    console.error('Server error:', error); // 错误捕获
  });
  
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err); // 全局异常捕获
  });
  

connection.listen();