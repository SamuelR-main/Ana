import { useState, useRef, useEffect  } from "react";
import { Play, Pause, SkipBack, SkipForward, ArrowBigLeft } from "lucide-react";
import confetti from "canvas-confetti";
import "./homepage.css";
import Card from "../../components/card";
import Baubbles from "../../components/baubbles";
import present from "/img/presente.png";
import popSound from "/sounds/pop.mp3";
import PlayImg from "/img/Play.png"
import PhotoImg from "/img/Photo.png"
import LetterImg from "/img/Letter.png"

function Homepage() {
  const [visible, setVisible] = useState(true);
  const [visibleSecond, setVisibleSecond] = useState(false);
  const [visibleLetter, setVisibleLetter] = useState(false);
  const [visiblePhoto, setVisiblePhoto] = useState(false);
  const [visiblePlay, setVisiblePlay] = useState(false);

  const handleOpenGift = () => {
    //Som
    const audio = new Audio(popSound);
    audio.play();
    //Confete
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
    setTimeout(() => {
      setVisible(false);
      setVisibleSecond(true);
    }, 500);
  };
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const audioRef = useRef(null);
  const tracks = [
    { title: "Nirvana - Smells Like Teen Spirit", src: "/sounds/Nirvana - Smells Like Teen Spirit.mp3", cover: "/img/Cover1.jpg"},
    { title: "Nirvana - Come As You Are", src: "/sounds/Nirvana - Come As You Are.mp3", cover: "/img/Cover2.jpg"},
    { title: "Nirvana - Heart-Shaped Box", src: "/sounds/Nirvana - Heart-Shaped Box.mp3", cover: "/img/Cover3.jpg"}
  ];
  const slideshow = [
    "/img/Photo1.avif",
    "/img/Photo2.avif"
  ];
  //Troca das fotos
    useEffect(() => {
      const interval = setInterval(() => {
        setPhotoIndex((prev) => (prev + 1) % slideshow.length);
      }, 5000);
      return () => clearInterval(interval);
    }, []);


  // Atualiza o progresso da música
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, [currentTrack]);

  // Alterna play/pause ao clicar na música
  const handleTrackClick = (index) => {
    const audio = audioRef.current;

    // Se for a mesma música, alterna play/pause
    if (index === currentTrack) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
      return;
    }

    // Troca de música
    setCurrentTrack(index);
    setTimeout(() => {
      audio.play();
      setIsPlaying(true);
    }, 100);
  };
    return (
    <>
    {/* Tela Inicial */}
    {visible && (
      <div className="relative flex flex-col w-screen h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#C2E9FB] to-[#A1C4FD]">
        <Baubbles />
        <div className="z-10 flex flex-col items-center">
          <img src={present} alt="Presente" className="w-52 h-52 md:w-72 md:h-72 cursor-pointer transition-transform duration-300 hover:scale-110" onClick={handleOpenGift}/>
          <p className="text-2xl md:text-4xl text-white italic mt-6 [text-shadow:2px_2px_6px_#000000]">
            Toque para abrir seu presente
          </p>
        </div>
      </div>
    )}
    {/* Tela 2 */}
    {visibleSecond && (
        <div className="relative flex flex-row w-screen h-screen items-center justify-evenly overflow-hidden bg-linear-to-br from-[#C2E9FB] to-[#A1C4FD]">
          <Baubbles />
          <div className="flex flex-wrap justify-center items-center gap-8 w-full min-h-screen bg-linear-to-br from-[#C2E9FB] to-[#A1C4FD] p-6">
              {/* CARD 1 */}
            <Card className="w-[80%] max-w-[320px] h-[220px] sm:w-[45%] sm:h-[400px] lg:w-[350px] lg:h-[450px] cursor-pointer flex items-center justify-center transition-transform duration-300 hover:scale-105">
              <div className="flex flex-col items-center justify-center w-full h-full" onClick={() => {setVisibleSecond(false); setVisibleLetter(true);}}>
                <img src={LetterImg} alt="image Carta" className="w-1/2 sm:w-2/3h-auto object-contain" />
                <p className="text-4xl sm:text-5xl text-white italic mt-6 [text-shadow:2px_2px_6px_#000000]">Carta</p>
              </div>
            </Card>
              {/* CARD 2 */}
            <Card className="w-[80%] max-w-[320px] h-[220px] sm:w-[45%] sm:h-[400px] lg:w-[350px] lg:h-[450px] cursor-pointer flex items-center justify-center transition-transform duration-300 hover:scale-105">
              <div className="flex flex-col items-center justify-center w-full h-full" onClick={() => {setVisibleSecond(false); setVisiblePhoto(true);}}>
                <img src={PhotoImg} alt="image Portrait" className="w-1/2 sm:w-2/3 h-auto object-contain" />
                <p className="text-4xl sm:text-5xl text-white italic mt-6 [text-shadow:2px_2px_6px_#000000]">Fotos</p>
              </div>
            </Card>
              {/* CARD 3 */}
            <Card className="w-[80%] max-w-[320px] h-[220px] sm:w-[45%] sm:h-[400px] lg:w-[350px] lg:h-[450px] cursor-pointer flex items-center justify-center transition-transform duration-300 hover:scale-105">
              <div className="flex flex-col items-center justify-center w-full h-full" onClick={() => {setVisibleSecond(false); setVisiblePlay(true);}}>
                <img src={PlayImg} alt="image Play" className="w-1/2 sm:w-2/3 h-auto object-contain" />
                <p className="text-4xl sm:text-5xl text-white italic mt-6 [text-shadow:2px_2px_6px_#000000]">Músicas</p>
              </div>
            </Card>
          </div>
        </div>
    )}
    {/* Tela Carta */}
    {visibleLetter && (
      <div className="relative flex flex-row w-screen h-screen items-center justify-evenly overflow-hidden bg-linear-to-br from-[#C2E9FB] to-[#A1C4FD]">
        <Baubbles />
          <div className="flex flex-col w-15 h-15 bg-white/60 backdrop-blur-sm absolute z-11 items-center justify-center left-2 top-2 rounded-full border border-solid border-white sm:left-5 sm:top-5 lg:w-20 lg:h-20 cursor-pointer hover:scale-110 transition duration-200 ease-in"  onClick={() => {setVisibleLetter(false); setVisibleSecond(true);}}>
            <ArrowBigLeft className="text-black w-10 h-10"/>
          </div>
          <div className="absolute z-index-12 flex flex-col w-[80%] h-[600px] max-w-[1100px] max-h-[650px] bg-white p-10 justify-between">
            <div className="flex flex-col">
              <p className="h1 text-2xl sm:text-3xl font-bold">Feliz Aniversário</p>
              <p className="text-1xl sm:text-2xl">Texttext</p>
            </div>
            <div className="flex flex-col border-t border-black text-end">
              <p>De:</p>
            </div>
          </div>
      </div>
    )}
    {/* Tela Fotos */}
    {visiblePhoto && (
  <div className="relative flex flex-row w-screen h-screen items-center justify-evenly overflow-hidden bg-gradient-to-br from-[#C2E9FB] to-[#A1C4FD]">
    <Baubbles />

    {/* Botão de voltar */}
    <div
      className="flex flex-col w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/60 backdrop-blur-sm absolute z-10 items-center justify-center left-3 top-3 rounded-full border border-solid border-white cursor-pointer hover:scale-110 transition duration-200 ease-in"
      onClick={() => {
        setVisiblePhoto(false);
        setVisibleSecond(true);
      }}
    >
      <ArrowBigLeft className="text-black w-8 h-8 sm:w-10 sm:h-10" />
    </div>

    {/* Container principal */}
    <div className="flex flex-col md:flex-row items-center justify-center w-full min-h-screen bg-gradient-to-br from-[#A1C4FD] to-[#C2E9FB] p-6 gap-6">

      {/* Imagem esquerda */}
      <div className="flex justify-center w-full md:w-1/3">
        <img
          src="https://seu-link-aqui.com/foto1.jpg"
          alt="Foto 1"
          className="w-56 h-72 sm:w-64 sm:h-80 lg:w-72 lg:h-96 object-cover rounded-2xl shadow-lg transform rotate-[-3deg] hover:rotate-0 transition duration-500"
        />
      </div>

      {/* Imagem central (maior) */}
      <div className="flex justify-center w-full md:w-1/3">
        <img
          src="https://seu-link-aqui.com/foto2.jpg"
          alt="Foto 2"
          className="w-64 h-80 sm:w-80 sm:h-[26rem] lg:w-[22rem] lg:h-[30rem] object-cover rounded-2xl shadow-2xl transform rotate-[2deg] hover:rotate-0 transition duration-500"
        />
      </div>

      {/* Imagem direita */}
      <div className="flex justify-center w-full md:w-1/3">
        <img
          src="https://seu-link-aqui.com/foto3.jpg"
          alt="Foto 3"
          className="w-56 h-72 sm:w-64 sm:h-80 lg:w-72 lg:h-96 object-cover rounded-2xl shadow-lg transform rotate-[4deg] hover:rotate-0 transition duration-500"
        />
      </div>
    </div>
  </div>
)}
    {/* Tela Play */}
    {visiblePlay && (
  <div className="relative flex flex-col w-screen h-screen items-center justify-evenly overflow-hidden bg-linear-to-br from-[#C2E9FB] to-[#A1C4FD]">
    <div className="flex flex-col w-screen h-screen bg-linear-to-b from-[#A1C4FD] to-[#C2E9FB] items-center p-6 overflow-y-auto">
      <div className="flex flex-col lg:flex-row gap-6 w-full justify-center items-center mb-8">
        
        {/* CAPA */}
        <div className="bg-white/60 rounded-2xl backdrop-blur-sm shadow-md w-full lg:w-1/5 lg:h-[300px] aspect-square flex items-center justify-center">
          {currentTrack !== null ? (
            <img
              src={tracks[currentTrack].cover}
              alt="Capa da música"
              className="rounded-xl w-[70%] h-[70%] object-cover shadow-lg"
            />
          ) : (
            <p className="text-white italic text-center p-4">Escolha uma música</p>
          )}
        </div>

        {/* SLIDESHOW */}
        <div className="bg-white/60 rounded-2xl backdrop-blur-sm shadow-md w-full lg:w-1/3 aspect-square flex items-center justify-center">
          <img
            src={slideshow[photoIndex]}
            alt="Slideshow"
            className="rounded-xl w-[90%] h-[90%] object-cover transition-opacity duration-700 ease-in-out"
          />
        </div>
          </div>
          <div className="flex flex-col lg:flex-col gap-6 w-full justify-center items-center mb-8">
        {/* LISTA DE MÚSICAS */}
        <div className="w-full lg:w-3/4 flex flex-col gap-4 mt-10">
          {tracks.map((track, index) => (
            <div
              key={index}
              onClick={() => handleTrackClick(index)}
              className={`flex items-center gap-4 bg-white/30 backdrop-blur-sm rounded-xl px-4 py-3 cursor-pointer transition hover:bg-white/50 ${
                index === currentTrack ? "border-2 border-white" : ""
              }`}
            >
              <Play
                className={`w-6 h-6 ${
                  isPlaying && index === currentTrack
                    ? "text-green-600"
                    : "text-black"
                }`}
              />
              <div className="flex flex-col w-full">
                <p className="text-black text-lg font-semibold">{track.title}</p>
                <div className="h-1 bg-white/50 rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-1 bg-white rounded-full transition-all duration-300"
                    style={{
                      width:
                        index === currentTrack ? `${progress || 0}%` : "0%",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Áudio */}
        <audio
          ref={audioRef}
          src={currentTrack !== null ? tracks[currentTrack].src : ""}
        />
      </div>

      {/* Botão Voltar */}
      <div
        className="flex flex-col w-15 h-15 bg-white/60 backdrop-blur-sm absolute z-11 items-center justify-center left-2 top-2 rounded-full border border-solid border-white sm:left-5 sm:top-5 lg:w-20 lg:h-20 cursor-pointer hover:scale-110 transition duration-200 ease-in"
        onClick={() => {
          setVisiblePlay(false);
          setVisibleSecond(true);
        }}
      >
        <ArrowBigLeft className="text-black w-10 h-10" />
      </div>
    </div>
  </div>
)}
  </>
);
}

 export default Homepage;