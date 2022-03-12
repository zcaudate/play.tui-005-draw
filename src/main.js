import React from 'react'

import chalk from 'chalk'

import clock from './element-clock'

import castle from './element-castle'

import qr from './element-qr'

import layout from './js/blessed/layout'

import b from './js/blessed'

import cube from './element-cube'

import donut from './element-donut'

// play.tui-005-draw.main/ScratchItems [19] 
var ScratchItems = [
  {"label":"Castle","name":"castle","view":castle.Castle},
  {"label":"Clock","name":"clock","view":clock.ClockPanel},
  {"label":"Cube","name":"cube","view":cube.CubePanel},
  {"label":"Donut","name":"donut","view":donut.Donut},
  {"label":"QR","name":"qr","view":qr.QRCodePanel}
];

// play.tui-005-draw.main/App [26] 
function App(){
  return (
    <layout.LayoutMain
      init="starter"
      header={{"menu":[{"index":"f1","route":"scratch","label":"Scratch"}]}}
      sections={{"starter":{"label":"Scratch","items":ScratchItems}}}>
    </layout.LayoutMain>);
}

// play.tui-005-draw.main/__init__ [37] 
// 5c0c4b70-8787-4512-99f9-3712d8633186
b.run((
  <App></App>),"Js Blessed Scratch Demo");