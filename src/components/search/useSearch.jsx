import { useEffect, useState } from "react";
import { getArtistDetails, getTopTenSongs } from "../../api";

export const useSearch = (query) => {
    const [songData, setSongData] = useState([]);
    const [artistData, setArtistData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);

    useEffect(() => {
        const fetchArtistDetails = async () => {
            try {
                const data = await getArtistDetails(query);
                setArtistData(data.artists);
            } catch (err) {
                setNotFound(true);
            }
        }
        fetchArtistDetails();
    },[]);

    useEffect(() => {
        if (artistData?.items[0]?.id) {
            const fetchTopTenSongs = async () => {
                try {
                    const data = await getTopTenSongs(artistData?.items[0]?.id);
                    setIsLoading(false);
                    setSongData(data.tracks);
                } catch (err) {
                    setIsLoading(false);
                }
            }
            fetchTopTenSongs();
        }
        if(artistData && !artistData.items.length) {
            setNotFound(true);
        }
    },[artistData]);

    return {
        songData,
        artistData,
        isLoading,
        notFound,
        currentSong,
        setCurrentSong
    }
}