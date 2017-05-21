<template>
  <router-content style="flex-direction:column;background-color:#fff">
    <navigation-bar title="题库">
      <navigation-bar-item @tap="back" slot="left" text="返回" icon="back"/>
      <navigation-bar-item @tap="ceshi" slot="right" icon="more"/>
    </navigation-bar>
    <div style="width:100%;height:100%;overflow:auto;">
    <!--<div v-for="(res, index) in result" :key="res.id" class="result">-->
    <!--多选-->
    <div class="multi result" v-if="result[cur-1] && result[cur-1].question_type === 'multi_selection'">
    	<span class="type">多选题</span>
    	<span class="name">{{ result[cur-1].question }}</span>
    	<br>
    	<span v-for="multi in result[cur-1].selection" :key="" class="text">
	    <input type="checkbox" :id="multi.select" :value="multi.select" v-model="result[cur-1].checkedNames">
		<label :for="multi.select">{{multi.select}}</label>
		<br>
		</span>
  		<button v-on:click="submitD(result[cur-1].checkedNames, result[cur-1].answer)">提交</button>
  		<span class="choose">{{ result[cur-1].choose }}</span>
  		<br>
  		<span class="right" v-show="result[cur-1].show">正确答案: {{ result[cur-1].answer }}</span>
	</div>
	<!--单选-->
	<div class="single result" v-else-if="result[cur-1] && result[cur-1].question_type === 'single_selection'">
    	<span class="type">单选题</span>
    	<span class="name">{{ result[cur-1].question }}</span>
    	<br>
    	<span v-for="single in result[cur-1].selection" :key="" class="text">
  		<input type="radio" :id="single.select" :value="single.select" v-model="result[cur-1].picked">
  		<label :for="single.select">{{single.select}}</label>
  		<br>
  		</span>
  		<button v-on:click="submit(result[cur-1].picked, result[cur-1].answer)">提交</button>
  		<span class="choose">{{ result[cur-1].choose }}</span>
  		<br>
  		<span class="right" v-show="result[cur-1].show">正确答案: {{ result[cur-1].answer }}</span>
	</div>
	<!--判断-->
	<div class="judgement result" v-else-if="result[cur-1] && result[cur-1].question_type === 'judgement'">
    	<span class="type">判断题</span>
    	<span class="name">{{ result[cur-1].question }}</span>
    	<br>
    	<span v-for="judgement in result[cur-1].selection" :key="" class="text">
  		<input type="radio" :id="judgement.select" :value="judgement.select" v-model="result[cur-1].picked">
  		<label :for="judgement.select">{{judgement.select}}</label>
  		<br>
  		</span>
  		<button v-on:click="submit(result[cur-1].picked, result[cur-1].answer)">提交</button>
  		<span class="choose">{{ result[cur-1].choose }}</span>
  		<br>
  		<span class="right" v-show="result[cur-1].show">正确答案: {{ result[cur-1].answer }}</span>
	</div>
	<pagination :all="all" v-model="cur" style="display:block;height:50px;margin:10px 5% 60px"></pagination>
    </div>
    <bottom-bar class="bottomBar">
      <bottom-bar-item icon="list" :text="cur+'/'+all" />
      <bottom-bar-item icon="correct" :text="right+''"/>
      <bottom-bar-item icon="error" :text="wrong+''"/>
    </bottom-bar>
  </router-content>
</template>

<script>
import Scroller from '@/components/Scroller'
import RouterContent from '@/components/RouterContent'
import Icon from '@/components/Icon'
import {NavigationBar, NavigationBarItem} from '@/components/NavigationBar'
import {BottomBar, BottomBarItem} from '@/components/BottomBar'
import Pagination from '@/components/Pagination'

export default {
  name: 'task',
  components: {
    Scroller,
    RouterContent,
    Icon,
    NavigationBar,
    NavigationBarItem,
    BottomBar,
    BottomBarItem,
    Pagination
  },
  data () {
    return {
      result: [],
      all: 9,
      cur: 1,
      right: 0,
      wrong: 0
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    ceshi () {
      this.$router.push({name: 'star'})
    },
    submit (choose, right) {
      console.log(choose)
      console.log(right)
      if (choose === right[0]) {
        this.result[this.cur - 1].choose = '回答正确'
        this.right = this.right + 1
      } else {
        this.result[this.cur - 1].choose = '回答错误'
        this.result[this.cur - 1].show = true
        this.wrong = this.wrong + 1
      }
    },
    submitD (choose, right) {
      console.log(choose)
      console.log(right)
      var arr = []
      for (var i = 0; i < choose.length; i++) {
        for (var j = 0; j < right.length; j++) {
          if (choose[i] === right[j]) {
            arr.push(choose[i])
          }
        }
      }
      if (arr.length === right.length && choose.length === right.length) {
        this.result[this.cur - 1].choose = '回答正确'
        this.right = this.right + 1
      } else {
        this.result[this.cur - 1].choose = '回答错误'
        this.result[this.cur - 1].show = true
        this.wrong = this.wrong + 1
      }
    }
  },
  mounted () {
    this.result = [{id: 1, question_type: 'single_selection', score: 2, question: '这个内容是题目', selection: [{select: '这是选项A'}, {select: '这是选项B'}, {select: '这是选项C'}, {select: '这是选项D'}], answer: ['这是选项A'], difficulty: 3, picked: '', choose: '', show: false}, {id: 2, question_type: 'single_selection', score: 2, question: '下列选项中对课文理解不当的一项是对课文理解不当的一项', selection: [{select: '《在山的那边》一文中所说的“用信念凝成的海”，这里的“海”指的是理想的境界。'}, {select: '《童趣》一文的主旨是写作者儿时的“物外之趣”。作者通过自己的联想和想象，将眼前的事物放大了千万倍，从而享受到一种独有的乐趣。'}, {select: '《紫藤萝瀑布》为了告诉我们花和人一样总是要遭受不幸，你无法改变。'}, {select: '《走一步，再走一步》告诉人一个哲理：大困难是由小困难组成的，只要一步步战胜小困难最后一定能够战胜巨大的困难。'}], answer: ['这是选项CC'], difficulty: 3, picked: '', choose: '', show: false}, {id: 3, question_type: 'single_selection', score: 2, question: '这个内容是题目', selection: [{select: '这是选项AAA'}, {select: '这是选项BBB'}, {select: '这是选项CCC'}, {select: '这是选项DDD'}], answer: ['这是选项DDD'], difficulty: 3, picked: '', choose: '', show: false}, {id: 4, question_type: 'judgement', score: 2, question: '这个内容是题目', selection: [{select: true}, {select: false}], answer: [false], difficulty: 3, picked: '', choose: '', show: false}, {id: 5, question_type: 'judgement', score: 2, question: '这个内容是题目', selection: [{select: true}, {select: false}], answer: [false], difficulty: 3, picked: '', choose: '', show: false}, {id: 6, question_type: 'judgement', score: 2, question: '这个内容是题目', selection: [{select: true}, {select: false}], answer: [false], difficulty: 3, picked: '', choose: '', show: false}, {id: 7, question_type: 'multi_selection', score: 2, question: '这个内容是题目', selection: [{select: '这是选项A'}, {select: '这是选项B'}, {select: '这是选项C'}, {select: '这是选项D'}, {select: '这是选项E'}, {select: '这是选项F'}], answer: ['这是选项C', '这是选项D', '这是选项E'], difficulty: 3, checkedNames: [], choose: '', show: false}, {id: 8, question_type: 'multi_selection', score: 2, question: '这个内容是题目', selection: [{select: '这是选项A'}, {select: '这是选项B'}, {select: '这是选项C'}, {select: '这是选项D'}, {select: '这是选项E'}, {select: '这是选项F'}], answer: ['这是选项C', '这是选项D', '这是选项E'], difficulty: 3, checkedNames: [], choose: '', show: false}, {id: 9, question_type: 'multi_selection', score: 2, question: '这个内容是题目', selection: [{select: '这是选项A'}, {select: '这是选项B'}, {select: '这是选项C'}, {select: '这是选项D'}, {select: '这是选项E'}, {select: '这是选项F'}], answer: ['这是选项C', '这是选项D', '这是选项E'], difficulty: 3, checkedNames: [], choose: '', show: false}]
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button{
	width: 100%;
    height: 40px;
    border: none;
    background-color: rgb(51,121,183);
    color: #fff;
    margin: 10px 0;
    font-size:16px;
}
.icon{
  float: right;
  margin-top: 10px;
  width: 20px;
  height: 20px;
  color: grey;
}
.bottomBar{
  position: absolute;
  bottom: 0;
}

.result{
  font-size:17px;
  padding:10px 5%;
  line-height: 30px;
}
.type{
	color:blue;
	border:1px solid;
	padding:0 5px;
}
.name{

}
.text{
	margin:15px 0;
	color: #404040;
	display:block;
	font-family: "宋体"
}
.choose{
	color:red;
}
.right{

}
</style>
