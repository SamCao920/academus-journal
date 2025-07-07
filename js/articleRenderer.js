import { makeHeader } from "./makeHeader.js";
import { makeFooter } from "./makeFooter.js";

// code from previous website

// get the parameter from the url

function render() {
    // searches in the url, then gets the text, then converts the text.

    getFile(window.location.search)
}

// function to get the file from the system

function getFile(queryString) {

    // ?example -> example.md
    const urlParam = new URLSearchParams(window.location.search);
    const vol = urlParam.get("vol");
    const art = urlParam.get("art");
    console.log(vol,art);
    console.log("../issues/" + vol+"/" + art +".md"); 
    

    //doesn't return for some reason
    fetch("../issues/" + vol+"/" + art +".md")
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

    // Check for Front Matter metadata (YAML format)
    const frontMatterPattern = /^---\n([\s\S]*?)\n---/;
    const match = markdown.match(frontMatterPattern);

    if (match) {
        // Extract the YAML front matter content
        const frontMatter = match[1];
        markdownContent = markdown.replace(frontMatterPattern, ''); // Remove front matter from markdown

        // Parse the front matter (assuming simple key: value pairs)
        frontMatter.split('\n').forEach(line => {
            const [key, value] = line.split(':').map(item => item.trim());
            if (key && value) {
                metadata[key] = value.replace(/(^"|"$)/g, ''); // Remove quotes if present
            }
        });
    }

    // Now convert the markdown content to HTML (basic implementation as before)

    // Convert headings (from # to <h1> and ## to <h2>, etc.)
    markdownContent = markdownContent.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
    markdownContent = markdownContent.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
    markdownContent = markdownContent.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
    markdownContent = markdownContent.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    markdownContent = markdownContent.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    markdownContent = markdownContent.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Convert bold (**text** or __text__)
    markdownContent = markdownContent.replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>');
    markdownContent = markdownContent.replace(/__(.*?)__/gim, '<b>$1</b>');

    // Convert italics (*text* or _text_)
    markdownContent = markdownContent.replace(/\*(.*?)\*/gim, '<i>$1</i>');
    markdownContent = markdownContent.replace(/_(.*?)_/gim, '<i>$1</i>');

    // Convert strikethrough (~~text~~)
    markdownContent = markdownContent.replace(/~~(.*?)~~/gim, '<s>$1</s>');

    // Convert unordered lists (- item or * item)
    markdownContent = markdownContent.replace(/^\* (.*$)/gim, '<ul><li>$1</li></ul>');
    markdownContent = markdownContent.replace(/^\- (.*$)/gim, '<ul><li>$1</li></ul>');

    // Convert ordered lists (1. item)
    markdownContent = markdownContent.replace(/^\d+\. (.*$)/gim, '<ol><li>$1</li></ol>');

    // Convert links ([text](url))
    markdownContent = markdownContent.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');

    // Convert blockquotes ("> quote")
    markdownContent = markdownContent.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');

    // Convert paragraphs (plain text lines)
    markdownContent = markdownContent.replace(/\n$/gim, '</p><p>');

    return {
        metadata: metadata,
        html: markdownContent.trim() // Return both metadata and HTML
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
}

window.onload = () => {
    makeFooter();
    makeHeader();
    render();
}