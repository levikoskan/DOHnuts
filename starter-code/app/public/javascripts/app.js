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

});
