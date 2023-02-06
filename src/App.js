import React, { useState, useCallback, useMemo, useEffect} from "react"
import List from "./List";


function verySlowFunction(input){
  console.log('running  verySlowFunction ...');
  let sum = 0
  for(let i = 0; i < input * 1e9 ; i++){
     sum += i;
  }
  return sum;
}
  
function App(){
  
    /* Initial states */
    const [input, setInput] = useState(1);
    const [light, setLight] = useState(true);
   
    /* this heavy processing run everytime
       this App component rerenders because its global
       state change. Even if <computed> remains the same
       const computed = verySlowFunction(input);
    */

   /*
    memoize the return value of verySlowfunction and only runs it when
    the input value changes
   */
   const computed = useMemo(()=> verySlowFunction(input),[input])




  
    /* getItems() returns a list of number which
    is number+10 and number + 100 
    const getItems = () => {
        return [input + 10, input + 100];
    }
    */

    /* useCallback memoizes the getItems() which 
       returns a list of number which is number+10
       and number + 100 */
    const getItems = useCallback(() => {
        return [input + 10, input + 100];
    }, [input]);

    /* 
      Anytime the App component runs, the heavy content of useEffe runs too because
      a new reference is created of data object;
    const data = {
      key: 'value'
    }

    */

   const data =  useMemo(()=> {
      return {
        currentInputValue: input
      }
    },[input])

    useEffect(()=>{
      console.log('assume heavy processing function running here...');
    },[data])
  
    /* Style for changing the theme */
    const theme = {
        backgroundColor: light ? "White": "grey",
        color: light ? "grey" : "white"
    }
     
    return <>
        {/* set the theme in the parent div */}
        <div style={theme}>
            <input type="number"
            value={input}
  
            /* When we input a number it is stored
            in our stateful variable */
            onChange={event => setInput(parseInt(event.target.value))} />
            <div style={{margin: '5px 0'}}>{computed}</div>
            <div style={{margin: '5px 0'}}>{data.currentInputValue}</div>
  
            {/* on click the button the theme is set to the 
            opposite mode, light to dark and vice versa*/}
            <button onClick={() => setLight(prevLight => !prevLight)}>
            {light ? "dark mode":"light mode"}
            </button>
            <List getItems={getItems} />
        </div>
    </>;
}
  
export default App;