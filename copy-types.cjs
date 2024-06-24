const fs = require('fs');
const path = require('path');

// 源文件路径和目标文件路径
const sourcePath = path.join(__dirname, 'node_modules', '@types', 'screeps', 'index.d.ts');
const destinationPath = path.join(__dirname, 'typings', 'screeps.d.ts');
postInstall();

function postInstall() {
  // 检查源文件是否存在
  if (!fs.existsSync(sourcePath)) {
    console.error('Source file does not exist:', sourcePath);
    process.exit(1);
  }

  // 确保目标目录存在
  fs.mkdir(path.dirname(destinationPath), {recursive: true}, (err) => {
    if (err) {
      console.error('Error creating directory:', err);
      return;
    }

    fs.copyFile(sourcePath, destinationPath, (err) => {
      if (err) {
        console.error('Error copying file:', err);
      } else {
        console.log('Type definition file copied successfully.');
      }
    });
  });
}
