
let Peer = require('simple-peer');
let Sentiment = require('sentiment');
let socket = io();
const video = document.querySelector('video');
const filter = document.querySelector('#filter');
const checkboxTheme = document.querySelector('#theme');
let client = {};
let currentFilter;
let senti = new Sentiment();
//get stream

let SpeechRecognition = window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
// let Content = '';
recognition.continuous = true;

function biased(text) {
    return ((senti.analyze(text).negative.length > 0) || (text.indexOf("not giving") > -1));
}

recognition.onresult = function(event) {
    let current = event.resultIndex;
    let transcript = event.results[current][0].transcript;
    if(biased(transcript)) {
        document.getElementById('myModal').style = "display:block";
        setTimeout(() => document.getElementById('myModal').style = "display:none", 3000);
    } 
    // Content += transcript;
    // document.getElementById('textbox').innerHTML = Content;
};

recognition.onstart = function() { 
    // document.getElementById('instructions').innerHTML = 'Voice recognition is ON.';
    document.getElementById("before_call").style = "display:none";
    document.getElementById("on_call").style = "display:block";
}

recognition.onspeechend = function() {
    // document.getElementById('instructions').innerHTML = 'No activity.';
    // console.dir(recognition);
    // recognition.stop();
    // recognition.start();
}

recognition.onerror = function(event) {
    if(event.error == 'no-speech') {
        // document.getElementById('instructions').innerHTML = 'Try again.';  
    }
}
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        socket.emit('NewClient');
        video.srcObject = stream;
        video.play();
        filter.addEventListener('change', (event) => {
            currentFilter = event.target.value;
            video.style.filter = currentFilter;
            SendFilter(currentFilter);
            event.preventDefault;
        })

        //used to initialize a peer
        function InitPeer(type) {
            let peer = new Peer({ initiator: (type == 'init') ? true : false, stream: stream, trickle: false });
            peer.on('stream', function (stream) {
                CreateVideo(stream);
                recognition.start();
                console.log("Started recognition");
            })
            //This isn't working in chrome; works perfectly in firefox.
            // peer.on('close', function () {
            //     document.getElementById("peerVideo").remove();
            //     peer.destroy()
            // })
            peer.on('data', function (data) {
                let decodedData = new TextDecoder('utf-8').decode(data)
                let peervideo = document.querySelector('#peerVideo')
                peervideo.style.filter = decodedData
            })
            return peer
        }

        //for peer of type init
        function MakePeer() {
            client.gotAnswer = false
            let peer = InitPeer('init')
            peer.on('signal', function (data) {
                if (!client.gotAnswer) {
                    socket.emit('Offer', data)
                }
            })
            client.peer = peer
        }

        //for peer of type not init
        function FrontAnswer(offer) {
            let peer = InitPeer('notInit')
            peer.on('signal', (data) => {
                socket.emit('Answer', data)
            })
            peer.signal(offer)
            client.peer = peer
        }

        function SignalAnswer(answer) {
            client.gotAnswer = true
            let peer = client.peer
            peer.signal(answer)
        }

        function CreateVideo(stream) {
            CreateDiv()

            let video = document.createElement('video')
            video.id = 'peerVideo'
            video.srcObject = stream
            video.setAttribute('class', 'embed-responsive-item hide')
            document.querySelector('#peerDiv').appendChild(video)
            video.play()
            //wait for 1 sec
            setTimeout(() => SendFilter(currentFilter), 1000)

            video.addEventListener('click', () => {
                if (video.volume != 0)
                    video.volume = 0
                else
                    video.volume = 1
            })

        }

        function SessionActive() {
            document.write('Session Active. Please come back later')
        }

        function SendFilter(filter) {
            if (client.peer) {
                client.peer.send(filter)
            }
        }

        function RemovePeer() {
            if(document.getElementById("peerVideo"))
                document.getElementById("peerVideo").remove();
            if(document.getElementById("muteText"))
                document.getElementById("muteText").remove();
            if (client.peer) {
                client.peer.destroy();
            }
            recognition.stop();
            console.log("Stoped recognition");
        }

        socket.on('BackOffer', FrontAnswer)
        socket.on('BackAnswer', SignalAnswer)
        socket.on('SessionActive', SessionActive)
        socket.on('CreatePeer', MakePeer)
        socket.on('Disconnect', RemovePeer)

    })
    .catch(err => document.write(err))

checkboxTheme.addEventListener('click', () => {
    if (checkboxTheme.checked == true) {
        document.body.style.backgroundColor = '#212529'
        if (document.querySelector('#muteText')) {
            document.querySelector('#muteText').style.color = "#fff"
        }

    }
    else {
        document.body.style.backgroundColor = '#fff'
        if (document.querySelector('#muteText')) {
            document.querySelector('#muteText').style.color = "#212529"
        }
    }
}
)

function CreateDiv() {
    let div = document.createElement('div')
    div.setAttribute('class', "centered")
    div.id = "muteText"
    div.innerHTML = "Click to Mute/Unmute"
    document.querySelector('#peerDiv').appendChild(div)
    if (checkboxTheme.checked == true)
        document.querySelector('#muteText').style.color = "#fff"
}
// console.log(senti.analyze("I am feeling happy"));
// console.log(senti.analyze("Hello how are you."));
// console.log(senti.analyze("Hello, I am fine thank you. I am Sylvia Herndon, I am a solo entrepreneur planning to setup my second venture. Inorder to get started, I would be requiring a small loan. I have"));
// console.log(senti.analyze("Well, we are not giving loan to new customers now."));
// console.log(senti.analyze("I do have an account here; and"));
// console.log(senti.analyze("Oh, in that case if you can provide the supporting document we can work it out."));
