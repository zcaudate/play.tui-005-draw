import React from 'react'

// play.tui-005-draw.element-donut/donut-frame [11] 
function donut_frame(A,B){
  let b = [];
  let z = [];
  let cA = Math.cos(A);
  let sA = Math.sin(A);
  let cB = Math.cos(B);
  let sB = Math.sin(B);
  let k = 0;
  let j = 0;
  let i = 0;
  for(k = 0; k < 1760; ++k){
    b[k] = (((k % 80) == 79) ? "\n" : " ");
    z[k] = 0;
  }
  for(j = 0; j < 6.28; j += 0.07){
    let ct = Math.cos(j);
    let st = Math.sin(j);
    for(i = 0; i < 6.28; i += 0.02){
      let cp = Math.cos(i);
      let sp = Math.sin(i);
      let h = ct + 2;
      let D = 1 / ((sp * h * sA) + (st * cA) + 5);
      let t = (sp * h * cA) - (st * sA);
      let x = 0 | (40 + (30 * D * ((cp * h * cB) - (t * sB))));
      let y = 0 | (12 + (15 * D * ((cp * h * sB) + (t * cB))));
      let o = x + (80 * y);
      let N = 0 | (8 * ((cB * ((st * sA) - (sp * ct * cA))) - (sp * ct * sA) - (st * cA) - (cp * ct * sB)));
      if((y < 22) && (y >= 0) && (x >= 0) && (x < 79) && (D > z[o])){
        z[o] = D;
        b[o] = ".,-~:;=!*#$@"[(N > 0) ? N : 0];
      };
    };
  }
  return b.join("");
}

// play.tui-005-draw.element-donut/Donut [63] 
function Donut(){
  let [P,setP] = React.useState([1,1]);
  React.useEffect(function (){
    let id = setTimeout(function (){
      new Promise(function (){
        setP([P[0] + 0.07,P[1] + 0.03]);
      });
    },100);
    return function (){
      clearTimeout(id);
    };
  });
  return (
    <box bg="black" width={80} content={donut_frame(P[0],P[1])}></box>);
}

var MODULE = {"donut_frame":donut_frame,"Donut":Donut};

export default MODULE