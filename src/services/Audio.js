export default function getAudioSource({url, audioContext}) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
      audioContext.decodeAudioData(request.response, function(buffer) {
        // Returns function which creates audio source
        // and returns another function which plays the source
        resolve(function sourceFactory() {
          const source = audioContext.createBufferSource();
          source.buffer = buffer;
          source.connect(audioContext.destination);
          return function startSource(time) {
            try {
              source.start(time);
            } catch(e) {
              console.log(e);
            }
          }
        });
      }, reject);
    }
    request.send();
  })
}