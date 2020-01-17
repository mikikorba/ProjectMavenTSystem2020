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

// filling the table with rows
function fillTable() {

	var table = document.getElementById("myTable");
	var cell0, cell1, cell2, cell3, cell4, cell5;
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

	document.getElementsByTagName("tr")[2].setAttribute("id", "active");
	change();
	showJob();

}

setInterval(function sortTable() {

	var table, rows, style, i, x, y;
	table = document.getElementById("myTable");
	rows = table.rows;

	// move each row, append last row to end of table
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
				}
				showJob();
			}, 1000);

	setTimeout(change, 2000);

	jobIndex = (jobIndex + 1) % jobs.length;
	
	removebenefitImg();
	
}, 8000);

// change the active row's style to pink with white text
function change() {
	var active = document.getElementById("active");
	active.style.background = "#d00f61d6";
	active.style.color = "white";
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

function showJob() {
	
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

	benefitsImg();
	benefitsText();

	qr.src = "qrCodes/" + jobs[jobIndex].linkHash;
	var src = document.getElementById("code");
	src.appendChild(qr);

}
