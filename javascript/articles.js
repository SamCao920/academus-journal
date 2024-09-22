function render() {
    
    // go to the index to find the list of files
    fetch("../articles/index.json")
    .then(result => result.json())
    .then(data => {
        // the list where links will be stored
        const articles = document.querySelector(".articles")

        // iterate through the index to create link
        for (var i = 0; i < data.length; i ++) {
            //create the link
            const link = document.createElement("a");
            link.innerHTML = data[i].name
            link.href = formLink(data[i].link)

            // create the list element
            const list = document.createElement("li");
            articles.appendChild(list)

            list.appendChild(link)
        }
    })
}

// function which returns back a link to the page
function formLink(link) {
    return("viewarticle.html?" + link)
}