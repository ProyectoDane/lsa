import { connect } from 'react-redux';
import { alphabeticalPageRestarted } from '../../../actions/restartPage';
import { Alphabetical } from './Alphabetical';

const mapStateToProps = state => {
  return {
    shouldRestartAlphabetical: state.restartPage.shouldRestartAlphabetical,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchAlphabeticalPageRestarted: () => dispatch(alphabeticalPageRestarted()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Alphabetical);
