import React, { Component }  from 'react';
import { TabBarBottom, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { restartCategories, restartAlphabeticalPage } from './actions/restartPage';

class TabBarComponent extends Component {

  render() {
    const {navigation, navigationState} = this.props;
    const jumpToIndex = index => {
      const tab = navigationState.routes[index];
      if (navigationState.index !== index) {
        navigation.dispatch(
          {
            type: "Navigation/NAVIGATE",
            routeName: tab.routeName
          }
        );
      } else {
        if (tab.index > 0) {
          navigation.goBack(tab.routes[1].key);
        } else {
          switch (tab.routeName) {
          case 'HomeTab':
            this.props.dispatchRestartCategories();
            break;
          case 'AlphabeticalTab':
            this.props.dispatchRestartAlphabeticalPage();
            break;
          default:
            const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: tab.routes[0].routeName})
              ]
            });
            navigation.dispatch(resetAction);
          }
        }
      }
    };
    return (<TabBarBottom {...this.props} jumpToIndex={jumpToIndex} />);
  }

};

function mapStateToProps (state) {
  return {};
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchRestartCategories: () => dispatch(restartCategories()),
    dispatchRestartAlphabeticalPage: () => dispatch(restartAlphabeticalPage())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabBarComponent);
