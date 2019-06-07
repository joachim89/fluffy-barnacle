
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('9 a={b:"8",7:"0-2.5.3",6:"c://0-2.k.3",i:"0-2",d:"0-2.h.3",g:"4",e:"1:4:f:j"};',21,21,'fluffy||barnacle|com|747065307498|firebaseapp|databaseURL|authDomain|AIzaSyBfAwlHcWXp7d2WFbyxzPe4aa16n7GFp30|var|firebaseConfig|apiKey|https|storageBucket|appId|web|messagingSenderId|appspot|projectId|5815c34f19da2bb9|firebaseio'.split('|'),0,{}))

// Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //console.log(firebase);

  
  var database = firebase.database();
  ref = database.ref('scores');

//   ref.on('value',gotData,errData);


  
// GET EQUALT TO GREIER: SYKT FET
//firebase.database().ref("scores").orderByChild("name").equalTo("Anonymous").on('child_added',gotTada,errData);

firebase.database().ref("scores").orderByChild("score").limitToLast(150).on('child_added',gotTada,errData);

var dataArr=[];
const pont = document.getElementById("poeng");
pont.innerHTML="<p> loading scores...</p>";
function gotTada(data){
   
  dataArr.unshift(data.val());
  
  var totstring ="<hr /><p>";
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
