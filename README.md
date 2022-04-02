# Information

This package is for getting the current livestream information of the twitch streamer.

- Simple and easy
- Fast and efficient
- Decent information

Please consider using the original API or making your own scraper for extensive use.

## Sample

Input:
```js
const getTwitchUserInfo = require("twitch-user-streaming-info");

getTwitchUserInfo("esl_csgo").then(console.log).catch(console.error);
```
Output:
```js
{
  success: true,
  error: null,
  live: true,
  name: 'ESL_CSGO - Twitch',
  title: 'RERUN: NaVi vs. AGO - Map 2 [Mirage] - ESL Pro League Season 15 - Group D',
  embedURL: 'https://player.twitch.tv/?channel=esl_csgo&player=facebook&autoplay=true&parent=meta.tag',
  thumbnails: [
    'https://static-cdn.jtvnw.net/previews-ttv/live_user_esl_csgo-80x45.jpg',
    'https://static-cdn.jtvnw.net/previews-ttv/live_user_esl_csgo-320x180.jpg',
    'https://static-cdn.jtvnw.net/previews-ttv/live_user_esl_csgo-640x360.jpg'
  ],
  upload: 2022-04-01T20:21:41.000Z,
  start: 2022-04-01T20:21:41.000Z,
  _end: 2022-04-02T00:21:41.000Z,
  _isLiveBroadcast: true
}
```

## API

There's actually no function, you can use the package as soon as you import it directly.

### Parameters

```js
getTwitchUserInfo("username", booleanOnly, parseProps)
```

`username`: String ~ Username of the Twitch streamer.  
`booleanOnly`: Boolean [true/false] ~ Get results in boolean instead of objects.  
`parseProps`: Boolean [true/false] ~ Parse the properties and format them in a good order.  

`booleanOnly` is disabled by default and `parseProps` is enabled by default.

### Data

If `booleanOnly` parameter is set to true, it will always return the result in boolean regardless of what the response is (other than main errors).  

If the `booleanOnly` parameter is set to false, it will always return the result in objects regardless of what the response is (other than main errors).  

#### Data: Objects

There are always three properties present in the response, regardless of what the response is (good or bad).  

Properties: `success`, `error`, and `live`  

Properties starting with _ aren't recommended for production and they are also useless & just there for testing.  

`parseProps` is enabled:  
```js
{
  success: true,
  error: null,
  live: true,
  name: 'ESL_CSGO - Twitch',
  title: 'RERUN: NaVi vs. AGO - Map 2 [Mirage] - ESL Pro League Season 15 - Group D',
  embedURL: 'https://player.twitch.tv/?channel=esl_csgo&player=facebook&autoplay=true&parent=meta.tag',
  thumbnails: [
    'https://static-cdn.jtvnw.net/previews-ttv/live_user_esl_csgo-80x45.jpg',
    'https://static-cdn.jtvnw.net/previews-ttv/live_user_esl_csgo-320x180.jpg',
    'https://static-cdn.jtvnw.net/previews-ttv/live_user_esl_csgo-640x360.jpg'
  ],
  upload: 2022-04-01T20:21:41.000Z,
  start: 2022-04-01T20:21:41.000Z,
  _end: 2022-04-02T00:21:41.000Z,
  _isLiveBroadcast: true
}
```

If you are wondering, you should use `start` over `upload` as it gives the date when the stream was started instead of when the stream was uploaded.   

```js
{
  success: Boolean,
  error: null | Error,
  live: Boolean,
  name: String,
  title: String,
  embedURL: URL,
  thumbnails: Array [URL],
  upload: Date,
  start: Date,
  _end: Date,
  _isLiveBroadcast: Boolean
}
```

Note: URL type is string type.  

`parseProps` is disabled:  
```js
{
  success: true,
  error: null,
  live: true,
  '@type': 'VideoObject',
  '@context': 'https://schema.org',
  description: 'RERUN: Complexity vs. Heroic - Map 1 [Ancient] - ESL Pro League Season 15 - Group D',
  embedUrl: 'https://player.twitch.tv/?channel=esl_csgo&player=facebook&autoplay=true&parent=meta.tag',
  name: 'ESL_CSGO - Twitch',
  thumbnailUrl: [
    'https://static-cdn.jtvnw.net/previews-ttv/live_user_esl_csgo-80x45.jpg',
    'https://static-cdn.jtvnw.net/previews-ttv/live_user_esl_csgo-320x180.jpg',
    'https://static-cdn.jtvnw.net/previews-ttv/live_user_esl_csgo-640x360.jpg'
  ],
  uploadDate: '2022-04-01T20:21:41Z',
  publication: {
    '@type': 'BroadcastEvent',
    endDate: '2022-04-02T00:21:41Z',
    startDate: '2022-04-01T20:21:41Z',
    isLiveBroadcast: true
  }
}
```
```js
{
  success: Boolean,
  error: null | Error,
  live: Boolean,
  '@type': String,
  '@context': URL,
  description: String,
  embedUrl: URL,
  name: String,
  thumbnailUrl: Array [URL],
  uploadDate: DateString,
  publication: {
    '@type': String,
    endDate: DateString,
    startDate: DateString,
    isLiveBroadcast: Boolean
  }
}
```

Note: DateString isn't the parsed Date, it's Date in string which you can parse using Date constructor but it's already parsed when using the package with `parseProps` enabled.  