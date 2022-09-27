import '../styles/Score.css';

export function Score(props){

    return (
        <div className='score'>
            <p>Level: {props.level}</p>
            <p>Total: {props.count}</p>
        </div>)
}