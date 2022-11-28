let jackomen = [];
let badclickcounter = 0;
let goodclickcounter = 0;
let tigger = false
document.body.style.cursor = "crosshair";
document.body.onclick = function() {
        badclickcounter += 1;
}

const miss =  document.getElementById("miss");


const jackoMan = () => {
    let wacked = false;
    const velocity = randomNum(20);
    const position = randomNum(600);
    const game =  document.getElementById("game");
    const jackomanimg = document.createElement("img");
    jackomanimg.draggable = false;
    jackomanimg.src = "./images/jacko.png";
    jackomanimg.width = 200;
    jackomanimg.style.position = "absolute";
    jackomanimg.style.left = position.x + "px";
    jackomanimg.style.top = position.y + "px";
    game.appendChild(jackomanimg);
    return { velocity, position, jackomanimg, wacked };
};

const randomNum = (scale) => { 
    return { 
        x: Math.random() * scale, 
        y: Math.random() * scale, 
    };
}

const createJacko = () => {
    jackomen.push(jackoMan());
}

const update = () => {
     jackomen.forEach( jacko => {
        jacko.jackomanimg.onclick = function() {
            jacko.wacked  = true;
            badclickcounter -= 1;
            goodclickcounter = goodclickcounter + 1;
        }
        deletePacman(jacko);
        collison(jacko);
        jacko.position.x += jacko.velocity.x;
        jacko.position.y += jacko.velocity.y;
        jacko.jackomanimg.style.left = jacko.position.x + "px";
        jacko.jackomanimg.style.top = jacko.position.y + "px";
        miss.innerText =`Miss: ${ badclickcounter }`
    })
    let timer = setTimeout(update, 20);
    if (badclickcounter == 3) {
        miss.innerText =`Miss: ${ badclickcounter }`
        clearTimeout(timer);
        clearInterval(gameTimer);
        location.reload()
    } 
    if(goodclickcounter == 10) { 
        clearTimeout(timer);
        clearInterval(gameTimer);
        alert("You Win!");
    } 
}

const collison = (jacko) => {
    jackomen.forEach(runningJacko => {
        runningJacko - jacko
        if(jacko.position.x + jacko.velocity.x + jacko.jackomanimg.width > window.innerWidth || 
            jacko.position.x + jacko.velocity.x < 0) {
            jacko.velocity.x = -jacko.velocity.x;
        }
        if(jacko.position.y + jacko.velocity.y + jacko.jackomanimg.width > window.innerHeight || 
            jacko.position.y + jacko.velocity.y < 0) {
            jacko.velocity.y = -jacko.velocity.y;
        }
    })
}

const deletePacman = (target) => {
    if (target.wacked ) {
        target.jackomanimg.src = "./images/boom.png";
        setTimeout(() => {
            delete jackomen[jackomen.indexOf(target)];
            target.jackomanimg.remove();
        }, 200)
    }
}

let game1 = () => {
    let counter = 1;
    createJacko();
    const stopCreation = setInterval(() => {
        createJacko();
        counter += 1;
        if (counter == 10)  clearInterval(stopCreation);
    }, 5000)
    update();
    return stopCreation;
}

let newGame = () => {
    location.reload();
}

let gameTimer = game1();