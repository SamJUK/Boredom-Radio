d = document;w = window;
////////*********************RADIO*****************************/
radio = {
    RadioState: 0,
    ActiveStation: 0,
  //Init Function
    Init: function(){
      stationName = radio.Stations[0].name;
      $("#stationname").text(stationName);
      radio.populateStationList();
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
        d.getElementById("playPause").className = "fa fa-pause";
        radio.StationChange(radio.ActiveStation);
      }else if (radio.RadioState == 1) {
        radio.RadioState = 0;
        d.getElementById("playPause").className = "fa fa-play";
        var audio = document.getElementById('audiotag');
        var audioSource = document.getElementById('audiosourcetag');
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
      $("#stationname").text(stationName);
      var audio = document.getElementById('audiotag');
      var audioSource = document.getElementById('audiosourcetag');
      audioSource.src = radio.Stations[stationID].audioLink;
      audio.load();
    },

    StationSeek: function(direction){
      if (radio.RadioState == 0){return;};
      if (direction == "up"){
        radio.ActiveStation = radio.ActiveStation + 1;
        if (radio.ActiveStation > (radio.Stations.length - 1)){
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
    populateStationList: function(){
      stationList = d.getElementById("stations");

      for (var i = 0; i < radio.Stations.length; i++) {
        if (stationList.children[0].children[0].children < 19)
        {
          stationList.children[0].children[0].innerHTML += "<li>"+radio.Stations[i].name+"</li>";
        } else {
          stationList.children[1].children[0].innerHTML += "<li>"+radio.Stations[i].name+"</li>";
        }
      }
    },

    ErrorOutput: function(code){
      console.log('Error Code: '+code);
      console.log('Please contact the web administrator or a developer at radio@samdjames.uk with this error code!');
    },
    AddStation: function(){
      sname = prompt("Whats the name of the station?");
      slink = prompt("Whats the link of the station?");
      newStation = {name: sname, audioLink: slink};
      radio.Stations.push(newStation);
      alert("New Station Added!");
    },
    EditStation: function(){
      station = prompt("Name of station to edit?");
      if (SAM.InArray(station)){
        if (SAM.ian > -1){
          if (confirm("Do you want to edit the name?")){
            radio.Stations[SAM.ian].name = prompt("New name of the station?");
          };
          if (confirm("Do you want to edit the url?")){
            radio.Stations[SAM.ian].audioLink = prompt("New URL of the station?");
          }
        }
      }else{
        alert("No such station!");
      }
    },
    RemoveStation: function(){
      station = prompt("Station Name To Remove?");
      if (SAM.InArray(station)){
        if (SAM.ian > -1){
          radio.Stations.splice(SAM.ian, 1);
        };
      }else{
        radio.ErrorOutput("No such station!");
      };
    }
};
/*******************SAM******************/
SAM = {
  ian: 0,
  ErrorOutput: function(code){
    console.log('Error Code: '+code);
    console.log('Please contact the web administrator or a developer at radio@samdjames.uk with this error code!');
  },
  InArray: function(s){
    for (var i = 0; i < radio.Stations.length; i++) {
      if (s == radio.Stations[i].name){
        SAM.ian = i;
        return true;
      }else{
      }
    }
    return false;
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
        document.getElementById('audiotag').volume = ui.value/100;
      }
    });
  } );
