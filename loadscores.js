function gotData(data){
    // console.log(data.val());
    var dbscores = data.val();
    var dbkeys = Object.keys(dbscores);



    
   // console.log(dbkeys);
   var poenglist = [];
   var sortedscores = [];
    for(var dbi = 0; dbi<dbkeys.length;dbi++){
        var k = dbkeys[dbi];
        var name = dbscores[k].name;
        var dbscore = dbscores[k].score;
        
        
        //console.log(name + ": " + dbscore + "p");
       poenglist.push(name + ": " + dbscore + "p");
       sortedscores.push(dbscore);

    }
    sortedscores.sort(function(a, b){return a - b});
    sortedscores.reverse();
    // for(var i=0;i<dbscores.length;i++){
    //   sortedscores.unshift(dbscores[i]);
    // }
    const pont = document.getElementById("poeng");
    var totstring ="<hr /><h2>HALL OF FAME:</h2> <p>";
    //pont.innerHTML = "<h2>HALL OF FAME:</h2>  <br /><p>";

    
       for(var i = 0; i<10;i++){
        totstring+= "Anonymous: <b>" + sortedscores[i] + "p</b> <br />";
       }
       totstring+="</p>"
       pont.innerHTML=totstring;
}
function errData(err){
    //console.log("Error");
    //console.log(err);
}
       
       // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBfAwlHcWXp7d2WFbyxzPe4aa16n7GFp30",
    authDomain: "fluffy-barnacle.firebaseapp.com",
    databaseURL: "https://fluffy-barnacle.firebaseio.com",
    projectId: "fluffy-barnacle",
    storageBucket: "fluffy-barnacle.appspot.com",
    messagingSenderId: "747065307498",
    appId: "1:747065307498:web:5815c34f19da2bb9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //console.log(firebase);

  var database = firebase.database();
  ref = database.ref('scores');//.limitToLast(10);

  ref.on('value',gotData,errData);



