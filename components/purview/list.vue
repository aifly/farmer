<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Table :columns="subcolumns" :data="row.children"></Table>
    </div>    
</template>
<script>
    import './index.css';
    import sysbinVerification from '../lib/verification';
    import symbinUtil from '../lib/util';
    import Vue from 'vue';
    import iView from 'iview';
    export default {
        props:{
            row: Object        
        },
        data:function(){
            return {
                subcolumns: [{
                    title: '序号',
                    key: 'sort',
                    width:80,
                },
                {
                    title: '权限ID',
                    key: 'actionid',
                    width:150,                        
                },
                {
                    title: '中文名称',
                    key: 'actionname',
                    width:150,                        
                }]
            }
        }
    };
</script>