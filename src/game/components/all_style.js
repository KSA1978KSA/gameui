import styled from 'styled-components';



//--- сетка главного экрана
const rootPano = styled.div`    
    display: flex;    
`;

//--- игровая сетка
const gamePano = styled.div`       
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    width: 100vh;
    height: 100vh;
    margin: 0 auto;        
    overflow: hidden;
`;


//--- puzzle
const puzzle = styled.div` 
    position: relative;
    overflow: hidden;
`;




export {
    rootPano,
    gamePano,
    puzzle
};
