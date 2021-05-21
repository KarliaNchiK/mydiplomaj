export const state = () =>({
    datePassword: "",
    login: ""
})

export const mutations ={
    set_datePassword(state, value) {
        state.datePassword = value
    },
    set_login(state, value) {
        state.login = value
    }
}

export const actions = {

}

export const getters = {
    datePassword: s => s.datePassword,
    login: s => s.login
}