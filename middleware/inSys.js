export default async function ({app, store}) {
    if(!!app.$cookies.get("token")){
        store.commit("user/set_token", true)
        await store.dispatch("user/getDataUser");
    }
}