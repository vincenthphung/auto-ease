import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function MainPage() {
    const slides = [
        "https://di-uploads-pod14.dealerinspire.com/toyotaoforlando/uploads/2021/08/auto-mechanic-1024x684.jpeg",
        "https://static.cargurus.com/images/article/2019/09/13/14/35/how_to_talk_to_a_mechanic-pic-8471425371895651297-1600x1200.jpeg",
        "https://di-uploads-pod14.dealerinspire.com/toyotaoforlando/uploads/2021/08/auto-mechanic-1024x684.jpeg",


    ];

    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        adaptiveHeight: true,
    };

    return (
        <div className="text-center py-10 bg-neutral-light">
            <h1 className="text-5xl font-bold mb-6 text-primary-dark">Welcome to AutoEase</h1>
            <p className="text-lg mb-8 text-gray-700"> The premiere solution for automobile dealership management!</p>

            <div className="max-w-4xl mx-auto overflow-hidden relative rounded-lg shadow-lg">
                <Slider {...carouselSettings}>
                    {slides.map((slide, index) => (
                        <div key={index} className="h-96">
                            <img src={slide} alt={`Slide ${index}`} className="w-full h-full object-cover rounded-lg"/>
                        </div>
                    ))}
                </Slider>
            </div>

            <div className="flex justify-center gap-4 mt-12">
                {/* Example buttons (uncomment and modify the href as needed) */}
                {/*<a href="/shoes" className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out">Explore Shoes</a>*/}
                {/*<a href="/hats" className="bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out">Discover Hats</a>*/}
            </div>
        </div>
    );
}

export default MainPage;
