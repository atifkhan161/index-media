const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron');
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

const createWindow = () => {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'favicon.ico'),
  });

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// Listen for sync message from renderer process
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var appExpress = express();
appExpress.use(bodyParser.json());
appExpress.use(cors());

var google = require('google')
var cheerio = require("cheerio");

var request = require('request');
google.resultsPerPage = 25;
appExpress.post('/api/query', function (req, res) {
  google(req.body.query + ' intitle:”index of” mp4|mkv', function (err, response) {
    if (err) console.error(err)
    res.send(response.links);
  });
  // res.send(data);
});
appExpress.post('/api/query/link', function (req, res) {
  request({
    method: 'GET',
    url: req.body.link
  }, function (err, response, body) {
    let data = [];
    if (err) {
      return res.send(data);
    } else {


      $ = cheerio.load(body);
      $('a').each(function () {
        var obj = {
          href: $(this).attr('href'),
          title: $(this).attr('title')
        }
        data.push(obj);
      });
      res.send(data);
    }
  });
  // var data = [{"href":"?C=N&O=A"},{"href":"?C=N&O=D"},{"href":"?C=S&O=A"},{"href":"?C=S&O=D"},{"href":"?C=M&O=A"},{"href":"?C=M&O=D"},{"href":"../"},{"href":"3D/","title":"3D"},{"href":"6%20orgnal/","title":"6 orgnal"},{"href":"GOT%20s07e06%20promo.mp4","title":"GOT s07e06 promo.mp4"},{"href":"GOT.s07e05.480p.mkv","title":"GOT.s07e05.480p.mkv"},{"href":"Game%20Of%20Thrones%20S07E06%20720p.(yoozdl).mkv","title":"Game Of Thrones S07E06 720p.(yoozdl).mkv"},{"href":"Game.of.Thrones.S07E02.720p.WEB.h264-TBSyoozdl.mkv","title":"Game.of.Thrones.S07E02.720p.WEB.h264-TBSyoozdl.mkv"},{"href":"Game.of.Thrones.S07E02.Stormborn.720p.AMZN.WEB-DL.yoozd.mkv","title":"Game.of.Thrones.S07E02.Stormborn.720p.AMZN.WEB-DL.yoozd.mkv"},{"href":"Game.of.Thrones.S07E03.AMZN.WEB-DL.480p.x264.AVADL.US.mkv","title":"Game.of.Thrones.S07E03.AMZN.WEB-DL.480p.x264.AVADL.US.mkv"},{"href":"Game.of.Thrones.S07E04.The.Spoils.of.War.1080p.AMZN.WEB-DL.DDP5.1.H.264-GoT.www.yoozdl.com.mkv","title":"Game.of.Thrones.S07E04.The.Spoils.of.War.1080p.AMZN.WEB-DL.DDP5.1.H.264-GoT.www.yoozdl.com.mkv"},{"href":"Game.of.Thrones.S07E05.720p.WEB-DL.x264.yoozdl%201.mkv","title":"Game.of.Thrones.S07E05.720p.WEB-DL.x264.yoozdl 1.mkv"},{"href":"Game.of.Thrones.S07E05.Eastwatch.1080p.AMZN.WEB-DL.DDP5.1.H.264-GoTyoozdl%201.mkv","title":"Game.of.Thrones.S07E05.Eastwatch.1080p.AMZN.WEB-DL.DDP5.1.H.264-GoTyoozdl 1.mkv"},{"href":"Game.of.Thrones.S07E06.1080p.(yoozdl).flv","title":"Game.of.Thrones.S07E06.1080p.(yoozdl).flv"},{"href":"Game.of.Thrones.S07E06.1080p.WEB-DL.6CH.x264.yoozdl.mkv","title":"Game.of.Thrones.S07E06.1080p.WEB-DL.6CH.x264.yoozdl.mkv"},{"href":"Game.of.Thrones.S07E06.480p.WEB-DL.x264.00.mkv","title":"Game.of.Thrones.S07E06.480p.WEB-DL.x264.00.mkv"},{"href":"Game.of.Thrones.S07E06.Beyond.the.Wall.1080p.%20yoozdl.com%20.mkv","title":"Game.of.Thrones.S07E06.Beyond.the.Wall.1080p. yoozdl.com .mkv"},{"href":"Game.of.Thrones.S07E07.1080p.WEB-DL.6CH.x264.yoozdl.com.mkv","title":"Game.of.Thrones.S07E07.1080p.WEB-DL.6CH.x264.yoozdl.com.mkv"},{"href":"Game.of.Thrones.S07E07.720p.WEB-DL.2CH.x265.HEVC.yoozdl.com%20.mkv","title":"Game.of.Thrones.S07E07.720p.WEB-DL.2CH.x265.HEVC.yoozdl.com .mkv"},{"href":"Game.of.Thrones.S07E07.720p.WEB-DL.x264.yoozdl.com.mkv","title":"Game.of.Thrones.S07E07.720p.WEB-DL.x264.yoozdl.com.mkv"},{"href":"Game.of.Thrones.S07E07.The.Dragon.and.the.Wolf.1080p.AMZN.WEB-DL.DDP5.1.H.264-GoTyoozdl.com.mkv","title":"Game.of.Thrones.S07E07.The.Dragon.and.the.Wolf.1080p.AMZN.WEB-DL.DDP5.1.H.264-GoTyoozdl.com.mkv"},{"href":"Game_Of_Thrones_7x05_Promo_Blood_of_the_Dragon%20%C3%98%C2%AA%C3%98%C2%B1%C3%9B%C5%92%C3%99%E2%80%9E%C3%98%C2%B1%20%C3%99%E2%80%9A%C3%98%C2%B3%C3%99%E2%80%A6%C3%98%C2%AA%205%20%C3%9B%C5%92%C3%99%CB%86%C3%98%C2%B2%20%C3%98%C2%AF%C3%9B%C5%92%20%C3%98%C2%A7%C3%99%E2%80%9E.mp4","title":"Game_Of_Thrones_7x05_Promo_Blood_of_the_Dragon ØªØ±ÛŒÙ„Ø± Ù‚Ø³Ù…Øª 5 ÛŒÙˆØ² Ø¯ÛŒ Ø§Ù„.mp4"},{"href":"Game_Of_Thrones_S07E01_WEB-DL_1080p(yoozdl).mkv","title":"Game_Of_Thrones_S07E01_WEB-DL_1080p(yoozdl).mkv"},{"href":"Game_Of_Thrones_S07E01_WEB-DL_720p(yoozdl).mkv","title":"Game_Of_Thrones_S07E01_WEB-DL_720p(yoozdl).mkv"},{"href":"Game_Of_Thrones_S07E03_WEB-DL_720p_(yoozdl).mkv","title":"Game_Of_Thrones_S07E03_WEB-DL_720p_(yoozdl).mkv"},{"href":"Game_Of_Thrones_S07E06_480p.(yoozdl).mkv","title":"Game_Of_Thrones_S07E06_480p.(yoozdl).mkv"},{"href":"Game_Of_Thrones_S07E06_WEB-DL_720p_00.mkv","title":"Game_Of_Thrones_S07E06_WEB-DL_720p_00.mkv"},{"href":"Game_of_Thrones%20tizer3%20yoozdl.mp4","title":"Game_of_Thrones tizer3 yoozdl.mp4"},{"href":"Game_of_Thrones_Season_7__WinterIsHere_Trailer_2_(HBO)-[720p].mp4","title":"Game_of_Thrones_Season_7__WinterIsHere_Trailer_2_(HBO)-[720p].mp4"},{"href":"Teen.Wolf.S06E14.HDTV.x264-FLEET.www.yoozdl.com.mkv","title":"Teen.Wolf.S06E14.HDTV.x264-FLEET.www.yoozdl.com.mkv"},{"href":"_%C3%98%C2%AA%C3%98%C2%B1%C3%9B%C5%92%C3%99%E2%80%9E%C3%98%C2%B1%20%C3%99%E2%80%9A%C3%98%C2%B3%C3%99%E2%80%A6%C3%98%C2%AA%204Game%20of%20Thrones%20%C3%99%C2%81%C3%98%C2%B5%C3%99%E2%80%9E%207%20%C3%99%E2%80%A1%C3%99%C2%81%C3%98%C2%AA%C3%99%E2%80%A6%20%C3%98%C2%A8%C3%98%C2%A7%20%C3%99%E2%80%9E%C3%9B%C5%92%C3%99%E2%80%A0%C3%9A%C2%A9%20%C3%99%E2%80%A6%C3%98%C2%B3%C3%98%C2%AA%C3%99%E2%80%9A%C3%9B%C5%92%C3%99%E2%80%A6%20%C3%99%CB%86%20%C3%98%C2%B1%C3%98%C2%A7%C3%9B%C5%92%C3%9A%C2%AF%C3%98%C2%A7%C3%99%E2%80%A0.mp4","title":"_ØªØ±ÛŒÙ„Ø± Ù‚Ø³Ù…Øª 4Game of Thrones ÙØµÙ„ 7 Ù‡ÙØªÙ… Ø¨Ø§ Ù„ÛŒÙ†Ú© Ù…Ø³ØªÙ‚ÛŒÙ… Ùˆ Ø±Ø§ÛŒÚ¯Ø§Ù†.mp4"},{"href":"_%D8%AA%DB%8C%D8%B2%D8%B1%20%D9%82%D8%B3%D9%85%D8%AA%205Game_Of_Thrones_7x05_Promo_Blood_of_the_Dragon.mp4","title":"_تیزر قسمت 5Game_Of_Thrones_7x05_Promo_Blood_of_the_Dragon.mp4"},{"href":"game%20posht%20yoozdl.mp4","title":"game posht yoozdl.mp4"},{"href":"game.of.thrones.s07e01(yoozdl).mkv","title":"game.of.thrones.s07e01(yoozdl).mkv"},{"href":"game.of.thrones.s07e02.1080p.web.h264-tbs%20yoozd.mkv","title":"game.of.thrones.s07e02.1080p.web.h264-tbs yoozd.mkv"},{"href":"game.of.thrones.s07e02.480p.hdtv.x264yoozdl.mkv","title":"game.of.thrones.s07e02.480p.hdtv.x264yoozdl.mkv"},{"href":"game.of.thrones.s07e03.1080p.web.h264-tbs.www.yoozdl.com.mkv","title":"game.of.thrones.s07e03.1080p.web.h264-tbs.www.yoozdl.com.mkv"},{"href":"game.of.thrones.s07e03.720p.web.h264-tbs.yoozdl.com.mkv","title":"game.of.thrones.s07e03.720p.web.h264-tbs.yoozdl.com.mkv"},{"href":"game.of.thrones.s07e04.1080p.web.h264-tbs.www.yoozdl.com.mkv","title":"game.of.thrones.s07e04.1080p.web.h264-tbs.www.yoozdl.com.mkv"},{"href":"game.of.thrones.s07e04.720p.web.h264-tbs.www.yoozdl.com.mkv","title":"game.of.thrones.s07e04.720p.web.h264-tbs.www.yoozdl.com.mkv"},{"href":"game.of.thrones.s07e04.720p.web.hevc.x265.rmteam.mkv","title":"game.of.thrones.s07e04.720p.web.hevc.x265.rmteam.mkv"},{"href":"game.of.thrones.s07e04.the.spoils.of.war.480p.webrip.x264.rmteam.mkv","title":"game.of.thrones.s07e04.the.spoils.of.war.480p.webrip.x264.rmteam.mkv"},{"href":"game.of.thrones.s07e05.480p.web.x264.rmteam.mkv","title":"game.of.thrones.s07e05.480p.web.x264.rmteam.mkv"},{"href":"game.of.thrones.s07e05.480p.web.x264.rmteam_2yoozdl%201.mkv","title":"game.of.thrones.s07e05.480p.web.x264.rmteam_2yoozdl 1.mkv"},{"href":"game.of.thrones.s07e05.720p.web.h264-tbs.www.RapidMovieZ.com.mkv","title":"game.of.thrones.s07e05.720p.web.h264-tbs.www.RapidMovieZ.com.mkv"},{"href":"game.of.thrones.s07e05.720p.web.h264-tbsyoozdl%201.mkv","title":"game.of.thrones.s07e05.720p.web.h264-tbsyoozdl 1.mkv"},{"href":"game.of.thrones.s07e05.720p.web.hevc.x265.rmteam%20yoozdl%201.mkv","title":"game.of.thrones.s07e05.720p.web.hevc.x265.rmteam yoozdl 1.mkv"},{"href":"game.of.thrones.s07e05.720p.web.hevc.x265.rmteam11.mkv","title":"game.of.thrones.s07e05.720p.web.hevc.x265.rmteam11.mkv"},{"href":"game.of.thrones.s07e06.720p.web.h264-tbs.00.mkv","title":"game.of.thrones.s07e06.720p.web.h264-tbs.00.mkv"},{"href":"game.of.thrones.s07e06.proper.720p.hdtv.hevc.x265.rmteam.mkv","title":"game.of.thrones.s07e06.proper.720p.hdtv.hevc.x265.rmteam.mkv"},{"href":"game.of.thrones.s07e07.720p.web.h264-strife.yoozdl.com.mkv","title":"game.of.thrones.s07e07.720p.web.h264-strife.yoozdl.com.mkv"},{"href":"game.of.thrones.s07e07.the.and.the.wolf.480p.webrip.x264.rmteam%20yoozdl.com%20.mkv","title":"game.of.thrones.s07e07.the.and.the.wolf.480p.webrip.x264.rmteam yoozdl.com .mkv"},{"href":"got_s7e5_1080p.(yoozdl).mkv","title":"got_s7e5_1080p.(yoozdl).mkv"},{"href":"got_s7e5_720p%20x265.(yoozdl).mkv","title":"got_s7e5_720p x265.(yoozdl).mkv"},{"href":"got_s7e5_720p_WebDL.(yoozdl).mkv","title":"got_s7e5_720p_WebDL.(yoozdl).mkv"},{"href":"%C3%98%C2%AA%C3%98%C2%B1%C3%9B%C5%92%C3%99%E2%80%9E%C3%98%C2%B1%20%C3%99%E2%80%9A%C3%98%C2%B3%C3%99%E2%80%A6%C3%98%C2%AA%20%C3%98%C2%AF%C3%99%CB%86%C3%99%E2%80%A6%20%C3%99%C2%81%C3%98%C2%B5%C3%99%E2%80%9E%207%20%C3%98%C2%B3%C3%98%C2%B1%C3%9B%C5%92%C3%98%C2%A7%C3%99%E2%80%9E%20Game%20of%20Thrones.mp4","title":"ØªØ±ÛŒÙ„Ø± Ù‚Ø³Ù…Øª Ø¯ÙˆÙ… ÙØµÙ„ 7 Ø³Ø±ÛŒØ§Ù„ Game of Thrones.mp4"},{"href":"%C3%98%C2%AF%C3%98%C2%A7%C3%99%E2%80%A0%C3%99%E2%80%9E%C3%99%CB%86%C3%98%C2%AF%20%C3%98%C2%B3%C3%98%C2%B1%C3%9B%C5%92%C3%98%C2%A7%C3%99%E2%80%9E%20%C3%99%E2%80%9A%C3%98%C2%B3%C3%99%E2%80%A6%C3%98%C2%AA%204%20%C3%99%E2%80%9E%C3%99%CB%86%20%C3%98%C2%B1%C3%99%C2%81%C3%98%C2%AA%C3%99%E2%80%A1%20Game%20of%20Thrones%20%C3%99%C2%81%C3%98%C2%B5%C3%99%E2%80%9E%207%20%C3%99%E2%80%A1%C3%99%C2%81%C3%98%C2%AA%C3%99%E2%80%A6%20%C3%98%C2%A8%C3%98%C2%A7%20%C3%99%E2%80%9E%C3%9B%C5%92%C3%99%E2%80%A0%C3%9A%C2%A9%20%C3%99%E2%80%A6%C3%98%C2%B3%C3%98%C2%AA%C3%99%E2%80%9A%C3%9B%C5%92%C3%99%E2%80%A6%20%C3%99%CB%86%20%C3%98%C2%B1%C3%98%C2%A7%C3%9B%C5%92%C3%9A%C2%AF%C3%98%C2%A7%C3%99%E2%80%A0.mp4","title":"Ø¯Ø§Ù†Ù„ÙˆØ¯ Ø³Ø±ÛŒØ§Ù„ Ù‚Ø³Ù…Øª 4 Ù„Ùˆ Ø±ÙØªÙ‡ Game of Thrones ÙØµÙ„ 7 Ù‡ÙØªÙ… Ø¨Ø§ Ù„ÛŒÙ†Ú© Ù…Ø³ØªÙ‚ÛŒÙ… Ùˆ Ø±Ø§ÛŒÚ¯Ø§Ù†.mp4"}];
  // res.send(data);
});
const {
  exec
} = require('child_process');
appExpress.post('/api/play', function (req, res) {
  var url = req.body.url;
  const child = exec('mpv ' + url, (err, stdout, stderr) => {
    console.log(stdout);
  });
  res.send({
    msg: "ok"
  });
});

appExpress.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
