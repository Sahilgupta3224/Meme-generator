import React from 'react';
import domtoimage from 'dom-to-image';


export default function Meme() {
    
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" ,
        image:null
    })
    const [allMeme, setAllMeme] = React.useState([]);
    const [memes, setMemes] = React.useState([]);
    
    React.useEffect(()=>{
        async function getMemes(){
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMeme(data.data.memes)
        }
       getMemes()
    },[])

    function getMemeImage() {
        //const memesArray = allMeme.data.memes
        const randomNumber = Math.floor(Math.random() * allMeme.length)
        const url = allMeme[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    }

    function HandleChange(event){
        const{name,value}=event.target
        setMeme(prev=>({
            ...prev,
            [name]:value
        }))
    }
    
    function handleDownload() {
        const memeElement = document.getElementById('meme-container');
      
        domtoimage.toBlob(memeElement).then(function (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'meme.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        });
      }

      function handleImageChange(event) {
        console.log("handleImageChange called");
        const imageFile = event.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        console.log("imageUrl:", imageUrl);
        setMeme((prevMeme) => ({
          ...prevMeme,
          image: imageUrl,
        }));
      }
    
    return (
        <main>
            <div className="form">
                 <div>
                    <input 
                        type="text"
                        placeholder="Top text"
                        className="form--input"
                        value={meme.topText}
                        onChange={HandleChange}
                        name="topText"
                    />
                <div className="color-picker">
                <h3 className='top-label'>Top Text Color:</h3>
                    <input 
                         type="color" 
                         className='top-color'
                         value={meme.topTextColor}
                         onChange={HandleChange}
                         name="topTextColor"
                    />
                </div>
                </div>
                 <div>
                    <input 
                        type="text"
                        placeholder="Bottom text"
                        className="form--input"
                        value={meme.bottomText}
                        onChange={HandleChange}
                        name="bottomText"
                    />
                <div className="color-picker">
                <h3 className='top-label'>Bottom Text Color:</h3>
                    <input 
                        type="color" 
                        className='top-color'
                        value={meme.bottomTextColor}
                        onChange={HandleChange}
                        name="bottomTextColor"
                    />
                </div>
                <div>
                <label htmlFor="image">Choose an image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        id="image"
                        onChange={handleImageChange}
                    />
                </div>
                </div>

<div className="meme--buttons">
  <a
  className='facebook'
    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(meme.topText + " " + meme.bottomText)}&picture=${encodeURIComponent(meme.image)}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    Share on Facebook
  </a>
  <a
  className='twitter'
    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(meme.topText + " " + meme.bottomText)}&hashtags=meme`}
    target="_blank"
    rel="noopener noreferrer"
  >
    Share on Twitter
  </a>
  <a
  className='insta'
    href={`https://www.instagram.com/?url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(meme.image)}&caption=${encodeURIComponent(meme.topText + " " + meme.bottomText)}&utm_source=ig_web_copy_share_sheet`}
    target="_blank"
    rel="noopener noreferrer"
  >
    Share on Instagram
  </a>
</div>

                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
                <button className="form--butto" onClick={handleDownload}>
          Download Meme
        </button>
            </div>
            <div id="meme-container" className="meme">
                <img src={meme.image ? meme.image : meme.randomImage} className="meme--image" />
                <h2 id ="top-text" className="meme--text top" style={{color:meme.topTextColor}}>{meme.topText}</h2>
                <h2 id="bottom-text" className="meme--text bottom" style={{color:meme.bottomTextColor}}>{meme.bottomText}</h2>
            </div>
        </main>
    )
}

  //ternary operator

  /*export default function App() {
    
     * Challenge: move our ternary directly inside of the JSX
     * so the "Yes" and "No" are determined inside the <h1>
     * 
     * Hint: you will no longer need the `answer` variable
     
    const isGoingOut = false
    let answer = isGoingOut ? "Yes" : "No"
    
    return (
        <div className="state">
            <h1 className="state--title">Do I feel like going out tonight?</h1>
            <div className="state--value">
                <h1>{isGoingOut ? "Yes" : "No"}</h1>
            </div>
        </div>
    )
}*/



    /*function Meme() {
    const thingsArray = ["Thing 1", "Thing 2"]
    
    function addItem() {
        const newThingText = `Thing ${thingsArray.length + 1}`
        thingsArray.push(newThingText)
        console.log(thingsArray)
    }
    
    const thingsElements = thingsArray.map(thing => <p key={thing}>{thing}</p>)
    
    return (
        <div>
            <button onClick={addItem}>Add Item</button>
            {thingsElements}
        </div>
    )
}*/


// Use State

 /*export default function Appp() {
    
     * Challenge: Replace our hard-coded "Yes" on the page with 
     * some state initiated with React.useState()
     
    const result = React.useState("NO")
    console.log(result)
    return (
        <div className="state">
            <h1 className="state--title">Is state important to know?</h1>
            <div className="state--value">
                <h1>{result[0]}</h1>
            </div>
        </div>
    )
}*/



/*export default function App() {
    
     * Challenge: Set up state to track our count (initial value is 0)
     
    const [count,StateFunc] = React.useState(0);
    function addition(){
        StateFunc(prevCount=>prevCount+1)
    }
    function subtraction(){
        StateFunc(count-1)
    }
    return (
        <div className="counter">
            <button className="counter--minus" onClick = {subtraction}>–</button>
            <div className="counter--count">
                <h1>{count}</h1>
            </div>
            <button className="counter--plus" onClick = {addition}>+</button>
        </div>
    )
}*/

//Flipping State Back And Forth


/*function App() {
    const [isGoingOut, setIsGoingOut] = React.useState(true)
    /**
     * Challenge: 
     * - Initialize state for `isGoingOut` as a boolean
     * - Make it so clicking the div.state--value flips that
     *   boolean value (true -> false, false -> true)
     * - Display "Yes" if `isGoingOut` is `true`, "No" otherwise
     
    function changeMind() {
        setIsGoingOut(prevState => !prevState)
    }
    
    return (
        <div className="state">
            <h1 className="state--title">Do I feel like going out tonight?</h1>
            <div onClick={changeMind} className="state--value">
                <h1>{isGoingOut ? "Yes" : "No"}</h1>
            </div>
        </div>
    )
}*/


//Complex State: arrays


/*function App() {
    /
     * Challenge: See if you can do it all again by yourself :)
     *
    const [Things,SetThings] = React.useState(["Thing 1","Thing 2"])
    
    
    function addItem() {
        SetThings(prevThing=>[...prevThing,`Thing ${prevThing.length + 1}`])
    }
    
    const thingsElements = Things.map(thing => <p key={thing}>{thing}</p>)
    
    return (
        <div>
            <button onClick = {addItem}>Add Item</button>
            {thingsElements}
        </div>
    )
}

 function Contact() {
    const [contact, setContact] = React.useState({
        firstName: "John",
        lastName: "Doe",
        phone: "+1 (719) 555-1212",
        email: "itsmyrealname@example.com",
        isFavorite: false
    })
    
    let starIcon = contact.isFavorite ? "star-filled.png" : "star-empty.png"
    
    function toggleFavorite() {
        setContact(prevContact => ({
            ...prevContact,
            isFavorite: !prevContact.isFavorite
        }))
    }
    
    return (
        <main>
            <article className="card">
                <img src="./images/user.png" className="card--image" />
                <div className="card--info">
                    <img 
                        src={`../images/${starIcon}`} 
                        className="card--favorite"
                        onClick={toggleFavorite}
                    />
                    <h2 className="card--name">
                        {contact.firstName} {contact.lastName}
                    </h2>
                    <p className="card--contact">{contact.phone}</p>
                    <p className="card--contact">{contact.email}</p>
                </div>
                
            </article>
        </main>
    )

}


//box challenge part 5 ternary use,toogle function dhyan rkhna h

  /*   function App() {
    const [squares, setSquares] = React.useState(boxes)
    
    function toggle(id) {
        setSquares(prevSquares => {
            return prevSquares.map((square) => {
                return square.id === id ? {...square, on: !square.on} : square
            })
        })
    }
    
    const squareElements = squares.map(square => (
        <Box 
            key={square.id} 
            on={square.on} 
            toggle={() => toggle(square.id)}
        />
    ))
    
    return (
        <main>
            {squareElements}
        </main>
    )
}*/

