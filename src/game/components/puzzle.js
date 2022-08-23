import "./puzzle.css";
import {Gradient} from "./gradient.js";


function Puzzle ({puzzle, refresh_all_model}) {

    return (        
        <div className='puzzle'>
            {                
                    <div className={'puzzleDegree_' + puzzle.rotate}
                        
                    onMouseDown={(ev) => {     
                                 
                            if (ev.button===0) //---- левая кнопка мыши 
                            {               
                                puzzle.rotate = puzzle.rotate + 45;   
                                if (puzzle.rotate===360) {
                                    puzzle.rotate = 0;
                                }                                                     
                                refresh_all_model(); 
                            };
                            
                            if (ev.button===2)  //---- правая кнопка мыши  
                            {               
                                puzzle.rotate = puzzle.rotate - 45;   
                                if (puzzle.rotate===-45) {
                                    puzzle.rotate = 315;
                                }                                                     
                                refresh_all_model(); 
                            }   
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
                            puzzleColor={puzzle.color}
                        />                                                    
                    }                    
                    </div>
            }
            </div>           
    )
}


export {Puzzle};