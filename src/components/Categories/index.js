import { connect } from 'react-redux';
import { Categories } from './Categories';
import { categoriesRestarted } from '../../actions/restartPage';

const mapStateToProps = state => {
  return {
    shouldRestartCategories: state.restartPage.shouldRestartCategories,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchCategoriesRestarted: () => dispatch(categoriesRestarted()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
