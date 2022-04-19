import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { createMigrate, persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import { migrations } from 'system/State/migrations'

const createStore = (initialState = {}) => {
  const reducers = combineReducers({})

  const persistConfig = {
    key: 'root',
    storage,
    version: 0,
    migrate: createMigrate(migrations, { debug: false }),
  }

  const persistedReducer = persistReducer(persistConfig, reducers)

  const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
  })

  const persistor = persistStore(store)
  return { store, persistor }
}

export default createStore
