const actionLogger = (/*{ dispatch, getState }*/) => next => action => {
  return next(action)
}

export default actionLogger
