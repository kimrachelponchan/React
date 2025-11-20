import './App.css';
import { useRef } from "react";

function App() {
  const boxRef = useRef();

  const scrollToBottom = () => {
    boxRef.current.scrollTo({
      top: boxRef.current.scrollHeight, // 맨 아래
      behavior: "smooth"                // 부드럽게 스크롤
    });
    console.log(boxRef);
  };

  return (
    <div>
      <div
        ref={boxRef}
        style={{
          height: "100px",
          overflowY: "scroll",
          border: "1px solid black"
        }}
      >
        {/*Array.from(길이, 값) <- 문법이 이렇게 됌 */}
        {/* Array.from({length: 30}) -> [udefind...50개] */}
        
        {Array.from({ length: 50 }, (_, i) => (
          <p key={i}>Item {i + 1}</p>
        ))}

      </div>
      <button
        onClick={scrollToBottom}
        className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-400"
      >
        맨 아래로
      </button>
    </div>
  );
}

export default App;


// 파이썬, 자바, 자바스크립트 기본 클래스 문법

// class Person:
//           def __init__(self,name, age):
//             self.name = name
//             self.age = age

//           def say(self):
//             print(self.name);
          
//           def modify(self):
//             self.name = ""
//             self.age = ""

//           def ageUp(self):
//             self.age = self.age + 1

//         a = Person("Tom",20)
//         a.say()
//         a.modify()
//         a.ageUp()
