
import { useDispatch, useSelector, useStore } from 'react-redux'
import { AppDispatch, RootState, AppStore } from '@/Store/Store';

// Make a (useAppDispatch, useAppSelector, useAppStore) that easy use with typescript
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()