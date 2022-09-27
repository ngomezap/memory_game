import { useState, useEffect } from "react"
import { Card } from "./Card";
import { Score } from "./Score";
import '../styles/Cardboard.css'


export function Cardboard(props){

    const [src, setSrc] = useState([]); 
    const [names, setNames] = useState([]);
    const [stored, setStored] = useState([]);
    const [level, setLevel] = useState(0);
    const [count, setCount] = useState(0);

    //Number of pics by level
    let numPics = [4, 6, 8, 10, 13, 15, 20];

    let render = [];
    let randomPage = Math.floor(Math.random() * 40 + 1);

    async function getChar() 
    {fetch(`https://rickandmortyapi.com/api/character/?page=${randomPage}`)
    .then(data => data.json())
    .then(data => {
        setStored([]);
        let urls = [];
        let n = [];
        for(let i = 0; i < numPics[level]; i++){
            urls.push(data.results[i].image);
            n.push(data.results[i].name);
        }
        setSrc(urls);
        setNames(n);
    }
    )}
    
    useEffect(() => {
        getChar()
    }, [level])

    useEffect(() => {
        let images = document.querySelectorAll('img');
        images.forEach((img) => img.addEventListener('click', fun))
        return () => {
            let images = document.querySelectorAll('img');
            images.forEach((img) => img.removeEventListener('click', fun)) 
        }
    })

    const fun = (e) => {
        let urls = src;
        let urlsCopy = [];
        let n = names;
        let nCopy = [];
        let arr = randomizer();
        
        arr.forEach((pos) => {
            urlsCopy.push(urls[pos]);
            nCopy.push(n[pos]);
        })
        
        setSrc([...urlsCopy]);
        setNames([...nCopy]);
        if(checkLose(e)){
            if(level !== 0){
                setLevel(0);
                setCount(0);
            }else{
                setStored([]);
                setCount(0);
                getChar();
            }
        }else{
            setCount(count + 1);
            store(e);
            checkWin();
        }
    }

    const randomizer = () => {
        let arr = [];
        let max = numPics[level];
        let random;
        for(let i = 0; i < max; i++){
            do{
                random = Math.floor(Math.random() * max);
            }while(arr.includes(random));
            arr.push(random);
        }
        return arr;
    }

    for(let i = 0; i < numPics[level]; i++){
        render.push(<Card name={names[i]} src={src[i]}></Card>)
    }


    const checkLose = (e) => {
        if(stored.includes(e.target.src)){
            return true;
        }else{
            return false;
        }
    }

    const store = (e) =>{
        let arr = stored;
        arr.push(e.target.src)
        setStored(arr)
    }

    const checkWin = () => {
        if(stored.length === names.length){
            setLevel(level + 1);
            console.log('You win!')
        }
    }

    return (
    <div className="cardBoard">
        <Score count={count} level={level + 1}></Score>
        {render}    
    </div>)
}