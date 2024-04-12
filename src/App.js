import { useCallback, useState , useEffect ,useRef} from "react";
import "./App.css";

function App() {
  const[length , setLength] = useState(8)
  const[numallowed, setNumallowed] = useState(false)
  const[CharAllowed , setCharAllowed] = useState(false)
  const[password,setPassword] = useState("")
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(()=>{
    let pass ="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numallowed){
      str+="012356789"
    }
    if(CharAllowed){
      str+="~!@#$%^&*(){}:"
    }
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char);
    }
    setPassword(pass)
  },[length,numallowed,CharAllowed,setPassword])

  const copyPasswordToClipboard =useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,CharAllowed,numallowed,passwordGenerator])
  return (
    
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-3 text-orange-600 bg-slate-800">
     <h1 className="text-white text-center my-3">Password Generator</h1>
     <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input
      type="text"
      value={password}
      className="outline-none w-full py-1 px-3"
      placeholder="password"
      readOnly
      ref={passwordRef}
      />
      <button onClick={copyPasswordToClipboard} className="text-white bg-blue-500 px-3">copy</button>
     </div>
     <div className="flex text-sm gap-x-2">
      <div className="flex items-center gap-x-1">
      <input
      type="range"
      value={length}
      min={6}
      max={100}
      className="cursor-pointer"
      onChange={(e)=>{setLength(e.target.value)}}
      />
      <label>length:{length}</label>
      </div>
      <div>
        <input
        type="checkbox"
        defaultChecked={numallowed}
        id="numberInput"
        onChange={()=>{
          setNumallowed((prev)=>!prev)
        }}
        />
        <label>Numbers</label>
      </div>
      <div>
        <input
        type="checkbox"
        defaultChecked={CharAllowed}
        id="CharInput"
        onChange={()=>{
          setCharAllowed((prev)=>!prev)
        }}
        />
        <label>Characters</label>
      </div>
     </div>
    </div>
  
  );
}

export default App;
