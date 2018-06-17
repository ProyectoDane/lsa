import { connect } from 'react-redux';
import { searchPageRestarted } from '../../../actions/restartPage';
import { Search } from './Search';

const mapStateToProps = state => {
  return {
    shouldRestartSearch: state.restartPage.shouldRestartSearch,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchSearchPageRestarted: () => dispatch(searchPageRestarted()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
