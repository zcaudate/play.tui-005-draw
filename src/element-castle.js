import React from 'react'

// play.tui-005-draw.element-castle/Castle [11] 
function Castle(){
  return (
    <box
      left="center"
      bg="black"
      width={36}
      content={[
        "                |>>>",
        "                |",
        "            _  _|_  _",
        "           |;|_|;|_|;|",
        "           \\\\.    .  /",
        "            \\\\:  .  /",
        "             ||:   |",
        "             ||:.  |",
        "             ||:  .|",
        "             ||:   |       \\,/",
        "             ||: , |            /`\\",
        "             ||:   |",
        "             ||: . |",
        "            _||_   |",
        "    __ ----~    ~`---,              __",
        "--~'                  ~~----_____-~'"
      ].join("\n")}>
    </box>);
}

var MODULE = {"Castle":Castle};

export default MODULE