/* eslint-disable no-console */
const fs = require('fs/promises');
const fsStd = require('fs');
const { execSync } = require('child_process');
//const { APP_VERSION_URL, APP_VERSION } = require('./src/helpers/constants');

const main = async () => {
  try {
    let config = await fs.readFile('./src/config.json', 'utf8');
    config = JSON.parse(config);
    const APP_VERSION = config.version;
    const URL_VERSION = APP_VERSION.replaceAll('.', '-');
    //const APP_VERSION_URL = config.version.replaceAll('.', '_');
    //const websiteUrl = `${config.genericDomain}/bgee${APP_VERSION_URL}`;
    const websiteUrl = `${config.genericDomain}`;
    const buildDirectory = `./archives/${APP_VERSION}-archived`;
    if (fsStd.existsSync(buildDirectory)) {
      console.log(
        '\x1b[31m%s\x1b[0m',
        `[ABORT] An archive already exists for the version ${APP_VERSION}`
      );
      return;
    }
    config.archive = true;
    await fs.writeFile('./src/config.json', JSON.stringify(config, null, 2));
    console.log('Setting config as an archive');

    const scss = await fs.readFile('./src/styles/global.scss', 'utf8');
    const tmpScss = scss.replace('$archive: false;', '$archive: true;').replace('/img/external_link', `/${URL_VERSION}/img/external_link`);
    await fs.writeFile('./src/styles/global.scss', tmpScss);
    console.log('Setting scss as an archive');

    const html = await fs.readFile('./public/index.html', 'utf8');
    const noIndexSource = await fs.readFile(
      './archives/resources/htmlHead.txt',
      'utf8'
    );
    const tmpHtml = html.replace('<head>', `<head>${noIndexSource}`).replace('/js/ionicons-5.5.4/ionicons.esm.js', `/${URL_VERSION}/js/ionicons-5.5.4/ionicons.esm.js`);
    await fs.writeFile('./public/index.html', tmpHtml);
    console.log('Setting noindex in html');

    const robots = await fs.readFile('./public/robots.txt', 'utf8');
    let tmprobots = 'User-agent: *\nDisallow: /\n';
    await fs.writeFile('./public/robots.txt', tmprobots);
    console.log('Setting proper archived robots.txt file\n');

    let pkg = await fs.readFile('./package.json', 'utf8');
    pkg = JSON.parse(pkg);
    pkg.homepage = websiteUrl;
    await fs.writeFile('./package.json', JSON.stringify(pkg, null, 2));

    try {
      console.log('\x1b[31m%s\x1b[0m', 'Building app');
      execSync('yarn build:cra', { stdio: 'inherit' });
      console.log('Moving directory');
      execSync(`mv ./build "${buildDirectory}"`, { stdio: 'inherit' });
      console.log('Removing unnecessary directories\n');
      execSync('rm -fr coverage', { stdio: 'inherit' });
    } catch (err) {
      console.log('Error =>', err);
    }

    //  Set back to production
    console.log('\x1b[31m%s\x1b[0m', 'Settings production data back\n');
    pkg.homepage = undefined;
    await fs.writeFile('./package.json', JSON.stringify(pkg, null, 2));
    config.archive = false;
    await fs.writeFile('./src/config.json', JSON.stringify(config, null, 2));
    await fs.writeFile('./src/styles/global.scss', scss);
    await fs.writeFile('./public/index.html', html);
    await fs.writeFile('./public/robots.txt', robots);
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
