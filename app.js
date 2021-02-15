class BeatMaker {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.currentKick = "./allSounds/kick-classic.wav";
    this.currentSnare = "./allSounds/snare-acoustic01.wav";
    this.currentHihat = "./allSounds/hihat-reso.wav";
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.muteBtn = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
    this.darkBtn = document.querySelector(".darkBtn");
  }
  repeater() {
    let step = this.index % 8;

    console.log(step);
    const activePads = document.querySelectorAll(`.b${step}`);
    activePads.forEach((eachPad) => {
      // eachPad.classList.add("grow");
      eachPad.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      if (eachPad.classList.contains("active")) {
        if (eachPad.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (eachPad.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (eachPad.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.playBtn.innerText = `Stop`; //Button text update
      this.playBtn.classList.add("active");
      //Storing interval id into isPlaying
      this.isPlaying = setInterval(() => {
        this.repeater();
      }, interval);
    } else {
      //clearing the interval when button is pressed again
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      this.playBtn.innerText = `Play`;
      this.playBtn.classList.remove("active"); //Button text update
    }
  }
  activePad() {
    this.classList.toggle("active");
  }
  changeSound({ target }) {
    const selectName = target.name;
    const selectValue = target.value;
    switch (selectName) {
      case "kick-select":
        this.kickAudio.src = selectValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectValue;
        break;
    }
  }
  mute(event) {
    const muteIndex = event.target.getAttribute("data-track");

    event.target.classList.toggle("active");
    if (event.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }
  changeSlider(e) {
    const slideValue = document.querySelector(".tempo-num");
    this.bpm = e.target.value;
    slideValue.innerText = e.target.value;
  }
  updateSlider(e) {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
  darkMode() {
    const body = document.querySelector("body");
    const mute = document.querySelectorAll(".mute");
    const select = document.querySelectorAll("select");
    const slide = document.querySelector(".tempo-slider");
    slide.classList.toggle("dark");
    select.forEach((selection) => {
      selection.classList.toggle("dark");
    });
    mute.forEach((btn) => {
      btn.classList.toggle("dark");
    });
    const play = document.querySelector(".play");
    play.classList.toggle("dark");
    this.darkBtn.classList.toggle("dark1");
    body.classList.toggle("dark");
  }
}
const beat = new BeatMaker();

beat.pads.forEach((pad) => {
  pad.addEventListener("click", beat.activePad);
  // pad.addEventListener("transitionend", () => {
  //   pad.classList.remove("grow");
  // });
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

beat.playBtn.addEventListener("click", () => {
  beat.start();
});

beat.selects.forEach((select) => {
  select.addEventListener("change", (e) => {
    beat.changeSound(e);
  });
});

beat.muteBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    beat.mute(event);
  });
});

beat.tempoSlider.addEventListener("input", (e) => {
  beat.changeSlider(e);
});

beat.tempoSlider.addEventListener("change", (e) => {
  beat.updateSlider(e);
});

beat.darkBtn.addEventListener("click", () => {
  beat.darkMode();
});
