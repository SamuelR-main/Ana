import Card from "../../components/card";
import present from "../../img/presente.png"

function Homepage(){
    return(
        <>
        <div className="flex flex-col w-screen h-screen items-center justify-center bg-linear-135 from-[#C2E9FB] to-[#A1C4FD]">
            <img src={present} alt="" className="w-2xl h-2xl" />
            <p className="text-4xl text-white [text-shadow:5px_5px_5px_#000000]">Toque para abrir seu presente</p>
        </div>
        </>
    )
}
export default Homepage;
