// import { ADD_PATIENT } from '../components/action';
var initialState = { patient: {},gender: {} , category: {}} // value of container

export default function RootReducer(state = initialState, action) {
  switch (action.type) {

    case 'ADD_PATIENT':
      state.patient[action.payload[0]] = action.payload[1]
      console.log(state.patient)
      // console.log('PAteiffddf:',state.patient)
      return ({ patient: state.patient , gender: state.gender , category:state.category })

    case 'ADD_GENDER':
      state.gender[action.payload[0]] = action.payload[1]
      console.log(state.gender)
      // console.log('PAteiffddf:',state.patient)
      return ({ patient: state.patient , gender: state.gender ,category:state.category  })

      case 'ADD_CATEGORY':
        state.category[action.payload[0]] = action.payload[1]
        console.log(state.category)
        // console.log('PAteiffddf:',state.patient)
        return ({ patient: state.patient , gender: state.gender , category:state.category })



    default:
      return ({ patient: state.patient , gender: state.gender , category:state.category  })
  }
}