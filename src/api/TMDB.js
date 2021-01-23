import axios from 'axios';

const url = 'https://api.themoviedb.org/3/';
const apiKey = '66b29f413d7110de3ec0c1bdaec3b5d1';

export const fetchMovies = async (search, movies) => {
    if (!search) {
        const response = await axios.get(`${url}movie/now_playing?api_key=${apiKey}&language=en-US`);
        return [...movies, ...response.data.results];
    } else {
        const response = await axios.get(`${url}search/movie?api_key=${apiKey}&language=en-US&query=${search}`);
        return [...response.data.results];
    }
}

export const fetchCredits = async (id) => {
    const response = await axios.get(`${url}movie/${id}/credits?api_key=${apiKey}`)

    const director = response.data.crew.find(
        (dir) => dir.known_for_department === "Directing"
    );

    const credits = response.data;
    return { director: director, credits: credits };
}

export const fetchPopularMovies = async (search, movies) => {
    if (!search) {
        const response = await axios.get(`${url}movie/popular?api_key=${apiKey}&language=en-US`);
        return [...movies, ...response.data.results];
    } else {
        const response = await axios.get(`${url}search/movie?api_key=${apiKey}&language=en-US&query=${search}`);
        return [...response.data.results];
    }
}