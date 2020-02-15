import React from "react"
import { Transport } from 'tone';
import { BPM } from '../bpm-component';
import { TransportComponent } from '../transport';
//import { MainSketch } from "../../sketches/sketch"
import { Container } from "./right-panel.style"
import { PlayPause } from "../play-pause"


export class RightPanel extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            
            bpm: 120,
        }
    }
    pause = () => {
        Transport.stop();
    }

    play = () => {
        Transport.start();
    }
    handleBPMChange = (bpm: number) => {
        Transport.bpm.value = bpm;
        this.setState({ bpm });
    }
    public render() {
        return (
            <div style={{ marginTop: "12px" }}>
                <h5>Audio panel</h5>
                <Container>
                <div style={{ display: 'block' }}>
                    <BPM handleChange={this.handleBPMChange} value={this.state.bpm} />
                    
                </div>
                </Container>
                <PlayPause play={this.play} pause={this.pause} />
            </div>
        )
    }

    
}