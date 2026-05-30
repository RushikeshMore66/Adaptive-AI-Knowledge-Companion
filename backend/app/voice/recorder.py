import sounddevice as sd
from scipy.io.wavfile import write

def record_audio(filename="input.wav",duration=5,sample_rate=44100):

    
    recording=sd.rec(int(duration*sample_rate),samplerate=sample_rate,channels=2)

    sd.wait()

    write(filename,sample_rate,recording)

    return filename