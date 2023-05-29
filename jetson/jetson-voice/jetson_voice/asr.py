#!/usr/bin/env python3
# coding: utf-8

from jetson_voice.utils import load_resource


def ASR(resource, *args, **kwargs):
    """
    Loads a streaming ASR service or model.
    See the ASRService class for the signature that implementations use.
    """
    factory_map = {
        'riva' : 'jetson_voice.backends.riva.RivaASRService',
        'tensorrt' : 'jetson_voice.models.asr.ASREngine',
        'onnxruntime' : 'jetson_voice.models.asr.ASREngine'
    }
    
    return load_resource(resource, factory_map, *args, **kwargs)

    
class ASRService():
    """
    Streaming ASR service base class.
    """
    def __init__(self, config, *args, **kwargs):
        self.config = config
        
    def __call__(self, samples):
        """
        Transcribe streaming audio samples to text, returning the running phrase.
        Phrases are broken up when a break in the audio is detected (i.e. end of sentence)
        
        Parameters:
          samples (array) -- Numpy array of audio samples.

        Returns a list[dict] of the running transcripts with the following keys:
        
          text (string) -- the transcript of the current sentence
          words (list[dict]) -- a list of word dicts that make up the sentence
          end (bool) -- if true, end-of-sentence due to silence
          
        Each transcript represents one phrase/sentence.  When a sentence has been determined
        to be ended, it will be marked with end=True.  Multiple sentence transcripts can be 
        returned if one just ended and another is beginning. 
        """
        pass
    
    @property
    def classification(self):
        """
        Returns true if this is an ASR classification model (e.g. for VAD or keyword spotting)
        Otherwise, this is an ASR transcription model that converts audio to text.
        """
        return False
        
    @property
    def sample_rate(self):
        """
        The sample rate that the model runs at (in Hz)
        Input audio should be resampled to this rate.
        """
        pass
    
    @property
    def frame_length(self):
        """
        Duration in seconds per frame / chunk.
        """
        pass
        
    @property
    def chunk_size(self):
        """
        Number of samples per frame/chunk (equal to frame_length * sample_rate)
        """
        pass
        
        
if __name__ == "__main__":

    from jetson_voice import list_audio_devices, AudioInput, ConfigArgParser
    import sys
    
    parser = ConfigArgParser()
    
    parser.add_argument('--model', default='quartznet', type=str, help='path to model, service name, or json config file')
    parser.add_argument('--wav', default=None, type=str, help='path to input wav file')
    parser.add_argument('--mic', default=None, type=str, help='device name or number of input microphone')
    parser.add_argument('--list-devices', action='store_true', help='list audio input devices')
    
    args = parser.parse_args()
    print(args)
    
    # list audio devices
    if args.list_devices:
        list_audio_devices()
        sys.exit()
        
    # load the model
    asr = ASR(args.model)
    
    # create the audio input stream
    stream = AudioInput(wav=args.wav, mic=args.mic, 
                         sample_rate=asr.sample_rate, 
                         chunk_size=asr.chunk_size)
    
    # run transcription
    for samples in stream:
        #samples = audio_to_float(samples)
        #print(f'samples {samples.shape} ({audio_db(samples):.1f} dB)')
        results = asr(samples)
        
        if asr.classification:
            print(f"class '{results[0]}' ({results[1]:.3f})")
        else:
            for transcript in results:
                print(transcript['text'])
                
                if transcript['end']:
                    print('')
                    
    print('\naudio stream closed.')
    