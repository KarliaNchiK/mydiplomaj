export const state = () => ({
    skills: [],
    professional: [],
    exp: [],
    salary: [
        {
            model: "",
        },
        {
            model: "",
        },
    ],
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
    drop_allFilter(state, value) {
        state[value.filter] = []
    },
    dropFilters(state) {
        state.skills = []
        state.professional = []
        state.exp = []
        state.salary = [
            {
                model: "",
            },
            {
                model: "",
            },
        ]
    }
}

export const actions = {

}

export const getters = {
    skills: s => s.skills,
    professional: s => s.professional,
    exp: s => s.exp,
    salary: s => s.salary,
}