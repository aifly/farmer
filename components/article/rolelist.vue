<template>
    <div class="symbin-dialog-person">
       角色列表
    </div>    
</template>
<script>
    import './index.css';
    import sysbinVerification from '../lib/verification';
    import symbinUtil from '../lib/util';
    import Vue from 'vue';
    export default {
        props: {
            row: Object,
            children: Array,
        }
    };
</script>