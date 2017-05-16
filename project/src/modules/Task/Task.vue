<template>
  <router-content style="flex-direction:column;background-color:#fff">
    <navigation-bar title="题库">
      <navigation-bar-item @tap="back" slot="left" text="返回" icon="back"/>
      <navigation-bar-item slot="right" icon="more"/>
    </navigation-bar>
    <scroller class="scroller" ref="scroller">
    <!--多选-->
    <div class="multi" v-for="(multi, index) in multi_result" :key="multi.id">
    	<span>{{ multi.question_type }}</span>
    	<span>{{ multi.question }}</span>
    	<br>
    	<span v-for="mul in multi_result[index].selection" :key="">
	    <input type="checkbox" :id="mul.select" :value="mul.select" v-model="multi.checkedNames">
		<label :for="mul.select">{{mul.select}}</label>
		<br>
		</span>
		<span>选择：{{multi.checkedNames}}</span>
  		<br>
  		<span>正确答案: {{ multi.answer }}</span>
	</div>
    <!--单选-->
    <div class="single" v-for="(single, index) in single_result" :key="single.id">
    	<span>{{ single.question_type }}</span>
    	<span>{{ single.question }}</span>
    	<br>
    	<span v-for="sele in single_result[index].selection" :key="">
  		<input type="radio" :id="sele.select" :value="sele.select" v-model="single.picked">
  		<label :for="sele.select">{{sele.select}}</label>
  		<br>
  		</span>
  		<span>选择：{{single.picked}}</span>
  		<br>
  		<span>正确答案: {{ single.answer }}</span>
	</div>
    </scroller>
    <bottom-bar class="bottomBar">
      <bottom-bar-item icon="list" text="5/20" />
      <bottom-bar-item icon="correct" text="2"/>
      <bottom-bar-item icon="error" text="3"/>
    </bottom-bar>
  </router-content>
</template>

<script>
import Scroller from '@/components/Scroller'
import RouterContent from '@/components/RouterContent'
import Icon from '@/components/Icon'
import {NavigationBar, NavigationBarItem} from '@/components/NavigationBar'
import {BottomBar, BottomBarItem} from '@/components/BottomBar'

export default {
  name: 'task',
  components: {
    Scroller,
    RouterContent,
    Icon,
    NavigationBar,
    NavigationBarItem,
    BottomBar,
    BottomBarItem
  },
  data () {
    return {
      checkedNames: [],
      picked: '',
      result: [
      {id: 1, question_type: 'single_selection', score: 2, question: '这个内容是题目', selection: [{select: '这是选项A'}, {select: '这是选项B'}, {select: '这是选项C'}, {select: '这是选项D'}], answer: [{ans: '这是选项C'}], difficulty: 3},
      {id: 2, question_type: 'multi_selection', score: 2, question: '这个内容是题目', selection: [{select: '这是选项A'}, {select: '这是选项B'}, {select: '这是选项C'}, {select: '这是选项D'}, {select: '这是选项E'}, {select: '这是选项F'}], answer: [{ans: '这是选项C'}, {ans: '这是选项D'}, {ans: '这是选项E'}], difficulty: 3},
      {id: 3, question_type: 'judgement', score: 2, question: '这个内容是题目', selection: [{select: 'true'}, {select: 'false'}], answer: [{ans: 'false'}], difficulty: 3}
      ],
      single_result: [
      {id: 1, question_type: 'single_selection', score: 2, question: '这个内容是题目', selection: [{select: '这是选项A'}, {select: '这是选项B'}, {select: '这是选项C'}, {select: '这是选项D'}], answer: [{ans: '这是选项A'}], difficulty: 3, picked: ''},
      {id: 2, question_type: '单选题', score: 2, question: '下列选项中对课文理解不当的一项是对课文理解不当的一项', selection: [{select: '《在山的那边》一文中所说的“用信念凝成的海”，这里的“海”指的是理想的境界。'}, {select: '《童趣》一文的主旨是写作者儿时的“物外之趣”。作者通过自己的联想和想象，将眼前的事物放大了千万倍，从而享受到一种独有的乐趣。'}, {select: '《紫藤萝瀑布》为了告诉我们花和人一样总是要遭受不幸，你无法改变。'}, {select: '《走一步，再走一步》告诉人一个哲理：大困难是由小困难组成的，只要一步步战胜小困难最后一定能够战胜巨大的困难。'}], answer: [{ans: '这是选项CC'}], difficulty: 3, picked: ''},
      {id: 3, question_type: 'single_selection', score: 2, question: '这个内容是题目', selection: [{select: '这是选项AAA'}, {select: '这是选项BBB'}, {select: '这是选项CCC'}, {select: '这是选项DDD'}], answer: [{ans: '这是选项DDD'}], difficulty: 3, picked: ''},
      {id: 4, question_type: 'judgement', score: 2, question: '这个内容是题目', selection: [{select: 'true'}, {select: 'false'}], answer: [{ans: 'false'}], difficulty: 3, picked: ''},
      {id: 5, question_type: 'judgement', score: 2, question: '这个内容是题目', selection: [{select: 'true'}, {select: 'false'}], answer: [{ans: 'false'}], difficulty: 3, picked: ''},
      {id: 6, question_type: 'judgement', score: 2, question: '这个内容是题目', selection: [{select: 'true'}, {select: 'false'}], answer: [{ans: 'false'}], difficulty: 3, picked: ''}
      ],
      multi_result: [
      {id: 1, question_type: 'multi_selection', score: 2, question: '这个内容是题目', selection: [{select: '这是选项A'}, {select: '这是选项B'}, {select: '这是选项C'}, {select: '这是选项D'}, {select: '这是选项E'}, {select: '这是选项F'}], answer: [{ans: '这是选项C'}, {ans: '这是选项D'}, {ans: '这是选项E'}], difficulty: 3, checkedNames: []},
      {id: 2, question_type: 'multi_selection', score: 2, question: '这个内容是题目', selection: [{select: '这是选项A'}, {select: '这是选项B'}, {select: '这是选项C'}, {select: '这是选项D'}, {select: '这是选项E'}, {select: '这是选项F'}], answer: [{ans: '这是选项C'}, {ans: '这是选项D'}, {ans: '这是选项E'}], difficulty: 3, checkedNames: []},
      {id: 3, question_type: 'multi_selection', score: 2, question: '这个内容是题目', selection: [{select: '这是选项A'}, {select: '这是选项B'}, {select: '这是选项C'}, {select: '这是选项D'}, {select: '这是选项E'}, {select: '这是选项F'}], answer: [{ans: '这是选项C'}, {ans: '这是选项D'}, {ans: '这是选项E'}], difficulty: 3, checkedNames: []}
      ]
    }
  },
  methods: {
    scrollTop () {
      this.$refs.scroller.scrollTop()
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scroller{
  flex-grow: 1;
  margin-bottom:49px;
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
</style>
