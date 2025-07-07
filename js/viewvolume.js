import { makeFooter } from "./makeFooter.js";
import { makeHeader } from "./makeHeader.js";

function render() {
    const queryString = window.location.search;
    
    // gets the index file of the   
    fetch("../issues/" + queryString.substring(1) + "/index.json")
    .then(result => result.json())
    .then(data => {
        // console.log("../issues/" + queryString.substring(1) + "/index.json");
        console.log(data[0].title)

        // change title
        document.getElementsByClassName("pgtitle")[0].innerHTML  = data[0].title.toUpperCase();
        document.title = data[0].title;

        // area of individual articles 
        const links = document.querySelector("#articles");

        for (var i = 1; i < data.length; i ++) {

            // subwrapper
            const wrap = document.createElement("div");

            console.log(data[i]);

            // create title 
            const article_name = document.createElement("a");
            article_name.innerHTML = data[i].name;
            article_name.href = "viewarticle.html?vol="+queryString.substring(1)+"&art="+data[i].link;

            // create author
            const author = document.createElement("h2");
            author.innerHTML = data[i].author;

            // create list wrapper
            const review = document.createElement("li");

            // add  title and author to subwrapper 
            wrap.appendChild(article_name);
            wrap.appendChild(author);

            // subwrapper to list wrapper
            review.appendChild(wrap);

            // add review to links list
            links.appendChild(review);

        }
    })
}

window.onload = () => {
    makeFooter();
    makeHeader();
    render()
}