import * as actionType from './actions/actions';
const initialState={
    sideDrawer:false,
    translateLoader:'',
    consoleMessage:{ type:'',mssg:'' }
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
        case actionType.SET_TRANSLATINGlOADER:
            return{
                ...state,
                translateLoader:action.name
            }
        case actionType.SET_CONSOLEMESSAGE:
            return{
                ...state,
                consoleMessage:{type:action.mssgType,mssg:action.mssg}
            }
        default:
            return state;
   }
}

export default reducer;