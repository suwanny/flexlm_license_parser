
module.exports = (function(){
  var fs = require('fs'),
      _ = require('lodash'),
      validLineKeywords = [
        'SERVER',
        'VENDOR',
        'USE_SERVER',
        'INCREMENT',
        'FEATURE',
        'UPGRADE',
        'PACKAGE',
        'FEATURESET'
      ];

  function LicenseFileParser() {}

  LicenseFileParser.prototype.parse = function (path, callback){
    var licenseInfo = {
      vendor: {},
      server: {use: false},
      features: [],
      invalidLines: []
    };
    fs.readFile(path, function (err, data){
      var validLines = [], prevLines = [];
      if (err) { return callback(err); }
      data.toString().split('\n').forEach(function (line){
        var line = line.trim();
        if (line.indexOf('#') === 0 || line.length === 0) return;
        if (line.slice(-1) === '\\') {
          prevLines.push(line.substr(0, line.length - 1));
          return;
        }
        if (prevLines.length > 0) {
          line = prevLines.join('') + line;
          prevLines = [];
        }
        validLines.push(line);
      });
      licenseInfo = validLines.reduce(parseLicenseLine, licenseInfo)
      callback(licenseInfo);
    });
  };

  function parseLicenseLine (info, line) {
    var tokens = line.split(' '), keyword = tokens.shift();
    switch (keyword) {
      case 'SERVER':
        info.server = _.extend(info.server, {
          host: tokens[0],
          hostid: tokens[1],
          port: tokens[2]
        });
        break;
      case 'VENDOR':
        info.vendor = {
          vendor: tokens[0],
          vendor_daemon_path: tokens[1]
        };
        break;
      case 'USE_SERVER':
        info.server.use = true;
        break;
      case 'INCREMENT':
      case 'FEATURE':
        info.features.push({
          type: keyword,
          name: tokens[0],
          vendor: tokens[1],
          version: tokens[2],
          expiredDate: tokens[3],
          capacity: tokens[4]
        });
        break;
      case 'UPGRADE':
        info.features.push({
          type: keyword,
          name: tokens[0],
          vendor: tokens[1],
          fromVersion: tokens[2],
          toVersion: tokens[3],
          expiredDate: tokens[4],
          capacity: tokens[5]
        });
        break;
      case 'PACKAGE':
        info.package = {
          package: tokens[0],
          vendor: tokens[1],
          version: tokens[2]
        }
        break;
      case 'FEATURESET':
        // We don't really do much here..
        break;
      default:
        info.invalidLines.push(line);
        break;
    }
    return info;
  }

  return LicenseFileParser;
})();
