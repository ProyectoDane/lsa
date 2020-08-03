import React, {Component} from 'react';
import {TabBarBottom, NavigationActions} from 'react-navigation';

export class TabBarComponent extends Component {
  _jumpToIndex = index => {
    const {navigation, navigationState} = this.props;
    const tab = navigationState.routes[index];
    if (navigationState.index !== index) {
      navigation.dispatch({
        type: 'Navigation/NAVIGATE',
        routeName: tab.routeName,
      });
    } else if (tab.index > 0) {
      navigation.goBack(tab.routes[1].key);
    } else {
      switch (tab.routeName) {
        case 'HomeTab':
          this.props.dispatchRestartCategories();
          break;
        case 'AlphabeticalTab':
          this.props.dispatchRestartAlphabeticalPage();
          break;
        case 'SearchTab':
          this.props.dispatchRestartSearchPage();
          break;
        default:
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({routeName: tab.routes[0].routeName}),
            ],
          });
          navigation.dispatch(resetAction);
      }
    }
  };

  render() {
    return <TabBarBottom {...this.props} jumpToIndex={this._jumpToIndex} />;
  }
}
