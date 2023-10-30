const pause_button = document.getElementById("pause-btn");
const pause_backdrop = document.getElementById("pause-backdrop");
const pause_icon = pause_button.innerHTML;
const play_icon = "<i class=\"fa-solid fa-play\" style=\"color: #ffffff;\"></i>";

pause_backdrop.style["display"] = "none";


pause_button.addEventListener("click", function() {
    if(pause_backdrop.style["display"] === "none") {
        pause_backdrop.style["display"] = "initial";
        pause_button.innerHTML = play_icon;
        return;
    }
    pause_backdrop.style["display"] = "none";
    pause_button.innerHTML = pause_icon;
});
