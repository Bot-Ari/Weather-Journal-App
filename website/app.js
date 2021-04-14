/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=f60e5d354c39d956ccae6776dddaac28';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
// MAKE THE BUTTON GO BRRRRRRRRRRRRRRRRRR
document.getElementById('generate').addEventListener('click', performAction)

//function to excute
function performAction(e){
	const newZip = document.getElementById('zip').value;
	const feelings = document.getElementById('feelings').value;
	getWeather(baseURL, newZip, apiKey)

	    .then(function(data){
	    	console.log(data)
	    	postData('/add', {date:d, temp:data.main.temp, content:feelings})
	    	updateUI();
	    })
}

//To get web API data
const getWeather = async (baseURL, zip, key)=>{
	const result = await fetch(baseURL+zip+key)
	try {
		const data = await result.json();
		return data;
	} catch(error) {
		console.log('error', error);
	}
}

// Make the api give data..yee
const postData = async ( url = '', data={})=>{
	console.log(data);
	const response = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data)
	});
	try {
		const newData = await response.json();
		console.log(newData);
		return newData;
	}catch(error) {
		console.log('error', error);
	}
}


const updateUI = async () => {
	const request = await fetch('/all');
	try{
		const allData = await request.json();
		document.getElementById('date').innerHTML = `Date: ${allData[0].date}`;
		document.getElementById('temp').innerHTML = `Temperature: ${allData[0].temp} F° and ${((allData[0].temp - 32)/1.8)} C°`;
		document.getElementById('content').innerHTML = `I feel: ${allData[0].content}`;
	} catch(error){
		console.log('error',error);
	}
}