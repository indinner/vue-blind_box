import { createRouter,createWebHashHistory} from "vue-router";

import index from "@/pages/index/index.vue"
const routers=[
    {path:"/",redirect:"/index"},
    {
        path: "/index",
        name: "index",
        component: index,
    }
]

export const router=createRouter({
    history:createWebHashHistory(),
    routes:routers
})
