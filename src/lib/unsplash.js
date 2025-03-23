import { createApi } from 'unsplash-js'
// import nodeFetch from 'node-fetch'

const unsplash = createApi({
	accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
	// fetch: nodeFetch,
})

export default unsplash
