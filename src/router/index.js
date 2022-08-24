import Vue from 'vue'
import Router from 'vue-router'
import wxtest from "@/components/wxtest";
import usermanage from "@/components/manage/usermanage";
import login from "@/components/login";
import phone from "@/components/phone";
import pass from "@/components/passcard/pass";
import forbid from "@/components/passcard/forbid";
import accessmanage from "@/components/manage/accessmanage";
import permission from "@/components/permission";




Vue.use(Router);

export default new Router({
    routes:[
        {
            // 重定向
            path: '/',
            redirect: '/permission'
        },
        {
            path:'/jinchu/scan',
            name:'pass',
            component:pass
        },
        {
            path:'/permission',
            name:'permission',
            component:permission
        },

        {
            path:'/forbid',
            name:'forbid',
            component:forbid
        },

        {
            path:'/login',
            name:'login',
            component:login
        },
        {
            path:'/phone',
            name:'phone',
            component:phone
        },

        {
            path:'/wxtest',
            name:'wxtest',
            component:wxtest
        },


        {
            path:'/accessmanage',
            name:'accessmanage',
            component:accessmanage
        },
        {
            path:'/usermanage',
            name:'usermanage',
            component:usermanage
        }

    ]
})
