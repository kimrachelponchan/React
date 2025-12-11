import {useEffect, useState, useRef} from "react";

export const Home = () => {
    return(
        <>
            <Home.Layout>
                <Home.Contents>
                    <ImageContainer
                        items={["image1.jpg","image2.jpg","image3.jpg"]}
                    />
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
    return <div className="bg-white h-[400px] w-[600px]">{children}</div>
}

export const ImageContainer = ({items})=>{
    const contentsRef = useRef(null);
    const scrollRef = useRef(null);
    const [contents, setContents] = useState(false);

    useEffect(()=>{ 
        
        const observer = new IntersectionObserver(
            ([entry])=>{
                if(entry.isIntersecting){
                    console.log("요소가 보입니다.");
                    console.log(scrollRef.current.scrollTop);
                    setContents(true);
                }else if(scrollRef.current.scrollTop < 280){
                    setContents(false);
                }
            },{
                threshold: 0.7
            }
        )

        observer.observe(contentsRef.current);

    },[])

    if(!items) return;

    return (
        <>
            <div ref={scrollRef} className="w-full h-full overflow-y-scroll layout relative cover">
                {items.map((item,index)=>{
                    return(
                        <>
                            <img src={item} ref={index === 1 ? contentsRef : null} />
                            {index === 0 &&<div className={`absolute w-full h-full flex justify-center items-center text-3xl duration-[1s] ${contents ? "left-show" : "right-out"}`}>요소가 노출됩니다.</div>}
                        </>
                    )
                })}
            </div>
        </>
    )
}