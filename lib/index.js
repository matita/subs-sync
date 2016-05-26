var srt = require('./srt');
var fs = require('fs');

srt('test/The.Big.Bang.Theory.S04E04.720p.BluRay.nHD.x264-NhaNc3.srt', function(err, data) {
  if (err)
    return console.error(err);

  fs.writeFileSync('test/sub1.json', JSON.stringify(data));
  console.log('saved sub1.json');
});



srt('test/The.Big.Bang.Theory.s04e04.720p.sub.itasa.srt', function(err, data) {
  if (err)
    return console.error(err);

  fs.writeFileSync('test/sub2.json', JSON.stringify(data));
  console.log('saved sub2.json');
});