import React, { useContext} from 'react'
import { MovieContext } from '../components/context/MovieContext'
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';


const MovieAllList = () => {
    const movies = useContext(MovieContext);

  return (
    <div className='font-dmsans text-white mt-52 px-10'>
        <p className='text-4xl font-bold'>Explore Movies</p>
        <p  className='mt-4 text-lg'>Find the best collection of ours.</p>
        
        <div className="container mt-8 mx-auto">
            <div className="grid grid-cols-4 gap-12">
                    {movies.map(item => (
                        <div className="font-dmsans" key={item.id}>
                          <Link to={`/movies/${item.id}/description`}>
                                <MovieCard {...item} />
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    </div>
  )
}

export default MovieAllList