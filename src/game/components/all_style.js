import styled from 'styled-components';



//--- сетка главного экрана
const rootPano = styled.div`    
    display: flex;    
`;


const rootPano__leftPanel = styled.div`    
{
    display: grid;
    border-radius: 8px 0px 0px 8px;
    margin-left: 2px;    
    background-color: rgba(151, 151, 159, 0.218);
    width: 100%;

    /*align-items: center;/* Для центрирования элемента по перекрёстной оси  */
    justify-content: center;/* Для центрирования элемента по главной оси  */ 
}  
`;

const rootPano__centerPanel = styled.div`    
{
    flex: 1;   
    border-style: solid;
    grid-template-rows: 1fr 1fr;
    border-color: rgba(107, 107, 107, 0.218);
}  
`;

const rootPano__rightPanel = styled.div`    
{
    border-radius: 0px 8px 8px 0px;
    margin-right: 2px;   
    background-color: rgba(151, 151, 159, 0.218);
    width: 100%;
}  
`;

const rootPano__leftPanel_topPanel = styled.div`    
{
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 8px;
    margin-top: 20px;
    height: 100px;
    width: 100%;      
}
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



export {
    rootPano,
    rootPano__leftPanel,
    rootPano__leftPanel_topPanel,
    rootPano__centerPanel,
    rootPano__rightPanel,    
    gamePano
};
