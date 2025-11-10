import { useState, useRef, useEffect  } from "react";
import { Play, ChevronRight, ChevronLeft, ArrowBigLeft } from "lucide-react";
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
    { title: "Foster The People - Static Space Lover", src: "/sounds/Foster The People - Static Space Lover (Audio).mp3", cover: "/img/Cover1.jpg"},
    { title: "O Terno - pra sempre será", src: "/sounds/O Terno - pra sempre será.mp3", cover: "/img/Cover2.png"},
    { title: "Vacations - Telephones", src: "/sounds/Vacations - Telephones.mp3", cover: "/img/Cover3.avif"}
  ];
  const slideshow = [
    "/img/PhotoCarrossel1 (1).jpeg",
    "/img/PhotoCarrossel1 (2).jpeg",
    "/img/PhotoCarrossel1 (3).jpeg",
    "/img/PhotoCarrossel1 (4).jpeg",
    "/img/PhotoCarrossel1 (5).jpeg",
    "/img/PhotoCarrossel1 (6).jpeg"
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
      //Carrosel de Imagem
     const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    const scrollAmount = clientWidth * 0.9;
    carouselRef.current.scrollTo({
      left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  const imagens = [
    "/img/PhotoCarrossel1 (1).jpeg",
    "/img/PhotoCarrossel1 (2).jpeg",
    "/img/PhotoCarrossel1 (3).jpeg",
    "/img/PhotoCarrossel1 (4).jpeg",
    "/img/PhotoCarrossel1 (5).jpeg",
    "/img/PhotoCarrossel1 (6).jpeg"
  ];
    return (
    <>
    {/* Tela Inicial */}
    {visible && (
      <div className="relative flex flex-col w-screen h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#C2E9FB] to-[#A1C4FD]">
        <Baubbles />
        <div className="z-10 flex flex-col items-center">
          <img src={present} alt="Presente" className="w-52 h-52 md:w-72 md:h-72 cursor-pointer transition-transform duration-300 hover:scale-110" onClick={handleOpenGift}/>
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
                <img src={LetterImg} alt="image Carta" className="w-1/2 sm:w-2/3 h-auto object-contain" />
              </div>
            </Card>
              {/* CARD 2 */}
            <Card className="w-[80%] max-w-[320px] h-[220px] sm:w-[45%] sm:h-[400px] lg:w-[350px] lg:h-[450px] cursor-pointer flex items-center justify-center transition-transform duration-300 hover:scale-105">
              <div className="flex flex-col items-center justify-center w-full h-full" onClick={() => {setVisibleSecond(false); setVisiblePhoto(true);}}>
                <img src={PhotoImg} alt="image Portrait" className="w-1/2 sm:w-2/3 h-auto object-contain" />
              </div>
            </Card>
              {/* CARD 3 */}
            <Card className="w-[80%] max-w-[320px] h-[220px] sm:w-[45%] sm:h-[400px] lg:w-[350px] lg:h-[450px] cursor-pointer flex items-center justify-center transition-transform duration-300 hover:scale-105">
              <div className="flex flex-col items-center justify-center w-full h-full" onClick={() => {setVisibleSecond(false); setVisiblePlay(true);}}>
                <img src={PlayImg} alt="image Play" className="w-1/2 sm:w-2/3 h-auto object-contain" />
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
  <div className="relative z-10 flex flex-col w-full max-w-[1100px] bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-10 shadow-lg overflow-y-auto max-h-[85vh]">
    <div className="flex flex-col space-y-4">
      <p className="text-2xl sm:text-3xl font-bold text-center">FELIZ ANIVERSÁRIO, AMOR!</p>

      <p className="text-base sm:text-lg text-justify leading-relaxed">
        Oi, mo. Feliz aniversário. Espero que o seu dia seja leve e cheio de boas surpresas e que você se
        saia bem naquela prova difícil que vem comentando.
        <br />
        <br />
        Quero aproveitar essa data para te agradecer por ser quem você é. Admiro demais o homem dedicado
        e responsável que você é. Você trabalha tanto, sempre pensando no melhor para você e agora para a
        sua mãe, e faz isso com uma maturidade que me inspira.
        <br />
        <br />
        Agora começa uma nova fase, com a mudança de casa e tudo o que vem junto, novos desafios, novas
        conquistas, novos começos. Espero que essa jornada traga ainda mais tranquilidade, conforto e
        espaço para você crescer.
        <br />
        <br />
        Você é muito especial para mim. Sempre que olho para você, tenho certeza de que vai conquistar
        coisas incríveis no futuro.
        <br />
        <br />
        A cada dia, encontro novos motivos para me encantar por você. A forma como sua mente funciona me
        fascina — você aprende de um jeito tão diferente, tão seu — e sempre tem algo que me faz pensar.
        O modo como você enxerga o mundo é único, e isso desperta em mim uma vontade enorme de aprender e
        ver as coisas sob a sua perspectiva também.
      </p>

      <p className="italic font-bold text-2xl sm:text-3xl text-center text-[#0a0a0a] mt-4">
        EU TE AMO!!!!!!!!
      </p>
    </div>

    <div className="flex flex-col border-t border-black mt-6 pt-2 text-end">
      <p className="text-sm sm:text-base">De: Ana</p>
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

   <div className="relative w-full bg-gradient-to-b from-blue-100 to-blue-200 py-10 flex justify-center items-center">
      {/* Botão esquerdo */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 md:left-5 z-10 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition active:scale-90"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Carrossel */}
      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto scroll-smooth px-8 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-transparent"
      >
        {imagens.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-56 sm:w-64 md:w-72 lg:w-80 snap-center flex justify-center"
          >
            <img
              src={src}
              alt={`Foto ${i + 1}`}
              className={`object-cover rounded-2xl shadow-xl w-full h-72 sm:h-80 md:h-96 transform ${
                i % 3 === 0
                  ? "rotate-[-3deg]"
                  : i % 3 === 1
                  ? "rotate-[2deg]"
                  : "rotate-[4deg]"
              } hover:rotate-0 transition duration-500`}
            />
          </div>
        ))}
      </div>

      {/* Botão direito */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 md:right-5 z-10 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition active:scale-90"
      >
        <ChevronRight size={28} />
      </button>
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