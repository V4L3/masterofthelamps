const electron=require("electron");
const app=electron.app;
const BrowserWindow=electron.BrowserWindow;
var mainWindow=null;
app.on("ready",function() {
   mainWindow= new BrowserWindow({height:1000,width:1500});
   mainWindow.loadURL("file://"+__dirname+"/index.html");
   mainWindow.setResizable(false);
});

