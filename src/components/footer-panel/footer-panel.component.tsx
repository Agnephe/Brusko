import React from "react"
import { Button } from "../button/button.component"
import { MainSketch } from "../../sketches/sketch"
import { Container } from "./footer-panel.style"

export class FooterPanel extends React.Component<any, any> {
    public render() {
        return (
            <div style={{ marginTop: "12px" }}>
                <h5>Footer panel</h5>
                <div className="alert alert-primary">
                    Use the following buttons to control the behavior of the shape
                </div>
                <Container>
                    <Button text="Shape" icon="shapes" onClick={this.onShapeClick} style={{ marginBottom: "12px" }}/>
                    <Button text="Track" icon="vector-square" onClick={this.onTrackClick} style={{ marginBottom: "12px" }}/>
                    <Button text="Rotate" icon="sync" onClick={this.onRotateClick} style={{ marginBottom: "12px" }}/>
                    <Button text="Layer" icon="plus" onClick={this.onLayerClick} style={{ marginBottom: "12px" }}/>
                    <Button text="Delete shape" icon="times" type="danger" onClick={this.onShapeDeleteClick} style={{ marginBottom: "12px" }}/>
                </Container>
            </div>
        )
    }

    private onShapeClick = () => {
        MainSketch.changeShape()
    }

    private onTrackClick = () => {
        MainSketch.selectShape()
    }

    private onRotateClick = () => {
        MainSketch.rotateShape()
    }

    private onLayerClick = () => {
        MainSketch.createNewLayer()
    }

    private onShapeDeleteClick = () => {
        MainSketch.deleteShape()
    }
}