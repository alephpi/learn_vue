Vue.component("slot-reel", {
  props: ["value", "canlock"],
  data: function () {
    return {
      momentum: null,
      audio: {
        spin: new Audio(
          "https://freesound.org/data/previews/120/120373_824230-lq.mp3"
        ),
        spinEnd: new Audio(
          "https://freesound.org/data/previews/145/145441_2615119-lq.mp3"
        ),
        lock: new Audio(
          "https://freesound.org/data/previews/56/56246_91374-lq.mp3"
        ),
      },

      reelTileCount: 10,
      reelTileData: null,
      reelSourceData: [
        {
          name: "1",
          value: 1,
          image:
            "https://cdn0.iconfinder.com/data/icons/phosphor-bold-vol-3-1/256/number-one-duotone-512.png",
        },
        {
          name: "2",
          value: 2,
          image:
            "https://cdn0.iconfinder.com/data/icons/phosphor-bold-vol-3-1/256/number-two-duotone-512.png",
        },

        {
          name: "3",
          value: 3,
          image:
            "https://cdn0.iconfinder.com/data/icons/phosphor-bold-vol-3-1/256/number-three-duotone-512.png",
        },
        {
          name: "4",
          value: 4,
          image:
            "https://cdn0.iconfinder.com/data/icons/phosphor-bold-vol-3-1/256/number-four-duotone-512.png",
        },
        {
          name: "5",
          value: 5,
          image:
            "https://cdn0.iconfinder.com/data/icons/phosphor-bold-vol-3-1/256/number-five-duotone-512.png",
        },
        {
          name: "6",
          value: 6,
          image:
            "https://cdn0.iconfinder.com/data/icons/phosphor-bold-vol-3-1/256/number-six-duotone-512.png",
        },
        {
          name: "7",
          value: 7,
          image:
            "https://cdn0.iconfinder.com/data/icons/phosphor-bold-vol-3-1/256/number-seven-duotone-512.png",
        },
        {
          name: "8",
          value: 8,
          image:
            "https://cdn0.iconfinder.com/data/icons/phosphor-bold-vol-3-1/256/number-eight-duotone-512.png",
        },
        {
          name: "9",
          value: 9,
          image:
            "https://cdn0.iconfinder.com/data/icons/phosphor-bold-vol-3-1/256/number-nine-duotone-512.png",
        },
        {
          name: "0",
          value: 0,
          image:
            "https://cdn0.iconfinder.com/data/icons/phosphor-bold-vol-3-1/256/number-zero-duotone-512.png",
        },
      ],

      reelIndex: 2,
      tile1Index: 0,
      tile2Index: 1,
      tile3Index: 2,
      tile4Index: 3,
      tile5Index: 4,
      locked: false,
    };
  },
  beforeMount: function () {
    // Build up the reelTileData array with random tiles
    let frs = [];
    let count = this.reelTileCount;
    this.audio.spin.volume = 0.3;
    this.audio.spinEnd.volume = 0.8;
    this.audio.lock.volume = 0.2;
    this.audio.spin.currentTime = 0.3;
    // Method 1, random until count is reached
    while (count > 0) {
      const fruitIndex = Math.floor(Math.random() * this.reelSourceData.length);
      const fruitObject = this.reelSourceData[fruitIndex];
      frs.push(fruitObject);
      count--;
    }

    // Method 2, sort on value, use index to determine entry count, shuffle
    // let reelSourceData = this.reelSourceData.slice(0);
    // reelSourceData.sort((a, b) => b.value - a.value);
    // reelSourceData.forEach((sd, i) => {
    //   let times = i + 1 + i; // 0+1+0=1, 3+2+3=8
    //   while (times > 0) {
    //     if (window.CP.shouldStopExecution(0)) break;
    //     frs.push(sd);
    //     times--;
    //   }
    //   window.CP.exitedLoop(0);
    // });

    function shuffle(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        if (window.CP.shouldStopExecution(1)) break;

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      window.CP.exitedLoop(1);

      return array;
    }

    this.reelTileData = shuffle(frs);
  },
  mounted: function () {
    this.$el.addEventListener("transitionend", this.animateEnd);
  },
  computed: {},

  methods: {
    run: function () {
      console.log("run");
      if (!this.locked) {
        const min = 8;
        const max = 28;
        const momentum = Math.floor(Math.random() * (max - min + 1) + min);
        this.momentum = momentum;
        this.audio.spin.play();
        this.animate();
      } else {
        this.locked = false;
        this.$emit("stopped", this.reelTileData[this.reelIndex], true);
      }
    },
    animate: function () {
      this.$el.classList.add("move");
    },
    animateEnd: function () {
      this.$el.classList.remove("move");
      this.reIndex();
      this.momentum = this.momentum - 1;
      if (this.momentum > 0) {
        setTimeout(this.animate, 10);
      } else {
        this.$emit("stopped", this.reelTileData[this.reelIndex]);
        this.audio.spinEnd.play();
        this.audio.spin.pause();
        this.audio.spin.currentTime = 0.3;
      }
    },
    reIndex: function () {
      const end = this.reelTileData.length - 1; //this.reelTileCount - 1
      const index = this.reelIndex === 0 ? end : this.reelIndex - 1;
      // const index = this.index === end ? 0 : this.index + 1
      this.reelIndex = index;
      this.tile1Index = index === 1 ? end : index === 0 ? end - 1 : index - 2;
      this.tile2Index = index === 0 ? end : index - 1;
      this.tile3Index = index;
      this.tile4Index = index === end ? 0 : index + 1;
      this.tile5Index = index === end - 1 ? 0 : index === end ? 1 : index + 2;
    },
    lock: function () {
      if (this.canlock) {
        this.locked = !this.locked;
        this.audio.lock.play();
      }
    },
  },

  template: "#slot-reel-template",
});

Vue.component("slot-machine", {
  data: function () {
    return {
      spend: 6,
      credits: 6,
      win: 0,
      resultData: false,
      canlock: true,
      waslocked: false,
      resultTyponym: {
        code: "",
        name: "",
      },
      audio: {
        win: new Audio(
          "https://freesound.org/data/previews/387/387232_1474204-lq.mp3"
        ),
        insertCoin: new Audio(
          "https://freesound.org/data/previews/276/276091_5123851-lq.mp3"
        ),
        bigwin: new Audio(
          "https://freesound.org/data/previews/270/270319_5123851-lq.mp3"
        ),
      },
    };
  },
  beforeMount: function () {},
  mounted: function () {
    window.addEventListener("keydown", this.keydown);
  },
  computed: {},

  methods: {
    keydown: function (e) {
      console.log(e.which);
      const key = {
        one: 49,
        two: 50,
        three: 51,
        space: 32,
      };

      if (e.which === key.one) {
        this.$refs.reel1.lock();
        e.preventDefault();
      } else if (e.which === key.two) {
        this.$refs.reel2.lock();
        e.preventDefault();
      } else if (e.which === key.three) {
        this.$refs.reel3.lock();
        e.preventDefault();
      } else if (e.which === key.space) {
        this.spin();
        e.preventDefault();
      }
    },
    roll: function () {
      if (!this.resultTyponym) {
        for (let code in typonymList) {
        }
      }
    },
    spin: function () {
      if (!this.resultData) {
        this.resultData = [];
        this.$refs.reel1.run();
        this.$refs.reel2.run();
        this.$refs.reel3.run();
        this.$refs.reel4.run();
        this.$refs.reel5.run();
        this.$refs.reel6.run();
      }
    },
    reelStopped(resultData, wasLocked) {
      if (wasLocked) this.waslocked = wasLocked;

      this.resultData.push(resultData);
      if (this.resultData.length === 3) {
        this.resultData = false;
      }
    },
  },

  template: "#slot-machine-template",
});

var app = new Vue({
  el: "#app",
});
