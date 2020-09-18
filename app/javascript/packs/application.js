// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")
require("jquery")

import chatRoomChannel from "../channels/chat_room_channel";

$(document).on('turbolinks:load', function () {
  $("form#set_name").on('submit', function(e){
    e.preventDefault();
    let name = $('#add_name').val();
    sessionStorage.setItem('chat_room_name', name)
    chatRoomChannel.announce({ name, type: 'join'})
    $("#modal").css('display', 'none');
  });

  $("form#send_message").on('submit', function(e){
    e.preventDefault();
    let message = $('#message').val();
    if (message.length > 0) {
      chatRoomChannel.speak(message);
      $('#message').val('')
    }
  });

  $(window).on('beforeunload', function() {
    let name = sessionStorage.getItem('chat_room_name')
    chatRoomChannel.announce({ name, type: 'leave'})
  });
})
