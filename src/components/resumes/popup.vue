<!--  -->
<template>
  <div>
    <mt-popup v-model="popupVisible" position="bottom" class="popup__wrapper">
      <div class="justify-content">
         <span @click="confirm">确定</span>
         <span @click="close">取消</span>
      </div>
      <mt-picker :slots="slots" @change="onValuesChange" :valueKey="valueKey"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
export default {
  props:[
    "slots",
    "valueKey",
    "visible",
  ],
  data() {
    return {
      popupVisible:false,
      Info:"",
    };
  },
  methods: {
    onValuesChange({},values){
      this.Info = values[0];
    },
    confirm(){
      this.$emit('change-value',this.Info)
      this.close()
    },
    close(){
      this.$emit('popup-visible')
    }
  },
  watch:{
    popupVisible(val){
      if(!val){
        this.close()
      }
    },
    visible(val){
      this.popupVisible =val
    }
  }
};
</script>
<style lang='scss' scoped>
 .justify-content{
    display: flex;
    justify-content:space-between;
    padding-left: 40px;
    padding-right: 40px;
    span{
      padding: 10px;
      color: #c20c0c;
    }
  }
</style>
