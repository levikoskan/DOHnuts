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
      $('#doughnuts').append("<li>" + data[i].flavor + " " + data[i].style + "</li>");
    }
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
