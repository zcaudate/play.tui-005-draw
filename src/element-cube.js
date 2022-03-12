import glMatrix,{mat4,vec3} from 'gl-matrix'

import * as ValtioCore from 'valtio/vanilla'

import * as ValtioUtils from 'valtio/utils'

import React from 'react'

import Drawille from 'drawille'

import Bresenham from 'bresenham'

import v from './js/valtio'

import r from './js/react'

// play.tui-005-draw.element-cube/points [18] 
var points = [
  [-1,-1,-1],
  [-1,-1,1],
  [1,-1,1],
  [1,-1,-1],
  [-1,1,-1],
  [-1,1,1],
  [1,1,1],
  [1,1,-1]
];

// play.tui-005-draw.element-cube/quads [28] 
var quads = [[0,1,2,3],[0,4,5,1],[1,5,6,2],[2,6,7,3],[3,7,4,0],[4,7,6,5]];

// play.tui-005-draw.element-cube/cube [36] 
var cube = quads.map(function (quad){
  return quad.map(function (v){
    return vec3.fromValues.apply(null,points[v]);
  });
});

// play.tui-005-draw.element-cube/drawTransform [42] 
function drawTransform(out,a,m){
  let x = a[0];
  let y = a[1];
  let z = a[2];
  let w = (m[3] * x) + (m[7] * y) + (m[11] * z) + m[15];
  w = (w || 1.0);
  out[0] = (((m[0] * x) + (m[4] * y) + (m[8] * z) + m[12]) / w);
  out[1] = (((m[1] * x) + (m[5] * y) + (m[9] * z) + m[13]) / w);
  out[2] = (((m[2] * x) + (m[6] * y) + (m[10] * z) + m[14]) / w);
  return out;
}

// play.tui-005-draw.element-cube/projection [72] 
var projection = function (){
  let proj = mat4.create();
  mat4.perspective(proj,Math.PI / 3,1,1,1000);
  return proj;
}();

// play.tui-005-draw.element-cube/drawCube [78] 
function drawCube(c,p){
  c.clear();
  let t = Date.now();
  let view = mat4.create();
  mat4.lookAt(
    view,
    vec3.fromValues(p["a00"],p["a01"],p["a02"]),
    vec3.fromValues(p["a10"],p["a11"],p["a12"]),
    vec3.fromValues(p["a20"],p["a21"],p["a22"])
  );
  mat4.rotateX(view,view,(Math.PI * 2 * t) / 9000);
  let transformed = cube.map(function (quad){
    return quad.map(function (v){
      let m = mat4.create();
      let out = vec3.create();
      mat4.mul(m,projection,view);
      drawTransform(out,v,m);
      return {
        "x":Math.floor((out[0] * 40) + 80),
        "y":Math.floor((out[1] * 40) + 80)
      };
    });
  });
  transformed.forEach(function (quad){
    quad.forEach(function (v,i){
      let n = quad[(i + 1) % 4];
      Bresenham(v.x,v.y,n.x,n.y,c.set.bind(c));
    });
  });
  return c.frame();
}

// play.tui-005-draw.element-cube/CubeParams [117] 
globalThis["play_tui_005_draw_element_cube$$CubeParams"] = v.make({
  "paused":false,
  "a02":1.2,
  "a01":1.3,
  "a00":-2,
  "a10":0,
  "a20":0.1,
  "a12":0.1,
  "a11":0,
  "a22":0.5,
  "a21":0.1
});

// play.tui-005-draw.element-cube/CubePanel [130] 
function CubePanel(){
  let [view,setView] = React.useState();
  let canvas = React.useCallback(new Drawille(160,160),[]);
  let [params] = v.useProxy(globalThis["play_tui_005_draw_element_cube$$CubeParams"]);
  let {paused} = params;
  let isMounted = r.useIsMounted();
  r.useStep(function (setDone){
    setView(drawCube(canvas,params));
    setDone(true);
  });
  r.useInterval(function (){
    if(!paused && isMounted()){
      setView(drawCube(canvas,params));
    }
  },100);
  return (
    <box bg="black" top={0} content={view}></box>);
}

var MODULE = {
  "points":points,
  "quads":quads,
  "cube":cube,
  "drawTransform":drawTransform,
  "projection":projection,
  "drawCube":drawCube,
  "CubePanel":CubePanel
};

export default MODULE