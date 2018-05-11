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
  // set timeout to render the window not until the Angular
  // compiler is ready to show the project
  setTimeout(() => {
    // Create the browser window.
    win = new BrowserWindow({
      width: 800,
      height: 600,
      icon: './src/favicon.ico',
      webPreferences: {
        nodeIntegration: false // turn it on to use node features
      }
    });

    // and load the app.
    win.loadURL(url.format({
      pathname: 'localhost:4200',
      protocol: 'http:',
      slashes: true
    }));

    win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null;
    });
  }, 10000);
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
ipcMain.on('sync', (event, arg) => {
  // Print 3
  console.log(arg);
  // Send value synchronously back to renderer process
  event.returnValue = 4;
  // Send async message to renderer process
  win.webContents.send('ping', 5);
});

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
  // google(req.body.query + ' intitle:”index of” mp4|mkv', function (err, response){
  //   if (err) console.error(err)
  //   res.send(response.links);
  // });
  var data = [{
    "title": "Index of /Data/Serial/Game of Thrones/S6/ - 98Music",
    "link": "http://dl2.my98music.com/Data/Serial/Game%20of%20Thrones/S6/",
    "description": "Index of /Data/Serial/Game of Thrones/S6/ ... Game of Thrones S06E01 480p \nHDTV [Filmia].mkv, 2016-Oct-12 12:02:56, 224.6M, application/octet-stream.",
    "href": "http://dl2.my98music.com/Data/Serial/Game%20of%20Thrones/S6/"
  }, {
    "title": "Index of /admin1/Serial/Game.Of.Thrones/S06/",
    "link": "http://dl6.downloadoo.ir/admin1/Serial/Game.Of.Thrones/S06/",
    "description": "Thrones.S06E01.1080p-[Nightsdl.com].mkv 26-Apr-2016 12:04 785823569 \nGame.of.Thrones.S06E01.480p-[Nightsdl.com].mkv 25-Apr-2016 10:33 \n235556466 ...",
    "href": "http://dl6.downloadoo.ir/admin1/Serial/Game.Of.Thrones/S06/"
  }, {
    "title": "Index of /Serial/Game of Thrones/S06/",
    "link": "http://dl2.mihanpix.com/Serial/Game%20of%20Thrones/S06/",
    "description": "Game.of.Thrones.S06E01.480p.x264.mkv 16-Jul-2016 15:15 235556466 Game.\nof.Thrones.S06E02.480p.x264.mkv 16-Jul-2016 15:15 196369583 Game.of.",
    "href": "http://dl2.mihanpix.com/Serial/Game%20of%20Thrones/S06/"
  }, {
    "title": "Index of /Serial/GOT/S06/Screen/",
    "link": "http://dl.upload8.net/Serial/GOT/S06/Screen/",
    "description": "Thrones.S06E03.1080p.6CH.TM.mkv.jpg 09-May-2016 07:47 468008 Game.of.\nThrones.S06E03.1080p.HDTV.x265.ShAaNiG...> 09-May-2016 06:33 432600 ...",
    "href": "http://dl.upload8.net/Serial/GOT/S06/Screen/"
  }, {
    "title": "Index of /serial/Game.Of.Thrones/S06/720p.x265/",
    "link": "http://dl2.royamovie.com/serial/Game.Of.Thrones/S06/720p.x265/",
    "description": "Index of /serial/Game.Of.Thrones/S06/720p.x265/ ... \nGame_Of_Thrones_S06E01_720p_x265_RoyaMovie.mkv, 216.6 MiB, 2018-Apr-\n16 02:54.",
    "href": "http://dl2.royamovie.com/serial/Game.Of.Thrones/S06/720p.x265/"
  }, {
    "title": "Index of /serial/Game.Of.Thrones/S06/1080p/",
    "link": "http://dl2.royamovie.com/serial/Game.Of.Thrones/S06/1080p/",
    "description": "Index of /serial/Game.Of.Thrones/S06/1080p/ ... Parent directory/, -, -. \nGame_Of_Thrones_S06E01_1080p_RoyaMovie.mkv, 863.6 MiB, 2018-Apr-16 \n03:04.",
    "href": "http://dl2.royamovie.com/serial/Game.Of.Thrones/S06/1080p/"
  }, {
    "title": "Index of /serial/Game of Thrones/s07/",
    "link": "http://dl.sitemovie.ir/serial/Game%20of%20Thrones/s07/",
    "description": "Game_Of_Thrones_S07E01_480p_HDTV_SiteMovie_ir.mkv 17-Jul-2017 04:29 \n196879836 Game_Of_Thrones_S07E01_480p_WEBRip1_SiteMovie_i.",
    "href": "http://dl.sitemovie.ir/serial/Game%20of%20Thrones/s07/"
  }, {
    "title": "Index of /serial/",
    "link": "http://dl.sitemovie.ir/serial/",
    "description": "17 Apr 2017 ... ... 00:17 - Game of Thrones/ 17-Jul-2017 02:26 - Genius/ 19-May-2017 .... 11:58 - \nKingdom_S03E07_480p_(DibaMovie).mkv 18-Sep-2017 ...",
    "href": "http://dl.sitemovie.ir/serial/"
  }, {
    "title": "Index of /serial/Game of Thrones/season 7/",
    "link": "http://dl.funsaber.net/serial/Game%20of%20Thrones/season%207/",
    "description": "Index of /serial/Game of Thrones/season 7/ ../ 1080/ 28-Aug-2017 04:41 - 480/ 28\n-Aug-2017 04:41 - 720/ 28-Aug-2017 04:41 - 720x265/ 28-Aug-2017 04:41 ...",
    "href": "http://dl.funsaber.net/serial/Game%20of%20Thrones/season%207/"
  }, {
    "title": "Index of /series/Game of Thrones .s7/ - File Name - yoozdl",
    "link": "http://dl.yoozdl.com/series/Game%20of%20Thrones%20.s7/",
    "description": "Game.of.Thrones.S07E02.720p.WEB.h264-TBSyoozdl.mkv, 1.0 GiB ... Game.of.\nThrones.S07E06.480p.WEB-DL.x264.00.mkv, 266.9 MiB, 2017-Aug-21 04:00.",
    "href": "http://dl.yoozdl.com/series/Game%20of%20Thrones%20.s7/"
  }, {
    "title": "Index of /feeds/ - TVShows 2",
    "link": "http://tvshowsapp.com/feeds/",
    "description": "27 Dec 2015 ... ... 01-Jan-2016 08:50 11206 \"The Game 2014\" -Thrones.full.xml 27-Dec-2015 22\n:54 21155 \"The Game 2014\" -Thrones.xml 27-Dec-2015 22:54 ...",
    "href": "http://tvshowsapp.com/feeds/"
  }, {
    "title": "Index of /justin/TV Shows/Game of Thrones/Season 1 - DreamSupport",
    "link": "http://dreamsupport.us/justin/TV%20Shows/Game%20of%20Thrones/Season%201/",
    "description": "Index of /justin/TV Shows/Game of Thrones/Season 1 ... Game of Thrones - \nS01E04 - Cripples, Bastards, and Broken Things.mkv · Game of Thrones - \nS01E05 ...",
    "href": "http://dreamsupport.us/justin/TV%20Shows/Game%20of%20Thrones/Season%201/"
  }, {
    "title": "index of game of thrones season 7 - Index-of movies",
    "link": "https://www.index-of.net/index-of-game-of-thrones-season-7",
    "description": "3 Mar 2017 ... index of game of thrones season 7,index of serial game of thrones,index of game \nof thrones s06,index of game of thrones season 3,,index of ...",
    "href": "https://www.index-of.net/index-of-game-of-thrones-season-7"
  }, {
    "title": "An A to Z Index of All of the Television Shows That Have Been ...",
    "link": "http://thesource.com/2015/05/13/an-a-to-z-index-of-all-of-the-television-shows-that-have-been-cancelled-or-renewed/",
    "description": "13 May 2015 ... The Game (BET): Renewed for 9th/final season. Game of Thrones (HBO): \nRenewed for Season 6. Garfunkle and Oates (IFC): Cancelled.",
    "href": "http://thesource.com/2015/05/13/an-a-to-z-index-of-all-of-the-television-shows-that-have-been-cancelled-or-renewed/"
  }, {
    "title": "Index of /serial/ - my-film",
    "link": "http://dl.my-film.in/serial/",
    "description": "... Dead/ 21-Jan-2018 13:36 - Feed the Beast/ 21-Jan-2018 13:39 - Frequency/ \n21-Jan-2018 13:44 - Game of Silence/ 21-Jan-2018 13:46 - Genius/ 21-Jan-2018\n ...",
    "href": "http://dl.my-film.in/serial/"
  }, {
    "title": "Index of /media/fritzing-repo/projects/f",
    "link": "http://fritzing.org/media/fritzing-repo/projects/f/",
    "description": "followme-simple-arduino-based-game/, 17-Jun-2013 15:51, -. [DIR] ... free-play-\nwatch-game-of-thrones-season-7-episode-3/, 29-Jul-2017 18:53, -. [DIR] .... full-\nwatch-game-of-thrones-season-6-episode-5-onli/, 20-May-2016 03:10, -. [DIR] ...",
    "href": "http://fritzing.org/media/fritzing-repo/projects/f/"
  }, {
    "title": "Index of Fiction Reviews :: All Things Andy Gavin",
    "link": "https://all-things-andy-gavin.com/fiction-index/",
    "description": "All Your Base Are Belong to Us, video games, Harold Goldberg. Debt: The First ... \nBuffy The Vampire Slayer season 6 · Buffy The ... Game of Thrones (episode 1).",
    "href": "https://all-things-andy-gavin.com/fiction-index/"
  }, {
    "title": "Index of / - EKNIAZI",
    "link": "http://portal.ekniazi.com/",
    "description": "HDTV.x264-SVA[eztv].mkv, 2018-04-29 22:16, 261M. [ ] · Blur nosTEAM.rar, 2016\n-11-11 05:19, 14M. [ ], BO PATCH BY EKNIAZI.rar, 2015-06-05 07:30, 26M.",
    "href": "http://portal.ekniazi.com/"
  }, {
    "title": "Index of /Gear/Film - LikeCOOL",
    "link": "http://likecool.com/Gear/Film/",
    "description": "03-Apr-2017 12:01 - A Look at Season 6 T..> 28-Sep-2015 ..... 02-Feb-2018 05:\n40 - Game Of Thrones Fan . ... 12-Jan-2014 17:34 - Game of Thrones Seas.",
    "href": "http://likecool.com/Gear/Film/"
  }, {
    "title": "Index of /wp-content/uploads/ - Inspector Spacetime",
    "link": "http://inspectorspacetime.ru/wp-content/uploads/?SA",
    "description": "14-Apr-2015 23:06 8k [IMG] Game-of-Thrones-S04E01-1080i-HDTV-MPEG2-\nDD5.1-CtrlHD.ts_snapshot_00.12.06_201... 25-May-2015 13:39 8k [IMG] ...",
    "href": "http://inspectorspacetime.ru/wp-content/uploads/?SA"
  }, {
    "title": "Index of /torrents/ - Only Watch",
    "link": "http://onlywatch.org/torrents/",
    "description": "28 Aug 2017 ... Darker/ 12-Nov-2017 10:37 - Game Of Thrones - S02/ 18-Jul-2017 04:46 - Game. \n... WEB-DL.DD5.1.x26..> 18-Oct-2017 17:11 - Once.Upon.a.Time.S06. ... 01-May-\n2018 17:11 2113450549 Dunkerque.mkv 07-Jan-2018 15:31 ...",
    "href": "http://onlywatch.org/torrents/"
  }, {
    "title": "Index of /dl/music/95-3/Ramin Djawadi - Game of Thrones Season 6 ...",
    "link": "http://dl2.shirazsong.net/dl/music/95-3/Ramin%20Djawadi%20-%20Game%20of%20Thrones%20Season%206%20(Music%20from%20the%20HBO%AE%20Series)/",
    "description": "Index of /dl/music/95-3/Ramin Djawadi - Game of Thrones Season 6 (Music from \nthe HBO  Series)/ ... 14 Let's Play a Game.mp3, 13.7 MiB, 2016-Jun-24 19:30.",
    "href": "http://dl2.shirazsong.net/dl/music/95-3/Ramin%20Djawadi%20-%20Game%20of%20Thrones%20Season%206%20(Music%20from%20the%20HBO%AE%20Series)/"
  }, {
    "title": "Index of /themes/g - TVJukebox.net - TV Theme Songs",
    "link": "http://www.tvjukebox.net/themes/g/",
    "description": "... 1.0M [SND] Game of Thrones.mp3 24-Oct-2013 07:26 1.5M [SND] .... Growing \nPains (Season 6-7 - Acapella).mp3 31-Mar-2011 06:11 1.4M [SND] Guess With ...",
    "href": "http://www.tvjukebox.net/themes/g/"
  }, {
    "title": "Index of ./ - FutureNet",
    "link": "http://www.futurenet-bd.com/fns/3_files/3.html",
    "description": "Game.of.Thrones.S06E02.720p.HDTV.x264-FLEET[rarbg] 2.3 days old, [dir], 02/\nMay/16. [dir] The.Good.Wife.S07E21.HDTV.x264-LOL[rarbg] 2.3 days old ...",
    "href": "http://www.futurenet-bd.com/fns/3_files/3.html"
  }, {
    "title": "Index of /download/T/",
    "link": "https://hypem.com/download/T/",
    "description": "Name, Last modified, Size, Description. [PARENTDIR], Parent Directory, -. [DIR], \nT_&_P, 11-Sep-2016 01:42, -. [DIR], T_Brown, 19-Mar-2016 23:55, -. [DIR] ...",
    "href": "https://hypem.com/download/T/"
  }];
  res.send(data);
});
appExpress.post('/api/query/link', function (req, res) {
  request({
    method: 'GET',
    url: req.body.link
  }, function (err, response, body) {
    let data = [];    
    if (err) {
      return res.send(data);
    }
    $ = cheerio.load(body);
    $('a').each(function () {
      var obj = {
        href : $(this).attr('href'),
        title : $(this).attr('title')
      }
      data.push(obj);
    });
    res.send(data);
  });
  // var data = [{"href":"?C=N&O=A"},{"href":"?C=N&O=D"},{"href":"?C=S&O=A"},{"href":"?C=S&O=D"},{"href":"?C=M&O=A"},{"href":"?C=M&O=D"},{"href":"../"},{"href":"3D/","title":"3D"},{"href":"6%20orgnal/","title":"6 orgnal"},{"href":"GOT%20s07e06%20promo.mp4","title":"GOT s07e06 promo.mp4"},{"href":"GOT.s07e05.480p.mkv","title":"GOT.s07e05.480p.mkv"},{"href":"Game%20Of%20Thrones%20S07E06%20720p.(yoozdl).mkv","title":"Game Of Thrones S07E06 720p.(yoozdl).mkv"},{"href":"Game.of.Thrones.S07E02.720p.WEB.h264-TBSyoozdl.mkv","title":"Game.of.Thrones.S07E02.720p.WEB.h264-TBSyoozdl.mkv"},{"href":"Game.of.Thrones.S07E02.Stormborn.720p.AMZN.WEB-DL.yoozd.mkv","title":"Game.of.Thrones.S07E02.Stormborn.720p.AMZN.WEB-DL.yoozd.mkv"},{"href":"Game.of.Thrones.S07E03.AMZN.WEB-DL.480p.x264.AVADL.US.mkv","title":"Game.of.Thrones.S07E03.AMZN.WEB-DL.480p.x264.AVADL.US.mkv"},{"href":"Game.of.Thrones.S07E04.The.Spoils.of.War.1080p.AMZN.WEB-DL.DDP5.1.H.264-GoT.www.yoozdl.com.mkv","title":"Game.of.Thrones.S07E04.The.Spoils.of.War.1080p.AMZN.WEB-DL.DDP5.1.H.264-GoT.www.yoozdl.com.mkv"},{"href":"Game.of.Thrones.S07E05.720p.WEB-DL.x264.yoozdl%201.mkv","title":"Game.of.Thrones.S07E05.720p.WEB-DL.x264.yoozdl 1.mkv"},{"href":"Game.of.Thrones.S07E05.Eastwatch.1080p.AMZN.WEB-DL.DDP5.1.H.264-GoTyoozdl%201.mkv","title":"Game.of.Thrones.S07E05.Eastwatch.1080p.AMZN.WEB-DL.DDP5.1.H.264-GoTyoozdl 1.mkv"},{"href":"Game.of.Thrones.S07E06.1080p.(yoozdl).flv","title":"Game.of.Thrones.S07E06.1080p.(yoozdl).flv"},{"href":"Game.of.Thrones.S07E06.1080p.WEB-DL.6CH.x264.yoozdl.mkv","title":"Game.of.Thrones.S07E06.1080p.WEB-DL.6CH.x264.yoozdl.mkv"},{"href":"Game.of.Thrones.S07E06.480p.WEB-DL.x264.00.mkv","title":"Game.of.Thrones.S07E06.480p.WEB-DL.x264.00.mkv"},{"href":"Game.of.Thrones.S07E06.Beyond.the.Wall.1080p.%20yoozdl.com%20.mkv","title":"Game.of.Thrones.S07E06.Beyond.the.Wall.1080p. yoozdl.com .mkv"},{"href":"Game.of.Thrones.S07E07.1080p.WEB-DL.6CH.x264.yoozdl.com.mkv","title":"Game.of.Thrones.S07E07.1080p.WEB-DL.6CH.x264.yoozdl.com.mkv"},{"href":"Game.of.Thrones.S07E07.720p.WEB-DL.2CH.x265.HEVC.yoozdl.com%20.mkv","title":"Game.of.Thrones.S07E07.720p.WEB-DL.2CH.x265.HEVC.yoozdl.com .mkv"},{"href":"Game.of.Thrones.S07E07.720p.WEB-DL.x264.yoozdl.com.mkv","title":"Game.of.Thrones.S07E07.720p.WEB-DL.x264.yoozdl.com.mkv"},{"href":"Game.of.Thrones.S07E07.The.Dragon.and.the.Wolf.1080p.AMZN.WEB-DL.DDP5.1.H.264-GoTyoozdl.com.mkv","title":"Game.of.Thrones.S07E07.The.Dragon.and.the.Wolf.1080p.AMZN.WEB-DL.DDP5.1.H.264-GoTyoozdl.com.mkv"},{"href":"Game_Of_Thrones_7x05_Promo_Blood_of_the_Dragon%20%C3%98%C2%AA%C3%98%C2%B1%C3%9B%C5%92%C3%99%E2%80%9E%C3%98%C2%B1%20%C3%99%E2%80%9A%C3%98%C2%B3%C3%99%E2%80%A6%C3%98%C2%AA%205%20%C3%9B%C5%92%C3%99%CB%86%C3%98%C2%B2%20%C3%98%C2%AF%C3%9B%C5%92%20%C3%98%C2%A7%C3%99%E2%80%9E.mp4","title":"Game_Of_Thrones_7x05_Promo_Blood_of_the_Dragon ØªØ±ÛŒÙ„Ø± Ù‚Ø³Ù…Øª 5 ÛŒÙˆØ² Ø¯ÛŒ Ø§Ù„.mp4"},{"href":"Game_Of_Thrones_S07E01_WEB-DL_1080p(yoozdl).mkv","title":"Game_Of_Thrones_S07E01_WEB-DL_1080p(yoozdl).mkv"},{"href":"Game_Of_Thrones_S07E01_WEB-DL_720p(yoozdl).mkv","title":"Game_Of_Thrones_S07E01_WEB-DL_720p(yoozdl).mkv"},{"href":"Game_Of_Thrones_S07E03_WEB-DL_720p_(yoozdl).mkv","title":"Game_Of_Thrones_S07E03_WEB-DL_720p_(yoozdl).mkv"},{"href":"Game_Of_Thrones_S07E06_480p.(yoozdl).mkv","title":"Game_Of_Thrones_S07E06_480p.(yoozdl).mkv"},{"href":"Game_Of_Thrones_S07E06_WEB-DL_720p_00.mkv","title":"Game_Of_Thrones_S07E06_WEB-DL_720p_00.mkv"},{"href":"Game_of_Thrones%20tizer3%20yoozdl.mp4","title":"Game_of_Thrones tizer3 yoozdl.mp4"},{"href":"Game_of_Thrones_Season_7__WinterIsHere_Trailer_2_(HBO)-[720p].mp4","title":"Game_of_Thrones_Season_7__WinterIsHere_Trailer_2_(HBO)-[720p].mp4"},{"href":"Teen.Wolf.S06E14.HDTV.x264-FLEET.www.yoozdl.com.mkv","title":"Teen.Wolf.S06E14.HDTV.x264-FLEET.www.yoozdl.com.mkv"},{"href":"_%C3%98%C2%AA%C3%98%C2%B1%C3%9B%C5%92%C3%99%E2%80%9E%C3%98%C2%B1%20%C3%99%E2%80%9A%C3%98%C2%B3%C3%99%E2%80%A6%C3%98%C2%AA%204Game%20of%20Thrones%20%C3%99%C2%81%C3%98%C2%B5%C3%99%E2%80%9E%207%20%C3%99%E2%80%A1%C3%99%C2%81%C3%98%C2%AA%C3%99%E2%80%A6%20%C3%98%C2%A8%C3%98%C2%A7%20%C3%99%E2%80%9E%C3%9B%C5%92%C3%99%E2%80%A0%C3%9A%C2%A9%20%C3%99%E2%80%A6%C3%98%C2%B3%C3%98%C2%AA%C3%99%E2%80%9A%C3%9B%C5%92%C3%99%E2%80%A6%20%C3%99%CB%86%20%C3%98%C2%B1%C3%98%C2%A7%C3%9B%C5%92%C3%9A%C2%AF%C3%98%C2%A7%C3%99%E2%80%A0.mp4","title":"_ØªØ±ÛŒÙ„Ø± Ù‚Ø³Ù…Øª 4Game of Thrones ÙØµÙ„ 7 Ù‡ÙØªÙ… Ø¨Ø§ Ù„ÛŒÙ†Ú© Ù…Ø³ØªÙ‚ÛŒÙ… Ùˆ Ø±Ø§ÛŒÚ¯Ø§Ù†.mp4"},{"href":"_%D8%AA%DB%8C%D8%B2%D8%B1%20%D9%82%D8%B3%D9%85%D8%AA%205Game_Of_Thrones_7x05_Promo_Blood_of_the_Dragon.mp4","title":"_تیزر قسمت 5Game_Of_Thrones_7x05_Promo_Blood_of_the_Dragon.mp4"},{"href":"game%20posht%20yoozdl.mp4","title":"game posht yoozdl.mp4"},{"href":"game.of.thrones.s07e01(yoozdl).mkv","title":"game.of.thrones.s07e01(yoozdl).mkv"},{"href":"game.of.thrones.s07e02.1080p.web.h264-tbs%20yoozd.mkv","title":"game.of.thrones.s07e02.1080p.web.h264-tbs yoozd.mkv"},{"href":"game.of.thrones.s07e02.480p.hdtv.x264yoozdl.mkv","title":"game.of.thrones.s07e02.480p.hdtv.x264yoozdl.mkv"},{"href":"game.of.thrones.s07e03.1080p.web.h264-tbs.www.yoozdl.com.mkv","title":"game.of.thrones.s07e03.1080p.web.h264-tbs.www.yoozdl.com.mkv"},{"href":"game.of.thrones.s07e03.720p.web.h264-tbs.yoozdl.com.mkv","title":"game.of.thrones.s07e03.720p.web.h264-tbs.yoozdl.com.mkv"},{"href":"game.of.thrones.s07e04.1080p.web.h264-tbs.www.yoozdl.com.mkv","title":"game.of.thrones.s07e04.1080p.web.h264-tbs.www.yoozdl.com.mkv"},{"href":"game.of.thrones.s07e04.720p.web.h264-tbs.www.yoozdl.com.mkv","title":"game.of.thrones.s07e04.720p.web.h264-tbs.www.yoozdl.com.mkv"},{"href":"game.of.thrones.s07e04.720p.web.hevc.x265.rmteam.mkv","title":"game.of.thrones.s07e04.720p.web.hevc.x265.rmteam.mkv"},{"href":"game.of.thrones.s07e04.the.spoils.of.war.480p.webrip.x264.rmteam.mkv","title":"game.of.thrones.s07e04.the.spoils.of.war.480p.webrip.x264.rmteam.mkv"},{"href":"game.of.thrones.s07e05.480p.web.x264.rmteam.mkv","title":"game.of.thrones.s07e05.480p.web.x264.rmteam.mkv"},{"href":"game.of.thrones.s07e05.480p.web.x264.rmteam_2yoozdl%201.mkv","title":"game.of.thrones.s07e05.480p.web.x264.rmteam_2yoozdl 1.mkv"},{"href":"game.of.thrones.s07e05.720p.web.h264-tbs.www.RapidMovieZ.com.mkv","title":"game.of.thrones.s07e05.720p.web.h264-tbs.www.RapidMovieZ.com.mkv"},{"href":"game.of.thrones.s07e05.720p.web.h264-tbsyoozdl%201.mkv","title":"game.of.thrones.s07e05.720p.web.h264-tbsyoozdl 1.mkv"},{"href":"game.of.thrones.s07e05.720p.web.hevc.x265.rmteam%20yoozdl%201.mkv","title":"game.of.thrones.s07e05.720p.web.hevc.x265.rmteam yoozdl 1.mkv"},{"href":"game.of.thrones.s07e05.720p.web.hevc.x265.rmteam11.mkv","title":"game.of.thrones.s07e05.720p.web.hevc.x265.rmteam11.mkv"},{"href":"game.of.thrones.s07e06.720p.web.h264-tbs.00.mkv","title":"game.of.thrones.s07e06.720p.web.h264-tbs.00.mkv"},{"href":"game.of.thrones.s07e06.proper.720p.hdtv.hevc.x265.rmteam.mkv","title":"game.of.thrones.s07e06.proper.720p.hdtv.hevc.x265.rmteam.mkv"},{"href":"game.of.thrones.s07e07.720p.web.h264-strife.yoozdl.com.mkv","title":"game.of.thrones.s07e07.720p.web.h264-strife.yoozdl.com.mkv"},{"href":"game.of.thrones.s07e07.the.and.the.wolf.480p.webrip.x264.rmteam%20yoozdl.com%20.mkv","title":"game.of.thrones.s07e07.the.and.the.wolf.480p.webrip.x264.rmteam yoozdl.com .mkv"},{"href":"got_s7e5_1080p.(yoozdl).mkv","title":"got_s7e5_1080p.(yoozdl).mkv"},{"href":"got_s7e5_720p%20x265.(yoozdl).mkv","title":"got_s7e5_720p x265.(yoozdl).mkv"},{"href":"got_s7e5_720p_WebDL.(yoozdl).mkv","title":"got_s7e5_720p_WebDL.(yoozdl).mkv"},{"href":"%C3%98%C2%AA%C3%98%C2%B1%C3%9B%C5%92%C3%99%E2%80%9E%C3%98%C2%B1%20%C3%99%E2%80%9A%C3%98%C2%B3%C3%99%E2%80%A6%C3%98%C2%AA%20%C3%98%C2%AF%C3%99%CB%86%C3%99%E2%80%A6%20%C3%99%C2%81%C3%98%C2%B5%C3%99%E2%80%9E%207%20%C3%98%C2%B3%C3%98%C2%B1%C3%9B%C5%92%C3%98%C2%A7%C3%99%E2%80%9E%20Game%20of%20Thrones.mp4","title":"ØªØ±ÛŒÙ„Ø± Ù‚Ø³Ù…Øª Ø¯ÙˆÙ… ÙØµÙ„ 7 Ø³Ø±ÛŒØ§Ù„ Game of Thrones.mp4"},{"href":"%C3%98%C2%AF%C3%98%C2%A7%C3%99%E2%80%A0%C3%99%E2%80%9E%C3%99%CB%86%C3%98%C2%AF%20%C3%98%C2%B3%C3%98%C2%B1%C3%9B%C5%92%C3%98%C2%A7%C3%99%E2%80%9E%20%C3%99%E2%80%9A%C3%98%C2%B3%C3%99%E2%80%A6%C3%98%C2%AA%204%20%C3%99%E2%80%9E%C3%99%CB%86%20%C3%98%C2%B1%C3%99%C2%81%C3%98%C2%AA%C3%99%E2%80%A1%20Game%20of%20Thrones%20%C3%99%C2%81%C3%98%C2%B5%C3%99%E2%80%9E%207%20%C3%99%E2%80%A1%C3%99%C2%81%C3%98%C2%AA%C3%99%E2%80%A6%20%C3%98%C2%A8%C3%98%C2%A7%20%C3%99%E2%80%9E%C3%9B%C5%92%C3%99%E2%80%A0%C3%9A%C2%A9%20%C3%99%E2%80%A6%C3%98%C2%B3%C3%98%C2%AA%C3%99%E2%80%9A%C3%9B%C5%92%C3%99%E2%80%A6%20%C3%99%CB%86%20%C3%98%C2%B1%C3%98%C2%A7%C3%9B%C5%92%C3%9A%C2%AF%C3%98%C2%A7%C3%99%E2%80%A0.mp4","title":"Ø¯Ø§Ù†Ù„ÙˆØ¯ Ø³Ø±ÛŒØ§Ù„ Ù‚Ø³Ù…Øª 4 Ù„Ùˆ Ø±ÙØªÙ‡ Game of Thrones ÙØµÙ„ 7 Ù‡ÙØªÙ… Ø¨Ø§ Ù„ÛŒÙ†Ú© Ù…Ø³ØªÙ‚ÛŒÙ… Ùˆ Ø±Ø§ÛŒÚ¯Ø§Ù†.mp4"}];
  // res.send(data);
});
const { exec  } = require('child_process');
appExpress.post('/api/play', function (req, res) {
  var url = req.body.url;
  const child = exec ('mpv ' + url,(err, stdout, stderr) => {
    console.log(stdout);
  });
  res.send({msg : "ok"});
});

appExpress.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
