export const transition = () => {

    // ----- get children
    
    const items = Array.from(document.querySelectorAll('#content > *'));
    items.pop();

    const articleElements = Array.from(document.querySelectorAll("#article > *"));

    const all = [...items, ... articleElements]

    // console.log(articleElements);
    // console.log(items.concat(all));

    // ----- set everything transparent

    all.forEach(el => {
        el.style.opacity = 0; 
    })

    const duration = 300;
    const delay = 200;

    all.forEach((el, index) => {
        setTimeout(()=> {
            el.style.transition = `opacity ${duration}ms ease`;
            el.style.opacity = 1;
        }, index * delay);
    });
};
