from nodesource/trusty:5.0.0

ENV FFMPEG_VERSION=2.8.1 \
    X264_VERSION=snapshot-20151022-2245-stable

RUN apt-get update \
 && DEBIAN_FRONTEND=noninteractive apt-get install -y bzip2 libgnutlsxx27 libogg0 libjpeg8 libpng12-0 libasound2-dev alsa-utils \
      libvpx1 libtheora0 libxvidcore4 libmpeg2-4 \
      libvorbis0a libfaad2 libmp3lame0 libmpg123-0 libmad0 libopus0 libvo-aacenc0 wget \
 && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
VOLUME ["/config"]
ENV CONFIG "/config

RUN npm install

RUN mkdir -p /var/cache/ffmpeg/
ADD https://raw.githubusercontent.com/sameersbn/docker-ffmpeg/master/install.sh /var/cache/ffmpeg/install.sh
RUN bash /var/cache/ffmpeg/install.sh

CMD npm start
