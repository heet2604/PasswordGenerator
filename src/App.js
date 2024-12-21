import { useState ,useCallback ,useEffect ,useRef} from 'react';

function App() {
  const [length,setlength] = useState(8);
  const [numallowed,setNumberAllowed] = useState(false);
  const [charallowed,setCharacterAllowed] = useState(false);
  const [password,setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);


  const passwordgenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopgrstuvwxyz";

    if(numallowed){
      str+="0123456789";
    }
    if(charallowed){
      str+="!@#$%^&*_-+=[]{}~`"
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char)
    }
    setPassword(pass)


  },[length,numallowed,charallowed,setPassword])       //takes care of optimization

  const copyPasswordToClip = useCallback(()=>{
    window.navigator.clipboard.writeText(password).then(()=>{
      alert("Password copied to clipboard!")
    });
  },[password])

  useEffect(()=>{
    passwordgenerator();                 // takes care of any changes in the dependencies
  },[length,numallowed,charallowed,passwordgenerator])
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 text-center text-xl">
        <h1 className="text-white text-center my-3 py-3">Password Generator</h1>
        <div className="flex-shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyPasswordToClip}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              name=""
              min={8}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numallowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charallowed}
              id="characterInput"
              onChange={() => {
                setCharacterAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
