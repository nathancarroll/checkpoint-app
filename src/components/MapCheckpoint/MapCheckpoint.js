import React from 'react';
import MaterialIcon, {colorPalette} from 'material-icons-react';

const MapCheckpoint = () => {
    return(
        <React.Fragment>
            <MaterialIcon icon="place" color={colorPalette.red._600}/>
        </React.Fragment>
    )
}

export default MapCheckpoint;
