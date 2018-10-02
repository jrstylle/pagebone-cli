#!/usr/bin/env node

const download = require('download');
const cli = require('commander');
const tree = require('tree-directory');
const ora = require('ora');
const packageFile =  require('../package.json');

function help() {
  return console.log(`
Usage: ${packageFile.name} [options] or [commands]

A simple CLI app to create new project using pagebone Boilerplate https://github.com/jrstylle/pagebone#readme

Options:

-v --version        Show the CLI version
-h --help           Show all available commands and options

Commands:

new <projectName>  Create new project using the pagebone Boilerplate
  `);
}

cli.version(`version ${packageFile.version}`, '-v, --version');

cli.command('new <projectName>').action( projectName => {

    const spinner = ora({color: "cyan"}).start('Downloading the project...');

    download('https://github.com/jrstylle/pagebone/archive/master.zip',`${projectName}`, { extract: true, strip: 1, mode: 666, headers: { accept: 'application/zip' } })
    .then(() => {

      spinner.succeed(`Download complete\n\n${projectName}`);
      tree(`${projectName}`).then( res => {

        console.log(res);
      });
    })
    .catch( err => {

      spinner.fail('Download failed');
      console.log(err);
    });
});

(!process.argv[2] || process.argv[2] === '-h' || process.argv[2] === '--help')
  ? help()
  : cli.parse(process.argv);

