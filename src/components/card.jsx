function Card(props){
    return(
        <>
            <div style={{ width: props.width, height: props.height }} className="flex flex-col bg-white/30 border-white/50 border-4 border-solid backdrop-blur-sm rounded-xl">
                {props.children}
            </div>
        </>
    );
}

export default Card;