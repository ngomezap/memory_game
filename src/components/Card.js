import { useEffect, useState } from 'react'
import '../styles/Card.css'

export function Card(props){

    return (
    <div>
        <img id={props.name} src={props.src}/>
    </div>)
}