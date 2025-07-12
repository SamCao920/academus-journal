import { makeFooter } from "./makeFooter.js";
import { makeHeader } from "./makeHeader.js";
import { initPageTransitions } from "./pageTransitions.js";

window.onload = () => {
    makeFooter();
    makeHeader();
    initPageTransitions();
}