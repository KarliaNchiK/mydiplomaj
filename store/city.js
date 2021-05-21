export const state = () => ({
    city: [],
})

export const mutations = {
    set_city(state, value) {
        state.city = value.slice()
    },
    add_city(state, value) {
        for (let i = 0; i < value.length; i++) {
            state.city.push(value[i])
        }
    },
}

export const actions = {
    async getcity(ctx) {
        const data = await this.$axios.get("/api/getCity")
        ctx.commit('set_city', data.data)
    },
    async getAddcity(ctx, value) {
        const data = await this.$axios.get("/api/addCity/" + value)
        ctx.commit('add_city', data.data)
    },
    async getcityFil(ctx, value) {
        const data = await this.$axios.get("/api/getCity/" + value)
        ctx.commit('set_city', data.data)
    },
}

export const getters = {
    city: s => s.city,
}