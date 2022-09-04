import "./gradient.css";


//--- объявляем типы данных передаваемые в компоненту
type propGradient = {
    puzzleColor: String
};

//--- Компонент
function Gradient ({puzzleColor} : propGradient) {
    return (
        <div className={`gradient_${puzzleColor}`} />
    );
}

export {Gradient};


/*

function Gradient ({puzzleColor}) {

    let ret;

    switch (puzzleColor) {
        case 0:
            ret = <div className="puzzle__gradient_1" />
            break;

        case 1:
            ret = <div className="puzzle__gradient_2" />
            break;

        case 2:
            ret = <div className="puzzle__gradient_3" />
            break;
        
        default:
            ret = <div className="puzzle__gradient_4" />
            break;
    }

    return ret;
}

*/

