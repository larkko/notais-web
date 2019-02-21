import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import InstrumentController from '../../src/controllers/instrumentcontroller';

chai.should();
chai.use(sinonChai);

describe('#InstrumentController', () => {
  it('should properly start and stop one oscillator when an index is set',
     () => {

    const mockOscillator = {
      connect: sinon.stub(),
      start: sinon.stub(),
      stop: sinon.stub(),
      disconnect: sinon.stub(),
      frequency: {}
    };

    const mockGain = {
      connect: sinon.stub(),
      disconnect: sinon.stub(),
      gain: {
        /*For this test, what this function does doesn't really matter,
          InstrumentController just expects to have this available.*/
        linearRampToValueAtTime: () => {}
      }
    };

    const audioContext = {
      createOscillator: () => mockOscillator,
      createGain: () => mockGain
    };

    const controller = new InstrumentController({
      audioContext,
      /*For the purposes of this test, it doesn't matter what this function
        really returns, so it returns some arbitrary value (1.0).*/
      indexToFrequency: () => 1.0,
      /*Actual delays are undesirable for testing, so let us just immediately
        execute the provided function.*/
      afterDelay: func => func()
    });

    /*Before setting anything, nothing should have been called*/
    [
      mockOscillator.connect,
      mockOscillator.start,
      mockOscillator.stop,
      mockOscillator.disconnect,
      mockGain.connect,
      mockGain.disconnect
    ].forEach(func => {
      func.should.not.have.been.called;
    });

    /*The value we use for the index in this test is irrelevant, as long as
      it's the same when setting and unsetting the index.*/
    const testIndex = 1;
    const fullVelocity = 1;
    const noVelocity = 0;

    /*Set an index and check that an oscillator and a gain have been connected,
      and that an oscillator has been started, but nothing should have been
      stopped or disconnected yet.*/
    controller.set({index: testIndex, velocity: fullVelocity});

    [
      mockOscillator.connect,
      mockOscillator.start,
      mockGain.connect,
    ].forEach(func => {
      func.should.have.been.calledOnce;
    });

    [
      mockOscillator.stop,
      mockOscillator.disconnect,
      mockGain.disconnect
    ].forEach(func => {
      func.should.not.have.been.called;
    });

    /*After setting the same index to zero velocity, the oscillator should
      be stopped and everything disconnected. After this, everything should have
      been called exactly once.*/
    controller.set({index: testIndex, velocity: noVelocity});

    [
      mockOscillator.connect,
      mockOscillator.start,
      mockOscillator.stop,
      mockOscillator.disconnect,
      mockGain.connect,
      mockGain.disconnect
    ].forEach(func => {
      func.should.have.been.calledOnce;
    });
  });
});


