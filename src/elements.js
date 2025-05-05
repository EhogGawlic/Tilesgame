const canvas = getEl("screen"),
      moneytxt = getEl("moneytxt"),
      energytxt = getEl("energytxt")
      m1 = getEl("b1"),
      m2 = getEl("b2"),
      m3 = getEl("b3"),
      m4 = getEl("b4"),
      m5 = getEl("b5"),
      m6 = getEl("b6"),
      u1l = getEl("u1l"),
      u1v = getEl("u1v"),
      u1c = getEl("u1c"),
      ub1 = getEl("ub1"),
      u2l = getEl("u2l"),
      u2v = getEl("u2v"),
      u2c = getEl("u2c"),
      ub2 = getEl("ub2"),
      u3l = getEl("u3l"),
      u3v = getEl("u3v"),
      u3c = getEl("u3c"),
      ub3 = getEl("ub3"),
      u4l = getEl("u4l"),
      u4v = getEl("u4v"),
      u4c = getEl("u4c"),
      ub4 = getEl("ub4"),
      u5l = getEl("u5l"),
      u5v = getEl("u5v"),
      u5c = getEl("u5c"),
      ub5 = getEl("ub5"),
      savelink = getEl("savelink"),
      fileinp = getEl("fileinp")
canvas.style.left = (innerWidth-canvassize)/2+"px"
canvas.width = canvassize
canvas.height = canvassize
//makes it easier to use canvas
/**
 * 
 * @returns {CanvasRenderingContext2D}
 */
function gc(){return canvas.getContext("2d")}
const ctx = gc()
ctx.strokeStyle="black"
ctx.lineWidth=2
