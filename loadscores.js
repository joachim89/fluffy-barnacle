var dataArr=[];
const pont = document.getElementById("poeng");
pont.innerHTML="<hr /><h2>HALL OF FAME:</h2> <p><br /><p> loading scores...</p>";
function gotTada(data){
  dataArr.unshift(data.val());
  
  var totstring ="<hr /><h2>HALL OF FAME:</h2> <p>";
  if(dataArr.length>9){
    for(i=0;i<dataArr.length;i++){
   totstring+=((i+1) + ": " + dataArr[i].name + ":<b>"  + dataArr[i].score + "p</b> <br />");
  }
     totstring+="</p>"
     pont.innerHTML=totstring;
  }

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

firebase.database().ref("scores").orderByChild("score").limitToLast(10).on('child_added',gotTada,errData);
//console.log(dataArr); 



