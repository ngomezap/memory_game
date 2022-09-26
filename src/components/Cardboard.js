import { useState, useEffect } from "react"
import { Card } from "./Card";
import '../styles/Cardboard.css'


export function Cardboard(props){

    const [src, setSrc] = useState([]); 
    const [names, setNames] = useState([]);
    const [stored, setStored] = useState([]);
    let render = [];

    async function getChar() 
    {fetch('https://rickandmortyapi.com/api/character/?page=2')
    .then(data => data.json())
    .then(data => {
        let urls = [];
        let n = [];
        for(let i = 0; i < 4; i++){
            urls.push(data.results[i].image);
            n.push(data.results[i].name);
        }
        setSrc(urls);
        setNames(n);
    }
    )}
    
    useEffect(() => {
        getChar()
    }, [])

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
        let n = names;
        let randomNum = Math.floor(Math.random() * 3)
        urls.splice(randomNum,0,urls.pop());
        n.splice(randomNum, 0, n.pop());
        setSrc([...urls]);
        setNames([...n]);
        checkLose(e);
        store(e);
        checkWin();
    }

    for(let i = 0; i < 4; i++){
        render.push(<Card name={names[i]} src={src[i]}></Card>)
    }

    const checkLose = (e) => {
        if(stored.includes(e.target.id)){
            console.log('You lose!')
        }
    }

    const store = (e) =>{
        let arr = stored;
        arr.push(e.target.id)
        setStored(arr)
    }

    const checkWin = () => {
        let counter = 0;
        if(stored.length === names.length){
            console.log('You win!')
        }
    }

    return (
    <div>
        {render}    
    </div>)
}