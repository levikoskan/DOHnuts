// jQuery Document Ready
$(function() {
  var donutApi = "http://api.doughnuts.ga/doughnuts";
  var jqXHR = $.ajax({
    method: "GET",
    url: donutApi,
    data: {},
    dataType: "json"
  })
  .done(function(data){
    for (var i = 0; i < data.length; i++){
      $('#doughnuts').append('<li><a href="#" data-toggle="modal" data-target="#' + data[i].id + '">' + data[i].flavor + " " + data[i].style + '</li>');
      $('#doughnuts').append('<div id="' + data[i].id + '" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">'+ data[i].id + '</h4></div><div class="modal-body"><p>Some text in the modal.</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>');    }
    console.log(data);
  })
  .fail(function(jqXHR, textStatus) {
     console.log("Request failed: " + textStatus);
  })
  .always(function() {
     console.log('Request completed');
       //hideLoadingIndicator();
  });


  $('#new-doughnut').on('submit', function() {
   var flavor = $('#doughnut-flavor').val();
   var style = $('#doughnut-style').val();

   var jqxhr = $.ajax({
         url: donutApi,
         method: "POST",
         data: {
           flavor: flavor,
           style: style
         },
         dataType: "json"
     })
     .done(function(data) {
       $('#doughnuts').prepend("<li>" + data.flavor + " " + data.style + "</li>");

     })
     .fail(function(jqXHR, textStatus) {
       console.log("Request failed: " + textStatus);
     })
     .always(function() {
       console.log('Request completed');
     });

     return false;

   });









});
