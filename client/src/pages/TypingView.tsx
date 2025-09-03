import { useState, useEffect }from 'react'

type STATUS = 'CORRECT' | 'MISTAKE' | 'UNTYPED';

type WordStatus = {
    word: string;
    status: STATUS;
}

const TypingView = () => {
    const [userInput, setUserInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [wordList, setWordList] = useState<Array<string>>([]);
    const [wordStatusList, setWordStatusList] = useState<Array<WordStatus>>([]);

    const fetchRandomWords = async (wordCount: Number) => {
        try {
            setIsLoading(true);
            const apiUrl: string = `https://random-word-api.herokuapp.com/word?number=${wordCount}`
            const apiResponse = await fetch(apiUrl);
            const fetchedWords = await apiResponse.json();
            setWordList(fetchedWords);
            const initializedWordStatusList: Array<WordStatus> = fetchedWords.map((word: string) => ({ word: word, status: "UNTYPED" }));
            setWordStatusList(initializedWordStatusList)
        } catch (e) {
            console.error("Something went wrong!! :<", e)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchRandomWords(50);
    }, [])

    const keyPressed = (e : React.ChangeEvent<HTMLInputElement >) => {
        if (e.target && e.target.value == ' ') {
            console.log("space clicked")
        }
        
    }

    // useEffect(() => {
    //     const setText = () => {
    //         let text : string = "";
    //         for (let word of words) {
    //             text += word + " ";
    //         }
    //         setTargetText(text);
    //     }
    //     setText();
    // }, [words])

    return (
        <div className='flex flex-col justify-center items-center rounded-3xl shadow-blue-300 bg-blue-900'>
            {isLoading ? <p>Loading...</p> :
            (
                <p className='p-3 text-2xl'>
                    {wordStatusList.map((wordStatus : WordStatus) => {
                        switch(wordStatus.status) {
                            case 'CORRECT':
                                return <span className='text-green-400'>{wordStatus.word} </span>
                            case 'MISTAKE':
                                return <span className='text-red-400'>{wordStatus.word} </span>
                            case 'UNTYPED':
                                return <span className='text-gray-400'>{wordStatus.word} </span>
                        }
                    })}
                </p>
            ) 
            }
            <input value={userInput} onChange={(e) => keyPressed(e)} className='bg-blue-300 border-none rounded'/>
        </div>
    )
}

export default TypingView
