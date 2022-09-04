import {Gradient} from "./gradient.tsx";
import "./puzzle.css";

//--- объявляем типы данных передаваемые в компоненту
type propPuzzle = {
    rotateFunction(mouseButton: number, index: number) : any, 
    rotate : number, 
    color : number, 
    index : number
};


function Puzzle ({rotateFunction, rotate, color, index} : propPuzzle) {

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