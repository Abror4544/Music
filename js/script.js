new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [{
        name: "Brooklyn",
        artist: "Miyagi & Endshpil",
        cover: "https://musicisgood.ru/uploads/posts/2020-05/miyagi-andy-panda-feat-tumaniyo-brooklyn.jpeg",
        source: "mp3/1.mp3",
        url: "https://www.youtube.com/watch?v=mhwmB95EX1A",
        favorited: false
      },
      {
        name: "Без Косяка",
        artist: "Maks Korj",
        cover: "https://музыка.me/images/artist/9d29661724e9085a7a03bd04f9166c0a_large.png",
        source: "mp3/2.mp3",
        url: "https://youtu.be/pCwjUOrhZr4",
        favorited: false
      },
      {
        name: "Пустите меня на танцпол",
        artist: "HammAli & Navai",
        cover: "https://pianokafe.com/upload/iblock/24c/HammAli-_-Navai-_-Pustite-menya-na-tantspol.jpg",
        source: "mp3/3.mp3",
        url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
        favorited: false
      },
      {
        name: "Москва любит",
        artist: "Skriptonit",
        cover: "https://images.genius.com/ee94d5159fb3beb36175993b425473bf.1000x1000x1.jpg",
        source: "mp3/4.mp3",
        url: "https://youtu.be/V8XsbtoGKtg",
        favorited: false
      },
      {
        name: "London",
        artist: "Xcho",
        cover: "https://i.ytimg.com/vi/9Dk0qx04GPI/maxresdefault.jpg",
        source: "mp3/5.mp3",
        url: "https://youtu.be/9Dk0qx04GPI",
        favorited: false
      },
      {
        name: "Мир сошёл с ума",
        artist: "Jony",
        cover: "https://yho.moe/wp-content/uploads/2020/08/06_mir_soshel_s_uma_jony-770x770.jpg",
        source: "mp3/6.mp3",
        url: "https://youtu.be/cGT_SCckJtM",
        favorited: false
      },
      {
        name: "8 miles",
        artist: "Eminem",
        cover: "https://akns-images.eonline.com/eol_images/Entire_Site/20171017/rs_600x600-171117080800-600.Eminem-8-Mile-JR-111717.jpg?fit=around%7C700:700&output-quality=90&crop=700:700;center,top",
        source: "mp3/7.mp3",
        url: "https://youtu.be/lJkyJQ-HWeY",
        favorited: false
      },
      {
        name: "Bad Guy",
        artist: "Billie Eilish",
        cover: "https://slm-assets.secondlife.com/assets/24673863/view_large/billie_eilish.jpg?1570304935",
        source: "mp3/8.mp3",
        url: "https://youtu.be/DyDfgMOUjCI",
        favorited: false
      },
      {
        name: "Rastafari",
        artist: "Santiz",
        cover: "https://muzter.net/_ld/59/26839589.jpg",
        source: "mp3/9.mp3",
        url: "https://youtu.be/vB2mphLHq3w",
        favorited: false
      },
      {
        name: "Малая",
        artist: "Strange",
        cover: "https://livemusical.kz/images/cover/strange-malaya.jpeg",
        source: "mp3/10.mp3",
        url: "https://youtu.be/MKdU_AfgYIg",
        favorited: false
      },
      {
        name: "Everybody knows",
        artist: "Sigrid",
        cover: "https://lastfm.freetls.fastly.net/i/u/ar0/65d413926db3b7ade9e245cae5ab771e.jpg",
        source: "mp3/11.mp3",
        url: "https://youtu.be/zrV5of2p-oc",
        favorited: false
      }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progresser = this.$refs.progresser;
      let maxduration = this.audio.duration;
      let position = x - progresser.offsetLeft;
      let percentage = (100 * position) / progresser.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickprogresser(e) {
      this.nextTrack = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if (this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function () {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function () {
      vm.generateTime();
    };
    this.audio.onended = function () {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});


$(function () {

  $('.jam').click(function (event) {
    event.preventDefault();
    $('.lists ul').removeClass('active').eq($(this).index()).addClass('active');
  })

})