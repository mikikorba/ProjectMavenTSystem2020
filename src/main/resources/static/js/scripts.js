var jobIndex = 0;
var jobs;
var qr;
var benefit;

// get the content of the table
function onload(){	
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
	  	cell2.innerHTML = job.positionLocation_CityName + ", " + job.positionLocation_CountryName;
	  	
	  	cell3 = row.insertCell(3);
	  	cell3.className = 'posted';
	  	cell3.innerHTML = job.publicationStartDate;

	 	cell4 = row.insertCell(4);
	  	cell4.className = 'benefits';
	  	cell4.id = 'img'+i;	 


	  	cell5 = row.insertCell(5);
	  	cell5.className = 'url';
	  	cell5.id = 'qr'+i;	
	  	
 
			var img = document.createElement("img");
			img.src = "img/homeoffice.png";	  	
			var src = document.getElementById("img"+i);
			src.appendChild(img);
			
			var url = document.createElement("img");		
			url.src = "qrCodes/"+ jobs[jobIndex].linkHash;
			var src = document.getElementById("qr"+i);
			src.appendChild(url);
	 }
	  
    document.getElementsByTagName("tr")[2].setAttribute("id","active");
      showJob();
      //change();
      
}

setInterval(function sortTable() {
	
    var table, rows, style, i, x, y;
    table = document.getElementById("myTable");
    rows = table.rows;
    
    // row animation
//    var ele = document.getElementsByTagName("tr")[2];
 //   ele.classList.toggle("active");

    
    // move each row, append last row to end of table
  //  setTimeout(function moveTable() {
    	for (i = 2; i < (rows.length - 1); i++) {
    		x = rows[i].getElementsByTagName("td")[0];
    		y = rows[i + 1].getElementsByTagName("td")[0];
    		rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
    	    document.getElementsByTagName("tr")[2].setAttribute("id","active");
    		document.getElementsByTagName("tr")[3].removeAttribute("id"); 
    		//document.getElementsByTagName("tr")[3].removeAttribute("style"); 
    		//document.getElementsByTagName("tr")[rows.length].removeAttribute("style"); 

    	}
  //  }, 1000);
    
    //setTimeout(change, 2000);
    
	//document.getElementsByTagName("tr")[1].removeAttribute("style"); 
    
	jobIndex = (jobIndex + 1) % jobs.length;
    showJob();
    
    
}, 8000);

function change(){
	var active = document.getElementById("active");
	active.style.background = "#d00f61d6";
	active.style.color = "white";
}

function showJob() {
	
	document.getElementById("job-id-title").innerHTML = jobs[jobIndex].positionID;
	document.getElementById("job-main-title").innerHTML = jobs[jobIndex].positionTitle;
	document.getElementById("location").innerHTML = jobs[jobIndex].positionLocation_CityName + ", " + jobs[jobIndex].positionLocation_CountryName;
	document.getElementById("job-level").innerHTML = jobs[jobIndex].careerLevel;
	document.getElementById("type").innerHTML = jobs[jobIndex].jobCategory;
	document.getElementById("deadline").innerHTML = jobs[jobIndex].publicationEndDate;
	document.getElementById("benefits").innerHTML = jobs[jobIndex].positionBenefit_Name;
	

	qr.src = "qrCodes/"+ jobs[jobIndex].linkHash;
	var src = document.getElementById("code");
	src.appendChild(qr);
	
	benefit.src = "img/"+ jobs[jobIndex].positionBenefit_Code + ".png";
	var doc = document.getElementById("benefit-list");
	doc.appendChild(benefit);
	
//	
//	for (i = 0; i < images.length; i++) {
//		if (images == "homeoffice.png") {
//	benefti.src = "img/"+benefitIMAGE;
//	var ben = document.getElementById("benefit-list");
//	ben.appendChild(qr);
//	}

}

