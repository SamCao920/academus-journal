export function makeHeader() {

    // create footer section
    const head = document.createElement("header"); 

    // create subsections
    const logo = document.createElement("h1");
    logo.innerHTML = "ACADEMUS"

    const links = document.createElement("nav");

    // add links in 
    const homepage = document.createElement("a");
    homepage.href="../index.html";
    homepage.innerHTML = "Homepage"

    const team = document.createElement("a");
    team.href="./team.html";
    team.innerHTML = "Our Team"

    const issues = document.createElement("a");
    issues.href="./issues.html";
    issues.innerHTML = "Issues"

    const forauthor = document.createElement("a");
    forauthor.href="./authors.html";
    forauthor.innerHTML = "For Authors";

    // add links to link list
    links.appendChild(homepage);
    links.appendChild(team);
    links.appendChild(issues);
    links.appendChild(forauthor);

    // add subsections to footer
    head.appendChild(logo);
    head.appendChild(links);

    // add footer
    document.body.insertBefore(head, document.body.firstChild);

}