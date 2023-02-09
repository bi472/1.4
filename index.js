#!/usr/bin/env node
const readline = require('node:readline');
const fs = require('fs')
const path = require('path')
const { stdin: input, stdout: output, exit } = require('node:process');

const minNumber = 1
const maxNumber = 2
const randomNumber = Math.floor(minNumber + Math.random() * (maxNumber + 1 - minNumber))
const logfile = process.argv.slice(2)?.at(0)

if (logfile === undefined){
    console.log('usage: node index.js <filename>')
    exit()
}

const rl = readline.createInterface({ input, output });
console.log(`A number from ${minNumber} to ${maxNumber} has been guessed`)

rl.setPrompt('Enter a number> ');
rl.prompt();

let result

rl.on('line', (line) => {

    if (randomNumber == +line) {
        console.log('You win')
        result = "win\n"
    } else {
        console.log('You lose')
        result = "lose\n"
    }

    fs.appendFile(logfile, `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} > ${result}`, (err) => {
        if (err) throw Error(err)

    })
    rl.close()
})
