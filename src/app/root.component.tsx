import React from "react"
import "./root.component.scss"
import { Drawer } from "../components/drawer/drawer.component"
import { Navbar } from "../components/navbar/navbar.component"
import { ControlPanel } from "../components/control-panel/control-panel.component"
import { FooterPanel } from "../components/footer-panel/footer-panel.component"
import { RightPanel } from "../components/right-panel/right-panel.component"
import { TransportComponent } from "src/components/transport"

export class RootComponent extends React.Component<any, any> {
    public render() {
        return (
            <div className="App">
                <Navbar/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-2 control-column">
                            <ControlPanel/>
                            <div className="container">
  <h4 className="page-header">Time signature</h4>
  <div className="row">
    <div className="col-sm-3">
    <select id="idtimeSign" className="container" name="timeSign">
        <option value="1" >4/4</option>
        <option value="2">3/4</option>
        <option value="3">9/8</option>
        <option value="4">7/8</option>
        <option value="5">5/4</option>
        <option value="6">3/2</option>
      </select>
    </div>
    </div>
    </div>
                        </div>
                        <div id="centralSquare" className="col-8"   style={{ position:"relative", backgroundColor: "#81A094" }}>
                            <Drawer/>
                        </div>
                        <div className="col-2 control-column">
                            <RightPanel/>
                        </div>
                    </div>
                    <div className="row" style={{ padding: "20px" }}>
                        <FooterPanel/>
                        <div className="trnsp" style={{ padding: "20px" }}> <TransportComponent/></div>
                    </div>
                </div>
            </div>
        )
    }
}
