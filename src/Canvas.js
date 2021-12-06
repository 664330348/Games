import React from 'react';


function Canvas() {

    const Clear =()=>{
        let canvas   = document.getElementById("Canvas");
        let w = canvas.width, h=canvas.height;
        canvas.width = w;
        canvas.height = h;
    }

    const DrawTriangle =()=>{
        Clear();
        let canvas   = document.getElementById("Canvas");
        let ctx = canvas.getContext("2d");

        ctx.strokeStyle = "green"
        ctx.beginPath();
        ctx.moveTo(20,20);
        ctx.lineTo(200,20);
        ctx.lineTo(120,120);
        ctx.closePath();
        ctx.stroke();
    }

    const DrawRectangle =()=>{
        Clear();
        let canvas = document.getElementById("Canvas");
        let ctx = canvas.getContext("2d");

        ctx.strokeStyle = "blue"
        ctx.rect(50,50,200,80);
        ctx.stroke();
    }

    const DrawArc =()=>{
        Clear();
        let canvas = document.getElementById("Canvas");
        let ctx = canvas.getContext("2d");

        ctx.strokeStyle="red"
        ctx.beginPath()
        ctx.moveTo(50,50);
        ctx.lineTo(200,300);
        ctx.lineTo(120,300);
        ctx.closePath();
        ctx.stroke();
        ctx.strokeStyle = "green"
        ctx.beginPath();
        ctx.moveTo(50,50);
        ctx.arcTo(200,300,120,300,10*Math.PI);
        ctx.stroke();
    }

    const DrawCircle =()=>{
        Clear();
        let canvas = document.getElementById("Canvas");
        let ctx = canvas.getContext("2d");

        ctx.strokeStyle = "#9013FE"
        ctx.beginPath();
        ctx.arc(100,100,50,0,2*Math.PI);
        ctx.stroke();
    }


    const FillStyle =()=>{
        Clear();
        let canvas = document.getElementById("Canvas");
        let ctx = canvas.getContext("2d");

        for (var i=0;i<6;i++){
            for (var j=0;j<6;j++){
              ctx.fillStyle = 'rgb(' + Math.floor(255-42.5*i) + ',' + 
                               Math.floor(255-42.5*j) + ',0)';
              ctx.fillRect(j*50,i*50,50,50);
            }
        }
    }
    const CanvasGradient =()=>{
        Clear();
        let canvas = document.getElementById("Canvas");
        let ctx = canvas.getContext("2d");

        //createLinearGradient
        ctx.lineWidth = 8
        let gradientL = ctx.createLinearGradient(0,0,200,0);
        gradientL.addColorStop(0,"green");
        gradientL.addColorStop(1,"blue");
        ctx.fillStyle = gradientL;
        ctx.fillRect(10,10,200,100);

        //createRadialGradient
        let gradientR = ctx.createRadialGradient(100,250,100,100,250,0);
        gradientR.addColorStop(0,"white");
        gradientR.addColorStop(1,"green");
        ctx.fillStyle = gradientR;
        ctx.fillRect(0,150,200,200);
    }
    
  return (
    <div >
    <div>
    <button onClick={Clear}>Clear</button>
    <button onClick={DrawTriangle}>DrawTriangle</button>
    <button onClick={DrawRectangle}>DrawRectangle</button>
    <button onClick={DrawArc}>DrawArc</button>
    <button onClick={DrawCircle}>DrawCircle</button>
    </div>
    <div>
    <button onClick={FillStyle}>FillStyle</button>
    <button onClick={CanvasGradient}>CanvasGradient</button>
    </div>
     <canvas
        id="Canvas"
        tabIndex="0"
        width="500"
        height="500"
        style={{ border: "2px solid" }}
      ></canvas>
    </div>
  );
}

export default Canvas;