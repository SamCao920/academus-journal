const animate = (title1, title2) => {
    console.log(title1)
    console.log(title2)
    for (var i = 0; i < title1.length; i ++) {
        const letter = title1[i];
        const delay = (Math.random() * 2);
        const duration = (Math.random() * 2);
        const blur = (Math.random() * 2);

        letter.setAttribute("animation", "blur-in")
    }
    }

function onload() {
    animate(document.getElementsByClassName("letter"), document.getElementsByClassName("letter2"))
}