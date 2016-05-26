var fs = require('fs');

var SECOND = 1000;
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;


function srt(filePath, callback) {
  fs.readFile(filePath, function(err, data) {
    if (err)
      return callback(err);

    return callback(null, srt.fromString('' + data));
  });
}

srt.fromString = function(text) {
  text = text.replace(/\r/g, '');
  var lines = text.split('\n');
  var subs = [];

  while (lines.length) {
    console.log('lines length: ', lines.length);
    var id = getId(lines);
    console.log('id', id);
    if (!id)
      break;
    subs.push({
      id: id,
      startMs: getStartMs(lines),
      endMs: getEndMs(lines),
      text: getText(lines)
    });
  }

  return subs;
}


function getId(lines) {
  return lines.shift();
}

function getStartMs(lines) {
  var timecode = lines[0].match(/[\d:,]+/)[0];
  return timecodeToMs(timecode);
}

function getEndMs(lines) {
  var timecode = lines.shift().match(/-->\s+([\d:,]+)/)[1];
  return timecodeToMs(timecode);
}

function getText(lines) {
  var line;
  var texts = [];
  while ((line = lines.shift()) != '') {
    texts.push(line);
  }

  return texts.join('\n');
}

function timecodeToMs(timecode) {
  var parts = timecode.split(':');
  var secondParts = parts[parts.length - 1].split(',');
  var h = parts[0];
  var m = parts[1];
  var s = secondParts[0];
  var ms = secondParts[1];

  return (+h) * HOUR + 
    (+m) * MINUTE +
    (+s) * SECOND +
    (+ms);
}

module.exports = srt;