// import React from 'react'
// import { useLocation } from 'react-router-dom'
// import useFetch from '../data/UseFetch';

// const FindTutorials = () => {


//     const cat = useLocation().pathname.split("/")[2];
   
//     const { data, loading, error } = useFetch(`https://server-wheat-xi.vercel.app/findLanguage?language=${cat}`);
//     console.log(cat, data?.data)
//   return (
//     <div>FindTutorials</div>
//   )
// }

// export default FindTutorials
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useFetch from '../data/UseFetch';
import Spiner from '../components/Spiner';

const FindTutorials = () => {

    const cat = useLocation().pathname.split("/")[2];

    const { data, loading, error } = useFetch(`https://server-wheat-xi.vercel.app/findLanguage?language=${cat}`);

    if (loading) return <Spiner/>;
    if (error) return <div>something went wron please wait...</div>;

    return (
        
        <div className=" w-full">
            <h2 className='w-full text-center text-3xl my-[30px] font-semibold'>Tutors in {cat}</h2>
            <div className='flex justify-center items-center gap-4 w-[80%] py-10  m-auto flex-wrap'>
            {data?.data?.map((tutor) => (
                <div key={tutor._id} className=" border md:border-none w-full md:w-[47%] lg:w-[27%] shadow  card p-4 flex justify-start items-start gap-2 flex-col ">
                    <img src={tutor.image} alt={tutor.name} className='w-full h-[150px] rounded-[10px] object-cover' />
                    <h3>{tutor.name}</h3>
                    <p>Language: {tutor.language}</p>
                    <p>Review: {tutor.review}</p>
                    <p><b>Price:</b>${tutor.price}</p>

                    <p>{tutor.details}</p>
                    <Link to={`/tutor/${tutor.email}`} className='border py-1 px-5  rounded-[5px] bg-teal'>View Details</Link>
                </div>
            ))}
            </div>
        </div>
    );
};

export default FindTutorials;
