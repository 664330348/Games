import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPuzzle, handleInit, handleClick } from "./PuzzleSlice";
import "./Puzzle.css"

let imgGame = new Image();

export default function Puzzle() {
    const dispatch = useDispatch();
    const [clickGame, setClickGame] = useState(true);
    const [imageUrl, setimageUrl] = useState(null);
    const [dw, setDw] = useState(null);
    const [click, setClick] = useState(false);
    const [Imageurl, Array_, History] = useSelector(selectPuzzle);

    //choose image
    const handleEditImg =(e)=>{
            e.preventDefault();

            let canvas = document.getElementById("canvasDisplay");
            let context=canvas.getContext("2d");

            //display input image
            const fileReader = new FileReader();
            fileReader.onload=function (event){
                imgGame.src = event.target.result;
                setimageUrl(event.target.result);

                imgGame.onload=function(e) {
                    context.drawImage(imgGame, 0,0, canvas.width,canvas.height)
                } 
            }
            if (e.target.files[0]){
                fileReader.readAsDataURL(e.target.files[0])
            }
    }   

    //start game
    const StartGame =()=>{
        if ( imageUrl!== null && clickGame){
            setClickGame(false)
            setClick(false);

            let myselect = document.getElementById("Select");
            let selectIndex = myselect.selectedIndex;
            let difficulty = myselect.options[selectIndex].value;
           
            dispatch(handleInit({Imageurl:imageUrl, difficulty:difficulty}))
            
            setTimeout(()=>{
                document.getElementById("displayImg").click();
            },200)
           
            setTimeout(()=>{
                setClickGame(true);
                setClick(true);
            },250)
        }
    }

    const RunGamebyMouse =(e)=>{
        if (click === true){
            setClick(false);

            let canvas = document.getElementById("canvasGame");
            const canvasInfo = canvas.getBoundingClientRect();
            let col = Math.floor((e.clientX - canvasInfo.left) / dw); //column
            let row = Math.floor((e.clientY - canvasInfo.top) / dw); //row
            
            dispatch(handleClick({row:row, col:col}))

            setTimeout(()=>{
                document.getElementById("swapImg").click();
            },150)
            setTimeout(()=>{
                setClick(true);
            },160)
        }
    }

    const DisplayImg=()=>{
        let size_ = {Easy: 3, Normal: 4, Hard:5}
        let myselect = document.getElementById("Select");
        let selectIndex = myselect.selectedIndex;
        let difficulty = myselect.options[selectIndex].value;
        let canvas = document.getElementById("canvasGame");
        let context=canvas.getContext("2d");
        let w = canvas.width, h=canvas.height;
        canvas.width = w;
        canvas.height = h;

        imgGame.src = Imageurl;
        
        imgGame.onload=function() {
            let array = Array_;
            let size = size_[difficulty]
            let dw = canvas.width/size;
            setDw(dw);
            let imgW = imgGame.width/size;
            let imgH = imgGame.height/size;
            for(let i=0; i<size; i++){
                for (let j=0; j<size; j++){
                    if (array[i][j].c !== size-1 || array[i][j].r !== size-1)
                        context.drawImage(imgGame, 
                            array[i][j].c * imgW, array[i][j].r * imgH, imgW-2, imgH-2,
                            j*dw+1, i*dw+1,  dw-2, dw-2)
                }
            }
        }  
    }

    const Swap=()=>{
        //[{r:clearY, c:clearX}, {r:drawY, c:drawX},{r:imgY, c:imgX}]

        if(History.length>0){
            let canvas = document.getElementById("canvasGame");
            let context=canvas.getContext("2d");
            let size = Array_.length;
            let imgW = imgGame.width/size;
            let imgH = imgGame.height/size;

            let Swap_ = History[History.length-1];
            
            context.clearRect (Swap_[0].c * dw ,Swap_[0].r * dw, dw, dw);
            context.drawImage(imgGame, 
                Swap_[2].c * imgW, Swap_[2].r * imgH, imgW-2, imgH-2,
                Swap_[1].c*dw+1, Swap_[1].r*dw+1,  dw-2, dw-2);
        }
        

    }

    return (
        <div className="Puzzle">
        <h3>Puzzle</h3> 
        
        <button onClick={DisplayImg} id="displayImg" className="btn btn-outline-primary btn-sm" style={{ display: "none" }}>Test</button>
        <button onClick={Swap} id="swapImg" className="btn btn-outline-primary btn-sm" style={{ display: "none" }}>Swap</button>

        <div className="PuzzleContent">
            <div className="PuzzleLeft">
                <div className="PuzzleLeftButton">
                    <select id="Select" className="form-select form-select-sm" 
                        style={{width:"90px",fontSize:"12px",color:"blue", backgroundColor:"#e5edfa", borderColor:"#458ffd"}}>
                        <option value="Easy"> Easy </option>
                        <option value="Normal"> Normal </option>
                        <option value="Hard"> Hard </option>
                    </select>
                    <label htmlFor="inputImg" type="button" className="btn btn-outline-primary btn-sm" >Choose Image</label>
                    {/* <button onClick={Clear}>Clear</button>
                    <button onClick={Display}>Display</button> */}
                    <input type="file" id="inputImg" accept="image/*" onChange={handleEditImg}/> <br/> 
                </div>

                <div className="PuzzleLeftCanvas">
                    <canvas id="canvasDisplay" width="180" height="180" style={{ border: "2px solid" }}> A drawing of something </canvas>
                </div>

                <div className="PuzzleLeftButton">
                   <button onClick={StartGame}  className="btn btn-outline-primary btn-sm">Start Game</button>
                </div>

            </div>  
            <div className="PuzzleRight">
                 <canvas id="canvasGame" width="300" height="300" 
                 style={{ border: "2px solid",}} onClick={RunGamebyMouse}> A drawing of something </canvas>
            </div>
                    
        </div>
       
        </div>
    );
}