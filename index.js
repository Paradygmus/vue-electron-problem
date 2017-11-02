const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
let mainWindow;
function createWindow()
{
    mainWindow = new BrowserWindow({
        width: 800, height: 800, backgroundColor: '#ffffff'
    });
    
    //Stock data in window
    mainWindow.infos = {
        foo: 0
    }

    //Stock data in global
    //global.infos = {
    //    foo: 'HelloFromGLobal'
    //}

    //Ez Way to load url
    mainWindow.LoadPage = function (name)
    {
        this.loadURL(url.format({
            pathname: path.join(__dirname, '/pages/' + name),
            protocol: 'file:',
            slashes: true
        }));
    };
    mainWindow.LoadPage('index.html');
    mainWindow.on('closed', function ()
    {    
        mainWindow = null;
    });
}
app.on('ready', createWindow);
app.on('window-all-closed', function ()
{
    if (process.platform !== 'darwin')
        app.quit();
});
app.on('activate', function ()
{
    if (mainWindow === null)
        createWindow();
});