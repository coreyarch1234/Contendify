//CREATING GAME POST REQUESTS AND THE LIKE GO HERE
function generateCode() {
  return Math.round((Math.pow(36, 4 + 1) - Math.random() * Math.pow(36, 4))).toString(36).slice(1);
}

var socket = io(); // Create socket instance
// var loadingNames = []; //object containing name and ID of player to update players.


$(function() {
    $('#players-container').css("display", "none");

    //timer will end and then go to window.location.href = '/start/' + code; for everyone

    function showLoadedPlayers(loadedPlayers){
        for (var index in loadedPlayers){
            if (index == 0){
                var name = 'one';
            }
            else if (index == 1){
                var name = 'two';
            }
            else if (index == 2){
                var name = 'three'
            }
            console.log(`${name} in ${loadedPlayers[index].name} being loaded`);
            $('#players-container').css("display", "block");
            $(`#${name}`).html(`<h1>&nbsp;${loadedPlayers[index].name}</h1>`);
        }
    }


    if ("onhashchange" in window) {
        alert(`The browser supports the hashchange event! ${window.location.href}`);
        locationHashChanged();

    }

    function locationHashChanged() {
        var length = $('#myText').length;
        if (length == 1){
            // console.log('the window has changed and we got the code');
            // socket.emit('getLoadedPlayers');
            // socket.on('returnLoadedPlayers', function(loadedPlayers){
            //     console.log('the loading players: ' + finalLoadedPlayers.length);
            //     console.log('we got the name and the length is: ' + loadedPlayers.length);
            //     console.log('they are: ' + [...loadedPlayers]);
            // })
            //
            // console.log(finalLoadedPlayers);
            var storage = localStorage.getItem('loadingNames');

            console.log('the local storage: ' + JSON.parse(storage));
            // showLoadedPlayers([{
            //     name: "FUCK YOU"
            // }]);
        }else{
            console.log('could not get the code');
        }
    }

    window.onhashchange = locationHashChanged;

    socket.on('updatedAll', function(loadedNames){
        console.log('loaded all for first screen');
        console.log(loadedNames.length);
    })

  $('#create-game').click(function(event) {

    $('#players-container').css("display", "block");

    var name = $('#game-name').val();
    var code = generateCode();
    windowCode = code;
    console.log('the game code is: ' + windowCode);
    var gameObj = {};
    gameObj['name'] = name; //nickname and also name of the game
    gameObj['code'] = code;

    // $('#players-container').css("display", "block");
    // $('#heading-container').hide();
    //publish join here and add to loaded players. Then, ajax post request which will lead to waiting screen
    //when someone joins, add loaded play to screen.
    //timer will end and then go to window.location.href = '/start/' + code; for everyone

    var loadedName = {
        name: name
    }

    socket.emit('publish:join', code, function(){
        socket.emit('loadingScreenUpdate', loadedName);

    });

    socket.on('loadedUpdate', function(loadingNames) {
        console.log("loaded names is: " + loadingNames);
        console.log("the loadingNames array length is: " + loadingNames.length);
        localStorage.setItem('loadingNames', JSON.stringify(loadingNames));
        showLoadedPlayers(loadingNames);

        //ajax get request to loading page  window.location.href = '/' + game.code;
    });
    $('#myTextContainer').html(`<h1 id="myText">${code}</h1>`);
    //
    // $.ajax({
    //   type: 'POST',
    //   url: '/',
    //   data: gameObj,
    //   dataType: 'JSON',
    //   fail: function() {
    //     alert(error.message);
    //   },
    //   success: function(game) {
    //     window.location.href = '/' + game.code;
    //   }
    // });
  });

  // $('#join-game').click(function(event) {
  //   var code = $('#game-code').val();
  //
  //   window.location.href = '/start/' + code;
  // });

  $('#join-game').click(function(event) {
    var code = $('#game-code').val();
    var name = $('#join-name').val();
    //now that the user has entered the code and name, their loading screen spot will update.
    var loadedName = {
        name: name
    }

    socket.emit('publish:join', code, function(){
        socket.emit('loadingScreenUpdate', loadedName);

    });

    socket.on('loadedUpdate', function(loadingNames) {
        console.log("loaded names is: " + loadingNames);
        console.log("the loadingNames array length is: " + loadingNames.length);
        localStorage.setItem('loadingNames', JSON.stringify(loadingNames));
        showLoadedPlayers(loadingNames);
        socket.emit('updateAll', loadingNames);

        //ajax get request to loading page  window.location.href = '/' + game.code;
    });


    // //emit data loading screen person
    //
    // socket.emit('publish:join', code, function(){
    //     socket.emit('loadingScreenUpdate', loadingNames);
    //
    // });
    // //receiving new loaded increment
    // socket.on('loadedUpdate', function(loadingNames) {
    //     console.log("loaded names is: " + loadingNames);
    //     loadingNames = loadingNames;
    //     console.log("the loadingNames array length is: " + loadingNames.length);
    // });
    // socket.emit('loadingScreenUpdate', loadingNames);
    //
    // //receiving new loaded increment
    // socket.on('loadedUpdate', function(loadingNames) {
    //     console.log("loaded names is: " + loadingNames);
    //     loadingNames = loadingNames;
    //     console.log("the loadingNames array length is: " + loadingNames.length);
    // });

    //they are redirected upon a timer
    // window.location.href = '/start/' + code;
  });

});
