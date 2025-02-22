const axios = require('axios');
const { checkOptions, getTitle } = require('./utils');

const searchUrl = 'https://api.genius.com/search?q=';

/**
 * @param {{apiKey: string, title: string, artist: string, optimizeQuery: boolean, authHeader: boolean}} options
 */
module.exports = async function(options) {
  try {
    checkOptions(options);
    let { apiKey, title, artist, optimizeQuery = false, authHeader = false } = options;
    const song = optimizeQuery ? getTitle(title, artist) : `${title} ${artist}`;
    const reqUrl = `${searchUrl}${encodeURIComponent(song)}`;
    const headers = {
      Authorization: 'Bearer ' + apiKey
    };
    let { data } = await axios.get(
      authHeader ? reqUrl : `${reqUrl}&access_token=${apiKey}`,
      authHeader && { headers }
    );
    if (data.response.hits.length === 0) return null;
    const results = data.response.hits.map((val) => {
      const { full_title, song_art_image_url, id, url, release_date_for_display } = val.result;
      return { id, title: full_title, albumArt: song_art_image_url, url, releaseDate: release_date_for_display };
    });
    return results.length > 2 ? results.slice(0, 2) : results;
  } catch (e) {
    throw e;
  }
};
