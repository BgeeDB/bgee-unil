/* eslint-disable no-console */
const fs = require('fs/promises');
const fsStd = require('fs');
const { execSync } = require('child_process');
const { APP_VERSION } = require('./src/helpers/constants');

const main = async () => {
  try {
    let config = await fs.readFile('./src/config.json', 'utf8');
    config = JSON.parse(config);
    const websiteUrl = `${config.genericDomain}/bgee${APP_VERSION}`;
    const buildDirectory = `./archives/${config.version}-archived`;
    if (fsStd.existsSync(buildDirectory)) {
      console.log(
        '\x1b[31m%s\x1b[0m',
        `[ABORT] An archive already exists for the version ${config.version}`
      );
      return;
    }
    config.archive = true;
    await fs.writeFile('./src/config.json', JSON.stringify(config, null, 2));
    console.log('Setting config as an archive');

    const scss = await fs.readFile('./src/styles/global.scss', 'utf8');
    const tmpScss = scss.replace('$archive: false;', '$archive: true;');
    await fs.writeFile('./src/styles/global.scss', tmpScss);
    console.log('Setting scss as an archive');

    const html = await fs.readFile('./public/index.html', 'utf8');
    const noIndexSource = await fs.readFile(
      './archives/resources/htmlHead.txt',
      'utf8'
    );
    const tmpHtml = html.replace('<head>', `<head>${noIndexSource}`);
    await fs.writeFile('./public/index.html', tmpHtml);
    console.log('Setting noindex in html\n');

    let pkg = await fs.readFile('./package.json', 'utf8');
    pkg = JSON.parse(pkg);
    pkg.homepage = websiteUrl;
    await fs.writeFile('./package.json', JSON.stringify(pkg, null, 2));

    console.log('\x1b[31m%s\x1b[0m', 'Building app');
    execSync('yarn build:cra', { stdio: 'inherit' });
    console.log('Moving directory');
    execSync(`mv ./build "${buildDirectory}"`, { stdio: 'inherit' });
    console.log('Removing unnecessary directories\n');
    execSync('rm -fr coverage', { stdio: 'inherit' });

    //  Set back to production
    console.log('\x1b[31m%s\x1b[0m', 'Settings production data back\n');
    pkg.homepage = undefined;
    await fs.writeFile('./package.json', JSON.stringify(pkg, null, 2));
    config.archive = false;
    await fs.writeFile('./src/config.json', JSON.stringify(config, null, 2));
    await fs.writeFile('./src/styles/global.scss', scss);
    await fs.writeFile('./public/index.html', html);
    console.log(
      '\x1b[93m%s %s\x1b[0m\n',
      'The website url setup for the archive is',
      websiteUrl
    );
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', err);
  }
};

main();
