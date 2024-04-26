import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { rapidApiKey } from "../../conf/conf";

export const shazamCoreApi = createApi({
	reducerPath: "shazamCoreApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://shazam-core7.p.rapidapi.com",
		prepareHeaders: (headers) => {
			headers.set(
				"X-RapidAPI-Key",
				`${rapidApiKey}`
			);

			return headers;
		},
	}),

	endpoints: (builder) => ({
		getTopCharts: builder.query({
			query: () => "/charts/get-top-songs-in-world",
		}),
		getSongsByGenre: builder.query({
			query: (genre) =>
				`/charts/get-top-songs-in_world_by_genre?genre_id=${genre}`,
		}),
		getSongDetails: builder.query({
			query: ({ songid }) => `/songs/get_details?id=${songid}`,
		}),
		getSongRelated: builder.query({
			query: ({ songid, limit }) =>
				`/songs/list-recommendations?id=${songid}&limit=${limit}`,
		}),
		getArtistDetails: builder.query({
			query: (artistid) => `/artists/get-details?id=${artistid}`,
		}),
		getSongsByCountry: builder.query({
			query: (country_code, limit) =>
				`/charts/get-top-songs-in-country?country_code=${country_code}&limit=${limit}`,
		}),
		getSongsBySearch: builder.query({
			query: (term) => `/search?term=${term}`,
		}),
	}),
});

export const {
	useGetTopChartsQuery,
	useGetSongDetailsQuery,
	useGetSongRelatedQuery,
	useGetArtistDetailsQuery,
	useGetSongsByCountryQuery,
	useGetSongsByGenreQuery,
	useGetSongsBySearchQuery,
} = shazamCoreApi;
