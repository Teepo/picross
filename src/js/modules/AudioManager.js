const config = {
    'se_click' : 'se_click.wav',
    'se_error' : 'se_error.wav'
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

        document.getElementById(`audio-${key}`).play();
    }
}