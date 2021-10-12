<template>
  <div>
    <h1>
      目標
    </h1>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-2"
          color="primary"
          fab
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon @click="dialog = true" dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
      <span>追加</span>
    </v-tooltip>

    <v-row justify="center">
      <!-- dialog start -->
      <v-dialog v-model="dialog" width="600px">
        <!-- stepper start -->
        <v-stepper
          v-for="(step, index) in steps"
          :key="index"
          v-model="stepNum"
          vertical
        >
          <v-stepper-step
            :complete="stepNum > step.id"
            :step="step.id"
          >
            {{ step.direction }}
          </v-stepper-step>

          <!-- ステップ１  start -->
          <v-stepper-content v-if="step.id === 1" :step="step.id">
            <v-card class="mb-12" height="auto">
              <!-- select start -->
              <v-row class="mt-1" align="center">
                <v-col class="d-flex" cols="12" sm="6">
                  <v-select
                    :items="genres"
                    label="ジャンル"
                    v-model="genre"
                    dense
                  ></v-select>
                </v-col>
              </v-row>
              <!-- select end -->
              <!-- textarea start -->
              <v-textarea
                rows="2"
                label="詳細を記入"
                placeholder="例）腕立て伏せを行う"
                v-model="text"
              ></v-textarea>
              <!-- textarea end -->
              <!-- select and text-field start -->
              <v-row class="mt-1" align="center">
                <v-col class="d-flex" cols="6" sm="4">
                  <v-text-field
                    v-model="number1"
                    label="数値"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="6" sm="4">
                  <v-select
                    :items="units"
                    label="単位"
                    v-model="unit1"
                  ></v-select>
                </v-col>
                <v-col class="d-flex" cols="6" sm="4">
                  <v-select
                    :items="conditions1"
                    label="条件"
                    v-model="condition1"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row
                v-if="condition1 === 'から'"
                class="mt-1"
                align="center"
              >
                <v-col class="d-flex" cols="6" sm="4">
                  <v-text-field
                    v-model="number2"
                    label="数値"
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="6" sm="4">
                  <v-select
                    :items="units"
                    label="単位"
                    v-model="unit2"
                  ></v-select>
                </v-col>
                <v-col class="d-flex" cols="6" sm="4">
                  <v-select
                    :items="conditions2"
                    label="条件"
                    v-model="condition2"
                  ></v-select>
                </v-col>
              </v-row>
              <!-- select and text-field end -->
            </v-card>
            <v-row>
              <v-col cols="6" sm="6">
                <v-btn color="primary" @click="nextStepController()">
                  {{ step.nextBtnLabel }}
                </v-btn>
              </v-col>
              <v-col cols="6" sm="3" class="text-right">
                <v-btn
                  color="primary"
                  v-if="step.prevBtnLabel"
                  @click="prevStepController()"
                >
                  {{ step.prevBtnLabel }}
                </v-btn>
              </v-col>
              <v-col cols="12" sm="3" class="text-center">
                <v-btn text @click="resetData()">
                  キャンセル
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>
          <!-- ステップ１ end -->
          <!-- ステップ２ start -->
          <v-stepper-content v-if="step.id === 2" :step="step.id">
            <v-card class="mb-12 ml-n5" height="auto">
              <v-row class="text-center">
                <v-col cols="12">
                  <v-date-picker
                    v-model="dates"
                    multiple
                    elevation="15"
                    width="350"
                    locale="ja-jp"
                    :day-format="(date) => new Date(date).getDate()"
                  ></v-date-picker>
                </v-col>
                <v-col cols="12">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="dates"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                  </v-menu>
                </v-col>
              </v-row>
            </v-card>
            <v-row>
              <v-col cols="6" sm="6">
                <v-btn color="primary" @click="nextStepController()">
                  {{ step.nextBtnLabel }}
                </v-btn>
              </v-col>
              <v-col cols="6" sm="3" class="text-right">
                <v-btn
                  color="primary"
                  v-if="step.prevBtnLabel"
                  @click="prevStepController()"
                >
                  {{ step.prevBtnLabel }}
                </v-btn>
              </v-col>
              <v-col cols="12" sm="3" class="text-center">
                <v-btn text @click="resetData()">
                  キャンセル
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>
          <!-- ステップ２ end -->
          <!-- ステップ３ start -->
          <v-stepper-content v-if="step.id === 3" :step="step.id">
            <v-card class="mb-12" height="auto">
              <p>
                ジャンル：<br />
                {{ genre }} <br /><br />
                詳細：<br />
                {{ text }} <br /><br />
                <span class="font-weight-bold, text-h4">
                  {{
                    number1 +
                      unit1 +
                      condition1 +
                      number2 +
                      unit2 +
                      condition2
                  }}
                </span>
                <br />
                <br />

                実行日：<br />
                <span v-for="(date, index) in dates" :key="index">
                  {{ date.slice(5).replace('-', '/') }}<br />
                </span>
              </p>
            </v-card>
            <v-row>
              <v-col cols="6" sm="6">
                <v-btn color="primary" @click="nextStepController()">
                  {{ step.nextBtnLabel }}
                </v-btn>
              </v-col>
              <v-col cols="6" sm="3" class="text-right">
                <v-btn
                  color="primary"
                  v-if="step.prevBtnLabel"
                  @click="prevStepController()"
                >
                  {{ step.prevBtnLabel }}
                </v-btn>
              </v-col>
              <v-col cols="12" sm="3" class="text-center">
                <v-btn text @click="resetData()">
                  キャンセル
                </v-btn>
              </v-col>
            </v-row>
          </v-stepper-content>
          <!-- ステップ３ end -->
        </v-stepper>
        <!-- stepper end -->
      </v-dialog>
      <!-- dialog end -->
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      stepNum: 1,
      genre: '',
      text: '',
      number1: '',
      number2: '',
      unit1: '',
      unit2: '',
      condition1: '',
      condition2: '',
      steps: [
        {
          id: 1,
          direction: '目標を設定してください',
          nextBtnLabel: '進む',
        },
        {
          id: 2,
          direction: '実行日を選択してください',
          prevBtnLabel: '戻る',
          nextBtnLabel: '進む',
        },
        {
          id: 3,
          direction: '以下の内容で登録しますか？',
          prevBtnLabel: '戻る',
          nextBtnLabel: '完了',
        },
      ],
      genres: ['学習', 'トレーニング', 'Todo'],
      units: [
        '回',
        '個',
        '枚',
        'ページ',
        '周',
        'km',
        'm',
        'mm',
        '時',
        '分',
        '秒',
      ],
      conditions1: ['行う', '間行う', 'ずつ行う', 'から'],
      conditions2: ['まで行う', 'の間行う'],

      dates: [],
      menu: false,
    };
  },
  methods: {
    prevStepController: function() {
      this.stepNum -= 1;
    },
    nextStepController: function() {
      if (this.stepNum < this.steps.length) {
        this.stepNum += 1;
      } else {
        this.resetData();
      }

      if (this.dates[0]) {
        this.dates = this.dates.sort(this.compareDate);
      }
    },
    compareDate: function(a, b) {
      return a < b ? -1 : 1;
    },
    resetData: function() {
      this.genre = '';
      this.text = '';
      this.number1 = '';
      this.number2 = '';
      this.unit1 = '';
      this.unit2 = '';
      this.condition1 = '';
      this.condition2 = '';
      this.dates = [];
      this.stepNum = 1;
      this.dialog = false;
    },
  },
};
</script>

<style></style>
