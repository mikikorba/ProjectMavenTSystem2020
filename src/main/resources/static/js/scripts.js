//setInterval(function() {
//    var elem = document.getElementById("progress");
//    var id = setInterval(bar, 800);
//    function bar() {
//            elem.style.animation = "loader 15s linear infinite";
//            }
//}, 3000);

//function showOrHideTable() {
//    table = document.getElementById("myTable");
//    rows = table.rows;
//
//    if (table == null || table == undefined) {
//        for (i = 2; i < (rows.length - 1); i++) {
//        x = rows[i].getElementsByTagName("td")[0];
//        x.setAttribute("id", "hide");   
//    } else {
//            for (i = 2; i < (rows.length - 1); i++) {
//            x = rows[i].getElementsByTagName("td")[0];
//            x.setAttribute("id", "show");       
//        }
//    }
//}
//    
//$('#myTable th').each(function(i) {
//    var remove = 0;
//
//    var tds = $(this).parents('table').find('tr td:nth-child(' + (i + 1) + ')')
//    tds.each(function(j) { if (this.innerHTML == '') remove++; });
//
//    if (remove == ($('#myTable tr').length - 1)) {
//        $(this).hide();
//        tds.hide();
//    }
//});

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

function loadDoc(coll, content, row) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementsByClassName(content).innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "/profile?collum=" + coll + "&row=" + row, true);
    xhttp.send();
}

function onload(){
	  var table = document.getElementById("myTable");
	  for (i = 1; i < 30; i++) {
	  	var row = table.insertRow( i + 1);
	  	
	  	var cell1 = row.insertCell(0);
	  	cell1.className = 'hotjob';
	  	var cell2 = row.insertCell(1);
	  	cell2.className = 'job';
	 	var cell3 = row.insertCell(2);
	  	cell3.className = 'location';
	  	var cell4 = row.insertCell(3);
	  	cell4.className = 'posted';
	 	var cell5 = row.insertCell(4);
	  	cell5.className = 'benefits';
	  	var cell6 = row.insertCell(5);
	  	cell6.className = 'url';

	  	for (i = 1; i < 30; i++) {
 	  		cell1.innerHTML = loadDoc(???????, hotjob, i);
	  		cell2.innerHTML = loadDoc(position_title, job, i);
	  		cell3.innerHTML = loadDoc(position_location_city_name, location, i);
	  		cell4.innerHTML = loadDoc(publication_start_date, posted, i);
	  		cell5.innerHTML = loadDoc(???????, beneftits, i);
	  		cell6.innerHTML = loadDoc(???????, url, i);
	  	}
	 }
}


