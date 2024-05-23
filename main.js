let results = {}
const teams = {
  CLE: "Cleveland Cavaliers",
  ATL: "Atlanta Hawks",
  NYY: "New York Yankees",
  BAL: "Baltimore Orioles",
  CHC: "Chicago Cubs",
  MIL: "Milwaukee Brewers",
  CIN: "Cincinnati Reds",
  WAS: "Washington Nationals",
  HOU: "Houston Astros",
  TEX: "Texas Rangers",
  KC: "Kansas City Royals",
  MIN: "Minnesota Twins",
  LAA: "Los Angeles Angels",
  SD: "San Diego Padres",
  PIT: "Pittsburgh Pirates",
  LAD: "Los Angeles Dodgers",
  SEA: "Seattle Mariners",
  SF: "San Francisco Giants",
  STL: "St. Louis Cardinals",
  MIA: "Miami Marlins"
  }
const select = document.getElementById('resultados');
const buttom = document.getElementById('buttom');
const homeTeamInfoDiv = document.getElementById('homeTeamInfo')
const awayTeamInfoDiv = document.getElementById('awayTeamInfo')
const gameDate = document.getElementById('date')
const awayTeamOdds = document.getElementById('awayTeamMLOdds')
const homeTeamOdds = document.getElementById('homeTeamMLOdds')
const error = document.getElementById('error'); 

//Load the name from local storage
let saveData = localStorage.getItem('resultados'); 
// Check if the name is not empty
if(saveData) {
  select.value = saveData; // Set the value of the name field
}

document.getElementById('myForm').addEventListener('buttom', function(event) {

});
buttom.addEventListener('click', function(){

 // event.preventDefault(); // Prevent form from submitting to server
  console.log("test" ,select);
  var name = select.value;

  // Check if the name field is empty
  if(name === "") {
    error.innerHTML = "All fields must be filled out";
    return false;
  }else {
    error.innerHTML = select.value;
  } 

 
  localStorage.setItem('resultados', select.value); // Save the name to local storage

  const resultados = select.value;
  if(resultados.trim()!==''){
    searchObject(results, resultados);
  }else{
    alert('please enter a team name');
  }
  });

  function searchTeam(team){

    return teams[team];
  }


async function fetchData(){
const url = 'https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBBettingOdds?gameDate=20230703&playerProps=true';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5979d6e669msh23e80de189c1223p181c2cjsn06a48397dc95',
		'X-RapidAPI-Host': 'tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com'
	}
};

  /*console.log(select.value);
  searchObject(results, select.value);
});*/
try {
	const response = await fetch(url, options);
	results = await response.json();
	console.log(results);
  select.innerHTML = '';
  Object.keys(results.body).forEach(key=>{
    console.log(key ,results.body[key]);
    var option = document.createElement('option');
    option.text = results.body[key].gameID;
    option.value = results.body[key].gameID;
    select.appendChild(option);
    })
} catch (error) {
	console.error(error);
}
}
function searchObject(results, value){
  console.log(results.body);
  Object.keys(results.body).forEach(key=>{
    if (searchTeam(results.body[key].homeTeam) === value){


      console.log("found");
      const result1 = searchTeam(results.body[key].homeTeam)
      homeTeamInfoDiv.innerHTML= result1;

      const result2 = searchTeam(results.body[key].awayTeam)
      awayTeamInfoDiv.innerHTML=result2;

      const oddsValue = parseFloat(results.body[key].bet365.awayTeamMLOdds);
      if(!isNaN(oddsValue)){
        if(oddsValue < 0){
        awayTeamOdds.classList.add('negative');
      }else if(oddsValue > 0){
        awayTeamOdds.classList.add('positive');
      }}

      awayTeamOdds.innerHTML=oddsValue;

      const oddsValue2 = parseFloat(results.body[key].bet365.homeTeamMLOdds);
      if(!isNaN(oddsValue2)){
        if(oddsValue2<0){
        homeTeamOdds.classList.add('negative');
      }else if(oddsValue2 > 0){
        homeTeamOdds.classList.add('positive');
      }}

      homeTeamOdds.innerHTML=oddsValue2;
      

      function formatDate(dateString){
        const formattedDate=new Date(dateString.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
        const year=formattedDate.getFullYear();
        const month=(formattedDate.getMonth()+1).toString().padStart(2, '0');
        const day= formattedDate.getDate().toString().padStart(2, '0');
        return `${day}/${month}/${year}`;
      }
      gameDate.innerHTML=formatDate(results.body[key].gameDate);

console.log( results.body[key].homeTeam);
      // Convert the teamName to uppercase to match the keys in the teams object
      const uppercaseTeamName = results.body[key].homeTeam.toUpperCase();

      // Check if the entered team name exists in the teams object
      if (uppercaseTeamName) {
        // Get the full team name from the teams object
        const fullTeamName = teams[uppercaseTeamName];
        // Display the full team name
        homeTeamInfoDiv.innerHTML = fullTeamName;
        // You can do similar for awayTeamInfoDiv and other information
    } else {
        // If the entered team name does not exist, display a message
        homeTeamInfoDiv.innerHTML = "Team not found";
        // You can do similar for awayTeamInfoDiv and other information
    }


  


      

    
    
    

      return results.body[key];

      
    }
  })
  return null;
}
const myObject = {
  key1: 'hometeam',
  key2: 'bet365',
  key3: 'awayteam'
};
// const resulttt = searchObject(myObject, 'bet365');
// console.log(resulttt);

fetchData();

