import { combineReducers, createStore } from 'redux';

const reducers = combineReducers({
  logged: function (state, action) {
    return {
      status: true,
    };
  },
});

function StoreConfig() {
  return createStore(reducers);
}

export default StoreConfig;
