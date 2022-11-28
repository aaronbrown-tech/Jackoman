let pacMen = []
let setToRandom = (num) => {
    const x = Math.random() * num;
    const y = Math.random() * num;
    return  { x, y };
}
let makePacMan = () => {
    let velocity = setToRandom(10);
    let position = setToRandom(200);

    let game = document.getElementById("game");
    let newimg = document.createElement("img");
    newimg.style.position = "absolute";
    newimg.src = "PacMan.png";
    newimg.width = 100;
    newimg.style.left = position.x + "px";
    newimg.style.top = position.y + "px";
    game.appendChild(newimg);
    return { position, velocity, newimg };
};

let update = () => {
    pacMen.forEach( item => {
        checkCollisions(item);
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;
        item.newimg.style.left = item.position.x + "px";
        item.newimg.style.top = item.position.y + "px";
    });
    setTimeout(update, 20);
};


let checkCollisions = (item) => {
    if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth || 
        item.position.x + item.velocity.x < 0) item.velocity.x = -item.velocity.x;
    if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight || 
        item.position.y + item.velocity.y < 0) item.velocity.y = -item.velocity.y;
};

let makeOne = () => {
    pacMen.push(makePacMan());
};

makeOne();
makeOne();
update()