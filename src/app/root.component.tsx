import React from "react"
import "./root.component.scss"
import { Drawer } from "../components/drawer/drawer.component"

export class RootComponent extends React.Component<any, any> {
    public render() {
        return (
            <div className="App">
                <h1>Test app</h1>
                <Drawer/>
            </div>
        )
    }
}
