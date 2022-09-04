import {useState} from 'react';
import {Puzzle} from "./puzzle.tsx";
import * as all_style from "./all_style.js";
import "./runstring.css";

//-------------------------------------
//--- блок локальный переменных
//-------------------------------------
const stateModel_Level = [
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
let timerGame:{};
let timerGenerateGame:{};
let startGame = false;//--- флаг старта игры
//-------------------------------------

//--- Генератор случайных чисел в диапазон 0-max
function getRandomInt(max: number, exclude:number[]) {
    let ret: number = Math.floor(Math.random() * max);

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




//--------------------------------
//--- Функция генерации уровня
//-------------------------------- 
function GenerateLevelGame(stateModel_hook) {  

    //--- первый ряд
    stateModel_Level[0].color = getRandomInt(4,[]);
    stateModel_Level[0].rotate = 45;//--- стартовый поворот

    let nextElement = getExcludeGradientColors(stateModel_Level[0], "");
    stateModel_Level[1].rotate = nextElement.rotateNextColor;
    stateModel_Level[1].color = getRandomInt(4, nextElement.excludeColors);
    
    nextElement = getExcludeGradientColors(stateModel_Level[1], "");
    stateModel_Level[2].rotate = nextElement.rotateNextColor;
    stateModel_Level[2].color = getRandomInt(4, nextElement.excludeColors);

    nextElement = getExcludeGradientColors(stateModel_Level[2], "");
    stateModel_Level[3].rotate = nextElement.rotateNextColor;
    stateModel_Level[3].color = getRandomInt(4, nextElement.excludeColors);

    nextElement = getExcludeGradientColors(stateModel_Level[3], "");
    stateModel_Level[4].rotate = nextElement.rotateNextColor;
    stateModel_Level[4].color = getRandomInt(4, nextElement.excludeColors);

    //--- последующие ряды
    for (let step=1;step<5;step++) {
        nextElement = getExcludeGradientColors("", stateModel_Level[(step - 1) * 5 + 0]);
        stateModel_Level[step * 5 + 0].rotate = nextElement.rotateNextColor;
        stateModel_Level[step * 5 + 0].color = getRandomInt(4, nextElement.excludeColors);

        nextElement = getExcludeGradientColors(stateModel_Level[step * 5 + 0], stateModel_Level[(step - 1) * 5 + 1]);
        stateModel_Level[step * 5 + 1].rotate = nextElement.rotateNextColor;
        stateModel_Level[step * 5 + 1].color = getRandomInt(4, nextElement.excludeColors);

        nextElement = getExcludeGradientColors(stateModel_Level[step * 5 + 1], stateModel_Level[(step - 1) * 5 + 2]);
        stateModel_Level[step * 5 + 2].rotate = nextElement.rotateNextColor;
        stateModel_Level[step * 5 + 2].color = getRandomInt(4, nextElement.excludeColors);

        nextElement = getExcludeGradientColors(stateModel_Level[step * 5 + 2], stateModel_Level[(step - 1) * 5 + 3]);
        stateModel_Level[step * 5 + 3].rotate = nextElement.rotateNextColor;
        stateModel_Level[step * 5 + 3].color = getRandomInt(4, nextElement.excludeColors);

        nextElement = getExcludeGradientColors(stateModel_Level[step * 5 + 3], stateModel_Level[(step - 1) * 5 + 4]);
        stateModel_Level[step * 5 + 4].rotate = nextElement.rotateNextColor;
        stateModel_Level[step * 5 + 4].color = getRandomInt(4, nextElement.excludeColors);
    }

    //--- переносим в статусную модель в хуке
    for (let index = 0;index<stateModel_Level.length;index++) {
        stateModel_hook[index].rotate = stateModel_Level[index].rotate;
        stateModel_hook[index].color = stateModel_Level[index].color;
    }    
    
}


/*    
    Компонента с игровой логикой
*/
function Game() {
    

    //---- инициализируем уровень 
    stateModel = stateModel_Level.map ((el) => (
        {
            rotate : el.rotate,
            color: el.color
        }
    ));//---- инициализируем уровень   

    

    const [
        stateModel_hook, //--- объявляем через деструктуризацию переменную со статусом
        set_hook     //--- объявляем через деструктуризацию функцию через которую будет устанавливаться новое значение статуса
    ] = useState(stateModel);//-- useState это готовый Хук встроенный в React

    const refresh_all_model = function () {
        const stateModel_hook_new = [...stateModel_hook];//--- передавать нужно обязательно новый экземпляр!!!
        set_hook (stateModel_hook_new);         
    }

    
    //--- так как вызов Game() происходит после каждой перерисовки (render)
    //--- то нужно деактивировать таймер и заново активировать
    clearInterval(timerGenerateGame);//--- останавливаем таймер игры


    if (startGame===false) {  
        clearInterval(timerGame);//--- останавливаем таймер игры

        timerGenerateGame = setInterval(() => {
            //--- тут мы красиво генерим уровни  
            GenerateLevelGame(stateModel_hook);                                                 
            refresh_all_model();      
        }
        , 500);
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
                            startGame = false;

                            for (let i=0;i<stateModel_hook.length;i++) {                            
                                stateModel_hook[i].rotate = stateModel_Level[i].rotate;                           
                            };
                            refresh_all_model();                               
                        }   
                    }
                    >Сбросить</button>

                    <button className='buttonStart'
                        onClick={() => {
                            startGame = true;

                            clearInterval(timerGenerateGame);//--- останавливаем таймер генерации уровней игры

                            for (let i=0;i<stateModel_hook.length;i++) {
                                stateModel_hook[i].rotate = 0;                           
                            };
                            refresh_all_model(); 

                            

                            timerGame = setInterval(() => {
                                //--- тут делаем проверку на завершение уровня
                                if (JSON.stringify(stateModel_hook)===JSON.stringify(stateModel_Level)) {
                                    alert("Ура! Вы успешно собрали мозаику!!!");
                                    clearInterval(timerGame);
                                    startGame = false;
                                    refresh_all_model(); 

                                }
                            }
                            , 1000);                        
                        }   
                    }
                    >Старт</button>

                    <div className='runStringWrapper'>
                        <div className='runString'>
                            Курочкин Сергей представляет игру Gradients. Суть игры состоит в сопоставлении фрагментов мозаики в единую композицию, которая была показана на момент старта...
                        </div>
                    </div>

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