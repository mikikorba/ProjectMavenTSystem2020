var jobIndex = 0;
var jobs;

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
}

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
	  
//	  	for (i = 1; i < job.position_benefit_code.length; i++) {
			var img = document.createElement("img");
			img.src = "/img/homeoffice.png";
//			img.src = "/img/canteen.png";
	  	
			var src = document.getElementById("img"+i);
			src.appendChild(img);
//	  	}
	 }
      document.getElementsByTagName("tr")[2].setAttribute("id","active");

      showJob();
}

setInterval(function sortTable() {

	
    var table, rows, style, i, x, y;
    table = document.getElementById("myTable");
    rows = table.rows;
  
    for (i = 2; i < (rows.length - 1); i++) {
        x = rows[i].getElementsByTagName("td")[0];
        y = rows[i + 1].getElementsByTagName("td")[0];
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        document.getElementsByTagName("tr")[2].setAttribute("id","active");
        document.getElementsByTagName("tr")[3].removeAttribute("id");        
    }
    
    jobIndex = (jobIndex + 1) % jobs.length;
    showJob();
    
}, 15000);

function showJob() {
	console.log(jobs[jobIndex]);
}
