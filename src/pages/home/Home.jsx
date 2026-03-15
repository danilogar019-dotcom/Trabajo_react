import React from 'react';
import Hero from '../../components/hero/Hero';
import Stats from '../../components/stats/Stats';
import Destinations from '../../components/destinations/Destinations';
import Newsletter from '../../components/newsletter/Newsletter';
import Forum from '../../components/forum/Forum';
import Services from '../../components/services/Services';
import Gallery from '../../components/gallery/Gallery';
import Testimonials from '../../components/testimonials/Testimonials';

const Home = () => {
    return (
        <div className="home-page">
            <Hero />
            <Stats />
            <Services />
            <Destinations />
            <Gallery />
            <Forum />
            <Testimonials />
            <Newsletter />
        </div>
    );
};

export default Home;
