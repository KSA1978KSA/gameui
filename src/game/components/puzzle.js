import {Gradient} from "./gradient.js";
import "./puzzle.css";

function Puzzle ({rotateFunction, rotate, color, index}) {

    return (        
        <div className='puzzle'>
            {                
                    <div className={`puzzleDegree_${rotate}`}
                        
                    onMouseDown={(ev) => {                                     
                            rotateFunction (ev.button, index);
                        }
                    }
                    
                    onContextMenu={//--- отключаем контекстное меню при нажатии правой кнопкой мыши                
                        (ev) => {
                            ev.preventDefault();
                        }
                    }
                    >
                    {
                        <Gradient
                            puzzleColor={color}
                        />                                                    
                    }                    
                    </div>
            }
            </div>           
    )
}


export {Puzzle};