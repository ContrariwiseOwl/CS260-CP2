function LoadPoemOfTheDay() {
    let currentDailyPoem = "Mother and Poet";
    fetch("https://poetrydb.org/title/" + currentDailyPoem)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json);
            let results = "";

            results += '<p><strong>' + json[0].title + "</strong> by " + json[0].author + '</p>';

            results += '<div class="stanza"><ul>';
            for (let i = 0; i < json[0].lines.length; i++) {
                results += '<li>' + json[0].lines[i] + '</li>';
            }
            results += '</ul></div>';

            document.getElementById("dailyPoem").innerHTML = results;
        }).catch(function(reason) {
            console.log("Error explained: " + reason);
        })
}

document.getElementById("poetryRequestSubmit").addEventListener("click", function(event) {
    const author = document.getElementById("authorInput").value;
    const title = document.getElementById("titleInput").value;
    const poemNumber = document.getElementById("poemNumber").value;
    let params = new Array();
    let paramString = "";
    params.push(author);
    params.push(title);
    params.push(poemNumber);
    let url = "https://poetrydb.org/";

    if (author === "" && title === "") {
        url += "random";

        if (poemNumber !== "") {
            url += "/" + poemNumber;
        }
    }
    else {
        let priorParam = false;
        if (params[0] !== "") {
            url += "author";
            paramString += params[0];
            priorParam = true;
        }
        if (params[1] !== "") {
            if (priorParam) {
                url += ",";
                paramString += ";";
            }
            paramString += params[1];
            url += "title";
            priorParam = true;
        }
        if (params[2] !== "") {
            if (priorParam) {
                url += ",";
                paramString += ";";
            }
            paramString += params[2];
            url += "poemcount";
        }

        url += "/" + paramString;

    }

    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json);
            let results = "";
            if (json.length === undefined) results += '<h2>Invalid Search</h2>';
            else results += '<h2>Returned ' + json.length + ' Poem(s)</h2>';

            for (let i = 0; i < json.length; i++) {
                results += '<div class="poem">';

                results += '<p><strong>' + json[i].title + "</strong> by " + json[i].author + ", " + json[i].linecount + ' lines</p>';

                results += '<div class="stanza"><ul>';
                for (let k = 0; k < json[i].lines.length; k++) {
                    results += '<li>' + json[i].lines[k] + '</li>';
                }
                results += '</ul></div>';

                results += '</div>';

                if (i < json.length - 1) results += '<hr/>';
            }

            document.getElementById("poetryHouse").innerHTML = results;
            document.getElementById("poetryHouse").style.display = "flex";
            document.getElementById("resetButton").style.display = "inline-block";
            document.getElementById("poetryRequest").style.display = "none";
            document.getElementById("poetryHouseTitle").style.display = "none";
        }).catch(function(reason) {
            console.log("Error explained: " + reason);
        })
});

document.getElementById("resetButton").addEventListener("click", function(event) {
    document.getElementById("poetryHouse").style.display = "none";
    document.getElementById("resetButton").style.display = "none";
    document.getElementById("poetryRequest").style.display = "flex";
    document.getElementById("poetryHouseTitle").style.display = "flex";
});