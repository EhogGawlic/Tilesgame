fetch("./src/levels.js").then((response) => {
    const txt = response.text()
    txt.then((data) => {
        eval(data)
    })
})
function getEl(id){
    return document.getElementById(id)
}

let canvassize = innerHeight-innerHeight/10,
    playerpos = {x:0, y:0},
    level = 0,
    coins = 0,
    lives = 3,
    energy = 0,
    saved = null,
    mx,
    my,
    offx,
    offy,
    selectedtile = {x:null,y:null},
    tilesize=0,
    dead=false,
    jb = 0,
    attacking = false,
    moved = false,
    moves = ["Regular 1", " Regular 2", " Offset 1", " Offset 2", " Attack 1", " and Teleport 1"]
    upgs = [
        {
            level: 1,
            cost: 20,
            value: 1
        },
        {
            level: 1,
            cost: 50,
            value: 5,
            am: 1
        },
        {
            level: 1,
            cost: 30,
            value: 1,
            am: 1,
        },
        {
            level: 1,
            cost: 40,
            value: 1,
            am: 1
        },
        {
            level: 1,
            cost: 50,
            value: 0
        }
    ],
    dectorom = ["","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX", "XX","XXI","XXII","XXIII","XXIV","XXV", "XXVI","XXVII","XXVIII","XXIX","XXX","XXXI","XXXII","XXXIII","XXXIV","XXXV","XXXVI","XXXVII","XXXVIII","XXXIX", "XL","XLI","XLII","XLIII","XLIV","XLV","XLVI","XLVII","XLVIII","IL", "L", "alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma","alpha sigma"]
function beginLevel(){
    playerpos.x = levels.levels[level].start[0]
    playerpos.y = levels.levels[level].start[1]
    const lvl = levels.levels[level]
    tilesize = canvassize/Math.max(lvl.width, lvl.height)
    const mins = Math.min(lvl.width, lvl.height)
    offy = ((lvl.width-mins)/2)/tilesize
    offx = ((lvl.height-mins)/2)*tilesize
}
beginLevel()
function drawLevel(){
    const lvl = levels.levels[level]
    const dta = lvl.data
    for (let row = 0; row < lvl.height; row++){
        for (let col = 0; col < lvl.width; col++){
            const tile = dta[row][col]
            switch(tile){
                case 0:
                    ctx.fillStyle = "lightgray"
                    break
                case 1:
                    ctx.fillStyle = "darkgray"
                    break;
                case 2:
                    ctx.fillStyle = "green"
                    break
                case 3:
                    ctx.fillStyle = "red"
                    break
                case 4:
                    ctx.fillStyle = "blue"
            }
            if (selectedtile.x === col && selectedtile.y === row){
                ctx.strokeStyle="yellow"
            } else {
                ctx.strokeStyle="black"
            }
            ctx.beginPath()
            ctx.roundRect(offx+col*tilesize+1, offy+row*tilesize+1, tilesize-2, tilesize-2, tilesize/4)
            ctx.stroke()
            ctx.fill()
        }
    }
    ctx.fillStyle = "red"
    ctx.beginPath()
    ctx.arc(offx+playerpos.x*tilesize+1+tilesize/2, offy+playerpos.y*tilesize+1+tilesize/2, tilesize/3, 0, 360)
    ctx.fill()
    ctx.stroke()
}

let str = ""
for (let y = 0; y < 18; y++){
    str += "["
    for (let x = 0; x < 20; x++){
        const assigned = Math.random()*3<=1
        if (assigned){
            str+="1"
        } else {
           str+="0"
        }
        if (x < 19){
            str += ","
        }
    }
    str += "],\n"
}
function saveJSON(){
    const save = JSON.stringify({
        level: level,
        lvldata: levels,
        coins: coins,
        energy: energy,
        upgs: upgs,
        pp: playerpos,
        blksz: tilesize,
        offx: offx,
        offy: offy
    })
    return save
}
function processFiles(files) {
    const file = files[0];

    const reader = new FileReader()
    reader.onload = function (e) {
      // parse string to json 
        saved = JSON.parse(e.target.result);
    }
    reader.readAsText(file)
}
