
class InstrumentController {
  
  constructor({audioContext, indexToFrequency, afterDelay}) {
    /*In normal use, this is a web audio AudioContext. Passed as a parameter
      to prevent a hard dependency. The web audio API provides convenient
      factory methods accessible via the context, which lets us use the
      API entirely through this parameter.*/
    this.audioContext = audioContext;
    /*Describes a tuning as a function of Integer -> Real.*/
    this.indexToFrequency = indexToFrequency;
    /*Performs a function after a delay. Avoids a dependency on setTimeout.*/
    this.afterDelay = afterDelay;
    this.nodes = [];
  }

  dispose() {
    const {
      nodes
    } = this;
    nodes.forEach(node => {
      if(node.oscillator) {
        node.oscillator.stop();
        node.oscillator.disconnect();
      }
      if(node.gain) {
        node.gain.disconnect();
      }
    });
  }

  set({index, velocity}) {
    /*Some roughly approximate values for the gain (-> volume) and
      its ramp time from and to 0 that are appropriate.*/
    const maxGain = 0.02;
    const rampTime = 0.02;
    /*The gain must be positive in the ramp functions.
      We must ramp down towards 0 to avoid clicks, so some small
      positive constant within acceptable bounds is used.*/
    const minGain = 1e-40;
    /*Some constant amount of extra time to ensure the gain ramps down
      before the node is stopped.*/
    const downRampExtraMs = 50;
    /*Stop pre-existing press*/
    this.nodes.filter(node => node.index === index).forEach(node => {
      if(node.oscillator && node.gain) {
        node.gain.gain.linearRampToValueAtTime(minGain, this.audioContext.currentTime + rampTime);
        /*Only clean up once the gain has ramped to 0*/
        this.afterDelay(() => {
          node.oscillator.stop();
          node.oscillator.disconnect();
          node.gain.disconnect();
          this.nodes = this.nodes.filter(i => i !== index);
        }, rampTime * 1000 /*seconds -> milliseconds*/ + downRampExtraMs);
      }
    });
    /*Start new press*/
    if(velocity > 0.0) {
      const oscillator = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      oscillator.connect(gain);
      gain.connect(this.audioContext.destination);
      oscillator.frequency.value = this.indexToFrequency(index);
      gain.gain.value = 0.0;
      if(this.oscillatorType) {
        oscillator.type = this.oscillatorType;
      }
      oscillator.start();
      gain.gain.linearRampToValueAtTime(maxGain, this.audioContext.currentTime + rampTime);
      this.nodes = [...this.nodes, {oscillator, gain, index, velocity}];
    }
  }

  setIndexToFrequency(indexToFrequency) {
    this.indexToFrequency = indexToFrequency;
  }

  setAudioSource(audioSource) {
    const type = audioSource.oscillator.type;
    /*This is the format in which the web audio API expects these to be.*/
    const asNodeSetting = (type === 'SINE') ? 'sine'
                        : (type === 'SQUARE') ? 'square'
                        : (type === 'SAW') ? 'sawtooth'
                        : (type === 'TRIANGLE') ? 'triangle'
                        : undefined;
    if(asNodeSetting) {
      this.oscillatorType = asNodeSetting;
    }
  }

}

export default InstrumentController;

