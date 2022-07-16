const net = require('net')

// Espalha a mensagem pros demais users conectados
var users = []
const broadcast = msg => {
  users.forEach(client => {
    client.socket.write(msg)
  })
}

// Processo que se passa na conexao e a gerencia
const handleConnection = socket => {
    // Mensagem introdutoria
    socket.write("Welcome to our chat, please tell us your username")

    // Caso receba dados do server
    socket.on('data', data => {
        // verifica indices de user, se ele nao estiver contido na lista, cria-se um objeto visando
        // inclui-lo de modo que seu username e seu socket estejam guardados
        userIndex = getIndexOfUser(socket)
        if (userIndex == -1) {
          users.push({'socket': socket, 'username': data.toString()})
        } else {
          broadcast(users[index]['username']+": "+data.toString())
        }
    })
    socket.on('end', () => {
        socket.write("User Disconnected")
        userIndex = getIndexOfUser(socket)
        users.splice(userIndex, 1)
    })
}

/* Funcao para encontrar o socket na array mais facilmente
    Argumentos:
        socketInfo (socket) = O socket que queremos achar na array

    Retorna:
        index (inteiro) = O indice do elemento que estamos procurando na array de users
                          retorna -1 se nao estiver contido nela
*/
function getIndexOfUser(socketInfo) {
    index = 0
    stopped = false
    while (!stopped) {
      if (index == users.length) {
        stopped = true
        index = -1
      } else if (users[index]['socket'] == socketInfo) {
        stopped = true
      } else {
        index++
      }
    }
    return index
}

// Cria servidor
const server = net.createServer(handleConnection)
server.listen(4000, '0.0.0.0')