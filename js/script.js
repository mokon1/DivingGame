$(function(){
    
    //MUSIC
    var audio = $("audio");
    var startSong = $("#startSong")[0];
    var oceanSong = $("#oceanSong")[0];
    var coinsSong = $("#coinsSong")[0];
    startSong.play();
     
    //BUTTONS
    var startBtn = $(".startBtn");
    var instructionBtn = $(".instructionBtn");
    var endGameBtn = $(".endGameBtn");
    var musicBtn = $(".musicBtn");
    var tableScoresBtn = $(".tableScoresBtn");
    
    //SCREENS
    var screens =$(".screen");
    var startScreen = $("#startScreen");
    var gameScreen = $("#gameScreen");
    var heightScreen = gameScreen.height();
    var widthScreen = gameScreen.width();
    var instructionScreen = $("#instructionScreen");
    var endScreen = $("#endScreen");
    
    //ELEMENTS THAT SHOW INFORMATION
    var information = $("#information");
    var form = $("#endScreen").find("form");
    var endScore = $("#endScreen").find(".endScore");
    var notice = $('#result');
    var showResult = $(".showResult");
    var showResult2 = $(".showResult2");
    var time = $('#time');
    
    //SETTINGS
    var timeCounter = 45;
    var collectedCoins = 0;
    var score = 0;
    var minDistance = 100; 
    var maxDistanceTop = $('#gameScreen').height()-100;     //move down coins
    var maxDistanceLeft = $('#gameScreen').width()+100;     //move coins
    var randomX = Math.random() * (widthScreen-200)+200;
    var randomY = Math.random() * (heightScreen-400)+200; 
    
    //ELEMENTS IN GAME
    var diver = $('.diver');
    var heightDiver = diver.height();
    var widthDiver = diver.width();
    var coins = $('.coin');
    var silverCoins = $(".silverCoin");
    var goldCoins = $(".goldCoin");
    var danger = $(".danger");
    
    var objDiver = {
        height: 100,
        width: 150,
        x: 10,
        y: 10
    }
     
    function OtherDiver(setHeight, setWidth, setX, setY, setDelay) {
        this.height= setHeight;
        this.width= setWidth;
        this.x= setX;
        this.y= setY;
        this.delay= setDelay
    }
    var objDiver2 = new OtherDiver(150,200,randomX, randomY,8000);
    var objDiver3 = new OtherDiver(150,200,randomX, randomY,2000);  
    
    function FishBlack (setX, setY, setDelay) {
        this.x= setX;
        this.y= setY;
        this.delay= setDelay
    }
    
    var objFishBlack1 = new FishBlack(randomX-310,randomY+150,1000);
    var objFishBlack2 = new FishBlack(randomX,randomY,2000);
    var objFishBlack3 = new FishBlack(widthScreen-300,heightScreen-300,3000); 
    var objFishBlack4 = new FishBlack(widthScreen-300,heightScreen-300,3000); 
    

    // START NEW GAME
    function startNewGame(){
        score = 0;
        timeCounter = 45;
        startPosition();
        interval = setInterval(functionSetInterval,1000);
    }

            
       /* TIME COUNTER */
    function functionSetInterval(){
            
            //timeCounter
            timeCounter--;
            if(timeCounter <= 10){
                time.addClass('finalCounting');
            }
            if (timeCounter <= 0){
                clearInterval(interval);
                endGame();
            }
            time.text(timeCounter);
            $('#result').text(score);
            
            //collect coins&dangerous
            $(".item").each(function(){
                if (
                    (diver.position().top + diver.outerHeight() >=  $(this).position().top)
                        && 
                    (diver.position().top <= $(this).position().top+$(this).outerHeight())
                        && 
                    (diver.position().left + diver.outerWidth() >=  $(this).position().left)
                        && 
                    (diver.position().left <= $(this).position().left + $(this).outerWidth())
                    ){
                        if ($(this).hasClass('silverCoin')){
                            $(this).fadeOut(100);
                            coinsSong.play();
                            score++;
                            collectedCoins++;
                            addCoins();
                        } else if ($(this).hasClass('goldCoin')){
                            $(this).fadeOut(100);
                            coinsSong.play();
                            score+=10;
                            collectedCoins++;
                            addCoins();
                        }else{
                            timeCounter-=10;
                            $('body').animate({
                                'background-color': '#F170E7'
                            },1000,function(){
                                $(this).animate({
                                     'background-color': '#99CCFF'
                                },500)                               
                            });
                        }
                    }
            });
            
            //borders
            if (diver.position().top < -50) {
               diver.animate({
                    'top': '0' +'px'
                });
            }
            if (diver.position().top  > heightScreen-100) {
               diver.animate({
                    'top': '60vh'
                });
            } 
            if (diver.position().left < -50) {
               diver.animate({
                    'left': '0' +'px'
                });
            } 
            if (diver.position().left > widthScreen-150) { //minus 350-sea current
               diver.animate({
                    'left': '60vw'
                });
            }
   }
    
    function addCoins(){       
        if (collectedCoins%2 == 0){
            coins.each(function(){
                if ($(this).css("display")==="none"){
                    newLeft2 = ((Math.random() * (maxDistanceLeft-minDistance))+minDistance).toFixed();
                    newTop2 = ((Math.random()*(maxDistanceTop-minDistance))+minDistance).toFixed();
                    $(this).css({
                        'left': newLeft2+'px',
                        'top': newTop2+'px',
                        'display': 'block'
                    },500);
                    
                if(newLeft2>$('#gameScreen').width()-50){
                    $(this).addClass('moveToLeft');
                    console.log($(this));
                }
                }
            })     
        }
    } 
    
 
    function endGame(){
        screens.hide();
        endScreen.fadeIn(1100);
        oceanSong.pause();
        startSong.play();
        showResult.text(score);
        showResult2.val(score);
    }
    
    
    /* NEW GAME */
    function startPosition() {
        
        var objDiverProp = objDiver;
         $('.diver').css({
             'height': objDiverProp.height+'px',
             'width': objDiverProp.width+'px',
             'left': objDiverProp.x+'px',
             'top': objDiverProp.y+'px'
         });

        var objDiverProp2 = objDiver2; 
        $('.diver2').css({
             'height': objDiver2.height+'px',
             'width': objDiver2.width+'px',
             'left': objDiver2.x+'px',
             'top': objDiver2.y+'px'
         });    

        $(".diver2").delay(objDiverProp2.delay).animate({
            left: "50px", 
            top: heightScreen-500
        },10000).delay(objDiverProp2.delay).animate({
            left: "+=200px",
            top: heightScreen-500
        },10000).animate({
            left: randomX,
            top: 0
        },9000);


        var objDiverProp3 = objDiver3;
        $('.diver3').css({
             'height': objDiverProp3.height+'px',
             'width': objDiverProp3.width+'px',
             'left': objDiverProp3.x-100+'px',
             'top': objDiverProp3.y-200+'px'
         });
        
        
        $(".diver3").delay(objDiverProp3.delay).animate({
            left: "-=50px", 
            top: heightScreen-250
        },8000).delay(5000).animate({
            left: "+=800px",
            top: heightScreen-500
        },10000).animate({
            left: randomX,
            top: randomY
        },1000);
        
       
        var objFishBlack1Prop = objFishBlack1;
         $('.fishBlack1').css({
             'left': objFishBlack1Prop.x+'px',
             'top': objFishBlack1Prop.y+'px'
         });
        
        var objFishBlack2Prop = objFishBlack2;
         $('.fishBlack2').css({
             'left': objFishBlack2Prop.x+'px',
             'top': objFishBlack2Prop.y+'px'
         });
        
        var objFishBlack3Prop = objFishBlack3;
         $('.fishBlack3').css({
             'left': objFishBlack3Prop.x+'px',
             'top': objFishBlack3Prop.y+'px'
         });
        
         $(".fishBlack3").delay(objFishBlack3Prop.delay).animate({
            left: randomX, 
            top: randomY
        },7000).delay(objFishBlack3Prop.delay).animate({
            left: "+300px",
            top: heightScreen-100
        },5000).animate({
            left: randomX+300,
            top: randomY+500
        },9000);
        
            
        coins.each(function(){
            left2 = ((Math.random() * maxDistanceLeft)+minDistance).toFixed();
            top2 = ((Math.random()*(maxDistanceTop- minDistance))+minDistance).toFixed();
            $(this).css({
                'left': left2+'px',
                'top':  top2+'px',
                'display': 'block'
            },500);
            
            if(left2>$('#gameScreen').width()-50){
                $(this).addClass('moveToLeft');
                console.log($(this));
            }
        });
    }
    
  
    /* MOVEMENT */
    $(document).keydown(function(direction) {
         notice.text(score);
          switch (direction.which){
                case 37:{
                    diver.css({
                        'transform': 'rotate(-180deg)',
                        'left': '-=10'  
                    })
                    break;
                }
                case 38:{
                     diver.css({
                        'transform': 'rotate(-45deg)',
                        'top': '-=10'  
                    })
                    break;
                }
                case 39:{
                     diver.css({
                        'transform': 'rotate(-0deg)',
                        'left': '+=10'  
                    })
                    break;
                }   
                case 40:{
                     diver.css({
                        'transform': 'rotate(450deg)',
                        'top': '+=10'  
                    })
                    break;
                }
              default:{
                 notice.text("Please, use the arrow keys to move the diver.");
              }
        }
    });
    
    
    /* BUTTONS */
    startBtn.on("click", function(event){
        startNewGame();
        startScreen.fadeOut(50);
        gameScreen.fadeIn(100);
        information.fadeIn(100);
        startSong.pause();
        oceanSong.play();
        endScore.removeClass('invisible'); //connected with SCORES SCREEN.
        form.removeClass('invisible'); //connected with SCORES SCREEN.
    });
    
    instructionBtn.on("click",function(event){
        startScreen.hide();
        instructionScreen.css("display","flex").show();
    });
    
    musicBtn.on("click",function(event){         
        if($(this).text() === "SOUND ON"){
            $(this).text("SOUND OFF");
            audio.prop("volume", 1);
        }else{
            $(this).text("SOUND ON"); 
             audio.prop("volume", 0);
        }
    });
          
    tableScoresBtn.on("click",function(event){
        startScreen.hide();
        endScreen.show();
        endScore.addClass('invisible');
        form.addClass('invisible');         
    });
    
    endGameBtn.on("click", function(event){
        screens.hide();
        startScreen.show();
        time.removeClass('finalCounting');
    });   
    
    
    
        /* AJAX */
    var tableScores = $('.tableScores');
    var scoreUrl = 'http://localhost:3000/game/';
    
    function loadScore(){
       tableScores.text("");
       $.ajax({
           url: scoreUrl,   
           type: "GET"
           }).done(function(response){
             response.sort(function (a, b) {
                return b.score - a.score;
            });
           
            renderScores(response);
           }).fail(function(error){
           console.log(error);
       })
    }
    loadScore();
    
   function renderScores(givenResponse){
       for(var i=0;i<3;i++){            
            var value = givenResponse[i];       //!!!! 
            var oneScore = $("<li>", {class: "oneScore"}).attr('data-id',value.id);
            var name= $("<p>");
            name.text(value.name);
            var result = $("<p>");
            result.text(value.score);
  
            oneScore.append(name).append(result);
            tableScores.append(oneScore);    
       }
    }
    
    function addResult(){
        var addScoreBtn = $('#addScoreBtn');
        //console.log(submitBtn);
        
        addScoreBtn.one('click',function(event){
            event.preventDefault();

            var getName = $('.getName').val();
            var getResult = $('.showResult2').val();
            
            var jsonData = {  
               "name": getName,
               "score": getResult
            }
                      
                
            $.ajax({
                url: scoreUrl,
                type: "POST",
                data: JSON.stringify(jsonData),
                contentType: 'application/json; charset=UTF-8' //wymagane w json-server - przy samym dataType: "json" - nie odczytuje 
            }).done(function(response){
                loadScore();
                console.log("od nowa");
            }).fail(function(error){
                console.log(error); 
            });
        });
    }
    addResult();
    
     
});