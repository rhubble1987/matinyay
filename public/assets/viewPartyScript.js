var form = document.getElementById('form');
var input = document.getElementById('input');

var urlArray = window.location.pathname.split("/");
var viewId = urlArray[urlArray.length-1];
var movieTicketNumber = localStorage.getItem('movieTicketNumber');


//Connects the view party to the specific websocket channel
    var socket = io({
        query: {
            room: viewId
        }
    });


//Creates new ticket number
function createMovieTicket() {
    movieTicketNumber = moment().format('YYYYMMDDHHmmss') + Math.floor(Math.random() * (10000 - 1000) + 1000).toString();
    var movieTicket = `<p id="movie-ticket-number" style="display: none">${movieTicketNumber}</p>`;
    $('body').append(movieTicket);
    localStorage.setItem('movieTicketNumber', movieTicketNumber);
    localStorage.setItem('movieTicket', movieTicket);  
}

//Checks to see if an existing movie ticket number exists and if not, it calls the function to create a new ticket number
if (!movieTicketNumber) {
    createMovieTicket();
}


//Emits the chat message to the websocket and also saves the message to the database
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        $('#messages').append(`<div class="box p-2 m-1 has-text-white has-background-primary-dark is-pulled-right">${input.value}</div><br><br>`);
        var chat = {
            msg: input.value,
            movieTicketNumber: movieTicketNumber
        };
        socket.emit('chat message', chat);

        $.ajax({
            url: "/api/chats",
            method:"POST",
            data: {
                message: input.value,
                viewId: viewId,
                movieTicketNumber: movieTicketNumber
            }
        });

        input.value = '';
       
    }

});


//Appends other users' chats
socket.on('chat message', function (msg) {
    console.log(msg);
    var item = document.createElement('div');
    var br = document.createElement('br');
    var secondBr = document.createElement('br');
    item.textContent = msg.msg;
    messages.appendChild(item);
    messages.appendChild(br);
    messages.appendChild(secondBr);
    item.setAttribute('class','box p-2 m-1 has-text-white has-background-link-dark is-pulled-left');
    window.scrollTo(0, document.body.scrollHeight);
});

//Positions user's previous messages to the right
$('.is-pulled-left').each(function() {
    if ($(this).attr('data-movieTicketNumber') == movieTicketNumber) {
        $(this).removeClass('box p-2 has-text-white has-background-link-dark is-pulled-left').addClass('box p-2 m-1 has-text-white has-background-primary-dark is-pulled-right');
    }
});
    



