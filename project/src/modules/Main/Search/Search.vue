<template>  
    <div class="delete_div">
        <SliderDelete :sliderConf="sliderConf">
            <div class="conten"></div>
        </SliderDelete>
        <div class="delete_button"></div>
    </div>
</template>  
<script>
import SliderDelete from '@/components/SliderDelete'
export default{
  name: 'search',
  data () {
    return {
      sliderConf: {
        distance: '4'
      }
    }
  },
  components: {
    SliderDelete
  }
}
</script>  
<style>  
.conten{
        background-color: green;
        width: 24rem;
        height: 3rem;
    }
    .delete_button{
        position: absolute;
        background-color: red;
        right: 0;
        width: 4rem;
        height: 3rem;
    }
    .delete_div{
        position: relative;
    }
</style>
