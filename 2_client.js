const net = require('net')
const readline = require('readline')

// Relacionado ao processo de escrever na linha de comando no node js
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Criar um socket novo e conectar ao servidor
const client = new net.Socket()
client.connect(4000, '0.0.0.0', () => {
    rl.addListener('line', line => {
          client.write(line)
    })
})

// Logar as mensagens no console uma vez que enviadas pelo server
client.on('data', data => {
    console.log(data.toString());
 });

client.on('end', () => {
    console.log("Connection with the server has been killed")
})