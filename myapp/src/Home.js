import {useEffect, useState, useRef} from "react";

export const Home = () => {


    const contentsRef = useRef(null);
    const [contents, setContents] = useState(false);

    useEffect(()=>{ 
        
        const observer = new IntersectionObserver(
            ([entry])=>{
                if(entry.isIntersecting){
                    console.log("요소가 보입니다.");
                    setContents(true);
                }else{
                    setContents(false);
                }
            },{
                threshold: 0.5
            }
        )

        observer.observe(contentsRef.current);

    },[])



    return(
        <>
            <Home.Layout>
                <Home.Contents>
                    <img src="image1.jpg"/>
                    {/* <div ref={contentsRef} className="h-10 flex justify-center items-center">감시자</div> */}

                    {/* 둘의 방식은 유사하지만 1번 요소의 경우에는 돔에 항상 존재하다가 class만 추가되는 형식이라 브라우저가 애니메이션으로 인식함 */}
                    {/* 2번 요소의 경우에는 돔에 존재자체가 없다가 새로 생기고 없어지는 방식이기 때문에 class의 변경이 아닌 돔의 변경이라 애미메이션으로 인식하지 않음 */}
                    <div className={`absolute w-full h-full flex justify-center items-center text-3xl duration-[1s] ${contents ? "opacity-100" : "opacity-0"}`}>요소가 노출됩니다.</div>
                    {/* {contents && 
                    (<div className={`absolute w-full h-full flex justify-center items-center text-3xl duration-[1s]`}>요소가 노출됩니다.</div>)
                    } */}
                    <img ref={contentsRef} src="image2.jpg"/>
                    <img src="image3.jpg"/>
                </Home.Contents>
            </Home.Layout>
        </>
    )
};

Home.Layout = ({children})=>{

    return (
        <div className="bg-red-200 w-screen h-screen flex justify-center  items-center ">{children}</div>
    )
}

Home.Contents = ({children})=>{
    return <div className="bg-white h-[400px] w-[600px] overflow-y-scroll layout relative cover">{children}</div>
}