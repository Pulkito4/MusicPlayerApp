import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { geoApiKey } from "../conf/conf";

import { Error, Loader, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

const AroundYou = () => {
	const [country, setCountry] = useState("");
	const [loading, setLoading] = useState(true);
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const { data, isFetching, error } = useGetSongsByCountryQuery(country, 50);

	useEffect(() => {
		// getting our country from the API
		// at_k8ge84n302q5Kik2Uz23aaz7vGuhb
		axios
			.get(
				`https://geo.ipify.org/api/v2/country?apiKey=${geoApiKey}`
			)
			.then((res) => setCountry(res?.data?.location?.country))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, [country]);

	if (isFetching && loading)
		return <Loader title="Loading Songs Around You" />;

	if (error && country) return <Error />;

	return (
		<div className=" flex flex-col">
			<h2 className=" font-bold text-3xl text-white text-left mt-4 mb-10">
				Around You 
				<span className=" font-black"> {country}</span>
			</h2>

			<div className=" flex flex-wrap sm:justify-start justify-center gap-8">
				{data?.map((song, i) => (
					<SongCard
						key={song.key}
						song={song}
						isPlaying={isPlaying}
						activeSong={activeSong}
						data={data}
						i={i}
					/>
				))}
			</div>
		</div>
	);
};

export default AroundYou;
