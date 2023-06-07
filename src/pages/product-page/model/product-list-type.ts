
import { createEvent, createStore } from "effector"

type State = {
    query: string
    typeId: string
    byPrice: string
    brandId: string
}

const initialState: State = {
    query: "",
    typeId: 'none',
    byPrice: 'none',
    brandId: 'none'
}

export const setSearchQuery = createEvent<{ queryString: string }>()
export const setType = createEvent<{ typeId: string }>()
export const setPrice = createEvent<{ byPrice: string }>()
export const setBrand = createEvent<{ brandId: string }>()
export const resetFilter = createEvent()

export const $productListFilter = createStore(initialState)
    .on(setSearchQuery, (state, payload) => ({
        ...state,
        query: payload.queryString,
    }))
    .on(setType, (state, { typeId }) => ({ ...state, typeId }))
    .on(setPrice, (state, { byPrice }) => ({ ...state, byPrice }))
    .on(setBrand, (state, { brandId }) => ({ ...state, brandId }))
    .on(resetFilter, () => initialState)
