const net = require('net')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const handleConnection = socket => {
    console.log("Connected with the user!")
    socket.on('end', () => {
        console.log('User has disconnected')
    })
    socket.on('data', data => {
        console.log("Client: ", data.toString())
    })
    rl.addListener('line', line => {
        socket.write(line)
    })
}

const server = net.createServer(handleConnection)
server.listen(4000, '0.0.0.0')