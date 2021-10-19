<template>
  <div>
    <v-row>
      <v-col
        v-for="target in targetsTest"
        :key="target.id"
        cols="12"
        md="6"
        class="d-flex justify-center"
      >
        <!-- genre別に表示 -->
        <v-card width="300">
          <v-img
            height="200px"
            src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
          >
            <v-app-bar flat color="rgba(0, 0, 0, 0)">
              <v-toolbar-title class="white--text text-caption">
                {{ target.genre }}
              </v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn color="white" icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-app-bar>

            <v-card-text
              class="white--text text-center mt-3 text-h5 font-weight-bold"
            >
              {{ target.text }}
            </v-card-text>
          </v-img>

          <v-card-text>
            <div class="text-h6 font-weight-bold">
              {{ target.finalText }}
            </div>

            <v-timeline align-top dense>
              <v-timeline-item
                v-for="(date, index) in target.dates"
                :key="index"
                :color="target.statusArr[index] ? 'green' : 'grey'"
                @click.native.stop="
                  changeStatus($event, target.id, index)
                "
                style="cursor: pointer;"
              >
                <div>
                  <div class="font-weight-normal mt-2">
                    {{ date }}
                  </div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
const STORAGE_KEY = 'targets';

export default {
  name: 'IndexTarget',
  props: {
    selectedValFromParent: {
      selected: String,
    },
    genresFromParent: {
      genres: Object,
    },
  },
  data() {
    return {
      targets: [],
    };
  },
  mounted() {
    if (localStorage.getItem(STORAGE_KEY)) {
      try {
        this.targets = JSON.parse(localStorage.getItem(STORAGE_KEY));
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  },
  computed: {
    targetsTest: function() {
      const selectedVal = this.selectedValFromParent;
      const showAll = this.genresFromParent[0];
      if (selectedVal !== showAll) {
        return this.targets.filter(function(t) {
          return t.genre === selectedVal;
        });
      } else {
        return this.targets;
      }
    },
  },
  methods: {
    changeStatus(e, targetId, dateIndex) {
      if (
        e.target.classList.contains('v-timeline-item__inner-dot') &&
        e.target.classList.contains('grey')
      ) {
        e.target.classList.remove('grey');
        e.target.classList.add('green');
        this.flagChecker(targetId, dateIndex, true);
      } else if (
        e.target.classList.contains('v-timeline-item__inner-dot') &&
        e.target.classList.contains('green')
      ) {
        e.target.classList.remove('green');
        e.target.classList.add('grey');
        this.flagChecker(targetId, dateIndex, false);
      }
    },
    flagChecker(targetId, dateIndex, flag) {
      let something = this.targets[targetId];
      something.statusArr[dateIndex] = flag;
      const parsed = JSON.stringify(this.targets);
      localStorage.setItem(STORAGE_KEY, parsed);
    },
  },
};
</script>

<style></style>
