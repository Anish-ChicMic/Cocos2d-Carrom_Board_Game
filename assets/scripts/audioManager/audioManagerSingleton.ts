import { AudioSource } from "cc";

export class SoundManager {
    private static instance: SoundManager = null;
    private audioSource: AudioSource = null;
    private volume: number = 0.5;

    private static SoundManager() { };


    public static getInstance() {
        if (!SoundManager.instance) {
            SoundManager.instance = new SoundManager();
        }
        return SoundManager.instance;

    }

    init(audioSource: AudioSource) {
        this.audioSource = audioSource;
    }

    playMusic(loop: boolean) {
        console.log("Playing music!");
        this.audioSource.loop = loop;
        this.audioSource.play();
    }

    stopMusic() {
        this.audioSource.stop();
    }

}



