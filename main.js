const pause_button = document.getElementById("pause-btn");
const pause_menu = document.getElementById("pause-menu");

pause_menu.style["display"] = "none";


pause_button.addEventListener("click", function() {
    if(pause_menu.style["display"] === "none") {
        pause_menu.style["display"] = "initial";
        return;
    }
    pause_menu.style["display"] = "none";
});
