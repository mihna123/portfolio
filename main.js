const width = window.screen.width;
const height = window.screen.height;

window.onload = function() {
    document.body.style["width"] = width + "px";
    setup_pause_button();
    spawn_rand_star_group(0, width/3);
    spawn_rand_star_group(width/3, width*2/3);
    spawn_rand_star_group(width*2/3, width);
    for(let i = 0; i < Math.floor(width/40); i ++){
        spawn_star_at(Math.random()*width, Math.random()*height);
    }
    window.requestAnimationFrame(anim);
    setInterval(function() {
        if(document.hasFocus())
            spawn_star_at(Math.random()*width + width, Math.random()*height);
    }, 5000);
    setInterval(function(){
        if(document.hasFocus())
            spawn_rand_star_group(width, Math.floor(width*4/3));
    }, 15000);
}

function anim(){
    const stars = document.getElementsByClassName("stars");
    console.log("Num of stars: " + stars.length);
    for(let el of stars){
        let cur_pos = get_px_val(el.style["left"]);
        if(cur_pos < -150){
            el.remove();
        }
        el.style["left"] = (cur_pos-0.3) + "px";
    }
    window.requestAnimationFrame(anim);
}

function get_px_val(input) {
    const num = input.slice(0,input.length-2);
    return Number(num);
}


function spawn_star_at(x, y) {
    const circle_node = document.createElement("div");
    const size = Math.floor(Math.random()*10 + 10)
    circle_node.className = "stars";
    circle_node.style["width"] = size + "px";
    circle_node.style["height"] = size + "px";
    circle_node.style["background"] = "rgb(102, 37, 73)";
    circle_node.style["border-radius"] = "50%";
    circle_node.style["position"] = "absolute";
    circle_node.style["top"] = (y - size/2)+"px";
    circle_node.style["left"] = (x - size/2)+"px";
    circle_node.style["z-index"] = "-9999";
    document.body.appendChild(circle_node);
}

function spawn_line_at(x1, y1, x2, y2) {
    const length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
    const angle = Math.atan2(x1-x2,y1-y2);
    const real_x = (x1 + x2) / 2;
    const top = (y1+y2)/2 - length/2;

    const line_node = document.createElement("div");
    line_node.className = "stars";
    line_node.style["position"] = "absolute";
    line_node.style["width"] = "5px";
    line_node.style["height"] = length + "px";
    line_node.style["top"] = top + "px";
    line_node.style["left"] = real_x + "px";
    line_node.style["background"] = "rgba(102, 37, 73, 0.6)";
    line_node.style["z-index"] = "-10000";
    line_node.style["transform"] = "rotate(" + -angle + "rad)";
    document.body.appendChild(line_node);
}

function spawn_rand_star_group(x1, x2){
    const width = Math.abs(x1-x2);
    const y2 = Math.floor(Math.random() * window.screen.height / 3) + window.screen.height/3;
    const y1 = y2 - window.screen.height/3;
    const star_count = Math.floor(Math.random() * 3) + 3;
    const star_pos = [];
    const cluster = [];
    for(let i = 0; i < star_count; i++){
        const x_pos = Math.floor(Math.random() * width) + Math.min(x1,x2);
        const y_pos = Math.floor(Math.random() * y2) + y1;
        star_pos.push({x: x_pos, y :y_pos});
    } 
    for(let i of star_pos){
        spawn_star_at(i.x, i.y);
        if(Math.random() > 0.35){
            cluster.push(i);
        }
    }
    for(let i = 0; i < cluster.length-1; i++){
        if(i === 0){
            spawn_line_at(cluster[i].x, cluster[i].y, cluster[cluster.length-1].x,cluster[cluster.length-1].y);
        }
        spawn_line_at(cluster[i].x, cluster[i].y, cluster[i+1].x, cluster[i+1].y);
    }
}

function setup_pause_button() {
    const pause_button = document.getElementById("pause-btn");
    pause_button.style["left"] = (width - 100) + "px";
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
