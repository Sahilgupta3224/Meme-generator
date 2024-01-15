import React from 'react';


export default function Header(){
    return(
        <header className='header'>
            <img className="header--image"  src={require(`../Images/trollface.png`) }  />
            <h2 className='header--title'>Meme Generator</h2>
        </header>
    )
}

//src={require(`../images/${image path}`)} for rendering image