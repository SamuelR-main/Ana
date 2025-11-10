import { useState } from "react";
import Card from "../../components/card";
import present from "../../img/presente.png";
import confetti from "canvas-confetti";
import popSound from "../../sounds/pop.mp3";
import PlayImg from "../../img/Play.png"
import PhotoImg from "../../img/Photo.png"
import LetterImg from "../../img/Letter.png"
import "./homepage.css";

function Homepage() {
  const [visible, setVisible] = useState(true);
  const [visibleSecond, setVisibleSecond] = useState(false);
  const [visibleLetter, setVisibleLetter] = useState(false);
  const [visiblePhoto, setVisiblePhoto] = useState(false);
  const [visiblePlay, setVisiblePlay] = useState(false);

  const handleOpenGift = () => {
    // 🔊 Toca o som
    const audio = new Audio(popSound);
    audio.play();

    // 🎉 Efeito confete (explosão)
    const duration = 1.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // ⏳ Espera 1.5s antes de mostrar a próxima tela
    setTimeout(() => {
      setVisible(false);
      setVisibleSecond(true);
    }, 2000);
  };

  return (
    <>
    {visible && (
      <div className="relative flex flex-col w-screen h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#C2E9FB] to-[#A1C4FD]">
        {/* Bolhas animadas */}
        <div className="absolute inset-0">
          {/* 15 bolhas com tamanhos, posições e delays variados */}
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-20 h-20 left-[5%] top-[15%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-14 h-14 left-[20%] top-[30%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-28 h-28 left-[35%] top-[10%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-16 h-16 left-[50%] top-[50%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-24 h-24 left-[70%] top-[20%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-10 h-10 left-[85%] top-[40%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-32 h-32 left-[80%] top-[60%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-14 h-14 left-[10%] top-[75%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-18 h-18 left-[40%] top-[80%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-12 h-12 left-[60%] top-[70%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-28 h-28 left-[30%] top-[60%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-16 h-16 left-[75%] top-[80%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-10 h-10 left-[50%] top-[90%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-20 h-20 left-[15%] top-[50%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-24 h-24 left-[90%] top-[10%]"></div>
        </div>

        <div className="z-10 flex flex-col items-center">
          <img
            src={present}
            alt="Presente"
            className="w-52 h-52 md:w-72 md:h-72 cursor-pointer transition-transform duration-300 hover:scale-110"
            onClick={handleOpenGift}
          />
          <p className="text-2xl md:text-4xl text-white italic mt-6 [text-shadow:2px_2px_6px_#000000]">
            Toque para abrir seu presente
          </p>
        </div>
      </div>
    )}

    {visibleSecond && (
        <div className="relative flex flex-row w-screen h-screen items-center justify-evenly overflow-hidden bg-gradient-to-br from-[#C2E9FB] to-[#A1C4FD]">
        {/* Bolhas animadas */}
        <div className="absolute inset-0">
          {/* 15 bolhas com tamanhos, posições e delays variados */}
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-20 h-20 left-[5%] top-[15%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-14 h-14 left-[20%] top-[30%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-28 h-28 left-[35%] top-[10%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-16 h-16 left-[50%] top-[50%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-24 h-24 left-[70%] top-[20%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-10 h-10 left-[85%] top-[40%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-32 h-32 left-[80%] top-[60%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-14 h-14 left-[10%] top-[75%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-18 h-18 left-[40%] top-[80%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-12 h-12 left-[60%] top-[70%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-28 h-28 left-[30%] top-[60%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-16 h-16 left-[75%] top-[80%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-10 h-10 left-[50%] top-[90%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-20 h-20 left-[15%] top-[50%]"></div>
          <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-24 h-24 left-[90%] top-[10%]"></div>
        </div>
        <Card width="350px" height="450px">
            <div className="flex flex-col items-center w-full h-full" onClick={() => {setVisibleSecond(false); setVisibleLetter(true);}}>
                <img src={LetterImg} alt="image Carta" />
                <p className="text-6xl md:text-4xl text-white italic mt-6 [text-shadow:2px_2px_6px_#000000]">Carta</p>
            </div>
        </Card>
        <Card width="350px" height="450px">
            <div className="flex flex-col items-center w-full h-full" onClick={() => {setVisibleSecond(false); setVisiblePhoto(true);}}>
                <img src={PhotoImg} alt="image Portrait" />
                <p className="text-6xl md:text-4xl text-white italic mt-6 [text-shadow:2px_2px_6px_#000000]">Fotos</p>
            </div>
        </Card>
        <Card width="350px" height="450px">
            <div className="flex flex-col items-center w-full h-full" onClick={() => {setVisibleSecond(false); setVisiblePlay(true);}}>
                <img src={PlayImg} alt="image Play" />
                <p className="text-6xl md:text-4xl text-white italic mt-6 [text-shadow:2px_2px_6px_#000000]">Musicas</p>
            </div> 
        </Card>
        </div>
    )}
    {visibleLetter && (
      <div className="relative flex flex-row w-screen h-screen items-center justify-evenly overflow-hidden bg-gradient-to-br from-[#C2E9FB] to-[#A1C4FD]">
      {/* Bolhas animadas */}
      <div className="absolute inset-0">
        {/* 15 bolhas com tamanhos, posições e delays variados */}
        <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-20 h-20 left-[5%] top-[15%]"></div>
        <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-14 h-14 left-[20%] top-[30%]"></div>
        <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-28 h-28 left-[35%] top-[10%]"></div>
        <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-16 h-16 left-[50%] top-[50%]"></div>
        <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-24 h-24 left-[70%] top-[20%]"></div>
        <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-10 h-10 left-[85%] top-[40%]"></div>
        <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-32 h-32 left-[80%] top-[60%]"></div>
        <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-14 h-14 left-[10%] top-[75%]"></div>
        <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-18 h-18 left-[40%] top-[80%]"></div>
        <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-12 h-12 left-[60%] top-[70%]"></div>
        <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-28 h-28 left-[30%] top-[60%]"></div>
        <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-16 h-16 left-[75%] top-[80%]"></div>
        <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-10 h-10 left-[50%] top-[90%]"></div>
        <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-20 h-20 left-[15%] top-[50%]"></div>
        <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-24 h-24 left-[90%] top-[10%]"></div>
      </div>
      <div className="flex flex-col w-[100px] h-[100px] bg-amber-800 absolute z-11 items-start justify-start justify-items-start" onClick={() => {setVisibleLetter(false); setVisibleSecond(true);}}>
        <p>12112</p>
      </div>
      <div className="flex flex-col w-6xl h-[700px] bg-[#FFFDFD] absolute z-10">
        <p>dsdsd</p>
      </div>
      </div>
    )}
    {visiblePhoto && (
            <div className="relative flex flex-row w-screen h-screen items-center justify-evenly overflow-hidden bg-gradient-to-br from-[#C2E9FB] to-[#A1C4FD]">
            {/* Bolhas animadas */}
            <div className="absolute inset-0">
              {/* 15 bolhas com tamanhos, posições e delays variados */}
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-20 h-20 left-[5%] top-[15%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-14 h-14 left-[20%] top-[30%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-28 h-28 left-[35%] top-[10%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-16 h-16 left-[50%] top-[50%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-24 h-24 left-[70%] top-[20%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-10 h-10 left-[85%] top-[40%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-32 h-32 left-[80%] top-[60%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-14 h-14 left-[10%] top-[75%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-18 h-18 left-[40%] top-[80%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-12 h-12 left-[60%] top-[70%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-28 h-28 left-[30%] top-[60%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-16 h-16 left-[75%] top-[80%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-10 h-10 left-[50%] top-[90%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-20 h-20 left-[15%] top-[50%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-24 h-24 left-[90%] top-[10%]"></div>
            </div>
            </div>
    )}
    {visiblePlay && (
            <div className="relative flex flex-row w-screen h-screen items-center justify-evenly overflow-hidden bg-gradient-to-br from-[#C2E9FB] to-[#A1C4FD]">
            {/* Bolhas animadas */}
            <div className="absolute inset-0">
              {/* 15 bolhas com tamanhos, posições e delays variados */}
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-20 h-20 left-[5%] top-[15%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-14 h-14 left-[20%] top-[30%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-28 h-28 left-[35%] top-[10%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-16 h-16 left-[50%] top-[50%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-24 h-24 left-[70%] top-[20%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-10 h-10 left-[85%] top-[40%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-32 h-32 left-[80%] top-[60%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-14 h-14 left-[10%] top-[75%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-18 h-18 left-[40%] top-[80%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-12 h-12 left-[60%] top-[70%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-28 h-28 left-[30%] top-[60%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-16 h-16 left-[75%] top-[80%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-10 h-10 left-[50%] top-[90%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-20 h-20 left-[15%] top-[50%]"></div>
              <div className="bubble absolute rounded-full bg-white/25 backdrop-blur-sm w-24 h-24 left-[90%] top-[10%]"></div>
            </div>
            </div>
    )}
  </>
);
}

 export default Homepage;