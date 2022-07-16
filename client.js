const net = require('net')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const client = new net.Socket()
client.connect(4000, '0.0.0.0', () => {
    console.log("Connected with the server!")
    rl.addListener('line', line => {
        client.write(line)
    })
})

client.on('data', data => {
    console.log("Server:", data.toString());
 });
 
client.on('end', () => {
    console.log("Connection with the server has been killed")
})