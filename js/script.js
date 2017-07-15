$(function(){
    
    //MUSIC
    var audio = $("audio")[0];
    var startSong = $(".music")[0];
    var oceanSong = $(".ocean")[0];
    var coinsSong = $(".coins")[0];
    var endSong = $(".end")[0];
    startSong.play();
     
    //BUTTONS
    var startBtn = $(".startBtn");
    var instructionBtn = $(".instructionBtn");
    var endGameBtn = $(".endGameBtn");
    var musicBtn = $(".musicBtn");
    var tableScoresBtn = $(".tableScoresBtn");
    
    //SCREEN
    var startScreen = $("#startScreen");
    var gameScreen = $("#gameScreen");
    var instructionScreen = $("#instructionScreen");
    var endScreen = $("#endScreen");
    var information = $("#information");
    
    startBtn.on("click", function(event){
       event.preventDefault();
        startNewGame();
        startScreen.fadeOut(50); //nie zmieniać czasu, bo ptk nie będą się naliczać/złoto ukrywać
        gameScreen.fadeIn(100);
        information.fadeIn(100);
        startSong.pause();
        oceanSong.play();     
    });
    
    instructionBtn.on("click",function(event){
        event.preventDefault();
        startScreen.fadeOut(1000);
        instructionScreen.delay(1000).fadeIn(1000);
        startSong.pause();
        endSong.play();
    });
    
    musicBtn.on("click",function(event){
        event.preventDefault();
        var textBtn = $(this).find('p');        
        
        if(textBtn.text()==="SOUND ON"){
            textBtn.text("SOUND OFF");
            startSong.play();
        }else{
            textBtn.text("SOUND ON");
            startSong.pause();
        }
        
    });
    var form = $("form");
        
    tableScoresBtn.on("click",function(event){
        event.preventDefault();
        startScreen.fadeOut(1000);
        endScreen.delay(1000).fadeIn(1000);
       // form.addClass('invisible'); ///do skończenia - koniec gry usunąć klase invisible
    });
    
    endGameBtn.on("click", function(event){
        event.preventDefault();
        backToMenu();
    });
    
    
    //ITEMS
    var time = $('#time');
    var character = $('.character');
    var notice = $('#result');
    var timeCounter = 5;
    var heightScreen = gameScreen.height();
    var widthScreen = gameScreen.width();
    var heightCharacter = character.height();
    var widthCharacter = character.width();
    
    // START NEW GAME !!!
    function startNewGame(){
        score = 0;
        timeCounter = 5; //zmienić na 90
        startPosition();
        functionSetInterval();
    }    
     
       /* TIME COUNTER    //ok*/
    function functionSetInterval(){
        
        var interval = setInterval(function(){
            timeCounter--;
            if(timeCounter === 10){
                time.addClass('finalCounting');
            }
            if (timeCounter === 0){
                clearInterval(interval);
                endGame();
            }
            
            time.text(timeCounter);
            //$('#result').text(score);
            
            $(".item").each(function(){
                if (
                    (character.position().top + character.outerHeight() >=  $(this).position().top)
                        && 
                    (character.position().top <= $(this).position().top+$(this).outerHeight())
                        && 
                    (character.position().left + character.outerWidth() >=  $(this).position().left)
                        && 
                    (character.position().left <= $(this).position().left + $(this).outerWidth())
                    ){  
                    if ($(this).hasClass('silverCoin')){
                        $(this).fadeOut(100);
                        score++;
                    } else if ($(this).hasClass('goldCoin')){
                        $(this).fadeOut(100);
                        score+=10;
                    }else{
                        endGame();
                        clearInterval(interval);
                    }    
                    }
            })
           // console.log(character.position().bottom)
            if (character.position().top < -50) {
               character.animate({
                    'top': '0' +'px'
                });
            }
            if (character.position().top + heightCharacter > heightScreen-heightCharacter) {
               character.animate({
                    'top': heightScreen-heightCharacter
                });
            } 
            if (character.position().left < -50) {
               character.animate({
                    'left': '0' +'px'
                });
            } 
            //DOKOŃCZYĆ PRAWA STRONE
               // console.log(character.position().top);
            //console.log(heightScreen);
            //console.log(character.height());
            if (character.position().left+widthCharacter > widthScreen-widthCharacter) {
               character.animate({
                    'left': widthScreen-widthCharacter
                });
            } 
        },1000);
    }
 
    function backToMenu(){
        instructionScreen.fadeOut(1000);
        gameScreen.fadeOut(1000);
        information.fadeOut(1000);
        endScreen.fadeOut(1000);
        startScreen.delay(1000).fadeIn(1000);
        endSong.pause();
        time.removeClass('finalCounting');
        ///oceanSong.pause();
        //startSong.play();
      // odNowa();
    }
    var showResult = $(".showResult");
    var showResult2 = $(".showResult2");
    function endGame(){
        gameScreen.fadeOut(1000);
        information.fadeOut(1000);
        endScreen.fadeIn(1100);
        oceanSong.pause();
        endSong.play();
        showResult.text(score);
        showResult2.text(score);
    }
    
    
/* COINS, CHARACTER POSITION */
var coins = $('.item');
var minDistance = 100; 
var maxDistanceTop = $('#gameScreen').height()-100;     //coinsy muszą spadać
var maxDistanceLeft = $('#gameScreen').width()+400;     //coinsy musza sie ruszac
    
    
function startPosition() {
    character.css('top','350px').css('left','10px');
    coins.each(function(){
        left2 = ((Math.random() * (maxDistanceLeft-minDistance))+minDistance).toFixed();
        top2 = ((Math.random()*(maxDistanceTop-minDistance))+minDistance).toFixed();
        //console.log($('#gameScreen').height());
        $(this).css({
            'left': left2+'px',
            'top':  top2+'px',
            'display': 'block'
        },500);
                     
        if(left2>$('#gameScreen').width()-50){
            $(this).addClass('moveToLeft');
        }   
        if(top2<200){
            $(this).addClass('moveToBottom');
        }
    });
}
    
  
    /* MOVEMENT */
    var character = $('.character');
    var score = 0;
    var elements = $(".item");
    

    $(document).keydown(function(direction) {
         notice.text(score);
          switch (direction.which){
                case 37:{
                    character.css({
                        'transform': 'rotate(-180deg)',
                        'left': '-=10'  
                    })
                    break;
                }
                case 38:{
                     character.css({
                        'transform': 'rotate(-45deg)',
                        'top': '-=10'  
                    })
                    break;
                }
                case 39:{
                     character.css({
                        'transform': 'rotate(-0deg)',
                        'left': '+=10'  
                    })
                    break;
                }   
                case 40:{
                     character.css({
                        'transform': 'rotate(450deg)',
                        'top': '+=10'  
                    })
                    break;
                }
              default:{
                 notice.text("Poruszaj się strzałkami.");
              }
        }
    });
    
});