import * as React from 'react';
import { Transport } from 'tone';
import { MainSketch } from '../sketches/sketch';
import { Instrument } from './instrument';
import { InstrumentHack } from './instrument-hack';

import { Steps } from './steps';

export class TransportComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            steps: [false, false, false, false, false, false, false, false,
                false, false, false, false, false, false, false, false],
            selected: null,
            bpm: 120,
        }
        Transport.loop = true;
        Transport.loopEnd = '1m'
    }

   

    private handleStepChange = (id: number) => {
        const s = this.state.steps;
        s[id] = !s[id];
        this.setState({
            steps: s,
        })
    }

    private selectInstrument = (selected: string, steps: boolean[]) => {
        if (this.state.selected === selected) {
            this.setState({
                selected: null, steps: [false, false, false, false, false, false, false, false,
                    false, false, false, false, false, false, false, false]
            })
        } else {
            this.setState({ selected, steps })
        }
    }

    

    render() {
        return (
            <div style={{marginRight : '0px'}}>
                
                

                <InstrumentHack steps={this.state.steps} selectedInstrument={this.state.selected} className="trnsp">
                    <Instrument engine='Kick' key='Kick' handleClick={this.selectInstrument} />
                    <Instrument engine='Snare' key='Snare' handleClick={this.selectInstrument} />
                    <Instrument engine='HiHat' key='HiHat' handleClick={this.selectInstrument} />
                    <Instrument engine='Cymbal' key='Cymbal' handleClick={this.selectInstrument} />
                    <Instrument engine='Clap' key='Clap' handleClick={this.selectInstrument} />
                </InstrumentHack>
                <Steps handleStepChange={this.handleStepChange} steps={this.state.steps} />
            </div>
        )
    }
}