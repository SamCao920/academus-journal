export function makeFooter() {

    // create footer section
    const foot = document.createElement("footer"); 

    // create subsections
    const logo = document.createElement("h1");
    logo.innerHTML = "ACADEMUS"

    const links = document.createElement("nav");

    // add links in 
    const link1 = document.createElement("a");
    link1.href="#";
    link1.innerHTML = "link one"

    const link2 = document.createElement("a");
    link2.href="#";
    link2.innerHTML = "link two"

    // add links to link list
    links.appendChild(link1);
    links.appendChild(link2)

    // add subsections to footer
    foot.appendChild(logo);
    foot.appendChild(links);

    // add footer
    document.body.appendChild(foot);

}
