var jobIndex = 0;
var jobs;
var qr;
var benefit;

// get the content of the table
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

// filling the table with rows first time the page is displayed
function fillTable() {

	var table = document.getElementById("myTable");
	var cell0, cell1, cell2, cell3, cell4, cell5, rows;
	rows = table.rows;
	
	for (i = 1; i <= jobs.length; i++) {
		var job = jobs[i - 1];
		var row = table.insertRow(i + 1);

		cell0 = row.insertCell(0);
		cell0.className = 'hotjob';

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

		var url = document.createElement("img");
		url.src = "qrCodes/" + jobs[jobIndex].linkHash;
		var src = document.getElementById("qr" + i);
		src.appendChild(url);
				
	}

	// sets the second / "active" line with background and font color
	document.getElementsByTagName("tr")[2].setAttribute("id", "active");
	
	change();
	showJob();

	// sets a grey background for every odd row in the jobs list table
	for (i = 1; i < jobs.length; i++)
		document.getElementsByTagName("tr")[i + i].setAttribute("class", "odd");
}


// function to fill every 8 sec (based on the first / "progress" row's css animation) as a job changes in the jobs list
setInterval(function sortTable() {
	
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

	// timer to change the second / active row's style with a 2 sec delay
	setTimeout(change, 2000);

	// timer to change the fill of the current job's details with the next one 
	// with 1 mil.sec delay right after the removebenefitImg function
	setTimeout(showJob, 1);
	
	slide();	
	jobIndex = (jobIndex + 1) % jobs.length;
	
	// clears the benefit list from the currently displayed job's detail section
	removebenefitImg();
	
}, 8000);

// style change animation on the second / active row
function change() {
	var active = document.getElementById("active");
	active.style.transition = "background-color 0.2s";
	active.style.transition = "height 0.2s";
	removeOpacity()
}

// slide animation of the first two rows
function slide() {
	var active = document.getElementById("active");
	active.style.height = "0";
	
	document.getElementById("progress").style.height = "0";
	document.getElementById("job").style.animation = "opacity 1s linear";

}


// fills the benefit ul list with text in the job section
function benefitsText() {
	var str = jobs[jobIndex].positionBenefit_Name;
	var res = str.split(",");

	for (i = 0; i < res.length; i++) {
		document.getElementById("benefits" + i).innerHTML = res[i];
	}
}

// fills the benefit ul list with images corresponding to each benefit
function benefitsImg() {	
	var str = jobs[jobIndex].positionBenefit_Code;
	var res = str.split(",");
	
		for (i = 0; i < res.length; i++) {

			this["marker" + i] = document.createElement("img");
			this["marker" + i].src = "img/" + res[i] + ".png";
			var doc = document.getElementById("benefit-list" + i);
			doc.appendChild(this["marker" + i]);
	}
}

// removes previously filled images of benefits from the benefit ul list
function removebenefitImg() {
	for (i = 0; i < 4; i++) {
		var spa = document.getElementById("benefit-list" + i);
		spa.removeChild(spa.childNodes[0]);
		
		var spb = document.getElementById("benefits" + i);
		spb.removeChild(spb.childNodes[0]);
	}
}

// fills the currently displayed job's details
function showJob() {
	
	// adds css animation for fade effect

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

	// for filling the benefit list with images and text
	benefitsImg();
	benefitsText();

	qr.src = "qrCodes/" + jobs[jobIndex].linkHash;
	var src = document.getElementById("code");
	src.appendChild(qr);
}

// removes previously added style for fade animation every 6 seconds
function removeOpacity(){
	document.getElementById("job").removeAttribute("style");
}

var x = 1;
// swap style sheets
setInterval(function style() {

	
	if (x == 1) {
		document.getElementById('pagestyle').setAttribute('href', "css/style.css");
		x--;
	} else if (x == 0) {
		document.getElementById('pagestyle').setAttribute('href', "css/dark.css");		
		x++;
	}
}, 15000);

