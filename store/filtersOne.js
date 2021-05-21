export const state = () => ({
    filterCity: [],
    filterbranch: [],
    exp: []
})

export const mutations = {
    set_filter(state, value) {
        for (let i in state[value.filter]) {
            if (state[value.filter][i] == value.value) {
                return
            }
        }
        state[value.filter].push(value.value)
    },
    set_arr(state, value) {
        state[value.filter] = value.value.slice()
    },
    drop_filter(state, value) {
        for (let i = 0; i < state[value.filter].length; i++) {
            if (state[value.filter][i] == value.value) {
                state[value.filter].splice(i, 1)
                return
            }
        }
    },
    drop_allFilter(state, value){
        state[value.filter] = []
    },
    dropFilters(state){
        state.filterCity = []
        state.filterbranch = []
        state.exp = []
    }
}

export const actions = {

}

export const getters = {
    city: s => s.filterCity,
    branch: s => s.filterbranch,
    exp: s => s.exp,
}