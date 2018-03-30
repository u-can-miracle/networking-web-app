const actionLogger = (/*{ dispatch, getState }*/) => next => action => {
  console.log('action type is: ', action.type)

  return next(action)
}

export default actionLogger
