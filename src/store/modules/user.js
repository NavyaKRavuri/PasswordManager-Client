export default {
    namespaced: true,

    state: {
        user: {},
        token: null,
    },

    mutations: {
        setUser(state, user) {
            state.user = user;
            state.token = user.token;
        }
    }
}