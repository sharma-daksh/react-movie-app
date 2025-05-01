import React,{useEffect, useRef} from 'react';
import bgImage from './bg.movierealm.jpg';
import '../App.css'

function Home() {

  const containerRef=useRef(null)

  useEffect(()=>{
    const container =containerRef.current;
    container.innerHTML='';

    for (let i = 0; i < 100; i++) {
      let dots = document.createElement('div');
      dots.classList.add("element")
      container.appendChild(dots)     
    }

    let dotsAll =container.querySelectorAll('.element')
    let animation =anime.timeline({
      targets:dotsAll,
      easing: 'easeInOutExpo',
      loop:true,
      delay: anime.stagger(100,{grid:[10,10],from:'center'})
    })

    animation.add({
      rotateZ:180,
      translateY:anime.stagger(0,{grid:[10,10],from:'center',axis:'y'}),
      translateX:anime.stagger(0,{grid:[10,10],from:'center',axis:'x'}),
      opacity:1,
    })
    .add({
      borderRadius:50,
    })
    .add({
      scale:0.2,
      opacity:0.2,
    })
    .add({
      rotateZ:180,
      translateY:anime.stagger(0,{grid:[10,10],from:'center',axis:'y'}),
      translateX:anime.stagger(0,{grid:[10,10],from:'center',axis:'x'}),
      opacity:1,
    })
    .add({
      scale:1,
      borderRadius:0,
    })
    .add({
      rotateZ:-90,
    })



  },[])

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white flex items-center justify-center py-10 relative" // Added relative positioning
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div> {/* Semi-transparent black overlay */}

      {/* Content */}
      <div className="text-center px-4 relative z-10"> {/* Added relative positioning and z-index */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-yellow-400 animate-pulse">🎬 Welcome to MOVIEREALM!</h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
          Browse movies, add them to your watchlist, and never miss a great film again.
        </p>
        <a
          href="/search"
          className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Start Exploring
        </a>
      </div>
      {/* animejs */}
      <div className="container" ref={containerRef}>
      Fuck you

      </div>
    </div>
  );
}

export default Home;
