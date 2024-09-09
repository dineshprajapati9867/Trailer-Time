import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzMyNTAyZTU0ZDg4MWYyNWVkN2NmYTllMjM1YTFjNCIsInN1YiI6IjY1Y2Y3NmU0NjBjNzUxMDE2MjY5MWNjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FvN7wCEzPLncv47dl3VI45jLE_b6pqHX0RbPpuoCMXA";

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url,params) => {
try{
const {data} = await axios.get(BASE_URL + url,{
    headers,
    params,
});
return data;
}catch(err){
    console.log(err);
    return err;
}
};