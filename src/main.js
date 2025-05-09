 
function loop(){
    ctx.clearRect(0, 0, canvassize, canvassize)
    moneytxt.innerText = "$"+coins
    energytxt.innerText = "Energy: "+energy
    if (saved){
        level = saved.level
        coins = saved.coins
        energy = saved.energy
        playerpos = saved.pp
        /*for (let i = 0; i < saved.lvldata.length; i++){
            levels.levels[i]=saved.lvldata[i]
        }*/
        tilesize = saved.blksz
        offx = saved.offx
        offy = saved.offy
        upgs = saved.upgs
        u1l.innerText = dectorom[upgs[0].value]
        u2l.innerText = dectorom[upgs[1].value]
        u3l.innerText = dectorom[upgs[2].am]
        u4l.innerText = dectorom[upgs[3].am]
        u1c.innerText = upgs[0].cost
        u2c.innerText = upgs[1].cost
        u3c.innerText = upgs[2].cost
        u4c.innerText = upgs[3].cost
        u1v.innerText = upgs[0].value
        u2v.innerText = upgs[1].value
        u3v.innerText = upgs[2].value
        u4v.innerText = upgs[3].value
        saved = null
    }
    if (moved){
        savelink.href = "data:text/json,"+saveJSON()
        const lvel = levels.levels[level]
        for (let i = 0; i < lvel.enemies.length; i+=3){
            const enemyPlayerLine = {x:playerpos.x-lvel.enemies[i], y:playerpos.y-lvel.enemies[i+1]}
            let ax=0, ay=0
            const iix = Math.max(Math.abs(enemyPlayerLine.x),Math.abs(enemyPlayerLine.y))===Math.abs(enemyPlayerLine.x)
            
            if (iix){
                if (enemyPlayerLine.x < 0){
                    ax = -1
                } else {
                    ax = 1
                }
            } else {
                if (enemyPlayerLine.y < 0){
                    ay = -1
                } else {
                    ay = 1
                }
            }
            if (Math.max(Math.abs(enemyPlayerLine.x),Math.abs(enemyPlayerLine.y))===Math.abs(enemyPlayerLine.y)&&iix){
                if (enemyPlayerLine.x < 0){
                    ay = -1
                } else {
                    ay = 1
                }
                if (enemyPlayerLine.y < 0){
                    ay = -1
                } else {
                    ay = 1
                }
            }
            lvel.enemies[i] +=ax
            lvel.enemies[i+1] += ay
            if (lvel.data[lvel.enemies[i+1]][lvel.enemies[i]]<2){
                
                lvel.data[lvel.enemies[i+1]-ay][lvel.enemies[i]-ax]=0
                lvel.data[lvel.enemies[i+1]][lvel.enemies[i]] = 3
            } else {
                lvel.enemies[i] -=ax
                lvel.enemies[i+1] -= ay
            }
            if (playerpos.x===lvel.enemies[i]&&playerpos.y===lvel.enemies[i+1]){
                dead=true
                alert("U DIED")
                beginLevel()
                lives--
                if (lives=== 0){
                    coins=0
                    energy=0
                    level=0
                    beginLevel()
                    alert("No mo lives")
                }
            }
        }
        moved=false
    }
    drawLevel()
    requestAnimationFrame(loop)
}
requestAnimationFrame(loop)
m1.addEventListener("click", ()=>{
    jb=0
})
m2.addEventListener("click", ()=>{
    jb=1
})
m3.addEventListener("click", ()=>{
    if (coins >= 2 && jb!==2){
        jb=2
        if (jb!==3){coins-=2}
    }
})
m4.addEventListener("click", ()=>{
    if (coins >= 2 && jb!==3){
        jb=3
        if (jb!==2){coins-=2}
    }
})
m5.addEventListener("click", ()=>{
    attacking=true
    energy-=2
    if (energy<0){
        dead=true
        alert("U DIED")
        beginLevel()
        lives--
        if (lives=== 0){
            coins=0
            energy=0
            level=0
            beginLevel()
            alert("No mo lives")
        }
    }
})
m6.addEventListener("click", ()=>{
    jb=5
})
addEventListener("mousemove", (e)=>{
    mx = e.clientX
    my = e.clientY
    const rtlcmx = mx-(offx+(innerWidth-canvassize)/2)
    const rtlcmy = my-offy
    selectedtile.x = Math.floor(rtlcmx/tilesize)
    selectedtile.y = Math.floor(rtlcmy/tilesize)
})
function tile(){
    moved = true
    if (levels.levels[level].data[selectedtile.y][selectedtile.x] !== 4){
        playerpos.x = selectedtile.x
        playerpos.y=selectedtile.y
    }
    if (levels.levels[level].data[selectedtile.y][selectedtile.x] === 0){
        energy--
        if (energy<0){
            dead=true
            alert("U DIED")
            beginLevel()
            lives--
            if (lives=== 0){
                coins=0
                level=0
                energy=0
                beginLevel()
                alert("No mo lives")
            }
        }
    } else {
        if (levels.levels[level].data[selectedtile.y][selectedtile.x] === 2){
            if (level<levels.levels.length-1){
                level++
                beginLevel()
                alert("Next level!!!!")
                coins+=4

                energy+=4
            } else {
                alert ("ur done")
            }

        }
        energy+=upgs[2].value
        coins+=upgs[3].value
    }

}
function getdata(x,y){
    return levels.levels[level].data[y][x]
}
function move(movenum){
    
    switch(movenum){
        case 0:
            if ((selectedtile.x + 2 === playerpos.x && selectedtile.y === playerpos.y &&
                getdata(selectedtile.x+1,selectedtile.y)!==4)||
                (selectedtile.x - 2 === playerpos.x && selectedtile.y === playerpos.y &&
                getdata(selectedtile.x-1,selectedtile.y)!==4)||
                (selectedtile.x === playerpos.x && selectedtile.y-2 === playerpos.y &&
                getdata(selectedtile.x,selectedtile.y-1)!==4)||
                (selectedtile.x === playerpos.x && selectedtile.y+2 === playerpos.y &&
                getdata(selectedtile.x,selectedtile.y+1)!==4)){
                    jb=0
                    tile()
            }
            break
        case 1:
            if ((selectedtile.x + 1 === playerpos.x && selectedtile.y+1 === playerpos.y)||
                (selectedtile.x - 1 === playerpos.x && selectedtile.y+1 === playerpos.y)||
                (selectedtile.x + 1 === playerpos.x && selectedtile.y-1 === playerpos.y)||
                (selectedtile.x - 1 === playerpos.x && selectedtile.y-1 === playerpos.y)){
                    jb=0
                    tile()
            }
            break
        case 2:
            if ((selectedtile.x + 1 === playerpos.x && selectedtile.y === playerpos.y)||
                (selectedtile.x - 1 === playerpos.x && selectedtile.y === playerpos.y)||
                (selectedtile.x === playerpos.x && selectedtile.y-1 === playerpos.y)||
                (selectedtile.x === playerpos.x && selectedtile.y+1 === playerpos.y)){
                    jb=0
                    tile()
            }
            break
        case 3:
            if ((selectedtile.x + 2 === playerpos.x && selectedtile.y+1 === playerpos.y)||
                (selectedtile.x - 2 === playerpos.x && selectedtile.y+1 === playerpos.y)||
                (selectedtile.x + 2 === playerpos.x && selectedtile.y-1 === playerpos.y)||
                (selectedtile.x - 2 === playerpos.x && selectedtile.y-1 === playerpos.y)||
                (selectedtile.x + 1 === playerpos.x && selectedtile.y+2 === playerpos.y)||
                (selectedtile.x - 1 === playerpos.x && selectedtile.y+2 === playerpos.y)||
                (selectedtile.x + 1 === playerpos.x && selectedtile.y-2 === playerpos.y)||
                (selectedtile.x - 1 === playerpos.x && selectedtile.y-2 === playerpos.y)){
                    jb=0
                    tile()
            }
            break
        case 5:
            if (upgs[1].value>=5){
                tile()
            }
            
    }
}
addEventListener("click", ()=>{
    if (my < canvassize && mx > (innerWidth-canvassize)/2 && mx < (innerWidth+canvassize)/2){
        if (jb>=0){
            move(jb)
        }
        if (attacking){
            moved = true
            for (let i = 0; i < levels.levels[level].enemies.length; i+=3){
                const enemyx = levels.levels[level].enemies[i]
                const enemyy = levels.levels[level].enemies[i+1]
                if (Math.sqrt((playerpos.x-enemyx)**2+(playerpos.y-enemyy)**2) <= 7.5){
                    if (Math.sqrt((selectedtile.x-enemyx)**2+(selectedtile.y-enemyy)**2) <= upgs[4].value){
                        levels.levels[level].enemies[i+2]-=upgs[0].value
                        if (levels.levels[level].enemies[i+2] <= 0){
                            levels.levels[level].data[levels.levels[level].enemies[i+1]][levels.levels[level].enemies[i]] = 1
                            levels.levels[level].enemies.splice(i, 3)
                            coins+=5
                        }
                    }
                }
            }
            
        }
    }
})
addEventListener("keypress", (e)=>{
    switch(e.key){
        case "1":
            jb = 0
            break
        case "2":
            jb=1
            break
        case "3":
            if (coins >= 2 && jb!==2){
                jb=2
                if (jb!==3){coins-=2}
            }
            break
        case "4":
            if (coins >= 2 && jb!==3){
                jb=3
                if (jb!==2){coins-=2}
            }
            break
        case "a":
            attacking=true
            energy-=2
            
            if (energy<0){
                dead=true
                alert("U DIED")
                beginLevel()
                lives--
                if (lives=== 0){
                    coins=0
                    energy=0
                    level=0
                    beginLevel()
                    alert("No mo lives")
                }
            }
    }
})
ub1.addEventListener("click", ()=>{
    if (coins >= upgs[0].cost){
        coins -= upgs[0].cost
        upgs[0].value++
        u1v.innerText = upgs[0].value
        upgs[0].cost += Math.floor(upgs[0].cost/2)
        u1c.innerText = upgs[0].cost
        u1l.innerText = dectorom[upgs[0].value]
    }
})
ub2.addEventListener("click", ()=>{
    if (coins >= upgs[1].cost){
        coins -= upgs[1].cost
        upgs[1].value++
        let ms = moves
        ms.splice(upgs[1].value, 1)
        u2v.innerText = ms
        upgs[1].cost += Math.floor(upgs[1].cost/2)
        u2c.innerText = upgs[1].cost
        u2l.innerText = dectorom[upgs[1].am]
        if (upgs[1].value>=5){
            m5.style.display="block"
        }
    }
})
ub3.addEventListener("click", ()=>{
    if (coins >= upgs[2].cost){
        coins -= upgs[2].cost
        upgs[2].value++
        upgs[2].am++
        u3v.innerText = upgs[2].value
        upgs[2].cost += Math.floor(upgs[2].cost/2)
        u3c.innerText = upgs[2].cost
        u3l.innerText = dectorom[upgs[2].am]
    }
})
ub4.addEventListener("click", ()=>{
    if (coins >= upgs[3].cost){
        coins -= upgs[3].cost
        upgs[3].value*=2
        upgs[3].am++
        u4v.innerText = upgs[3].value
        upgs[3].cost *= 1.75
        upgs[3].cost = Math.floor(upgs[3].cost)
        u4c.innerText = upgs[3].cost
        u4l.innerText = dectorom[upgs[3].am]
    }
})
try{
ub5.addEventListener("click", ()=>{
    alert(a)
    if (coins >= upgs[4].cost){
        alert("e")
        coins -= upgs[4].cost
        upgs[4].value++
        u5v.innerText = upgs[4].value
        upgs[4].cost *= 1.5
        upgs[4].cost = Math.floor(upgs[4].cost)
        u5c.innerText = upgs[4].cost
        u5l.innerText = dectorom[upgs[4].value+1]
    }
})}catch(e){alert(e)}
//alert(str)
//getEl("fdf").innerText = str
//navigator.clipboard.writeText(str);/
/*var json;

function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object

	// files is a FileList of File objects. List some properties.

}

document.getElementById('files').addEventListener('change', handleFileSelect, false);

function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object

	// files is a FileList of File objects. List some properties.
	var output = [];
	for (var i = 0, f; f = files[i]; i++) {
		var reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function (theFile) {
			return function (e) {
				console.log('e readAsText = ', e);
				console.log('e readAsText target = ', e.target);
				try {
					json = JSON.parse(e.target.result);
					alert('json global var has been set to parsed json of this file here it is unevaled = \n' + JSON.stringify(json));
				} catch (ex) {
					alert('ex when trying to parse json = ' + ex);
				}
			}
		})(f);
		reader.readAsText(f);
	}

}

document.getElementById('files').addEventListener('change', handleFileSelect, false);*/