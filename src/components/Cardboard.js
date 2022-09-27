import { useState, useEffect } from "react"
import { Card } from "./Card";
import '../styles/Cardboard.css'


export function Cardboard(props){

    const [src, setSrc] = useState([]); 
    const [names, setNames] = useState([]);
    const [stored, setStored] = useState([]);
    const [level, setLevel] = useState(0);

    //Number of pics by level
    let numPics = [4, 6, 8, 10, 13, 15, 20];

    let render = [];
    let randomPage = Math.floor(Math.random() * 40 + 1);

    async function getChar() 
    {fetch(`https://rickandmortyapi.com/api/character/?page=${randomPage}`)
    .then(data => data.json())
    .then(data => {
        console.log(randomizer())
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
        checkLose(e);
        store(e);
        checkWin();
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
        console.log(arr)
        return arr;
    }

    for(let i = 0; i < numPics[level]; i++){
        render.push(<Card name={names[i]} src={src[i]}></Card>)
    }


    const checkLose = (e) => {
        if(stored.includes(e.target.id)){
            console.log('You lose!')
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
        {render}    
    </div>)
}