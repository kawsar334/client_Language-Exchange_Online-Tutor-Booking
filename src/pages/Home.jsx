import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Hero } from '../components/Hero';
import Products from '../components/producs/Products';
import HomeContents from '../components/childrenComponents/HomeContents';
import LanguageCategory from '../components/LanguageCategory';
import ReviewsSection from '../components/Reviews';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import FAQ from '../FAQ';
import LottieExample from '../components/Sidebar';
import Stats from '../components/States';
import useFetch from '../data/UseFetch';
import { toast } from 'react-toastify';
import TutorComponent from '../components/TutorsComponent';
import Spiner from '../components/Spiner';
import Services from '../components/Services';


const Home = () => {

    const [categories, setCategories] = useState([])

    const { data, loading, error } = useFetch(`https://server-wheat-xi.vercel.app/allproducts`);
    const [uniqueTutor, setUniqueTutor] = useState([])


    useEffect(() => {
        if (data?.data) {
            const tutor = Array.from(new Set(data?.data.map(item => item)));
            setUniqueTutor(tutor.slice(0,9));
            const uniqueCategories = Array.from(new Set(data?.data.map(item => item.language)));
            setCategories([ ...uniqueCategories]);
        }

    }, [data?.data]);

    if (loading) {
       return <Spiner/>
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Hero  uniqueTutor={uniqueTutor}/>
            <Stats LanguagesOffered={categories?.length} />
            <LanguageCategory categories={categories}/>
            <TutorComponent uniqueTutor={uniqueTutor}/>
            <Services/>
            <FAQ />
            <Testimonials />
            <ReviewsSection />
            {/* <About /> */}
        </div>
    );
};

export default Home;
