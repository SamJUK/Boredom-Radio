d = document;w = window;
////////*********************RADIO*****************************/
radio = {
    RadioState: 0,
    ActiveStation: 0,
  //Init Function
    Init: function(){
      stationName = radio.Stations[0].name;
      $("#Station").text(stationName);
    },
  //Stations
    "Stations": [
      {
        name: "Kiss",
        audioLink: "http://icy-e-ba-08-boh.sharp-stream.com/kissnational.aac"
      },
      {
        name: "Capital",
        audioLink: "http://media-ice.musicradio.com/CapitalSouthWalesMP3"
      },
      {
        name: "Heart",
        audioLink: "http://media-ice.musicradio.com/HeartSouthWalesMP3"
      },
      {
        name: "Nation",
        audioLink: "http://icy-e-03-boh.sharp-stream.com/tcnation.aac"
      },
      {
        name: "Hive365",
        audioLink: "http://stream.hive365.co.uk:8088/live"
      }
    ],
  //Play And Pause Function
    PlayState: function(){
      if (radio.RadioState == 0){
        radio.RadioState = 1;
        d.getElementById("playPause").innerHTML = "pause_circle_outline";
        radio.StationChange(radio.ActiveStation);
      }else if (radio.RadioState == 1) {
        radio.RadioState = 0;
        d.getElementById("playPause").innerHTML = "play_circle_outline";
        var audio = document.getElementById('audio');
        var audioSource = document.getElementById('audiosource');
        audioSource.src = "";
        audio.load();
        Radio_Power_State = 0;
      }else{
        SAM.ErrorOutput("1");
      }
    },
  //Change Station Function
    StationChange: function(stationID){
    stationName = radio.Stations[stationID].name;
    $("#Station").text(stationName);

    var audio = document.getElementById('audio');
    var audioSource = document.getElementById('audiosource');
    audioSource.src = radio.Stations[stationID].audioLink;
    audio.load();
    },

    StationSeek: function(direction){
      if (radio.RadioState == 0){return;};
      if (direction == "up"){
        radio.ActiveStation = radio.ActiveStation + 1;
        if (radio.ActiveStation > 4){
          radio.ActiveStation = 0;
        };
        radio.StationChange(radio.ActiveStation);
      } else if (direction == "down"){
        radio.ActiveStation = radio.ActiveStation - 1;
        if (radio.ActiveStation < 0){
          radio.ActiveStation = 4;
        };
        radio.StationChange(radio.ActiveStation);
      }else{
        SAM.ErrorOutput("2");
      };
    },

    ErrorOutput: function(code){
      console.log('Error Code: '+code);
      console.log('Please contact the web administrator or a developer at radio@samdjames.uk with this error code!');
    }
};

/***************UI*****************/
Hamburger = "Closed";
BarContent = "Radio";
UI = {
  Hamburger: function(a){
    $(a).toggleClass('open');
    if (Hamburger == "Closed"){
      //Do Opening Shit
      UI.SlideMenu();
    }else if (Hamburger == "Open") {
      //Do Closing Shit
      UI.SlideMenu();
    }else{
      SAM.ErrorOutput("3");
    }
  },
  SlideMenu: function(){
    if (BarContent == "Radio"){
      $(".bc-options").animate({width:'show'},350);
      $(".bc-radio").animate({width:'hide'},350);
      BarContent = "options";
    }else if (BarContent == "options") {
      $(".bc-radio").animate({width:'show'},350);
      $(".bc-options").animate({width:'hide'},350);
      BarContent = "Radio";
    }else {
      SAM.ErrorOutput("4");
    }
  }
};
/*******************SAM******************/
SAM = {
  ErrorOutput: function(code){
    console.log('Error Code: '+code);
    console.log('Please contact the web administrator or a developer at radio@samdjames.uk with this error code!');
  }
};
/***********INIT STUFF**************/
radio.Init();
$( function() {
    $( "#VolumeSlider" ).slider({
      orientation: "horizontal",
      range: "min",
      min: 0,
      max: 100,
      value: 50,
      slide: function( event, ui ) {
        document.getElementById('audio').volume = ui.value/100;
      }
    });
  } );
