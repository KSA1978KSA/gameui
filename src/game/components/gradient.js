

function Gradient ({puzzleColor}) {

    return (<>
    {
        (puzzleColor===0) ? (
            <div className="puzzle__gradient_1" />
        ) : (
            (puzzleColor===1) ? (
                <div className="puzzle__gradient_2" />
            ) : (
                (puzzleColor===2) ? (
                    <div className="puzzle__gradient_3" />
                ) : (
                    <div className="puzzle__gradient_4" />
                )
            )
        )
                
    }
    </>)
}


export {Gradient};