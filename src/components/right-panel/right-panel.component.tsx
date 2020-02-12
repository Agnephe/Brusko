import React from "react"
import { Button } from "../button/button.component"
import { MainSketch } from "../../sketches/sketch"
import { Container } from "./right-panel.style"


export class RightPanel extends React.Component<any, any> {
    public render() {
        return (
            <div style={{ marginTop: "12px" }}>
                <h5>Audio panel</h5>
                <Container>
                    <Button text="BPM" icon="FiMusicl" style={{ marginBottom: "12px" }}/>
                </Container>
            </div>
        )
    }

    
}