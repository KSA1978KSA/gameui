import React, {useState} from 'react';
import {Puzzle} from "./puzzle.js";
import * as all_style from "./all_style.js";


const stateModel_Level1 = [
    {rotate: 45, color: 1},
    {rotate: 135, color: 1},
    {rotate: 45, color: 0},
    {rotate: 135, color: 2},
    {rotate: 45, color: 3},
    {rotate: 315, color: 1},
    {rotate: 225, color: 1},
    {rotate: 315, color: 0},
    {rotate: 225, color: 2},
    {rotate: 315, color: 3},
    {rotate: 45, color: 0},
    {rotate: 135, color: 0},
    {rotate: 45, color: 1},
    {rotate: 135, color: 3},
    {rotate: 45, color: 3},
    {rotate: 315, color: 2},
    {rotate: 225, color: 2},
    {rotate: 315, color: 3},
    {rotate: 225, color: 3},
    {rotate: 315, color: 3},
    {rotate: 45, color: 2},
    {rotate: 135, color: 2},
    {rotate: 45, color: 3},
    {rotate: 135, color: 3},
    {rotate: 45, color: 3}
];

let stateModel=[];
let timerFunction;


/*    
    Компонента с игровой логикой
*/
function Game() {

    //---- инициализируем первый уровень 
    stateModel = stateModel_Level1.map ((el) => (
        {
            rotate : el.rotate,
            color: el.color
        }
    ));//---- инициализируем первый уровень        



    const [
        stateModel_hook, //--- объявляем через деструктуризацию переменную со статусом
        set_hook     //--- объявляем через деструктуризацию функцию через которую будет устанавливаться новое значение статуса
    ] = useState(stateModel);//-- useState это готовый Хук встроенный в React

    const refresh_all_model = function () {
        const stateModel_hook_new = [...stateModel_hook];//--- передавать нужно обязательно новый экземпляр!!!
        set_hook (stateModel_hook_new);  
    }


    //---- функция обратного вызова из дочерних компонент-puzzle
    let rotateFunction = (mouseButton, index)=>{

        let puzzle = stateModel_hook[index];

        if (mouseButton===0) //---- левая кнопка мыши 
        {               
            puzzle.rotate += 45;   
            if (puzzle.rotate===360) {
                puzzle.rotate = 0;
            }                                                     
            refresh_all_model(); 
        };
        
        if (mouseButton===2)  //---- правая кнопка мыши  
        {               
            puzzle.rotate -= 45;   
            if (puzzle.rotate===-45) {
                puzzle.rotate = 315;
            }                                                     
            refresh_all_model(); 
        }   
    }

    return (
        <all_style.rootPano>
            <all_style.rootPano__leftPanel>
                <all_style.rootPano__leftPanel_topPanel>            
                    <button className='buttonClear'
                        onClick={() => {
                            for (let i=0;i<stateModel_hook.length;i++) {                            
                                stateModel_hook[i].rotate = stateModel_Level1[i].rotate;                           
                            };
                            refresh_all_model();   
                            clearInterval(timerFunction);
                        }   
                    }
                    >Сбросить</button>

                    <button className='buttonStart'
                        onClick={() => {
                            for (let i=0;i<stateModel_hook.length;i++) {
                                stateModel_hook[i].rotate = 0;                           
                            };
                            refresh_all_model(); 
                            timerFunction = setInterval(() => {
                                //--- тут делаем проверку на завершение уровня
                                if (JSON.stringify(stateModel_hook)===JSON.stringify(stateModel_Level1)) {
                                    alert("Ура! Вы успешно собрали мозаику!!!");
                                    clearInterval(timerFunction);
                                }
                            }
                            , 1000);                        
                        }   
                    }
                    >Старт</button>
                </all_style.rootPano__leftPanel_topPanel>
            </all_style.rootPano__leftPanel>

            <all_style.rootPano__centerPanel>
                <all_style.gamePano>
                    { 
                        stateModel_hook.map ((puzzle,index) => (
                            <Puzzle 
                                key={index} //--- ключ нужен для избежания ошибки "Each Child in a List Should Have a Unique 'key' Prop"
                                rotateFunction = {rotateFunction}   
                                rotate={puzzle.rotate}   
                                color={puzzle.color}
                                index={index}                                
                            />
                        ))
                    
                    }
                </all_style.gamePano>  
            </all_style.rootPano__centerPanel>

            <all_style.rootPano__rightPanel />
        </all_style.rootPano> 
    )
}

export {Game};