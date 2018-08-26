import React from 'react';
import MaterialIcon, {colorPalette} from 'material-icons-react';

const MapCheckpoint = (props) => {
    return(
        <React.Fragment>
            <MaterialIcon 
                index={props.key}
                icon="place" 
                color={colorPalette.red._600}
                onClick={() => console.log('hello')}
            />
        </React.Fragment>
    )
}

export default MapCheckpoint;
