const navLinks = [...document.querySelectorAll(".main-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const themeToggle = document.querySelector(".theme-toggle");
const contactButton = document.querySelector(".contact-button");

const workDetails = {
  星轨手帐: {
    type: "创作管理原型",
    title: "星轨手帐",
    summary: "用时间轴和星座视觉管理创作进度，把零散灵感收束成每日可推进的小任务。",
    highlights: ["星轨式进度视图", "灵感片段快速归档", "温柔的任务完成反馈"],
    stack: "HTML, CSS Grid, Motion Notes",
    status: "状态：正在打磨可交互原型",
    previewClass: "thumb-one",
  },
  月色音乐盒: {
    type: "沉浸式播放器界面",
    title: "月色音乐盒",
    summary: "根据夜晚时段切换背景光感和播放氛围，让音乐播放器像一间会呼吸的小房间。",
    highlights: ["场景随时间渐变", "播放状态微动效", "适合桌面和移动端的控件层级"],
    stack: "HTML, CSS Custom Properties, Interaction States",
    status: "状态：已接入本地音频，支持播放、切歌与氛围切换",
    previewClass: "thumb-two",
  },
  像素花店: {
    type: "轻游戏电商原型",
    title: "像素花店",
    summary: "把像素花束、库存和愿望清单结合成轻游戏式购买体验，让浏览商品更像整理一座小花园。",
    highlights: ["像素网格商品预览", "愿望清单反馈", "库存状态的游戏化表达"],
    stack: "HTML, CSS Patterns, Prototype Logic",
    status: "状态：概念验证完成，适合继续扩展商品页",
    previewClass: "thumb-three",
  },
};

const moonTracks = [
  {
    title: "Moonlit Room",
    scene: "月色房间",
    mood: "moon",
    src: "./assets/audio/moonlit-room.mp3",
    description: "温柔的夜间循环，适合整理灵感和慢速编码。",
  },
  {
    title: "Starlight Loop",
    scene: "星光走廊",
    mood: "stars",
    src: "./assets/audio/starlight-loop.mp3",
    description: "轻盈的星光段落，适合浏览作品和收束想法。",
  },
  {
    title: "Sugar Pop Opening",
    scene: "元气片头",
    mood: "pop",
    src: "./assets/audio/pixel-rain.mp3",
    description: "甜亮的日语流行感，像一段可爱但不柔弱的日剧片头。",
  },
];

const detailPreview = document.querySelector("[data-detail-preview]");
const detailType = document.querySelector("[data-detail-type]");
const detailTitle = document.querySelector("[data-detail-title]");
const detailSummary = document.querySelector("[data-detail-summary]");
const detailHighlights = document.querySelector("[data-detail-highlights]");
const detailStack = document.querySelector("[data-detail-stack]");
const detailStatus = document.querySelector("[data-detail-status]");

const moonPlayer = document.querySelector("[data-moon-player]");
const moonAudio = document.querySelector("[data-moon-audio]");
const moonTitle = document.querySelector("[data-moon-title]");
const moonScene = document.querySelector("[data-moon-scene]");
const moonDescription = document.querySelector("[data-moon-description]");
const moonStatus = document.querySelector("[data-moon-status]");
const moonPlay = document.querySelector("[data-moon-play]");
const moonPrev = document.querySelector("[data-moon-prev]");
const moonNext = document.querySelector("[data-moon-next]");
const moonProgress = document.querySelector("[data-moon-progress]");
const moonCurrent = document.querySelector("[data-moon-current]");
const moonDuration = document.querySelector("[data-moon-duration]");
const moonVolume = document.querySelector("[data-moon-volume]");
const moonQueue = document.querySelector("[data-moon-queue]");
const miniPlayer = document.querySelector("[data-mini-player]");
const miniTitle = document.querySelector("[data-mini-title]");
const miniScene = document.querySelector("[data-mini-scene]");
const miniOpen = document.querySelector("[data-mini-open]");
const miniPrev = document.querySelector("[data-mini-prev]");
const miniPlay = document.querySelector("[data-mini-play]");
const miniNext = document.querySelector("[data-mini-next]");
const miniProgress = document.querySelector("[data-mini-progress]");
let currentTrackIndex = 0;

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "--:--";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};

const setPlayerStatus = (message) => {
  moonStatus.textContent = message;
};

const updatePlayButton = () => {
  const track = moonTracks[currentTrackIndex];
  const isPlaying = !moonAudio.paused && !moonAudio.ended;

  moonPlay.textContent = isPlaying ? "暂停" : "播放";
  moonPlay.setAttribute("aria-label", `${isPlaying ? "暂停" : "播放"} ${track.title}`);
  moonPlayer.classList.toggle("is-playing", isPlaying);
  miniPlay.textContent = isPlaying ? "暂停" : "播放";
  miniPlay.setAttribute("aria-label", `${isPlaying ? "暂停" : "播放"} ${track.title}`);
  miniPlayer.classList.toggle("is-playing", isPlaying);
};

const updateMiniTrack = () => {
  const track = moonTracks[currentTrackIndex];
  miniTitle.textContent = track.title;
  miniScene.textContent = track.scene;
  miniOpen.setAttribute("aria-label", `打开 ${track.title} 的完整播放器`);
};

const renderMoonQueue = () => {
  moonQueue.replaceChildren(
    ...moonTracks.map((track, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.trackIndex = String(index);
      button.setAttribute("aria-current", String(index === currentTrackIndex));
      button.innerHTML = `<span>${track.title}</span><small>${track.scene}</small>`;
      button.addEventListener("click", () => {
        setMoonTrack(index, { keepPlaying: !moonAudio.paused });
      });
      return button;
    })
  );
};

const updateProgress = () => {
  const duration = moonAudio.duration;
  const currentTime = moonAudio.currentTime;
  const hasDuration = Number.isFinite(duration) && duration > 0;

  moonProgress.max = hasDuration ? String(Math.floor(duration)) : "100";
  moonProgress.value = hasDuration ? String(Math.floor(currentTime)) : moonProgress.value;
  moonCurrent.textContent = hasDuration ? formatTime(currentTime) : "00:00";
  moonDuration.textContent = hasDuration ? formatTime(duration) : "--:--";
  miniProgress.max = hasDuration ? Math.floor(duration) : 100;
  miniProgress.value = hasDuration ? Math.floor(currentTime) : 0;
};

const setMoonTrack = async (index, options = {}) => {
  currentTrackIndex = (index + moonTracks.length) % moonTracks.length;
  const track = moonTracks[currentTrackIndex];

  moonPlayer.dataset.scene = track.mood;
  moonTitle.textContent = track.title;
  moonScene.textContent = track.scene;
  moonDescription.textContent = track.description;
  setPlayerStatus(`当前场景：${track.scene}`);
  updateMiniTrack();
  moonProgress.value = "0";
  miniProgress.value = "0";
  moonCurrent.textContent = "00:00";
  moonDuration.textContent = "--:--";
  renderMoonQueue();
  moonAudio.src = track.src;
  moonAudio.load();

  const shouldKeepPlaying = options.keepPlaying === true;
  if (!shouldKeepPlaying) {
    moonAudio.pause();
    updatePlayButton();
    return;
  }

  await playCurrentTrack();
};

const playCurrentTrack = async () => {
  const track = moonTracks[currentTrackIndex];

  try {
    setPlayerStatus(`正在播放：${track.scene}`);
    await moonAudio.play();
  } catch {
    if (moonAudio.error) {
      setPlayerStatus("音频文件待放入 assets/audio");
    } else {
      setPlayerStatus("浏览器暂时无法播放，请再次点击播放");
    }
  }

  updatePlayButton();
};

const toggleMoonPlayer = (isActive) => {
  moonPlayer.classList.toggle("is-hidden", !isActive);
  moonPlayer.setAttribute("aria-hidden", String(!isActive));
};

const setActiveNav = (sectionId) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${sectionId}`;
    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

const setTheme = (isNight) => {
  document.body.classList.toggle("night", isNight);
  themeToggle.setAttribute("aria-pressed", String(isNight));
  themeToggle.setAttribute("aria-label", isNight ? "切换日间模式" : "切换夜间模式");
  localStorage.setItem("niya-theme", isNight ? "night" : "day");
};

const selectWorkCard = (card) => {
  const project = card.getAttribute("data-project");
  const detail = workDetails[project];

  if (!detail) return;

  document.querySelectorAll(".work-card").forEach((item) => {
    const isSelected = item === card;
    item.classList.toggle("selected", isSelected);
    item.setAttribute("aria-pressed", String(isSelected));
  });

  detailPreview.className = `detail-preview ${detail.previewClass}`;
  detailType.textContent = detail.type;
  detailTitle.textContent = detail.title;
  detailSummary.textContent = detail.summary;
  detailHighlights.replaceChildren(
    ...detail.highlights.map((highlight) => {
      const item = document.createElement("li");
      item.textContent = highlight;
      return item;
    })
  );
  detailStack.textContent = detail.stack;
  detailStatus.textContent = detail.status;
  toggleMoonPlayer(project === "月色音乐盒");
};

const selectMoonProject = () => {
  const moonCard = document.querySelector('[data-project="月色音乐盒"]');

  if (!moonCard) return;

  selectWorkCard(moonCard);
  document.querySelector("#works").scrollIntoView({ block: "start" });
};

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    setActiveNav(visible.target.id);
  },
  { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] }
);

sections.forEach((section) => observer.observe(section));
setActiveNav("top");

const savedTheme = localStorage.getItem("niya-theme");
if (savedTheme) {
  setTheme(savedTheme === "night");
}

renderMoonQueue();
setMoonTrack(0);
moonAudio.volume = Number(moonVolume.value);

document.querySelectorAll(".work-card").forEach((card) => {
  card.addEventListener("click", () => selectWorkCard(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectWorkCard(card);
    }
  });
});

moonPlay.addEventListener("click", () => {
  if (moonAudio.paused || moonAudio.ended) {
    playCurrentTrack();
  } else {
    moonAudio.pause();
    setPlayerStatus("已暂停");
    updatePlayButton();
  }
});

moonPrev.addEventListener("click", () => {
  setMoonTrack(currentTrackIndex - 1, { keepPlaying: !moonAudio.paused });
});

moonNext.addEventListener("click", () => {
  setMoonTrack(currentTrackIndex + 1, { keepPlaying: !moonAudio.paused });
});

miniOpen.addEventListener("click", selectMoonProject);

miniPlay.addEventListener("click", () => {
  if (moonAudio.paused || moonAudio.ended) {
    playCurrentTrack();
  } else {
    moonAudio.pause();
    setPlayerStatus("已暂停");
    updatePlayButton();
  }
});

miniPrev.addEventListener("click", () => {
  setMoonTrack(currentTrackIndex - 1, { keepPlaying: !moonAudio.paused });
});

miniNext.addEventListener("click", () => {
  setMoonTrack(currentTrackIndex + 1, { keepPlaying: !moonAudio.paused });
});

moonProgress.addEventListener("input", () => {
  const duration = moonAudio.duration;
  if (Number.isFinite(duration) && duration > 0) {
    moonAudio.currentTime = Number(moonProgress.value);
    updateProgress();
  }
});

moonVolume.addEventListener("input", () => {
  moonAudio.volume = Number(moonVolume.value);
});

moonAudio.addEventListener("loadedmetadata", updateProgress);
moonAudio.addEventListener("timeupdate", updateProgress);
moonAudio.addEventListener("play", updatePlayButton);
moonAudio.addEventListener("pause", updatePlayButton);
moonAudio.addEventListener("ended", () => {
  setMoonTrack(currentTrackIndex + 1, { keepPlaying: true });
});
moonAudio.addEventListener("error", () => {
  setPlayerStatus("音频文件待放入 assets/audio");
  updatePlayButton();
});

themeToggle.addEventListener("click", () => {
  setTheme(!document.body.classList.contains("night"));
});

contactButton.addEventListener("click", () => {
  contactButton.setAttribute("aria-live", "polite");
  contactButton.textContent = "收到灵感信号";

  setTimeout(() => {
    contactButton.textContent = "写信给我";
  }, 1800);
});
