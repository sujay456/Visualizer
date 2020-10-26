import * as actionType from './actions/actions';
const initialState={
    sideDrawer:false
}

const reducer=(state=initialState,action)=>
{
   switch(action.type)
   {
       case actionType.SET_SIDEDRAWER:
           return{
               ...state,
               sideDrawer:!state.sideDrawer
           }
        default:
            return state;
   }
}

export default reducer;