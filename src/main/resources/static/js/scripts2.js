    var imgSrc = "img/loading.png";
    // var letters = "T-SYSTEMS".split("");
    var letters = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ".split("");

    var img = new Image;
    img.src = imgSrc;
    img.onload = function () {
        var rows = img.height;
        var columns = img.width;

        var charSize = Math.floor(Math.min(window.innerWidth / columns, window.innerHeight / rows));
        var smallCanvas = document.getElementById("scanvas");
        smallCanvas.width = columns;
        smallCanvas.height = rows;

        var scontext = smallCanvas.getContext("2d");
        scontext.drawImage(img, 0, 0);

        var canvas = document.getElementById("lcanvas");
        canvas.width = columns * charSize;
        canvas.height = rows * charSize;
        var lcontext = canvas.getContext("2d");

        var drops = [];
        var multiply = Math.ceil(canvas.height / 900);

        console.log(window.innerWidth  + " " + window.innerHeight + " " + charSize + " " + multiply);

        for (var x = 0; x < multiply * columns; x++)
            drops[x] = -Math.floor(Math.random() * rows);

        var image = scontext.getImageData(0, 0, columns, rows);

        function draw() {
            lcontext.fillStyle = "rgba(0, 0, 0, 0.025)";
            lcontext.fillRect(0, 0, canvas.width, canvas.height);

            lcontext.fillStyle = "#e20074";
            // lcontext.fillStyle = "#ff0000";
            lcontext.font = charSize + "px monospace";

            for (var x = 0; x < drops.length; x++) {
                var y = drops[x];
                if (y >= 0 && y < rows) {
                    if (image.data[(x + y * columns) * 4] > 50) {
                        var letter = letters[Math.floor(Math.random() * letters.length)];
                        lcontext.fillText(letter, (x % columns) * charSize, y * charSize);
                    }
                }
                drops[x]++;

                if (drops[x] >= rows)
                    drops[x] = 0;
            }
        }

        window.setInterval(draw, 30);
    };