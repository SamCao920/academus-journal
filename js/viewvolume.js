function render() {
    const queryString = window.location.search;
    
    // gets the index file of the   
    fetch("../issues/" + queryString.substring(1) + "/index.json")
    .then(result => result.json())
    .then(data => {
        // console.log("../issues/" + queryString.substring(1) + "/index.json");
        console.log(data[0].title)

        // change title
        document.getElementsByClassName("sectitle")[0].innerHTML  = data[0].title;
        document.title = data[0].title;

        // area of individual articles 
        const links = document.querySelector("#articles");

        for (var i = 1; i < data.length; i ++) {

            // list element 
            const wrap = document.createElement("li");

            console.log(data[i]);

            // create title 
            const article_name = document.createElement("a");
            article_name.innerHTML = data[i].name;
            article_name.href = "../issues/vol1/" + data[i].link + ".pdf";

            // create author
            // const author = document.createElement("h2");
            // author.innerHTML = data[i].author;

            // create list wrapper
            // const review = document.createElement("li");

            // add  title and author to subwrapper 
            // wrap.appendChild(article_name);
            // wrap.appendChild(author);

            // subwrapper to list wrapper
            wrap.appendChild(article_name);

            // add review to links list
            links.appendChild(wrap);

        }
    })
}

window.onload = () => {
    render()
}