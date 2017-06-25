# soundify

[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://github.com/feross/standard)
[![Greenkeeper badge](https://badges.greenkeeper.io/JamesKyburz/soundify.svg)](https://greenkeeper.io/)

Search and play different music sources.

So far youtube, soundcloud and spotify are supported.

# usage

```javascript
var soundify = require('soundify')
soundify(configPath) // default .env
```

# config
Here is where all your secret keys for the supported services are.

see [config example]

# stream

Checkout [stream] for the supported implementations

# search

Checkout [search] for the supported implementations

# Additional support or help

Pull requests welcome!

# docker

If you don't want to compile ffmpeg et al. you can use docker.

You need to setup your .env in the volume /opt/soundify
```sh
REMOTE_SPEAKER=http://yourip:9000 npm run docker:run
```

Then you need to run [remote-speaker]

# install

```
npm install soundify
```

# license

MIT

[config example]: https://github.com/JamesKyburz/soundify/blob/master/.env.example

[stream]: https://github.com/JamesKyburz/soundify/tree/master/stream

[search]: https://github.com/JamesKyburz/soundify/tree/master/search

[remote-speaker]: https://github.com/jameskyburz/remote-speaker
