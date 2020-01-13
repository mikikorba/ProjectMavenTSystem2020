//setInterval(function() {
//    var elem = document.getElementById("progress");
//    var id = setInterval(bar, 800);
//    function bar() {
//            elem.style.animation = "loader 15s linear infinite";
//            }
//}, 3000);

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

