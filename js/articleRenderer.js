import { makeHeader } from "./makeHeader.js";
import { makeFooter } from "./makeFooter.js";
import { transition } from "./transition.js";

// code from previous website

// get the parameter from the url

function render() {
    // searches in the url, then gets the text, then converts the text.
    getFile()
    
}

// function to get the file from the system

function getFile() {

    // ?example -> example.md
    const urlParam = new URLSearchParams(window.location.search);
    const vol = urlParam.get("vol");
    const art = urlParam.get("art");
    console.log("../issues/" + vol+"/" + art +".md"); 
    
    // https://raw.githubusercontent.com/SamCao920/academus-journal/refs/heads/main/issues/vol5/example.md

    const rawUrl =
        "https://raw.githubusercontent.com/SamCao920/academus-journal/refs/heads/main/issues/" +
        vol +
        "/" +
        art +
        ".md";
    console.log(rawUrl);


    //fetch the raw file from GitHub
    fetch(rawUrl)
        .then(result => result.text())
        .then(data => {
            const result = convertMarkdownToHtml(data)
            const html = result.html
            const metadata = result.metadata

            insertText(html,metadata)
        })
    .catch((e) => console.error(e));
}

// Function to extract metadata and convert Markdown to HTML
function convertMarkdownToHtml(markdown) {
    let metadata = {};
    let markdownContent = markdown;

    /* ---------- 1.  FRONT‑MATTER ---------- */
    const frontMatterPattern = /^---\n([\s\S]*?)\n---/;
    const match = markdown.match(frontMatterPattern);

    if (match) {
        const frontMatter = match[1];
        markdownContent = markdown.replace(frontMatterPattern, '');
        frontMatter.split('\n').forEach(line => {
            const [key, value] = line.split(':').map(item => item.trim());
            if (key && value) {
                metadata[key] = value.replace(/(^"|"$)/g, '');
            }
        });
    }

    /* ---------- 2.  INLINE & BLOCK CONVERSIONS  ---------- */
    markdownContent = markdownContent.replace(/^###### (.*$)/gim, '<h6>$1</h6>')
                                     .replace(/^##### (.*$)/gim, '<h5>$1</h5>')
                                     .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
                                     .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                                     .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                                     .replace(/^# (.*$)/gim,  '<h1>$1</h1>')

                                     .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')
                                     .replace(/__(.*?)__/gim,    '<b>$1</b>')

                                     .replace(/\*(.*?)\*/gim, '<i>$1</i>')
                                     .replace(/_(.*?)_/gim,   '<i>$1</i>')

                                     .replace(/~~(.*?)~~/gim, '<s>$1</s>')

                                     .replace(/^\* (.*$)/gim, '<ul><li>$1</li></ul>')
                                     .replace(/^\- (.*$)/gim, '<ul><li>$1</li></ul>')

                                     .replace(/^\d+\. (.*$)/gim, '<ol><li>$1</li></ol>')

                                     .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')

                                     .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');

    /* ---------- 3.  PARAGRAPH WRAPPING  ---------- */
    markdownContent = markdownContent
        .trim()                          // cleanliness
        .replace(/\r\n/g, '\n');         // normalise EOLs

    markdownContent = markdownContent
        .split(/\n{2,}/)                 // split on blank lines (1 para == ≥2 EOLs)
        .map(block => {
            // If the block already starts with an HTML block‑level tag, leave it alone
            if (/^\s*<\s*(h\d|ul|ol|li|blockquote)/i.test(block.trim())) {
                return block.trim();
            }
            return `<p>${block.trim()}</p>`;
        })
        .join('\n');

    return {
        metadata,
        html: markdownContent
    };
}



// function to put text into the body

function insertText(text,metadata) {
    // render the metadata
    document.querySelector(".pgtitle").innerHTML = metadata.title.toUpperCase();
    document.querySelector("#subtitle").innerHTML = metadata.subtitle;
    document.querySelector("#date").innerHTML = metadata.date;
    document.querySelector("#author").innerHTML = metadata.author;
    // render the flesh
    document.querySelector("#article").innerHTML = text;

    // change meta title
    document.title= metadata.title;

    transition();
}

window.onload = () => {
    makeFooter();
    makeHeader();
    render();
}