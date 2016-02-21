// jQuery Document Ready
$(function() {
  var donutApi = "https://api.doughnuts.ga/doughnuts/";
  var giphyApiRoot = 'https://api.giphy.com/';
  var giphyapiKey = 'dc6zaTOxFJmzC'
  var tempId;
  var updatedflavor;
  var updatedstyle;

  var loadDonuts = function(){

    $('#doughnuts').empty();
    var jqXHR = $.ajax({
      method: "GET",
      url: donutApi,
      data: {},
      dataType: "json"
    })
      .done(function(data){
        console.log(data);

        for (var i = 0; i < data.length; i++){
          tempId = data[i].id;
          $('#doughnuts').append('<li class="donut'+data[i].id+'"><a href="#" data-toggle="modal" id="donutModal" data-target="#' + data[i].id + '">' + data[i].flavor + " " + data[i].style + '</li>');
          $('#doughnuts').append('<div id="' + data[i].id + '" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">'+
           data[i].flavor + " " + data[i].style +
           '</h4></div><div class="modal-body"></div><div class="modal-footer"><button type="button" data-donut-id="' +
           data[i].id +
           '" class="btn btn-default delete" data-dismiss="modal">Delete</button><button type="button" class="btn btn-default update">Update</button><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div>' +
           '<form id="updatedonut" action="" method="post"><input type="text" name="updatedflavor" id="updatedflavor"></input><input type="text" name="updatedstyle" id="updatedstyle"></input></form></div></div></div>');
          // $('#doughnuts').append('<form id="update" action="" method="post"><input type="text" name="flavor"></input><input type="text" name="style"></input></form>')

        }

        $('.update').click(function(){
            console.log('hi')
            updatedflavor = $('#updatedflavor').val();
            updatedstyle = $('#updatedstyle').val();

            console.log(updatedflavor);
            console.log(updatedstyle);
            $.ajax({
              type: "PUT",
              url: donutApi + tempId,
              data: {
              flavor: 'doesnt',
              style: 'work'
              }
            })
            .done(function(data){
              console.log(data.style);
              $('.modal-title').empty();
              $('.modal-title').html(data.flavor + " " + data.style);

            })
        })

        // $('.update').click(function(){
          // updatedflavor = $('#updatedflavor').val();
          // updatedstyle = $('#updatedstyle').val();
            // console.log(updatedflavor);
            // console.log(updatedstyle);
            // $('#updates').show();
            // $.ajax({
            //   type: "PUT",
            //   url: donutApi + tempId,
            //   data: {
            //   flavor: flavor,
            //   style: style
            //   }
            // })
            // .done(function(data){
            //   console.log(data);

            // })
        // })


        $('li').on('click', function(){
          $.ajax({
            method: "GET",
            url: giphyApiRoot + 'v1/gifs/random',
            data: {
            api_key: giphyapiKey,
            tag: 'doughnuts'
            }
          })
            .done(function(giphy){
              $('.modal-body').empty();
              giphyURL = giphy.data.image_original_url;
              $('.modal-body').append('<img src =' + giphyURL + '>');

              $('.delete').click(function() {
                var donutId = $(this).data('donut-id');
                deleteDonut(donutId);
                $('.donut'+donutId).empty();
              });


            })
            .fail(function() {
              console.log("error");
            })
            .always(function() {
              console.log("complete");
            });
          })
      });
    }

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
        $('.nothing').html('<audio autoplay><source src="../images/doh.mp3" type="audio/mp3"></audio>');
      })
     .fail(function(jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
     })
     .always(function() {
        console.log('Request completed');
     });
     return false;
 });

  var deleteDonut = function(donutId) {
      var jqXHR = $.ajax({
        method: "DELETE",
        url: donutApi + donutId,
        data: {},
        dataType: "json"
      })
       .done(function() {
          $('.nothing').html('<audio autoplay><source src="../images/doh.mp3" type="audio/mp3"></audio>');
       })
       .fail(function(jqXHR, textStatus) {
          console.log("Request failed: " + textStatus);
       })
       .always(function() {
          console.log('Request completed');
       });
    };
loadDonuts();
});



