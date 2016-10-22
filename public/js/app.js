var socket = io();
var name;
var room;
var timestamp;
var timestampMoment;
socket.on('connect', function() {
	name = getQueryVariable('name') || 'Anonymous';
	room = getQueryVariable('room');
	jQuery('.details').append('<p><strong>'+name+'</strong></p>');
	jQuery('.header').find('#dis').append('<h3 class="text-center"><strong>' + ' You are in the ' + room  + '</strong></h3>');
	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});
function cleara()
{
	console.log('Hey');
	jQuery('.messages').empty();
}
socket.on('message', function(message) {
	timestamp = message.timestamp;
	var $messages = jQuery('.messages');
	var $message =jQuery('<li class="list-group-item"></li>');
	timestampMoment = moment.utc(timestamp);
	$message.append('<p><strong>' + message.name + ', ' + timestampMoment.local().format('h:mm a') + '</strong></p>');
	$message.append('<p>' + message.text + '</p>');
	$messages.append($message);
});
//Handles submitting of new message
//all the elements in html like title,p,h, can be selected directly insice the jQuery
//ex: jQuery('title')
//id's are selected byt #
var $form = jQuery('#message-form');
$form.on('submit', function(event) {

	event.preventDefault();
	socket.emit('message', {
		name: name,
		text: $form.find('input[name=message]').val()
	});
	$form.find('input[name=message]').val('');
});