export default function ({ app, redirect }) {
    const token = app.$cookies.get('token');
    const isLogged = !!token;
    if (!isLogged) {
      redirect('/');
    }
  }