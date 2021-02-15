var form = document.getElementById('form');
var input = document.getElementById('input');

let urlArray = window.location.pathname.split("/");
let viewId = urlArray[urlArray.length-1];

var socket = io({
    query: {
        room: viewId
    }
});

function createMovieTicket() {
    var movieTicketNumber = Math.floor(Math.random() * (10000 - 1000) + 1000).toString();
    //Create modal that displays a welcome message along with user's ticket number
    //Add ticket number from the modal into the chat message being emitted and broadcasted
    //Store ticket number in local storage
    //Pull ticket number on page refresh
    //Ticket number determines placement of the message (left or right on the screen)
}


form.addEventListener('submit', function (e) {
    e.preventDefault();
    var messageId = moment().format('YYYYMMDDHHmmss') + Math.floor(Math.random() * (10000 - 1000) + 1000).toString();
    console.log(messageId)
    myMessages.push(messageId);
    if (input.value) {
        $('#messages').append(`<p data-message-id="${messageId}" class="is-pulled-right">${input.value}</p><br><br>`);
        var chat = {
            msg: input.value,
            messageId: messageId
        };
        socket.emit('chat message', chat);

        $.ajax({
            url: "/api/chats",
            method:"POST",
            data: {
                message: input.value,
                viewId: viewId,
                messageId: messageId
            }
        });

        input.value = '';
       
    }

});


socket.on('chat message', function (msg) {
    for (i = 0; i < myMessages.length; i++) {
        if (msg.messageId === myMessages[i]) {
            i = messageIds.length;
        } else if (i === messageIds.length && msg.messageId !== messageIds[i]) {
            $('#message').append(`<p data-messageid="${msg.messageId}" class="is-pulled-left">${msg.msg}</p><br><br>`);
            window.scrollTo(0, document.body.scrollHeight);
        }
    }
});



