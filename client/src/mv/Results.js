import React, { useEffect, useState } from 'react';
import './results.css';
import axios from './axios';
import VideoCard from './VideoCard';

function Results({ selectedOption }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(selectedOption);
            setMovies(request.data.results);
            return  request;
        }
        fetchData();
    }, [selectedOption]);

    return (
        <div className='results'>
            {movies.map((movie) => (
                <VideoCard key={movie.id} movie={movie} />
            ))}
        </div>
    )
}

export default Results
