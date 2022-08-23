import React, {useState} from 'react';
import {Puzzle} from "./puzzle.js";
import * as all_style from "./all_style.js";



const stateModel = [
];


/*
    компонента для опыта
*/
function Game() {

    
    for (let i=0; i<25;i++) {
        stateModel.push (
            {
                rotate: 0,
                color: 0
            })
    }
    


    stateModel[0].color = 1;
    stateModel[1].color = 1;
    stateModel[5].color = 1;
    stateModel[6].color = 1;

    stateModel[3].color = 2;
    stateModel[8].color = 2;

    stateModel[4].color = 3;
    stateModel[9].color = 3;

    stateModel[12].color = 1;
    stateModel[13].color = 4;
    stateModel[14].color = 3;

    stateModel[15].color = 2;
    stateModel[16].color = 2;
    stateModel[17].color = 3;
    stateModel[18].color = 0;


    const [
        stateModel_hook, //--- объявляем через деструктуризацию переменную со статусом
        set_hook     //--- объявляем через деструктуризацию функцию через которую будет устанавливаться новое значение статуса
    ] = useState(stateModel);//-- useState это готовый Хук встроенный в React

    const refresh_all_model = function () {
        const stateModel_hook_new = [...stateModel_hook];//--- передавать нужно обязательно новый экземпляр!!!
        set_hook (stateModel_hook_new);
    }

    return (
        <all_style.root>
            { 

                stateModel_hook.map (puzzle => (
                    <Puzzle                
                        puzzle = {puzzle}
                        refresh_all_model = {refresh_all_model}                
                    />
                ))
            
            }
        </all_style.root>   
    )
}

export {Game};