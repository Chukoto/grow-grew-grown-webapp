<template>
  <div>
    <v-tooltip right>
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

    <!-- 追加ボタン押下時ダイアログ start -->
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
                    :items="genresWithoutAll"
                    label="ジャンル"
                    v-model="genre"
                    dense
                    :error-messages="genreErrors"
                    required
                    @input="$v.genre.$touch()"
                    @blur="$v.genre.$touch()"
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
                :error-messages="textErrors"
                required
                @input="$v.text.$touch()"
                @blur="$v.text.$touch()"
              ></v-textarea>
              <!-- textarea end -->
              <!-- select and text-field start -->
              <v-row class="mt-1" align="center">
                <v-col class="d-flex" cols="6" sm="4">
                  <v-text-field
                    v-model="number1"
                    label="数値"
                    clearable
                    :error-messages="number1Errors"
                    required
                    numeric
                    @input="$v.number1.$touch()"
                    @blur="$v.number1.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="6" sm="4">
                  <v-select
                    :items="units"
                    label="単位"
                    v-model="unit1"
                    :error-messages="unit1Errors"
                    required
                    @input="$v.unit1.$touch()"
                    @blur="$v.unit1.$touch()"
                  ></v-select>
                </v-col>
                <v-col class="d-flex" cols="6" sm="4">
                  <v-select
                    :items="conditions1"
                    label="条件"
                    v-model="condition1"
                    :error-messages="condition1Errors"
                    required
                    @input="$v.condition1.$touch()"
                    @blur="$v.condition1.$touch()"
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
                    :error-messages="number2Errors"
                    required
                    numeric
                    @input="$v.number2.$touch()"
                    @blur="$v.number2.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="6" sm="4">
                  <v-select
                    :items="units"
                    label="単位"
                    v-model="unit2"
                    :error-messages="unit2Errors"
                    required
                    @input="$v.unit2.$touch()"
                    @blur="$v.unit2.$touch()"
                  ></v-select>
                </v-col>
                <v-col class="d-flex" cols="6" sm="4">
                  <v-select
                    :items="conditions2"
                    label="条件"
                    v-model="condition2"
                    :error-messages="condition2Errors"
                    required
                    @input="$v.condition2.$touch()"
                    @blur="$v.condition2.$touch()"
                  ></v-select>
                </v-col>
              </v-row>
              <!-- select and text-field end -->
            </v-card>
            <v-row>
              <v-col cols="6" sm="6">
                <v-btn
                  color="primary"
                  @click="
                    nextStepController(number2, unit2, condition2)
                  "
                  :disabled="$v.$invalid"
                >
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
                <v-btn
                  color="primary"
                  @click="nextStepController()"
                  :disabled="!dates[0]"
                >
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
              <div>
                ジャンル：{{ genre }}
                <v-divider class="my-4"></v-divider>
                詳細：<br />
                {{ text }} <br /><br />
                <v-divider class="my-4"></v-divider>
                <span class="font-weight-bold, text-h5">
                  {{ finalText }}
                </span>
                <br />
                <br />
                <v-divider class="my-4"></v-divider>

                実行日：<br />
                <span v-for="(date, index) in dates" :key="index">
                  {{ date.slice(5).replace('-', '/') }}<br />
                </span>
                <br />
                <div class="text-right">
                  <span class="mx-2 text-h6">
                    合計： {{ dates.length }} 日分
                  </span>
                </div>
              </div>
            </v-card>
            <v-row>
              <v-col cols="6" sm="6">
                <v-btn color="primary" @click="addTarget()">
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
    <!-- 追加ボタン押下時ダイアログ end -->
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import {
  required,
  numeric,
  requiredIf,
} from 'vuelidate/lib/validators';
const STORAGE_KEY = 'targets';

export default {
  name: 'addTarget',
  props: {
    genresFromParent: {
      genres: Object,
    },
  },
  mixins: [validationMixin],

  validations: {
    genre: { required },
    text: { required },
    number1: { required, numeric },
    number2: {
      required: requiredIf((vc) => {
        return vc.condition1 === 'から';
      }),
      numeric,
    },
    unit1: { required },
    unit2: {
      required: requiredIf((vc) => {
        return vc.condition1 === 'から';
      }),
    },
    condition1: { required },
    condition2: {
      required: requiredIf((vc) => {
        return vc.condition1 === 'から';
      }),
    },
  },

  data() {
    return {
      genresWithoutAll: [],
      targets: [],

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
      units: [
        '',
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
      conditions1: [
        '',
        '行う',
        'まで行う',
        'ずつ行う',
        '間行う',
        'から',
      ],
      conditions2: ['', 'まで行う', 'の間行う'],

      dates: [],
      menu: false,

      finalTextArr: [],
      finalText: '',

      statusArr: [],
    };
  },

  mounted() {
    if (localStorage.getItem(STORAGE_KEY)) {
      this.targets = JSON.parse(localStorage.getItem(STORAGE_KEY));
    }
    this.genresWithoutAll = this.genresFromParent.slice(
      0,
      this.genresFromParent.length
    );
    this.genresWithoutAll.shift();
  },

  computed: {
    genreErrors() {
      const errors = [];
      if (!this.$v.genre.$dirty) return errors;
      !this.$v.genre.required &&
        errors.push('ジャンルの選択は必須です');
      return errors;
    },
    textErrors() {
      const errors = [];
      if (!this.$v.text.$dirty) return errors;
      !this.$v.text.required && errors.push('詳細の記入は必須です');
      return errors;
    },
    number1Errors() {
      const errors = [];
      if (!this.$v.number1.$dirty) return errors;
      !this.$v.number1.required &&
        errors.push('数値の入力は必須です');
      !this.$v.number1.numeric &&
        errors.push('半角英数字で入力してください');
      return errors;
    },
    number2Errors() {
      const errors = [];
      if (!this.$v.number2.$dirty) return errors;
      !this.$v.number2.required &&
        errors.push('数値の入力は必須です');
      !this.$v.number2.numeric &&
        errors.push('半角英数字で入力してください');
      return errors;
    },
    unit1Errors() {
      const errors = [];
      if (!this.$v.unit1.$dirty) return errors;
      !this.$v.unit1.required && errors.push('単位の入力は必須です');
      return errors;
    },
    unit2Errors() {
      const errors = [];
      if (!this.$v.unit2.$dirty) return errors;
      !this.$v.unit2.required && errors.push('単位の入力は必須です');
      return errors;
    },
    condition1Errors() {
      const errors = [];
      if (!this.$v.condition1.$dirty) return errors;
      !this.$v.condition1.required &&
        errors.push('条件の入力は必須です');
      return errors;
    },
    condition2Errors() {
      const errors = [];
      if (!this.$v.condition2.$dirty) return errors;
      !this.$v.condition2.required &&
        errors.push('条件の入力は必須です');
      return errors;
    },
  },
  methods: {
    prevStepController: function() {
      this.stepNum -= 1;
      if (this.stepNum < 3) {
        this.finalTextArr = [];
        this.statusArr = [];
      }
    },
    nextStepController: function(num2, unit2, cond2) {
      if (this.stepNum < this.steps.length) {
        this.stepNum += 1;
        this.removeUncompleted(num2, unit2, cond2);
      } else {
        this.resetData();
      }

      if (this.dates[0]) {
        this.dates = this.dates.sort(this.compareDate);
        for (let i = 0; i < this.dates.length; i++) {
          this.statusArr.push(false);
        }
      }

      if (this.stepNum === 3) {
        this.finalTextArr.push(this.number1);
        this.finalTextArr.push(this.unit1);
        this.finalTextArr.push(this.condition1);
        this.finalTextArr.push(this.number2);
        this.finalTextArr.push(this.unit2);
        this.finalTextArr.push(this.condition2);
        this.finalText = this.finalTextArr.join('');
      }
    },
    compareDate: function(a, b) {
      return a < b ? -1 : 1;
    },
    resetData: function() {
      this.targets = [];
      this.genre = '';
      this.text = '';
      this.number1 = '';
      this.number2 = '';
      this.unit1 = '';
      this.unit2 = '';
      this.condition1 = '';
      this.condition2 = '';
      this.dates = [];
      this.finalTextArr = [];
      this.finalText = '';
      this.statusArr = [];
      this.stepNum = 1;
      this.dialog = false;
    },
    removeUncompleted: function(num, unit, cond) {
      if (num === null) {
        this.unit2 = '';
        this.condition2 = '';
      }
      if (unit === '') {
        this.number2 = '';
        this.condition2 = '';
      }
      if (cond === '') {
        this.number2 = '';
        this.unit2 = '';
      }
    },
    addTarget() {
      this.targets.push({
        id: this.targets.length,
        genre: this.genre,
        text: this.text,
        number1: this.number1,
        number2: this.number2,
        unit1: this.unit1,
        unit2: this.unit2,
        condition1: this.condition1,
        condition2: this.condition2,
        dates: this.dates,
        finalText: this.finalText,
        statusArr: this.statusArr,
      });
      this.saveTargets();
      this.resetData();
      setTimeout(() => {
        this.$router.go();
      }, 150);
    },
    saveTargets() {
      const parsed = JSON.stringify(this.targets);
      localStorage.setItem(STORAGE_KEY, parsed);
    },
  },
};
</script>

<style></style>
