import { connect } from 'react-redux';
import {
  restartAlphabeticalPage,
  restartCategories,
  restartSearchPage,
} from '../../actions/restartPage';
import { TabBarComponent } from './TabBarComponent';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchRestartCategories: () => dispatch(restartCategories()),
    dispatchRestartAlphabeticalPage: () => dispatch(restartAlphabeticalPage()),
    dispatchRestartSearchPage: () => dispatch(restartSearchPage()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabBarComponent);
