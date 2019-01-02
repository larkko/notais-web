
class InstrumentController {
  
  constructor({audioContext, indexToFrequency}) {
    /*In normal use, this is a web audio AudioContext. Passed as a parameter
      to prevent a hard dependency. The web audio API provides convenient
      factory methods accessible via the context, which lets us use the
      API entirely through this parameter.*/
    this.audioContext = audioContext;
    /*Describes a tuning as a function of Integer -> Real.*/
    this.indexToFrequency = indexToFrequency;
    this.nodes = [];
  }

  dispose() {
    const {
      audioContext,
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
    /*Stop pre-existing press*/
    this.nodes.filter(node => node.index === index).forEach(node => {
      if(node.oscillator && node.gain) {
        node.oscillator.stop();
        node.oscillator.disconnect();
        node.gain.disconnect();
        this.nodes = this.nodes.filter(i => i !== index);
      }
    });
    /*Start new press*/
    if(velocity > 0.0) {
      const oscillator = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      oscillator.connect(gain);
      gain.connect(this.audioContext.destination);
      oscillator.frequency.value = this.indexToFrequency(index);
      gain.gain.value = 0.02;
      oscillator.start();
      this.nodes = [...this.nodes, {oscillator, gain, index, velocity}];
    }
  }

}

export default InstrumentController;

