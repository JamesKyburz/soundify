# soundify

Search and play different music sources.

So far youtube, soundcloud and spotify are supported.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

# usage

```javascript
var soundify = require('soundify')
var config = require('./config')
soundify(config)
```

# config
Here is where all your secret keys for the supported services are.

see [config example](config)

# stream

Checkout [stream] for the supported implementations

# search

Checkout [search] for the supported implementations

# Additional support or help

Pull requests welcome!

# install

```
npm install soundify
```

# license

MIT

[config]: https://github.com/JamesKyburz/soundify/blob/master/config.example.json

[stream]: https://github.com/JamesKyburz/soundify/tree/master/stream

[search]: https://github.com/JamesKyburz/soundify/tree/master/search
