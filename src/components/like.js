import React from 'react';
import { increment } from './Redux/Actions';
import { connect } from 'react-redux'

function Like({count, increment}){
  return (
    <div className="App">
    <br />
    <span>       {count}       </span>
    <button className="button buttonS" onClick="clickAndDisable(this)" onClick={increment}>LIKE</button>
    <br />
    </div>
  );
}

const mapStateToProps = (state) => ({
   count: state.count
})

const mapDispatchToProps = {
  increment,
}

export default connect(mapStateToProps, mapDispatchToProps)(Like);

// mapActionsToProps ==== allow to dispatch action from comp easily 
