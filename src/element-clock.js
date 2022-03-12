import React from 'react'

import Drawille from 'drawille'

import Bresenham from 'bresenham'

import r from './js/react'

// play.tui-005-draw.element-clock/drawClock [13] 
function drawClock(c){
  c.clear();
  let t = new Date();
  let sin = function (i,l){
    return Math.floor(80 + (l * Math.sin(i * 2 * Math.PI)));
  };
  let cos = function (i,l){
    return Math.floor(80 + (l * Math.cos(i * 2 * Math.PI)));
  };
  Bresenham(
    80,
    80,
    sin(t.getHours() / 24,30),
    160 - cos(t.getHours() / 24,30),
    c.set.bind(c)
  );
  Bresenham(
    80,
    80,
    sin(t.getMinutes() / 60,50),
    160 - cos(t.getMinutes() / 1,50),
    c.set.bind(c)
  );
  Bresenham(
    80,
    80,
    sin((t.getSeconds() / 60) + ((t % 1000) / 60000),75),
    160 - cos((t.getSeconds() / 60) + ((t % 1000) / 60000),75),
    c.set.bind(c)
  );
  return c.frame();
}

// play.tui-005-draw.element-clock/ClockPanel [52] 
function ClockPanel(){
  let [view,setView] = React.useState();
  let canvas = React.useCallback(new Drawille(160,160),[]);
  let isMounted = r.useIsMounted();
  r.useInterval(function (){
    if(isMounted()){
      setView(drawClock(canvas));
    }
  },100);
  return (
    <box bg="black" width={80} left="center" content={view}></box>);
}

var MODULE = {"drawClock":drawClock,"ClockPanel":ClockPanel};

export default MODULE