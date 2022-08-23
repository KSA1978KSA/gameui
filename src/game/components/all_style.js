import styled from 'styled-components';


//--- сетка главного экрана
const root = styled.div`    
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    width: 100vh;
    height: 100vh;
    margin: 0 auto;    
    padding: 2px;
    overflow: hidden;
`;


//--- puzzle
const puzzle = styled.div` 
    position: relative;
    overflow: hidden;
`;




export {
    root,
    puzzle
};
