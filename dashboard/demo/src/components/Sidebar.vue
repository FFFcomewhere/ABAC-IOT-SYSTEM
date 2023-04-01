<template>
    <div class="container">
        <el-container>
            <el-header>Header</el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu :default-active="activeMenu" class="el-menu-vertical-demo" @select="handleMenuSelect">
                        <el-menu-item index="home">Home</el-menu-item>
                        <el-menu-item index="about">About</el-menu-item>
                        <el-menu-item index="contact">Contact</el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElContainer, ElHeader, ElAside, ElMain, ElMenu, ElMenuItem } from 'element-plus';

export default defineComponent({
    name: 'App',
    components: { ElContainer, ElHeader, ElAside, ElMain, ElMenu, ElMenuItem },
    setup() {
        const route = useRoute();
        const router = useRouter();

        const activeMenu = route.meta.activeMenu || 'home';

        const handleMenuSelect = (index) => {
            router.push({ name: index });
        };

        return { activeMenu, handleMenuSelect };
    },
});
</script>

<style>
.container {
    height: 100%;
}

.el-header {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-menu-vertical-demo {
    border-right: 0;
}
</style>
