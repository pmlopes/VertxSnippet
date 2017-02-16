// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var fs = require('fs');
var vscode = require('vscode');
var metadata = require('./metadata.json');
var generator = require('./generator');

// extract the build tools from the metadata
var buildToolIds = [];

metadata.forEach(function (el) {
  if (buildToolIds.indexOf(el.buildtool) === -1) {
    buildToolIds.push(el.buildtool);
  }
});

// this is a small helper that will avoid interaction with user
// if there is just a single element on the list
function showQuickPick(list, callback) {
  if (list.length > 1) {
    vscode.window.showQuickPick(list).then(callback);
  } else {
    callback(list[0]);
  }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  disposable = vscode.commands.registerCommand('extension.generate', function (e) {
    var project = {};

    try {
      // the project root is derived from the event
      project.projectRoot = fs.lstatSync(e.path).isDirectory() ? e.path : path.substring(0, e.path.lastIndexOf('/'));
      // the project name is derived from the project root path
      project.projectName = project.projectRoot.lastIndexOf('/') !== -1 ? project.projectRoot.substr(project.projectRoot.lastIndexOf('/') + 1) : project.projectRoot;
    } catch (ex) {
      vscode.window.showErrorMessage(ex.message);
    }

    // if there is already a project file show warning and stop
    try {
      var projectAlreadyExists = ['pom.xml', 'build.gradle', 'package.json'].some(function (el) {
        return fs.existsSync(project.projectRoot + '/' + el);
      });

      if (projectAlreadyExists) {
        vscode.window.showWarningMessage('A project already exists! Please remove it first.');
        return;
      }
    } catch (ex) {
      vscode.window.showErrorMessage(ex.message);
    }

    showQuickPick(buildToolIds, function (buildtool) {
      // the selected build tool
      project.buildtool = buildtool;
      try {
        var templateIds = metadata.filter(function (el) {
          return el.buildtool === buildtool;
        }).map(function (el) {
          return el.id;
        }).sort();

        showQuickPick(templateIds, function (template) {
          // the selected template
          project.template = template;
          try {
            // locate the selected metadata and add to the project object
            project.metadata = metadata.filter(function (el) {
              return el.buildtool === project.buildtool && el.id === template;
            })[0];

            // set the correct main verticle
            project.mainVerticle = project.metadata.main.replace('{package}', project.projectName || '');

            generator.generate(project);
            vscode.window.showInformationMessage('Project generated!');
          } catch (ex) {
            vscode.window.showErrorMessage(ex.message);
          }
        });
      } catch (ex) {
        vscode.window.showErrorMessage(ex.message);
      }
    });
  });

  context.subscriptions.push(disposable);
}


// this method is called when your extension is deactivated
function deactivate() {
  // clear the handlebars cache 
  for (var key in generator.cache) {
    if (generator.cache.hasOwnProperty(key)) {
      delete generator.cache[key];
    }
  }
}

module.exports = {
  activate: activate,
  deactivate: deactivate
};
