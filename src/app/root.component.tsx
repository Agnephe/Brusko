import React from "react"
import "./root.component.scss"
import { Drawer } from "../components/drawer/drawer.component"
import { Navbar } from "../components/navbar/navbar.component"
import { ControlPanel } from "../components/control-panel/control-panel.component"

export class RootComponent extends React.Component<any, any> {
    public render() {
        return (
            <div className="App">
                <Navbar/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3" style={{ backgroundColor: "#ccd3e0" }}>
                            <ControlPanel/>
                        </div>
                        <div className="col-9"  style={{ backgroundColor: "#81A094" }}>
                            <Drawer/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
