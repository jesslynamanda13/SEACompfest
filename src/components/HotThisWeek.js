import React, {useState, useEffect} from 'react'
import axios from 'axios';
import video from '../assets/trailer.mp4'

const HotThisWeek = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get('https://seleksi-sea-2023.vercel.app/api/movies')
        .then(response => {
            const filteredData = response.data.filter(item => item.id === 19);
            setMovies(filteredData);
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
    }, []);
  return (
    <div>
        
        <div className = "mt-20 relative">
            {movies.map(item =>(
                <div className="font-dmsans" key={item.id}>
                    <div className = "flex flex-row justify-between gap-96 text-justify items-end">
                        <div className = "ml-4 text">
                            <p className="inline-block rounded-full bg-red-600 font-dmsans text-white text-sm font-semibold p-2">
                                HOT THIS WEEK! 🔥
                            </p>
                            <p className="mt-8 text-4xl font-semibold text-white">{item.title}</p>
                            <p className= "mt-4 text-md text-white">{item.description}</p>
                            <button className = "mt-8 border p-2 px-8 rounded-full text-white">Buy Ticket</button>
                        </div>
                        <img className = "w-72 mr-4 mt-2   object-cover rounded transform transition-transform duration-200 hover:scale-105" src={item.poster_url} alt={item.title} />
                    </div>
                     
                     
                </div>
            ))}
        </div>
        
    </div>
  )
}

export default HotThisWeek