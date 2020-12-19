const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3000

app.use(express.static(__dirname + "/public"))
const client = {
    now: 0,
    previous: 0,
    connected: false
};

io.on('connection', function (socket) {
    socket.on("NewClient", function () {
        if (client.now < 2) {
            console.log("outside", client);
            if (client.now == 1) {
                this.emit('CreatePeer')
                client.connected = true;
                console.log("inside", client);
            }
        }
        else {
            this.emit('SessionActive')
        }
        client.previous = client.now;
        client.now += 1;
        console.log(client);
    })
    socket.on('Offer', SendOffer)
    socket.on('Answer', SendAnswer)
    socket.on('disconnect', Disconnect)
})

function Disconnect() {
    if (client.now > 0) {
        if (client.previous <= 2) {
            if(client.connected) {
                this.broadcast.emit("Disconnect")
                client.connected = false;
            }
            client.now -= 1;
        }
    }
}

function SendOffer(offer) {
    this.broadcast.emit("BackOffer", offer)
}

function SendAnswer(data) {
    this.broadcast.emit("BackAnswer", data)
}

http.listen(port, () => console.log(`Active on ${port} port`))
