//setup
const boxes = [0,1,2,3,4,5,6,7,8];

const firstRow = [];
const secondRow = [];
const thirdRow = [];

const firstColumn = [];
const secondColumn = [];
const thirdColumn = [];

const firstCross = [];
const secondCross = [];

const AIboxes = {
    firstRow: [],
    secondRow: [],
    thirdRow: [],

    firstColumn : [],
    secondColumn : [],
    thirdColumn : [],

    firstCross: [],
    secondCross : []
}
   
let winner =false;
let moves = 0;
let canIcheck = true;

const computerText = ['Hmm myślę...', 'Zastanawiam się...', 'A może by tak...', 'Może tutaj...', 'Gdyby tak...', 'Może tutaj będzie ok...', 'Hmm...', 'Myślę...']


const drawText = (arr)=>{
const index = Math.floor(Math.random() * arr.length);
return arr[index];
}

const btnReset = document.querySelector('button');
btnReset.addEventListener('click', ()=>location.reload())

document.addEventListener('DOMContentLoaded', ()=>{
    const wrapper = document.querySelector('.wrapper');

    boxes.forEach((box,index)=>{
        const element = document.createElement('div');
            element.setAttribute('class', 'playground');
            element.setAttribute('id',`${index}`)
            wrapper.appendChild(element)
    })

    const computerIsThinking = ()=>{
        const info = document.createElement('p')
        info.textContent = drawText(computerText)
        info.style.fontSize = '25px'
        wrapper.appendChild(info);
        setTimeout(()=>{
            wrapper.removeChild(info);
        },499)
    }

   
    const checkWin = (item)=>{
        item.id == 0 || item.id == 1 || item.id == 2 ? firstRow.push(item): null;
        item.id == 3 || item.id == 4 || item.id == 5 ? secondRow.push(item): null;
        item.id == 6 || item.id == 7 || item.id == 8 ? thirdRow.push(item): null;
        item.id == 0 || item.id == 3 || item.id == 6 ? firstColumn.push(item): null;
        item.id == 1 || item.id == 4 || item.id == 7 ? secondColumn.push(item): null;
        item.id == 2 || item.id == 5 || item.id == 8 ? thirdColumn.push(item): null;
        item.id == 0 || item.id == 4 || item.id == 8 ? firstCross.push(item): null;
        item.id == 2 || item.id == 4 || item.id == 6 ? secondCross.push(item): null;
        if(firstRow.length === 3 || secondRow.length ===3 || thirdRow.length === 3 || firstColumn.length ===3 || secondColumn.length ===3 || thirdColumn.length ===3 || firstCross.length===3 || secondCross.length ===3){
            winner = true;
            const winInfo = document.createElement('p');
            winInfo.textContent = 'Wygrałeś';
            winInfo.style.color = '#00bd56';
            btnReset.style.opacity = 1;
            wrapper.appendChild(winInfo)
        } 
    }

    const checkWinAI = (item)=>{
        item.id == 0 || item.id == 1 || item.id == 2 ? AIboxes.firstRow.push(item): null;
        item.id == 3 || item.id == 4 || item.id == 5 ? AIboxes.secondRow.push(item): null;
        item.id == 6 || item.id == 7 || item.id == 8 ? AIboxes.thirdRow.push(item): null;
        item.id == 0 || item.id == 3 || item.id == 6 ? AIboxes.firstColumn.push(item): null;
        item.id == 1 || item.id == 4 || item.id == 7 ? AIboxes.secondColumn.push(item): null;
        item.id == 2 || item.id == 5 || item.id == 8 ? AIboxes.thirdColumn.push(item): null;
        item.id == 0 || item.id == 4 || item.id == 8 ? AIboxes.firstCross.push(item): null;
        item.id == 2 || item.id == 4 || item.id == 6 ? AIboxes.secondCross.push(item): null;
        if(AIboxes.firstRow.length === 3 || AIboxes.secondRow.length ===3 || AIboxes.thirdRow.length === 3 || AIboxes.firstColumn.length ===3 || AIboxes.secondColumn.length ===3 || AIboxes.thirdColumn.length ===3 || AIboxes.firstCross.length===3 || AIboxes.secondCross.length ===3){
            winner = true;
            const winInfo = document.createElement('p');
            winInfo.textContent = 'Przegrałeś z komputerem - ty głąbie po studiach';
            winInfo.style.color = '#fa4659';
            btnReset.style.opacity = '1';
            wrapper.appendChild(winInfo)
            
        } 
    }

    const playground = wrapper.querySelectorAll('div.playground');
    playground.forEach(elem => {
        elem.addEventListener('click',()=> drawSign(elem));
        
    });

    const drawSign = (elem)=>{
        if(winner || !canIcheck)return;
        if(elem.textContent === 'X' || elem.textContent === 'O') return;
        else {
            elem.textContent = 'X';
            elem.style.color = '#00bd56';
            elem.style.backgroundColor = '#226b80';
            elem.style.fontWeight = 'bold';
            moves++;
            canIcheck = false
        }
        computerDrawSign(playground);
        checkWin(elem);
        if(winner)return;
        computerIsThinking()
        }
    
    const computerDrawSign = (playArray)=>{
        setTimeout(()=>{
            if(winner)return;
            if(moves ===9){
                const winInfo = document.createElement('p');
                winInfo.textContent = 'Koniec ruchów';
                winInfo.style.color = 'gray';
                btnReset.style.opacity = '1';
                return wrapper.appendChild(winInfo) }

            const notSelected = [...playArray];
            let computerMark = notSelected.filter(item=>item.textContent !== 'X' && item.textContent !== 'O')
            let markIndex = Math.floor(Math.random() *computerMark.length);
            computerMark[markIndex].textContent = 'O';
            computerMark[markIndex].style.color = '#c7004c';
            computerMark[markIndex].style.backgroundColor = '#8acbbb';
            computerMark[markIndex].style.fontWeight = 'bold';
            checkWinAI(computerMark[markIndex])
            moves++;
            canIcheck = !canIcheck;
        },700)
    }
})


