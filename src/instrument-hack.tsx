import * as React from 'react';

export class InstrumentHack extends React.Component<any> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: any) {
        super(props);
    }

    render() {
        console.log('the selected instr ', this.props.selectedInstrument);
     

        return (
            <div style={{  justifyContent: 'space-between' }}>
                {this.props.children}
            </div>
        )
    }
}