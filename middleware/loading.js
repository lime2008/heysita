// middleware/loading.js
export default function ({ app, route }) {
    app.router.beforeEach((to, from, next) => {
      if (process.client) {
        const isShow = app.store.state.isShow;
        app.store.commit('SET_ISSHOW', true);
        next();
      }
    });
  }
  