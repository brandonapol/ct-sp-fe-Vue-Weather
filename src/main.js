import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './style.css'
import router from './router/index.js'
import { createAuth0 } from '@auth0/auth0-vue';

const app = createApp(App)
app.use(router)

app.use(
    createAuth0({
      domain: "dev-626lcx07uwy8kjn5.us.auth0.com",
      client_id: "NflyDHpJV2F6HgsNBrZjrirPY9tgqDxA",
      redirect_uri: window.location.origin
    })
);

app.mount('#app')
