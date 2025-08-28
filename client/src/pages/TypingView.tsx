import { useState, useEffect } from 'react'

const TypingView = () => {
    const [typedText, setTypedText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [targetText, setTargetText] = useState<String>("");
    const [words, setWords] = useState<Array<string>>([]);


    useEffect(() => {
        const result = fetch("https://random-word-api.herokuapp.com/word?number=50").then((res) => res.json()).then((json_res) => {
            console.log(json_res);
        });
        // const json_result = await result.json();
        
        console.log(result) 
    }, [])

    return (
        <div className='flex flex-col justify-center items-center rounded-3xl shadow-blue-300 bg-blue-900'>
            {loading ? <p>Loading...</p> : <p>{targetText}</p>}
            <input value={typedText} onChange={(e) => setTypedText(e.target.value)}/>
        </div>
    )
}

export default TypingView
