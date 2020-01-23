var jobIndex = 0;
var jobs;
var qr;
var qrk;
var benefit;

// ONLOAD FUNCTION 
//
// get the content for the whole site
function onload() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			jobs = JSON.parse(this.responseText);
			fillTable();
		}
	};
	xhttp.open("GET", "api/jobs");
	xhttp.send();

	qr = document.createElement("img");
	qr.setAttribute("class", "code");

	benefit = document.createElement("img");
	benefit.setAttribute("class", "benefit");

}

// FUNCTIONS FOR FILLIN THE WHOLE SITE 
//
// filling the table with rows first time when the page is displayed
function fillTable() {

	var cell0, cell1, cell2, cell3, cell4, cell5;
	var table = document.getElementById("myTable");
	var rows = table.rows;
	
	// loop for filling the jobs list with columns (cells)
	for (i = 1; i <= jobs.length; i++) {
		var job = jobs[i - 1];
		var row = table.insertRow(i + 1);
		
		cell0 = row.insertCell(0);
		cell0.className = 'hotjob';
		cell0.id = i;
		cell0.innerHTML = i;

		cell1 = row.insertCell(1);
		cell1.className = 'job-title';
		cell1.innerHTML = job.positionTitle;

		cell2 = row.insertCell(2);
		cell2.className = 'location';
		cell2.innerHTML = job.positionLocation_CityName + ", "
				+ job.positionLocation_CountryName;

		cell3 = row.insertCell(3);
		cell3.className = 'posted';
		cell3.innerHTML = job.publicationStartDate;

		cell4 = row.insertCell(4);
		cell4.className = 'benefits';
		cell4.id = 'img' + i;

		cell5 = row.insertCell(5);
		cell5.className = 'url';
		cell5.id = 'qr' + i;

		// loop for filling the list of benefits with icons within the jobs list	
		var str = job.positionBenefit_Code;
		var res = str.split(",");
		
		for (j = 0; j < res.length; j++) {
			this["img" + j] = document.createElement("img");
			if (job.positionBenefit_Code && res[j] !== undefined) {
				this["img" + j].src = "img/" + res[j] + ".png";
			} else {
				this["img" + j].src = "";
			}
			var src = document.getElementById("img" + i);
			src.appendChild(this["img" + j]);
		}

		// adds qr code to the job in the jobs list table
		var url = document.createElement("img");
		url.src = "qrCodes/" + jobs[jobIndex].linkHash;
		var src = document.getElementById("qr" + i);
		src.appendChild(url);
	}
	// sets up the second / "active" line with background and font color
	document.getElementsByTagName("tr")[2].setAttribute("id", "active");
	
	activeRowStyle();
	getJobDetails();
	
	// sets a grey background for every odd row in the jobs list table
	for (i = 1; i <= jobs.length; i++)
		document.getElementsByTagName("tr")[i + i].setAttribute("class", "odd");

}

//FUNCTIONS FOR THE JOB SECTION
//
// fills the actual job section based on the jobs list table
function getJobDetails() {
	document.getElementById("job-id-title").innerHTML = jobs[jobIndex].positionID;
	document.getElementById("job-main-title").innerHTML = jobs[jobIndex].positionTitle;
	document.getElementById("location").innerHTML = jobs[jobIndex].positionLocation_CityName
			+ ", " + jobs[jobIndex].positionLocation_CountryName;
	document.getElementById("job-level").innerHTML = jobs[jobIndex].careerLevel;
	document.getElementById("type").innerHTML = jobs[jobIndex].jobCategory;
	document.getElementById("deadline").innerHTML = jobs[jobIndex].publicationEndDate;
	document.getElementById("position-uri").innerHTML = jobs[jobIndex].email;
	document.getElementById("your-task").innerHTML = jobs[jobIndex].description;
	document.getElementById("your-profile").innerHTML = jobs[jobIndex].requirements;

	// filling the benefit ul list with images and text
	addBenefitImgs();
	addBenefitTexts();

	// adds the big qr code to the job section
	qr.src = "qrCodes/" + jobs[jobIndex].linkHash;
	document.getElementById("code").appendChild(qr);
	
	var url = document.createElement("img");
	url.src = "qrCodes/" + jobs[jobIndex].linkHash;
	document.getElementById("code-6k").appendChild(url);
}


// FUNCTIONS FOR THE JOBS LIST TABLE
//
// function to move the row and fill the job every 8 second
setInterval(function sortTable() {
	
	jobIndex = (jobIndex + 1) % jobs.length;
	
	var table, rows, style, i, x, y;
	table = document.getElementById("myTable");
	rows = table.rows;

	// move each row, append last row to end of table in a given time interval
	setTimeout( function moveTable() {
				for (i = 2; i < (rows.length - 1); i++) {
					x = rows[i].getElementsByTagName("td")[0];
					y = rows[i + 1].getElementsByTagName("td")[0];
					rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
					document.getElementsByTagName("tr")[2].setAttribute("id",
							"active");
					document.getElementsByTagName("tr")[3]
							.removeAttribute("id");
					document.getElementsByTagName("tr")[3]
							.removeAttribute("style");
					document.getElementsByTagName("tr")[rows.length - 1]
							.removeAttribute("style");
					document.getElementsByTagName("tr")[1]
					.removeAttribute("style");
				}
			}, 1000);

	// timer to change the "active" row's style with a 2 sec delay
	setTimeout(activeRowStyle, 2000);

	// timer to change the fill of the job section based on the jobs list 
	// with 1 mil.sec delay right after the benefit icons have been removed
	setTimeout(getJobDetails, 500);
	
	activeRowSlide();	
	
	// clears the benefit list from the job section
	removeBenefitImgs();
	
}, 8000);


// adds animation to the "active" row in the jobs list
function activeRowStyle() {
	document.getElementById("active").style.transition = "height 0.2s";
	
	// removes the fade effect from the job section
	removeFadeEffect()
}


// adds slide up animation for the "active" and "progress" row in the jobs list
// adds the fade animation for the job section
function activeRowSlide() {
	document.getElementById("active").style.height = "0";	
	document.getElementById("progress").style.height = "0";

	document.getElementById("job").style.animation = "opacity 1s linear";
}

// BENEFITS 
//
// fills the benefit ul list with text in the job section
function addBenefitTexts() {
	var str = jobs[jobIndex].positionBenefit_Name;
	var res = str.split(",");

	for (i = 0; i < res.length; i++) {
		document.getElementById("benefits" + i).innerHTML = res[i];
	}
}

// fills the benefit ul list with icons corresponding to each benefit
function addBenefitImgs() {	
	var str = jobs[jobIndex].positionBenefit_Code;
	var res = str.split(",");
	
		for (i = 0; i < res.length; i++) {

			this["marker" + i] = document.createElement("img");
			if (str && res[i] !== undefined) {
			this["marker" + i].src = "img/" + res[i] + ".png";
			}
			var doc = document.getElementById("benefit-list" + i);
			doc.appendChild(this["marker" + i]);
	}
}

// removes previously filled images of benefits from the benefit ul list
function removeBenefitImgs() {
	for (i = 0; i < 4; i++) {
		document.getElementById("benefit-list" + i).innerHTML = "";
		document.getElementById("benefits" + i).innerHTML = "";
	}
}

// removes previously added style for fade animation
function removeFadeEffect(){
	document.getElementById("job").removeAttribute("style");
}



//DARK MODE FUNCTION
//
//swap style sheets to dark mode and back
//var x = 1;
//
//setInterval(function style() {
//	if (x == 1) {
//		document.getElementById('pagestyle').setAttribute('href', "css/dark.css");
//		x--;
//	} else if (x == 0) {
//		document.getElementById('pagestyle').setAttribute('href', "css/style.css");		
//		x++;
//	}
//}, 40000);

//OLA FUNCTIONS
//
//scrolls to the chosen row in the jobs list table

var mqttClient = new Paho.MQTT.Client("openlab.kpi.fei.tuke.sk", 80, "TSDemo_" + new Date().getTime());
mqttClient.onConnectionLost = onConnectionLost;
mqttClient.onMessageArrived = onMessageArrived;
mqttClient.connect({onSuccess: onConnect});

function onConnect() {
console.log("onConnect");
mqttClient.subscribe("openlab/voice/recognition");
}

function onConnectionLost(responseObject) {
if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
}
}

function onMessageArrived(message) {
console.log("onMessageArrived:" + message.topic + " " + message.payloadString);
  var result = JSON.parse(message.payloadString);
  if (result.status === 'recognized') {
      var x = result.recognized;
  }
}


function scrollToJob(number) {
}

