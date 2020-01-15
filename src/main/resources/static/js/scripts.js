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
    document.getElementById("hide").setAttribute("id", "job");
    document.getElementById("job").setAttribute("id", "hide");
}, 15000);
//v CSS: #progress {animation: loader 15s linear infinite;}


function loadDoc(id, col, row) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementsByClassName(id)[0].innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "profile?collum="+col+"&row="+row, true);
    xhttp.send();
}

function onload(){
	  var table = document.getElementById("myTable");
	  for (i = 1; i < 30; i++) {
	  	var row = table.insertRow(i + 1);  	
        document.getElementsByTagName("tr")[2].setAttribute("id","active");
        
        
	  	var cell0 = row.insertCell(0);
	  	cell0.className = 'hotjob'+i;
	  	cell0.setAttribute("style", "width:2.3vw; padding-left: 0.9vw");
	  	
	  	var cell1 = row.insertCell(1);
	  	cell1.className = 'job-title'+i;
	  	cell1.setAttribute("style", "width:50vw; font-weight: 700;text-transform: uppercase; font-size: 1.4vw; line-height: normal");

	  	var cell2 = row.insertCell(2);
	  	cell2.className = 'location'+i;
	  	cell2.setAttribute("style", "width:24.3vw; font-weight: 400; font-size: 1.4vw; line-height: normal");

	  	var cell3 = row.insertCell(3);
	  	cell3.className = 'posted'+i;
	  	cell3.setAttribute("style", "width:10vw; font-weight: 400; font-size: 1.4vw; line-height: normal");

	 	var cell4 = row.insertCell(4);
	  	cell4.className = 'benefits'+i;
	  	cell4.setAttribute("style", "width:5vw; font-weight: 400; font-size: 1.4vw; line-height: normal");

	  	var cell5 = row.insertCell(5);
	  	cell5.className = 'url'+i;
	  	cell5.setAttribute("style", "text-aling:center");

	
//	  	loadDoc("hotjob"+i,"position_title",i);
	  	loadDoc("job-title"+i,"position_title",i);
	  	loadDoc("location"+i,"position_location_city_name," + "" + "position_location_country_name",i);
	  	loadDoc("posted"+i,"publication_start_date",i);
//	  	loadDoc("benefits"+i,"position_benefit_name",i);  
//	  	loadDoc("url"+i,"position_title",i);  
		

	 }
}

