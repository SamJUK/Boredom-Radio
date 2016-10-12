d = document;w = window;
var startVol = .5;
////////*********************RADIO*****************************/
radio = {
    RadioState: 0,
    ActiveStation: 0,
  //Init Function
    Init: function(){
      d.getElementById("stationname").innerHTML = radio.Stations[radio.ActiveStation].name;
      d.getElementById("stationArt").src = radio.Stations[radio.ActiveStation].img;
      radio.populateStationList();
      radio.SetStartVolume();
      //PRoxy Setup
        var proxy = document.getElementById('prxy');
        proxy.addEventListener("load", function() {
            console.log("Ifrm Refreshed");
            radio.GetMetaData();
        });
    },
  //Stations
    "Stations": [
      {
        name: "Kiss",
        audioLink: "http://icy-e-ba-08-boh.sharp-stream.com/kissnational.mp3",
        img: "img/kiss.png"
      },
      {
        name: "Capital",
        audioLink: "http://media-ice.musicradio.com/CapitalSouthWalesMP3",
        img: "img/capital.png"
      },
      {
        name: "Heart",
        audioLink: "http://media-ice.musicradio.com/HeartSouthWalesMP3",
        img: "img/heart.png"
      },
      {
        name: "Nation",
        audioLink: "http://icy-e-03-boh.sharp-stream.com/tcnation.aac",
        img: "img/nation.png"
      },
      {
        name: "Hive365",
        audioLink: "http://stream.hive365.co.uk:8088/live",
        img: "img/hive.png"
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
        var audio = d.getElementById('audiotag');
        var audioSource = d.getElementById('audiosourcetag');
        audioSource.src = "";
        audio.load();
        Radio_Power_State = 0;
      }else{
        SAM.ErrorOutput("1");
      }
    },
  //Change Station Function
    StationChange: function(stationID){
      d.getElementById("stationname").innerHTML = radio.Stations[radio.ActiveStation].name;
      d.getElementById("stationArt").src = radio.Stations[radio.ActiveStation].img;
      var audio = d.getElementById('audiotag');
      var audioSource = d.getElementById('audiosourcetag');
      audioSource.src = radio.Stations[stationID].audioLink;
      audio.load();
      radio.ChangeProxy();
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
          radio.ActiveStation = (radio.Stations.length - 1);
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
          stationList.children[0].children[0].innerHTML += "<li data-snum="+i+" onclick='radio.ActiveStation = this.dataset.snum; radio.StationChange(radio.ActiveStation);'>"+radio.Stations[i].name+"</li>";
        } else {
          stationList.children[1].children[0].innerHTML += "<li data-snum="+i+" onclick='radio.ActiveStation = this.dataset.snum; radio.StationChange(radio.ActiveStation);'>"+radio.Stations[i].name+"</li>";
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
    },
    ChangeProxy: function(){
      d.getElementById('prxy').src = 'proxy.php?streamurl='+radio.Stations[radio.ActiveStation].audioLink;
    },
    GetMetaData: function(){
      if ((d.getElementById('prxy').contentWindow.document.getElementById('errors').children.length) == 0) {
        //No Errors Occured
          if ((d.getElementById('prxy').contentWindow.document.getElementById('streamdata').innerHTML.length) < 1){
          //Error getting track info?
          console.log("Error finding track information?");
          d.getElementById('track').innerHTML = "Could not find track information!!";
          d.getElementById('artist').innerHTML = "";
        }else{
          var Meta = d.getElementById('prxy').contentWindow.document.getElementById('streamdata').innerHTML.split(" - ");
          d.getElementById('artist').innerHTML = Meta[0];
          d.getElementById('track').innerHTML = Meta[1];
        };
      }else{
        //Error Occured
        console.log('I might have broke!!');
        d.getElementById('track').innerHTML = "An Error Occured?";
        d.getElementById('artist').innerHTML = "Maybe?";
      };
    },
    SetStartVolume: function(){
      if (typeof SAM.getCookie("volume") != 'undefined'){
        StartVol = SAM.getCookie("volume");
      }else{
        StartVol = .5;
      };
      d.getElementById('audiotag').volume = StartVol;
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
  },
  //Cookies
  getCookie: function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
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
      value: StartVol*100,
      slide: function( event, ui ) {
        d.getElementById('audiotag').volume = ui.value/100;
        d.cookie = "volume="+ui.value/100;
      }
    });
  } );
