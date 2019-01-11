
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var Buffer = require('buffer').Buffer;
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var map = require('event-stream').map;

var FILE_DECL = /(?:href=|src=|url\()['|"]([^\s>"']+?)\?rev=([^\s>"']+?)['|"]/gi;

var revPlugin = function revPlugin(config) {
  config = config||{};
  var {
    mode = 'strict',
    outputPath,
    rootDir = ''
  } = config;
  var rootPath = path.join(__dirname,'../../'+rootDir);
  var outputRootPath = path.join(__dirname,'../../');

  return map(function(file, cb) {
    var contents;
    var lines;
    var i, length;
    var line;
    var groups;
    var declarations;
    var dependencyPath;
    var data, hash;

    if(!file) {
      throw new PluginError('gulp-rev-append', 'Missing file option for gulp-rev-append.');
    }

    if(!file.contents) {
      throw new PluginError('gulp-rev-append', 'Missing file.contents required for modifying files using gulp-rev-append.');
    }

    contents = file.contents.toString();

    lines = contents.split('\n');

    length = lines.length;

    for(i = 0; i < length; i++) {
      line = lines[i];
      declarations = line.match(FILE_DECL);

      if (declarations && declarations.length > 0) {

        for(var j = 0; j < declarations.length; j++) {

          groups = FILE_DECL.exec(declarations[j]);

          if(groups && groups.length > 1) {
            // are we an "absoulte path"? (e.g. /js/app.js)
            switch (mode) {
              case 'easy':
                line = line.replace(groups[2], new Date().getTime());
                break;
              default:
                var normPath = path.normalize(groups[1]);
                if(/^(http:\\|https:\\|\\\\)/.test(normPath)){ // cdn 链接
                  dependencyPath = normPath
                } else if (normPath.indexOf(path.sep) === 0) { // 绝对路径
                  dependencyPath = path.join(rootPath,normPath);
                } else { // 其他 相对路径
                  if(outputPath){ // 配置了输出路径
                    console.log(outputRootPath,outputPath,normPath);
                    dependencyPath = path.resolve(outputRootPath, outputPath ,normPath);
                  }else{
                    dependencyPath = path.resolve(path.dirname(file.path), normPath);
                  }
                }
                try {
                  data = fs.readFileSync(dependencyPath);
                  hash = crypto.createHash('md5');
                  hash.update(data.toString(), 'utf8');
                  line = line.replace(groups[2], hash.digest('hex'));
                } catch(e) {
                  // if(mode==='loose'){
                  //   line = line.replace(groups[2], new Date().getTime());
                  // }else{
                  console.log('The file could not be found ---- [path:'+dependencyPath+']')
                  // }

                }
                break;
            }
          }
          FILE_DECL.lastIndex = 0;
        }
        lines[i] = line;
      }
    }

    file.contents = new Buffer(lines.join('\n'));
    cb(null, file);

  });

};

module.exports = revPlugin;