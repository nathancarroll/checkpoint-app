import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import MaterialIcon from 'material-icons-react';

const styles = {
  root: {
    width: '100%',
  },
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 1,
    links: ['/#/user',
            '/#/racedetails/' + this.props.raceID + '/participants',
            '/#/racedetails/' + this.props.raceID + '/checkpoints',
            '/#/racedetails/' + this.props.raceID + '/map']
  };

  handleChange = (event, value) => {
    this.setState({ value });
    console.log(this.state.links[value]);
    window.location.href = this.state.links[value];
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Back" icon={<MaterialIcon icon="arrow_back" />} />
        <BottomNavigationAction label="Racers" icon={<MaterialIcon icon="person" />} />
        <BottomNavigationAction label="Checkpoints" icon={<MaterialIcon icon="place" />} />
        <BottomNavigationAction label="Map" icon={<MaterialIcon icon="map" />} />
      </BottomNavigation>
    );
  }
}

export default withStyles(styles)(SimpleBottomNavigation);