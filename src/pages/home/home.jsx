import { useState, useRef, useEffect  } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import Card from "../../components/card";
import present from "/img/presente.png";
import confetti from "canvas-confetti";
import popSound from "/sounds/pop.mp3";
import PlayImg from "/img/Play.png"
import PhotoImg from "/img/Photo.png"
import LetterImg from "/img/Letter.png"
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

  //Musica
  const [currentTrack, setCurrentTrack] = useState(0);
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

  // Troca automática das fotos
  useEffect(() => {
    const interval = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % slideshow.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Atualiza o progresso da música
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return; // <— impede erro antes do áudio existir
  
    const updateProgress = () => setProgress((audio.currentTime / audio.duration) * 100 || 0);
    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, [currentTrack]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

const skipTrack = (direction) => {
  let newTrack = currentTrack + direction;
  if (newTrack < 0) newTrack = tracks.length - 1;
  if (newTrack >= tracks.length) newTrack = 0;

  setProgress(0); // <— reseta barra de progresso
  setCurrentTrack(newTrack);
  setIsPlaying(false);
  setTimeout(() => {
    audioRef.current.play();
    setIsPlaying(true);
  }, 100);
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
        <div className="flex flex-wrap justify-center items-center gap-8 w-full min-h-screen bg-gradient-to-br from-[#C2E9FB] to-[#A1C4FD] p-6">
  {/* CARD 1 */}
  <Card className="w-[80%] max-w-[320px] h-[220px] sm:w-[45%] sm:h-[400px] lg:w-[350px] lg:h-[450px] cursor-pointer flex items-center justify-center"
        >
    <div className="flex flex-col items-center justify-center w-full h-full" onClick={() => {setVisibleSecond(false); setVisibleLetter(true);}}>
      <img src={LetterImg} alt="image Carta" className="w-1/2 sm:w-2/3h-auto object-contain" />
      <p className="text-4xl sm:text-5xl text-white italic mt-6 [text-shadow:2px_2px_6px_#000000]">Carta</p>
    </div>
  </Card>

  {/* CARD 2 */}
  <Card className="w-[80%] max-w-[320px] h-[220px] sm:w-[45%] sm:h-[400px] lg:w-[350px] lg:h-[450px] cursor-pointer flex items-center justify-center"
        >
    <div className="flex flex-col items-center justify-center w-full h-full" onClick={() => {setVisibleSecond(false); setVisiblePhoto(true);}}>
      <img src={PhotoImg} alt="image Portrait" className="w-1/2 sm:w-2/3 h-auto object-contain" />
      <p className="text-4xl sm:text-5xl text-white italic mt-6 [text-shadow:2px_2px_6px_#000000]">Fotos</p>
    </div>
  </Card>

  {/* CARD 3 */}
  <Card className="w-[80%] max-w-[320px] h-[220px] sm:w-[45%] sm:h-[400px] lg:w-[350px] lg:h-[450px] cursor-pointer flex items-center justify-center"
        >
    <div className="flex flex-col items-center justify-center w-full h-full" onClick={() => {setVisibleSecond(false); setVisiblePlay(true);}}>
      <img src={PlayImg} alt="image Play" className="w-1/2 sm:w-2/3 h-auto object-contain" />
      <p className="text-4xl sm:text-5xl text-white italic mt-6 [text-shadow:2px_2px_6px_#000000]">Músicas</p>
    </div>
  </Card>
</div>
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
            <p className="text-white">Voltar</p>
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
            <div className="flex flex-col w-[100px] h-[100px] bg-amber-800 absolute z-11 items-start justify-start justify-items-start" onClick={() => {setVisiblePhoto(false); setVisibleSecond(true);}}>
            <p className="text-white">Voltar</p>
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
            <div className="flex flex-col w-screen h-screen bg-gradient-to-b from-[#A1C4FD] to-[#C2E9FB] items-center p-6 overflow-y-auto">
      <div className="flex flex-col lg:flex-row gap-6 w-full justify-center mb-8">
        {/* CAPA */}
        <div className="bg-white/60 rounded-2xl backdrop-blur-sm shadow-md w-full lg:w-1/3 aspect-square flex items-center justify-center">
          <img
            src={tracks[currentTrack].cover}
            alt="Capa da música"
            className="rounded-xl w-[90%] h-[90%] object-cover shadow-lg"
          />
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

      {/* LISTA DE MÚSICAS */}
      <div className="w-full lg:w-3/4 flex flex-col gap-4">
        {tracks.map((track, index) => (
          <div
            key={index}
            onClick={() => { setCurrentTrack(index); setIsPlaying(true); audioRef.current.play(); }}
            className={`flex items-center gap-4 bg-white/30 backdrop-blur-sm rounded-xl px-4 py-3 cursor-pointer transition hover:bg-white/50 ${
              index === currentTrack ? "border-2 border-white" : ""
            }`}
          >
            <Play className="text-white w-6 h-6" />
            <div className="flex flex-col w-full">
              <p className="text-white text-lg font-semibold">{track.title}</p>
              <div className="h-1 bg-white/50 rounded-full mt-1 overflow-hidden">
                <div
                  className={`h-1 bg-white rounded-full transition-all duration-300`}
                  style={{
                    width: index === currentTrack ? `${progress}%` : "0%",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CONTROLES */}
      <div className="flex items-center justify-center gap-6 mt-10">
        <SkipBack className="text-white w-8 h-8 cursor-pointer" onClick={() => skipTrack(-1)} />
        {isPlaying ? (
          <Pause className="text-white w-10 h-10 cursor-pointer" onClick={togglePlay} />
        ) : (
          <Play className="text-white w-10 h-10 cursor-pointer" onClick={togglePlay} />
        )}
        <SkipForward className="text-white w-8 h-8 cursor-pointer" onClick={() => skipTrack(1)} />
      </div>

      <audio ref={audioRef} src={tracks[currentTrack].src} />
    </div>
            <div className="flex flex-col w-[100px] h-[100px] bg-amber-800 absolute z-11 items-start justify-start justify-items-start" onClick={() => {setVisiblePlay(false); setVisibleSecond(true);}}>
            <p className="text-white">Voltar</p>
            </div>
            </div>
    )}
  </>
);
}

 export default Homepage;