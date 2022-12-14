/* eslint-disable no-console */
const fs = require('fs/promises');
const fsStd = require('fs');
const { execSync } = require('child_process');

const main = async () => {
  try {
    let config = await fs.readFile('./src/config.json', 'utf8');
    config = JSON.parse(config);

    const scss = await fs.readFile('./src/styles/global.scss', 'utf8');

    const html = await fs.readFile('./public/index.html', 'utf8');
    const noIndexSource = await fs.readFile(
      './archives/resources/htmlHead.txt',
      'utf8'
    );

    let pkg = await fs.readFile('./package.json', 'utf8');
    pkg = JSON.parse(pkg);

    console.log('Checking production attributes\n');
    let prod = true;
    if (config.archive) {
      prod = false;
      console.log(
        '\x1b[31m[ERROR] %s\x1b[0m',
        'config.json is set as an archive'
      );
    }
    if (scss.indexOf('$archive: false;') === -1) {
      prod = false;
      console.log(
        '\x1b[31m[ERROR] %s\x1b[0m',
        'styles.scss is set as an archive'
      );
    }
    if (html.indexOf(noIndexSource) !== -1) {
      prod = false;
      console.log(
        '\x1b[31m[ERROR] %s\x1b[0m',
        'noindex meta tag are put in public/index.html'
      );
    }
    if (pkg.homepage) {
      prod = false;
      console.log(
        '\x1b[31m[ERROR] %s\x1b[0m',
        'Unwanted "homepage" key is defined in package.json'
      );
    }

    if (!prod) {
      console.log('Problem with prod environement : Canceling build');
      return;
    }

    console.log('\x1b[31m%s\x1b[0m', 'Building app');
    execSync('yarn build:cra', { stdio: 'inherit' });
    console.log('\x1b[31m%s\x1b[0m\n', 'App built successfully');
  } catch (err) {
    console.log(
      '\x1b[31m%s\x1b[0m',
      'CATCH ! Error occured when building : ',
      '\x1b[31m%s\x1b[0m',
      err
    );
    process.exit(1);
  }
};

main();
