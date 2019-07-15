console.log("hello")
var MESSAGES = [];
var chat = document.getElementById("chat");
var sendMessageBtn = document.getElementById("send");
var msgInput = document.getElementById("msg");
var registerBtn = document.getElementById("register");
var userNameInput = document.getElementById("username");
var USERNAME = "";

document.getElementById("chat-room").style.display = "none";
sendMessageBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if(msgInput.value) {
        sendMessage()
    }
})

registerBtn.addEventListener('click', function(e) {
    USERNAME = userNameInput.value;
    document.getElementById("registration").style.display = "none";
    document.getElementById("chat-room").style.display = "flex";
    init();
})

var init = function(){
    setInterval(function() {
        receiveMessage().then(function(messages) {
            if(MESSAGES.length == 0 && MESSAGES.length < messages.length) {
                MESSAGES = messages; 
                renderAllMessages();
            }else if(MESSAGES.length < messages.length) {
                MESSAGES = messages; 
                renderLastMessages();
            }
        })
    }, 5000)

    chat.innerHTML = "";
}

register = function() {

}

receiveMessage = function() {
    return new Promise(function(resolve, reject) {
        fetch("http://127.0.0.1:1337/messages")
        .then(function(response) {
            return response.json()
        })
        .then(function(messages) {
            resolve(messages);
        })
        .catch(function(error) {
            reject(error)
        })
    })    
}

renderLastMessages = function() {
    var messageNode = document.createElement("div");
    var nameTxt = document.createTextNode(MESSAGES[MESSAGES.length - 1].username + ": ");
    var titleText = document.createTextNode(MESSAGES[MESSAGES.length - 1].msg);
    messageNode.appendChild(nameTxt);
    messageNode.appendChild(titleText);
    chat.appendChild(messageNode);
}

renderAllMessages = function() {
    MESSAGES.forEach(function(message) {
        var messageNode = document.createElement("div");
        var nameTxt = document.createTextNode(message.username + ": ");
        var titleText = document.createTextNode(message.msg);
        messageNode.appendChild(nameTxt);
        messageNode.appendChild(titleText);
        chat.appendChild(messageNode);
    })
}

sendMessage = function(message) {
    var msg  = msgInput.value;
    var message = {
        msg: msg,
        username: USERNAME
    }
    return new Promise(function(resolve, reject) {
        fetch("http://127.0.0.1:1337/messages", {method: "POST", body: JSON.stringify(message)})
        .then(function(response) {
            return response.json()
        })
        .then(function(messages) {
            resolve(messages);
        })
        .catch(function(error) {
            reject(error)
        })
    })    
}

//init();