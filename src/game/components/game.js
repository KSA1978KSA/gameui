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


//--- Генератор случайных чисел в диапазон 0-max
function getRandomInt(max, exclude) {
    let ret = Math.floor(Math.random() * max);

    if (exclude.includes(ret)) {//--- если полученное значение есть в исключениях, то повторно вызываем
        ret = getRandomInt(max,exclude);
    }

    return ret;
  }



  //--- получить не совместимые с указанным цвета
  //--- hElement: предыдущий элемент по горизонтали
  //--- vElement: предыдущий элемент по вертикали
function getExcludeGradientColors (hElement, vElement) {
    
    if (vElement==="") {
        if (hElement!=="") {
            if ((hElement.rotate===45) || 
            (hElement.rotate===45 + 90 + 90 + 90)){//--- работает правый цвет в градиенте
                if (hElement.color===0 || hElement.color===2) {
                    return {
                        excludeColors : [1 , 3], //--- исключенные градиенты
                        rotateNextColor : (hElement.rotate===45) ? (45 + 90) : (45 + 90 + 90) //--- стартовый угол примыкающего справа градиента
                    };
                }; 
                if (hElement.color===1 || hElement.color===3) {
                    return {
                        excludeColors : [0 , 2], //--- исключенные градиенты
                        rotateNextColor : (hElement.rotate===45) ? (45 + 90) : (45 + 90 + 90) //--- стартовый угол примыкающего справа градиента
                    };
                };            
            }



            if ((hElement.rotate===45 + 90) || 
            (hElement.rotate===45 + 90 + 90)) {//--- работает левый цвет в градиенте
                if (hElement.color===0 || hElement.color===1) {                
                    return {
                        excludeColors : [2 , 3], //--- исключенные градиенты
                        rotateNextColor : (hElement.rotate===(45 + 90)) ? (45): (45 + 90 + 90 + 90) //--- стартовый угол примыкающего справа градиента
                    };
                }; 
                if (hElement.color===2 || hElement.color===3) {                
                    return {
                        excludeColors : [0 , 1], //--- исключенные градиенты
                        rotateNextColor : (hElement.rotate===(45 + 90)) ? (45): (45 + 90 + 90 + 90) //--- стартовый угол примыкающего справа градиента
                    };
                };             
            }  
        }        
    }
    else {
        

        if (hElement==="") {//--- если это первый элемент в строке
            if ((vElement.rotate===45) || 
            (vElement.rotate===45 + 90)){//--- работает правый цвет в градиенте 
                if (vElement.color===0 || vElement.color===2) {
                    return {
                        excludeColors : [1 , 3], //--- исключенные градиенты
                        rotateNextColor : 45 + 90 + 90 + 90 //--- стартовый угол примыкающего справа градиента
                    };
                }; 
                if (vElement.color===1 || vElement.color===3) {
                    return {
                        excludeColors : [0 , 2], //--- исключенные градиенты
                        rotateNextColor : 45 + 90 + 90 + 90 //--- стартовый угол примыкающего справа градиента
                    };
                };   
            } 

            if ((vElement.rotate===45 + 90 + 90) || 
            (vElement.rotate===45 + 90 + 90 + 90)){//--- работает левый цвет в градиенте 
                if (vElement.color===0 || vElement.color===1) {
                    return {
                        excludeColors : [2 , 3], //--- исключенные градиенты
                        rotateNextColor : 45  //--- стартовый угол примыкающего справа градиента
                    };
                }; 
                if (vElement.color===2 || vElement.color===3) {
                    return {
                        excludeColors : [0 , 1], //--- исключенные градиенты
                        rotateNextColor : 45  //--- стартовый угол примыкающего справа градиента
                    };
                };   
            } 
                        
        }
        

        if (hElement!=="") {//--- если слева есть элемент

            let vExclude = [];
            if ((vElement.rotate===45) || 
                (vElement.rotate===45 + 90)){//--- работает правый цвет в градиенте 
                if (vElement.color===0 || vElement.color===2) {
                    vExclude = [1 , 3]; //--- исключенные градиенты                        
                }; 
                if (vElement.color===1 || vElement.color===3) {
                    vExclude = [0 , 2]; //--- исключенные градиенты                        
                };   
            } 

            if ((vElement.rotate===45 + 90 + 90) || 
                (vElement.rotate===45 + 90 + 90 + 90)){//--- работает левый цвет в градиенте 
                if (vElement.color===0 || vElement.color===1) {
                    vExclude = [2 , 3]; //--- исключенные градиенты                            
                }; 
                if (vElement.color===2 || vElement.color===3) {
                    vExclude = [0 , 1]; //--- исключенные градиенты                            
                };
            };   
             

            if ((hElement.rotate===45) || 
            (hElement.rotate===45 + 90 + 90 + 90)){//--- работает правый цвет в градиенте             
                   
                if (hElement.color===0 || hElement.color===2) {
                    return {
                        excludeColors : [1 , 3, ...vExclude], //--- исключенные градиенты
                        rotateNextColor : (hElement.rotate===45) ? (45 + 90) : (45 + 90 + 90) //--- стартовый угол примыкающего справа градиента
                    };
                }; 


                if (hElement.color===1 || hElement.color===3) {
                    return {
                        excludeColors : [0 , 2, ...vExclude], //--- исключенные градиенты
                        rotateNextColor : (hElement.rotate===45) ? (45 + 90) : (45 + 90 + 90) //--- стартовый угол примыкающего справа градиента
                    };
                };            
            }



            if ((hElement.rotate===45 + 90) || 
            (hElement.rotate===45 + 90 + 90)) {//--- работает левый цвет в градиенте                
                
                if (hElement.color===0 || hElement.color===1) {                      
                    return {
                        excludeColors : [2 , 3, ...vExclude], //--- исключенные градиенты
                        rotateNextColor : (hElement.rotate===(45 + 90)) ? (45): (45 + 90 + 90 + 90) //--- стартовый угол примыкающего справа градиента
                    };                                                 
                }; 

                if (hElement.color===2 || hElement.color===3) {                     
                    return {
                        excludeColors : [0 , 1, ...vExclude], //--- исключенные градиенты
                        rotateNextColor : (hElement.rotate===(45 + 90)) ? (45): (45 + 90 + 90 + 90) //--- стартовый угол примыкающего справа градиента
                    };                       
                };             
            }  
        }
    }
}


/*    
    Компонента с игровой логикой
*/
function Game() {

    //--------------------------------
    //--- блок генерации уровня
    //--------------------------------    

    //--- первый ряд
    stateModel_Level1[0].color = getRandomInt(4,[]);
    stateModel_Level1[0].rotate = 45;//--- стартовый поворот

    let nextElement = getExcludeGradientColors(stateModel_Level1[0], "");
    stateModel_Level1[1].rotate = nextElement.rotateNextColor;
    stateModel_Level1[1].color = getRandomInt(4, nextElement.excludeColors);
    
    nextElement = getExcludeGradientColors(stateModel_Level1[1], "");
    stateModel_Level1[2].rotate = nextElement.rotateNextColor;
    stateModel_Level1[2].color = getRandomInt(4, nextElement.excludeColors);

    nextElement = getExcludeGradientColors(stateModel_Level1[2], "");
    stateModel_Level1[3].rotate = nextElement.rotateNextColor;
    stateModel_Level1[3].color = getRandomInt(4, nextElement.excludeColors);

    nextElement = getExcludeGradientColors(stateModel_Level1[3], "");
    stateModel_Level1[4].rotate = nextElement.rotateNextColor;
    stateModel_Level1[4].color = getRandomInt(4, nextElement.excludeColors);

    let hIndex = 0;
    let vIndex = 0;

    for (let step=1;step<5;step++) {
        nextElement = getExcludeGradientColors("", stateModel_Level1[(step - 1) * 5 + 0]);
        stateModel_Level1[step * 5 + 0].rotate = nextElement.rotateNextColor;
        stateModel_Level1[step * 5 + 0].color = getRandomInt(4, nextElement.excludeColors);

        nextElement = getExcludeGradientColors(stateModel_Level1[step * 5 + 0], stateModel_Level1[(step - 1) * 5 + 1]);
        stateModel_Level1[step * 5 + 1].rotate = nextElement.rotateNextColor;
        stateModel_Level1[step * 5 + 1].color = getRandomInt(4, nextElement.excludeColors);

        nextElement = getExcludeGradientColors(stateModel_Level1[step * 5 + 1], stateModel_Level1[(step - 1) * 5 + 2]);
        stateModel_Level1[step * 5 + 2].rotate = nextElement.rotateNextColor;
        stateModel_Level1[step * 5 + 2].color = getRandomInt(4, nextElement.excludeColors);

        nextElement = getExcludeGradientColors(stateModel_Level1[step * 5 + 2], stateModel_Level1[(step - 1) * 5 + 3]);
        stateModel_Level1[step * 5 + 3].rotate = nextElement.rotateNextColor;
        stateModel_Level1[step * 5 + 3].color = getRandomInt(4, nextElement.excludeColors);

        nextElement = getExcludeGradientColors(stateModel_Level1[step * 5 + 3], stateModel_Level1[(step - 1) * 5 + 4]);
        stateModel_Level1[step * 5 + 4].rotate = nextElement.rotateNextColor;
        stateModel_Level1[step * 5 + 4].color = getRandomInt(4, nextElement.excludeColors);
    }

    /*
    nextElement = getExcludeGradientColors("", stateModel_Level1[5]);
    stateModel_Level1[10].rotate = nextElement.rotateNextColor;
    stateModel_Level1[10].color = getRandomInt(4, nextElement.excludeColors);
*/

    /*
    //--- второй ряд
    nextElement = getExcludeGradientColors("", stateModel_Level1[0]);
    stateModel_Level1[5].rotate = nextElement.rotateNextColor;
    stateModel_Level1[5].color = getRandomInt(4, nextElement.excludeColors);

    nextElement = getExcludeGradientColors(stateModel_Level1[5], stateModel_Level1[1]);
    stateModel_Level1[6].rotate = nextElement.rotateNextColor;
    stateModel_Level1[6].color = getRandomInt(4, nextElement.excludeColors);

    nextElement = getExcludeGradientColors(stateModel_Level1[6], stateModel_Level1[2]);
    stateModel_Level1[7].rotate = nextElement.rotateNextColor;
    stateModel_Level1[7].color = getRandomInt(4, nextElement.excludeColors);

    nextElement = getExcludeGradientColors(stateModel_Level1[7], stateModel_Level1[3]);
    stateModel_Level1[8].rotate = nextElement.rotateNextColor;
    stateModel_Level1[8].color = getRandomInt(4, nextElement.excludeColors);

    nextElement = getExcludeGradientColors(stateModel_Level1[8], stateModel_Level1[4]);
    stateModel_Level1[9].rotate = nextElement.rotateNextColor;
    stateModel_Level1[9].color = getRandomInt(4, nextElement.excludeColors);
*/
    //--------------------------------



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