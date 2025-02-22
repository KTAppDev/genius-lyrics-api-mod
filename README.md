## WORKING!
# genius-lyrics-api [![npm version](https://img.shields.io/npm/v/genius-lyrics-api.svg?style=flat)](https://www.npmjs.com/package/genius-lyrics-api)

A JavaScript package for non-browser environments that leverages [Genius API](https://genius.com/developers) to find (and scrape) song lyrics and album covers.<br/>

## Installation

Install with npm

```js
npm install --save genius-lyrics-api-mod
```

Or install with Yarn

```js
yarn add genius-lyrics-api-mod
```

## Usage

[Get the Genius Developer Access Token](https://genius.com/developers)
<br>

```js
import { getLyrics, getSong } from 'genius-lyrics-api';
```

```js
const options = {
	apiKey: 'XXXXXXXXXXXXXXXXXXXXXXX',
	title: 'Posthumous Forgiveness',
	artist: 'Tame Impala',
	optimizeQuery: true
};

getLyrics(options).then((lyrics) => console.log(lyrics));

getSong(options).then((song) =>
	console.log(`${song.id} - ${song.title} - ${song.url} - ${song.albumArt} - ${song.lyrics}`)
);
```

<br>

## Types

```
type options {
	title: string;
	artist: string;
	apiKey: string;		// Genius developer access token
	optimizeQuery?: boolean; // (optional, default: false) If true, Perform some cleanup to maximize the chance of finding a match
	authHeader?: boolean; // (optional, default: false) Whether to include auth header in the search request
}

```

🚨 If `title` or `artist` is unknown, pass an empty string.

```
type song {
	id: number;		// Genius song id
	title: string;          // Song title
	url: string;		// Genius webpage URL for the song
	lyrics: string;		// Song lyrics
	albumArt: string;	// URL of the album art image (jpg/png)
}

```

```
type searchResult {
	id: number;		// Genius song id
	url: string;		// Genius webpage URL for the song
	title: string;		// Song title
	albumArt: string;	// URL of the album art image (jpg/png)
}
```

## Methods

genius-lyrics-api exposes the following methods:

### `getLyrics(options | url)`

Accepts [options](#types) or the url to a Genius song. <br/>
Returns a promise that resolves to a string containing lyrics. Returns `null` if no lyrics are found.

### `getAlbumArt(options)`

Accepts an [options](#types) object. <br/>
Returns a promise that resolves to a url (string) to the song's album art. Returns `null` if no url is found.

### `getSong(options)`

Accepts an [options](#types) object. <br/>
Returns a promise that resolves to an object of type [song](#types). Returns `null` if song is not found.

### `searchSong(options)`

Accepts an [options](#types) object. <br/>
Returns a promise that resolves to an array of type [searchResult](#types). Returns `null` if no matches are found.

### `getSongById(id: (number | string), access_token: string)`

Accepts a valid Genius song ID. IDs can be found using the `searchSong` method. <br/>
Returns a promise that resolves to an object of type [song](#types).
