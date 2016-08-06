var radio = {
  "Stations": [
    {
      name: "Kiss",
      freq: "100.0 FM",
      audioLink: "http://icy-e-ba-08-boh.sharp-stream.com/kissnational.aac"
    },
    {
      name: "Capital",
      freq: "103.2 FM",
      audioLink: "http://media-ice.musicradio.com/CapitalSouthWalesMP3"
    },
    {
      name: "Heart",
      freq: "106.0 FM",
      audioLink: "http://media-ice.musicradio.com/HeartSouthWalesMP3"
    },
    {
      name: "Nation",
      freq: "106.8 FM",
      audioLink: "http://icy-e-03-boh.sharp-stream.com/tcnation.aac"
    },
    {
      name: "Hive365",
      freq: "Stream...",
      audioLink: "http://stream.hive365.co.uk:8088/live"
    }
  ],

  radio_init: function(){
    ActiveStation = 0;
    Radio_Power_State = 0;
  },

  radio_Power_Toggle: function(){
    if (Radio_Power_State == 0){
      //Do Power On Stuff
        radio.radio_Station_Change(ActiveStation);
        Radio_Power_State = 1;
    } else{
      //Do Power Off Stuff
      $("#station").text("");
      $("#freq").text("");
      var audio = document.getElementById('audio');
      var audioSource = document.getElementById('audiosource');
      audioSource.src = "";
      audio.load();
      Radio_Power_State = 0;
    };
  },
  radio_Station_Seek: function(direction){
    if (direction == "up"){
      ActiveStation = ActiveStation + 1;
      if (ActiveStation > 4){
        ActiveStation = 0;
      };
      radio.radio_Station_Change(ActiveStation);
    } else{
      ActiveStation = ActiveStation - 1;
      if (ActiveStation < 0){
        ActiveStation = 4;
      };
      radio.radio_Station_Change(ActiveStation);
    };
  },
   radio_Station_Change: function(stationID){

    stationName = radio.Stations[stationID].name;
    stationFreq = radio.Stations[stationID].freq;

    $("#station").text(stationName);
    $("#freq").text(stationFreq);

    var audio = document.getElementById('audio');
    var audioSource = document.getElementById('audiosource');
    audioSource.src = radio.Stations[stationID].audioLink;
    audio.load();
  },
   radio_Volume_Change: function(volume){
    newvolume = volume / 100;
    var audio = document.getElementById('audio');
    audio.volume=newvolume;
  }
};

radio.radio_init();
