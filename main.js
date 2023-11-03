window.onload = function() {
    document.body.style["width"] = window.screen.width;
    setup_pause_button();
    spawn_rand_star_group();
}


function spawn_star_at(x, y) {
    const circle_node = document.createElement("div");
    const size = Math.floor(Math.random()*10 + 10)
    circle_node.style["width"] = size + "px";
    circle_node.style["height"] = size + "px";
    circle_node.style["background"] = "black";
    circle_node.style["border-radius"] = "50%";
    circle_node.style["position"] = "fixed";
    circle_node.style["top"] = (y - size/2)+"px";
    circle_node.style["left"] = (x - size/2)+"px";
    circle_node.style["z-index"] = "-10000";
    document.body.appendChild(circle_node);
}

function spawn_line_at(x1, y1, x2, y2) {
    const length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
    const angle = Math.atan2(x1-x2,y1-y2);
    const real_x = (x1 + x2) / 2;
    const top = (y1+y2)/2 - length/2;

    const line_node = document.createElement("div");
    line_node.style["position"] = "fixed";
    line_node.style["width"] = "5px";
    line_node.style["height"] = length + "px";
    line_node.style["top"] = top + "px";
    line_node.style["left"] = real_x + "px";
    line_node.style["background"] = "black";
    line_node.style["z-index"] = "-10000";
    line_node.style["transform"] = "rotate(" + -angle + "rad)";
    document.body.appendChild(line_node);
}

function spawn_rand_star_group(){
    const width = window.screen.width;
    const height = window.screen.height;
    const star_count = Math.floor(Math.random() * 3) + 3;
    console.log("star_count " + star_count);
    const star_pos = [];
    for(let i = 0; i < star_count; i++){
        const x_pos = Math.floor(Math.random() * width);
        const y_pos = Math.floor(Math.random() * height);
        star_pos.push({x: x_pos, y :y_pos});
    } 
    let temp_pos = undefined;
    for(let i of star_pos){
        spawn_star_at(i.x, i.y);
        if(temp_pos != undefined && Math.random() > 0.1) {
            spawn_line_at(i.x, i.y, temp_pos.x, temp_pos.y);
        }
        temp_pos = i;
    }

    
}

function setup_pause_button() {
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
}
