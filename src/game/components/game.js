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
    {rotate: 135, color: 4},
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


/*    компонента для опыта
*/
function Game() {

    //---- инициализируем первый уровень 
    stateModel = stateModel_Level1.map (el => (
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
        //console.log(stateModel_hook_new);

        
        //--- тут делаем проверку на завершение уровня
        if (JSON.stringify(stateModel_hook)===JSON.stringify(stateModel_Level1)) {
            alert("Ура! Вы успешно собрали мозаику!!!");
        }
    }

    return (
        <all_style.rootPano>
        <div className='leftPanel'>
            <div className='leftPanel__topPanel'>
                <button className='buttonClear'
                    onClick={() => {
                        for (let i=0;i<stateModel_hook.length;i++) {                            
                            stateModel_hook[i].rotate = stateModel_Level1[i].rotate;                           
                        };
                        refresh_all_model();                         
                    }   
                }
                >Сбросить</button>

                <button className='buttonStart'
                    onClick={() => {
                        for (let i=0;i<stateModel_hook.length;i++) {
                            stateModel_hook[i].rotate = 0;                           
                        };
                        refresh_all_model();                         
                    }   
                }
                >Старт</button>
            </div>
        </div>
        <div className='centerPanel'>
        <all_style.gamePano>
            { 
                stateModel_hook.map (puzzle => (
                    <Puzzle                
                        puzzle = {puzzle}
                        refresh_all_model = {refresh_all_model}                
                    />
                ))
            
            }
        </all_style.gamePano>  
        </div>
        <div className='rightPanel'></div>
        </all_style.rootPano> 
    )
}

export {Game};