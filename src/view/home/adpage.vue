<template>
    <f7-page>
        <f7-navbar sliding>
            <f7-nav-left>
                <f7-link icon="icon-back color-black" @click="$router.push('/home')"></f7-link>
            </f7-nav-left>
            <f7-nav-center sliding style="left:-22px;" title="宣传页面"></f7-nav-center>
            <f7-nav-right></f7-nav-right>
        </f7-navbar>
        <f7-page-content style="text-align:center;margin-top:50px">
            {{meun_obj.name}}
            <f7-button  style="width:50%;margin:400px auto 0px auto" round @click="onBook()">马上预订</f7-button>
        </f7-page-content>
    </f7-page>
</template>
<script>
export default {
    data() {
        return {
            meun_obj: {},
        }
    },
    mounted() {
        this.meun_obj = this.$store.state.currentServer
    },
    methods: {
        onBook() {
            this.$router.push({path:'/shoeDetail',query:{sid:this.meun_obj.id}})
        }
    },
}
</script>
