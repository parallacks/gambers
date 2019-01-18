<template>
<v-layout>
  <v-flex xs8 offset-xs2>
    <panel title = "About Us!">
      <v-layout row>
        <v-flex xs3>
          <img
          src="../assets/AboutUs.jpg"/>
          Here is some info about us and our company. Aren't we so great?
        </v-flex>
        <v-layout row wrap>
          <v-flex v-for= "review in reviews"
                  class="review"
                  xs3
                  elevation-14
                  :key="review.id">
            {{review.user}}
            <br/>
            {{review.review}}
          </v-flex>
        </v-layout>
      </v-layout>
      <br/>
      <br/>
      <v-flex xs8 offset-xs2>
        <v-expansion-panel popout>
          <v-expansion-panel-content v-for="topic in faqs"
                                     :key="topic.id">
            <div slot="header">{{topic.title}}</div>
            <v-expansion-panel inset>
              <v-expansion-panel-content v-for="ques in topic.questions"
                                         :key="ques.question">
                <div slot="header">{{ques.question}}</div>
                <v-card>
                  <v-card-text >{{ques.answer}}</v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </panel>
  </v-flex>
</v-layout>
</template>

<script>
import Panel from '../components/Panel'
import UserService from '../services/UserService'
export default {
  name: 'About',
  data () {
    return {
      reviews: [{id: 1,
        user: 'John smith',
        review: 'I love this company so much! They always make my trips so enjoyable, I never have to worry about a thing except having a good time.'},
      {id: 2,
        user: 'Mary Jane Johnson',
        review: 'The Collins Family is amazing. I love just spending time with them on trips. Sometimes I have so much fun with them that I forgot to even play the slots!'},
      {id: 3,
        user: 'Kevin Folsom',
        review: 'Man, Ben\'s sushi knowledge is so on point! He always knows the best places to get the best sushi.'},
      {id: 4,
        user: 'Robert Green',
        review: 'My favorite part of trips with Gambler\'s Express is that I get my room basically free. They take care of everything for me it\'s great!'},
      {id: 5,
        user: 'Robert Green',
        review: 'My favorite part of trips with Gambler\'s Express is that I get my room basically free. They take care of everything for me it\'s great!'},
      {id: 6,
        user: 'Robert Green',
        review: 'My favorite part of trips with Gambler\'s Express is that I get my room basically free. They take care of everything for me it\'s great!'}],
      faqs: [
        {id: 1,
          title: 'General',
          questions: [
            {question: 'What is this?',
              answer: 'It\'s a duck.'},
            {question: 'A duck?',
              answer: 'Yes a duck.'},
            {question: 'Why on earth do you have a duck?',
              answer: 'Well I wanted one you see.'}
          ]},
        {id: 2,
          title: 'Specific',
          questions: [
            {question: 'Where did you get a duck?',
              answer: 'Why the duck store of course.'},
            {question: 'Where is the duck store?',
              answer: 'On duck lane, :)'}
          ]}
      ]
    }
  },
  components: {
    Panel
  },
  async mounted () {
    this.users = (await UserService)
  }
}
</script>

<style scoped>
img {
  height: 400px;
}
.review{
  padding: 15px;
  margin: 10px;
}
</style>
