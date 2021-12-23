import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

import "simpledotcss/simple.min.css"

createApp(App).use(router).mount("#app")
