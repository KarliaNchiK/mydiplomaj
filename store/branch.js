export const state = () => ({
    branch: [],
})

export const mutations = {
    set_branch(state, value) {
        state.branch = value.slice()
    },
    add_branch(state, value){
        for(let i = 0; i < value.length;i++){
            state.branch.push(value[i])
        }
    },
}

export const actions = {
    async getbranch(ctx) {
        const data = await this.$axios.get("/api/getbranch")
        ctx.commit('set_branch', data.data)
    },
}

export const getters = {
    branch: s => s.branch,
}