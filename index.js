require('dotenv').config()
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 8000;
const { USER_ID, API_KEY, NODE_ENV } = process.env;

app.get('/', (request, response) => {
	return fetch(
		[
			`https://api.flickr.com/services/rest/?`,
			`user_id=${USER_ID}&`,
			`method=flickr.people.getPhotos&`,
			`api_key=${API_KEY}&`,
			`per_page=8&`,
			`format=json&`,
			`nojsoncallback=1`,
		].join(''))
		.then((res) => {
		    return res.json();
		}).then((data) => {
		  const urls = data.photos.photo.map((photo) => {
		  	const { farm, server, id, secret } = photo;
		  	return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
		  });
		  return response.send(renderPage(urls));
		});
});

const renderPage = (urls) => {
	return `
		<html>
		<body style="background-color: yellow; overflow:hidden;">
			<img style="height: 10rem; float: right;" src="http://resources.mynewsdesk.com/image/upload/c_limit,dpr_1.0,f_auto,h_700,q_auto,w_690/dedqeqnhghzdbrcw5pxa.jpg">
			<div style="width: 100%; margin: 0 auto; display: flex;">
				${ getImages(urls) }
			</div>
		<body>
		<html>`
};
const getImages = (urls) => {
	return `
		<div style="padding-right: .5rem;">
			<img style="width: 100%; padding-bottom: .5rem;" src=${ urls[0] }>
			<img style="width: 100%; padding-bottom: .5rem;" src=${ urls[1] }>
			<img style="width: 100%; padding-bottom: .5rem;" src=${ urls[2] }>
			<img style="width: 100%; padding-bottom: .5rem;" src=${ urls[3] }>
		</div>
		<div>
			<img style="width: 100%; padding-bottom: .5rem;" src=${ urls[4] }>
			<img style="width: 100%; padding-bottom: .5rem;" src=${ urls[5] }>
			<img style="width: 100%; padding-bottom: .5rem;" src=${ urls[6] }>
			<img style="width: 100%; padding-bottom: .5rem;" src=${ urls[7] }>
		</div>
	`
}

if (NODE_ENV !== 'production') {
	app.listen(PORT, () => {
		console.log(`Running on port: ${ PORT }`);
	});
} else {
	module.exports = app;
}

