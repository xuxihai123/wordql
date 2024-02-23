/**
 * 查找关键字出现次数统计
 */

var glob = require("glob");
var path = require("path");
var fs = require("fs");

var args = process.argv;

var cwdDir = process.cwd();

const globText = args[2];
const matchreg = args[3];
if (!globText || !matchreg) {
  console.log(
    'usage: \r\n\twordcount  "./src/**/*.vue" "context.w+("'
  );
  return;
}

// options is optional
glob(globText, {cwd:cwdDir}, function(err, files) {
  if (err) {
    console.log(err);
  } else {
    lookupVars(files);
  }
});

function lookupVars(files) {
  var result = {};
  var content = "";
  files.forEach((temp) => {
    content = fs.readFileSync(temp, "utf8");
    // const content2 = content.replace(/\b(\d+)px\b/g, function(s, p1) {
    //   const val = Number(p1);
    //   if (val <= 5) {
    //     return p1 + 'px';
    //   }

    //   return Math.floor(val * 0.28 * 2) + 'rpx';
    // });
    // fs.writeFileSync(temp, content2, 'utf8');
    const reg = new RegExp(matchreg, "g");
    var matchs = content.match(reg);
    if (matchs) {
      matchs.forEach((temp) => {
        if (!result[temp]) {
          result[temp] = 0;
        }
        result[temp]++;
      });
    }
  });
  console.log(files);
  console.log(result);

  fs.writeFileSync(
    path.resolve(cwdDir, "wordcountout.json"),
    JSON.stringify({ files, result }, null, 2)
  );
}
