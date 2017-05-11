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
		<script>
			setTimeout(() => { location.reload(); }, 1000 * 60)
		</script>
		<body style="background-color: yellow; overflow: hidden;">
			<img style="height: 10rem; float: right;" src="http://resources.mynewsdesk.com/image/upload/c_limit,dpr_1.0,f_auto,h_700,q_auto,w_690/dedqeqnhghzdbrcw5pxa.jpg">
			<div style="width: 100%; margin: 0 auto; display: flex;">
				${ getImages(urls) }
			</div>
		<body>
		<html>`
};

const getImages = (urls) => {
	const imgStyle = `width: 100%; margin-bottom: -.5rem;`;
	const divStyle = `padding-right: .5rem; width: 100%; color: yellow`;
	const imgs = urls.map((url, i) => {
		return `<img style="${imgStyle}" src=${urls[i]}>`
	});

	return`
		<div style="${ divStyle }">
			${ imgs.slice(0,4).map((img) => (img)) }
		</div>
		<div style="${ divStyle }">
			${ imgs.slice(4,7).map((img) => (img)) }
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

