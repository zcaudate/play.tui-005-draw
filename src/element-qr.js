import qr from 'qrcode-terminal'

import React from 'react'

// play.tui-005-draw.element-qr/QRCodePanel [12] 
function QRCodePanel(){
  let [view,setView] = React.useState("-");
  let len = view.split(/\n/)[0].length;
  let tb = React.useRef();
  React.useEffect(function (){
    if("-" == view){
      tb.current.value = "https://www.google.com";
      qr.generate("https://www.google.com",function (code){
        setView(code);
      });
    }
  });
  return (
    <box>
      <textbox
        inputOnFocus={true}
        align="center"
        ref={tb}
        top={1}
        onSubmit={function (){
          qr.generate(tb.current.value,function (code){
            setView(code);
          });
        }}
        width={80}
        mouse={true}
        style={{"bg":"gray"}}
        keys={true}
        height={1}
        left="center">
      </textbox>
      <box top={3} width={len / 5} left="center" content={view}></box>
    </box>);
}

var MODULE = {"QRCodePanel":QRCodePanel};

export default MODULE