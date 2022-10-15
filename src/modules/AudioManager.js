const config = {
    'click'   : 'click.wav',
    'error'   : 'error.wav',
    'start'   : 'start.wav',
    'success' : 'success.wav',
};

export class AudioManager {

    static load() {

        for (let prop in config) {

            const node = document.createElement('audio');

            node.id  = `audio-${prop}`;
            node.src = `sounds/${config[prop]}`;
            node.preload = 'auto';

            document.body.appendChild(node);
        }
    }

    /**
     * @param string key
     */
    static play(key) {

        if (!config[key]) {
            console.warning(`[AudioManager] play() > ${key} sound don't exist`)
            return;
        }

        const audio = document.getElementById(`audio-${key}`);

        audio.pause();
        audio.currentTime = 0;
        audio.play();
    }
}