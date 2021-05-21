export const state = () =>({
    statuss: ""
})

export const mutations ={
    set_statuss(state, value){
        state.statuss = value
    }
}

export const actions = {

}

export const getters = {
    statuss: s => s.statuss
}