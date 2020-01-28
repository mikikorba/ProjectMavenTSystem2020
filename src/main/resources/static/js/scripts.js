var jobIndex = 0;
var jobs, qr, qrk, benefit, table, rows, style, i, x, y, number, search, inputSearch;


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
	
	qrk = document.createElement("img");
	qrk.setAttribute("class", "code-6k");

	benefit = document.createElement("img");
	benefit.setAttribute("class", "benefit");
}


// FUNCTIONS FOR FILLIN THE WHOLE SITE AT START
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
		row.className = i;
		
		cell0 = row.insertCell(0);
		cell0.className = 'hotjob';
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

		// loop for filling the benefits with icons within the jobs list table	
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

		// adds qr code of the job in the jobs list table
		var url = document.createElement("img");
		url.src = "qrCodes/" + jobs[jobIndex].linkHash;
		var src = document.getElementById("qr" + i);
		src.appendChild(url);
	}
	
	// adds background, font color & animation to the second / "active" row 
	addRowStyle();
	
	// fills the job section with data
	getJobDetails();
	addBenefitImgs();
	addBenefitTexts();
	
	// sets a grey background for every odd row in the jobs list table
	for (i = 2; i <= jobs.length; i+=2){
		var row = document.getElementsByTagName("tr")[i];
		row.className += " odd";
	}
}



// FUNCTIONS FOR THE JOB SECTION
//
// fills the actual job section within a selected interval
var interval = 2000;
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

	// adds the big qr code to the job section
	qr.src = "qrCodes/" + jobs[jobIndex].linkHash;
	document.getElementById("code").appendChild(qr);
	
	qrk.src = "qrCodes/" + jobs[jobIndex].linkHash;
	document.getElementById("code-6k").appendChild(qrk);

	// adds & removes the fade effect from the job section
	addJobFade();
	setTimeout(removeJobFade, interval);

}

// adds fade effect to the job section
function addJobFade(){
	document.getElementById("job").style.animation = "opacity 1.1s linear";
}

// removes previously added fade animation for the job section
function removeJobFade(){
	document.getElementById("job").removeAttribute("style");
}


// FUNCTIONS FOR THE JOBS LIST TABLE AND JOB SECTION
//
// function to move the row and fill
function sortAndAnimate(inverval) {
	jobIndex = (jobIndex + 1) % jobs.length;

	// moves the first row to the end of the table
	setTimeout(moveTable, interval/2);

	// timer to change the "active" row's style with a 1 sec delay
	setTimeout(addRowStyle, interval);
		
	// timer to change the fill of the job section based on the jobs list 
	// with 1 mil.sec delay right after the benefit icons have been removed
	setTimeout(getJobDetails, interval/4);
	setTimeout(addBenefitImgs, interval/4);
	setTimeout(addBenefitTexts, interval/4);

	// clears the benefit list from the job section
	setTimeout(removeBenefitImgs, interval/4.5);
	
	addRowSlide();

}

// adds animation to the first row in the jobs list
function addRowStyle() {
	document.getElementsByTagName("tr")[2].setAttribute("id", "active");
	document.getElementById("active").style.transition = "height 0.2s";
}
// function to move the first row to the last position
function moveTable() {

	table = document.getElementById("myTable");
	rows = table.rows;
	
	for (i = 2; i < (rows.length - 1); i++) {
		rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		document.getElementsByTagName("tr")[2].setAttribute("id", "active");
		document.getElementsByTagName("tr")[3].removeAttribute("id");
		document.getElementsByTagName("tr")[3].removeAttribute("style");
		document.getElementsByTagName("tr")[rows.length - 1].removeAttribute("style");
		document.getElementsByTagName("tr")[1].removeAttribute("style");
	}
}

// adds slide up animation for the "active" and "progress" row in the jobs list
// adds the fade animation for the job section
function addRowSlide() {
	document.getElementById("active").style.height = "0";	
	document.getElementById("progress").style.height = "0";
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


// SETS THE INTERVALS FOR THE ANIMATIONS AND SORTING OF THE WHOLE SITE
//
//////////////////////////////////////////////////////////
var jobAnimation = setInterval(getJobDetails, 10000);
var tableAnimation = setInterval(sortAndAnimate, 10000);
//////////////////////////////////////////////////////////



// OLA FUNCTIONS
//
// scrolls to the chosen row in the jobs list table or change the color theme
//
// change color theme
function style(x) { 
	clearInterval(jobAnimation);
	clearInterval(tableAnimation);
	removeProgressAnimation();
	
	setTimeout(function() {
		sortAndAnimate(2000);
		getJobDetails(2000);
	}, 10);
	
	setTimeout(function() {
		progress.classList.add("progress-bar");
		jobAnimation = setInterval(getJobDetails, 10000);
		tableAnimation = setInterval(sortAndAnimate, 10000);
		if (x == 1) { 
			text= "Oukej.";
			say(text);
			document.getElementById('pagestyle').setAttribute('href', "css/dark.css"); 
		} else if (x == 0) {
			text= "Dobre.";
			say(text);
			document.getElementById('pagestyle').setAttribute('href', "css/style.css"); 
		} 
	}, 1000);
}

// scrolls to the given row by index
function scrollToJob(search) {	
	if(number <= jobs.length && !(number < 1)) {
		clearInterval(jobAnimation);
		clearInterval(tableAnimation);
		removeProgressAnimation();
		
		setTimeout(function() {
			text= "Moment prosím.";
			say(text);
		}, 20);

		var i;
		for (i = 0; i <= search; i++) {
			(function(i) {
				setTimeout(function() {
					sortAndAnimate(0);
					getJobDetails(0);
				}, 60 * i);
			})(i);
		}
		
		sortAndAnimate(2000);
		getJobDetails(2000);
		
		setTimeout(function() {
			progress.classList.add("progress-bar");
			jobAnimation = setInterval(getJobDetails, 10000);
			tableAnimation = setInterval(sortAndAnimate, 10000);
		}, 4000);
	} else {
		text = "Maximálny počet riadok je " + jobs.length + " . Skús iné číslo.";
		say(text);
	}
}

// identifies the index of the chosen row
function getRowIndex(matcher){
	var table = document.getElementById("myTable");
	var rows = table.rows;
	for (i=2;i<=jobs.length;i++) {
		var row = rows[i].className;
		var pattern = /\d+/;
		var result = row.match(pattern).join('');
		if(result == number){
			search = (table.rows[i].rowIndex)-4;
		}
	}
	scrollToJob(search);
}

// removes the progress rows animation
function removeProgressAnimation(){
	var progress = document.getElementsByTagName("tr")[1];
	var computedStyle = window.getComputedStyle(progress), width = computedStyle
			.getPropertyValue('width');
	progress.style.width = width;
	progress.classList.remove("progress-bar");
}

// identify the number from the input
function getInputAction(input) {
	var pattern = /(?!-)\d+|jeden|prvý|dve|dva|druhý|tri|tretí|štyri|štvrtý|päť|piaty|šesť|šiesty|sedem|siedmy|osem|ôsmy|deväť|deviaty|desať|desiaty|čierna téma|čiernu tému|čiernu|biela téma|bielu tému|bielu/;
	var matcher = input.match(pattern);
	
	if (matcher == 'čierna téma'| matcher == 'čiernu tému' | matcher == 'čiernu') {	
		style(1);
	} else if (matcher == 'biela téma'| matcher == 'bielu tému' | matcher == 'bielu') {
		style(0);
	} else if (matcher == "jeden" | matcher == "prvý") {
		number = 1;
		getRowIndex(number);
	} else if (matcher == "dva" | matcher == "dve" | matcher == "druhý") {
		number = 2;
		getRowIndex(number);
	} else if (matcher == "tri" | matcher == "tretí") {
		number = 3;
		getRowIndex(number);
	} else if (matcher == "štyri" | matcher == "štvrtý") {
		number = 4;
		getRowIndex(number);
	} else if (matcher == "päť" | matcher == "piaty") {
		number = 5;
		getRowIndex(number);
	} else if (matcher == "šesť" | matcher == "šiesty") {
		number = 6;
		getRowIndex(number);
	} else if (matcher == "sedem" | matcher == "siedmy") {
		number = 7;
		getRowIndex(number);
	} else if (matcher == "osem" | matcher == "ôsmy") {
		number = 8;
		getRowIndex(number);
	} else if (matcher == "deväť" | matcher == "deviaty") {
		number = 9;
		getRowIndex(number);
	} else if (matcher == "desať" | matcher == "desiaty") {
		number = 10;
		getRowIndex(number);
	} else if (matcher[0]) {
		number = matcher;
		getRowIndex(number);
	} else {
	}
}
