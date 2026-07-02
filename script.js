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
    status: "状态：已接入星轨任务和灵感手帐，支持本地保存",
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
    status: "状态：已接入订单配花、库存和愿望清单互动",
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

const starJournal = document.querySelector("[data-star-journal]");
const starProgress = document.querySelector("[data-star-progress]");
const starDone = document.querySelector("[data-star-done]");
const starTotal = document.querySelector("[data-star-total]");
const starNotesCount = document.querySelector("[data-star-notes]");
const starTaskForm = document.querySelector("[data-star-task-form]");
const starTaskInput = document.querySelector("[data-star-task-input]");
const starTaskList = document.querySelector("[data-star-task-list]");
const starTaskStatus = document.querySelector("[data-star-task-status]");
const starNoteForm = document.querySelector("[data-star-note-form]");
const starNoteInput = document.querySelector("[data-star-note-input]");
const starNoteTag = document.querySelector("[data-star-note-tag]");
const starNoteList = document.querySelector("[data-star-note-list]");
const starNoteStatus = document.querySelector("[data-star-note-status]");
const pixelShop = document.querySelector("[data-pixel-shop]");
const pixelStatus = document.querySelector("[data-pixel-status]");
const pixelCompleted = document.querySelector("[data-pixel-completed]");
const pixelStock = document.querySelector("[data-pixel-stock]");
const pixelWishlistCount = document.querySelector("[data-pixel-wishlist]");
const pixelOrderTitle = document.querySelector("[data-pixel-order-title]");
const pixelOrderCopy = document.querySelector("[data-pixel-order-copy]");
const pixelOrderTags = document.querySelector("[data-pixel-order-tags]");
const pixelFeedback = document.querySelector("[data-pixel-feedback]");
const pixelShelf = document.querySelector("[data-pixel-shelf]");
const pixelWishlistList = document.querySelector("[data-pixel-wishlist-list]");
const pixelReset = document.querySelector("[data-pixel-reset]");
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

const defaultStarTasks = [
  { id: "task-outline", title: "整理角色设定草稿", done: true },
  { id: "task-scene", title: "补一张星空分镜缩略图", done: false },
  { id: "task-polish", title: "给作品区动效做一次检查", done: false },
];
const defaultStarNotes = [
  { id: "note-window", text: "窗边的星光像贴纸一样落在手帐边缘。", tag: "画面" },
  { id: "note-line", text: "今天也要把小小的灵感推进一格。", tag: "台词" },
];
const starStorageKey = "niya-star-journal";
let starTasks = [];
let starNotes = [];

const createStarId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const loadStarJournal = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(starStorageKey) || "null");

    if (saved && Array.isArray(saved.tasks) && Array.isArray(saved.notes)) {
      starTasks = saved.tasks;
      starNotes = saved.notes;
      return;
    }
  } catch {
    localStorage.removeItem(starStorageKey);
  }

  starTasks = defaultStarTasks.map((task) => ({ ...task }));
  starNotes = defaultStarNotes.map((note) => ({ ...note }));
};

const saveStarJournal = () => {
  localStorage.setItem(starStorageKey, JSON.stringify({ tasks: starTasks, notes: starNotes }));
};

const renderStarJournal = () => {
  const total = starTasks.length;
  const done = starTasks.filter((task) => task.done).length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  starProgress.textContent = `${percent}%`;
  starProgress.style.setProperty("--star-progress", `${percent}%`);
  starDone.textContent = String(done);
  starTotal.textContent = String(total);
  starNotesCount.textContent = String(starNotes.length);
  starTaskStatus.textContent = total > 0 ? `${done}/${total} 颗星已点亮` : "等待任务点亮";
  starNoteStatus.textContent = starNotes.length > 0 ? `${starNotes.length} 条灵感已收纳` : "等待灵感落星";

  if (starTasks.length === 0) {
    const empty = document.createElement("li");
    empty.className = "star-empty";
    empty.textContent = "还没有任务，先写下一颗今天想点亮的星。";
    starTaskList.replaceChildren(empty);
  } else {
    starTaskList.replaceChildren(
      ...starTasks.map((task) => {
        const item = document.createElement("li");
        item.className = `star-task${task.done ? " is-done" : ""}`;

        const toggle = document.createElement("button");
        toggle.className = "star-toggle";
        toggle.type = "button";
        toggle.textContent = task.done ? "已完成" : "完成";
        toggle.setAttribute("aria-label", `${task.done ? "取消完成" : "完成"}任务：${task.title}`);
        toggle.addEventListener("click", () => {
          task.done = !task.done;
          saveStarJournal();
          renderStarJournal();
        });

        const title = document.createElement("span");
        title.className = "star-task-title";
        title.textContent = task.title;

        const remove = document.createElement("button");
        remove.className = "star-delete";
        remove.type = "button";
        remove.textContent = "删除";
        remove.setAttribute("aria-label", `删除任务：${task.title}`);
        remove.addEventListener("click", () => {
          starTasks = starTasks.filter((current) => current.id !== task.id);
          saveStarJournal();
          renderStarJournal();
        });

        item.append(toggle, title, remove);
        return item;
      })
    );
  }

  if (starNotes.length === 0) {
    const empty = document.createElement("p");
    empty.className = "star-empty";
    empty.textContent = "灵感还在路上，等它落下时就收进这里。";
    starNoteList.replaceChildren(empty);
  } else {
    starNoteList.replaceChildren(
      ...starNotes.map((note) => {
        const item = document.createElement("article");
        item.className = "star-note";

        const text = document.createElement("p");
        text.textContent = note.text;

        const footer = document.createElement("footer");
        const tag = document.createElement("small");
        tag.textContent = `#${note.tag || "灵感"}`;

        const remove = document.createElement("button");
        remove.className = "star-delete";
        remove.type = "button";
        remove.textContent = "删除";
        remove.setAttribute("aria-label", `删除灵感：${note.text}`);
        remove.addEventListener("click", () => {
          starNotes = starNotes.filter((current) => current.id !== note.id);
          saveStarJournal();
          renderStarJournal();
        });

        footer.append(tag, remove);
        item.append(text, footer);
        return item;
      })
    );
  }
};

const toggleStarJournal = (isActive) => {
  starJournal.classList.toggle("is-hidden", !isActive);
  starJournal.setAttribute("aria-hidden", String(!isActive));
};
const pixelBouquets = [
  {
    id: "moon-lily",
    name: "月光铃兰",
    tags: ["治愈", "梦幻"],
    stock: 3,
    description: "适合安静夜晚和轻轻鼓励。",
    bg: "linear-gradient(135deg, #9b7cff, #44d8ef)",
    main: "#d9ccff",
  },
  {
    id: "berry-rose",
    name: "草莓玫瑰",
    tags: ["元气", "告白"],
    stock: 3,
    description: "甜亮、直接，像开场曲一样有精神。",
    bg: "linear-gradient(135deg, #ff7fb5, #ffd36a)",
    main: "#ff7fb5",
  },
  {
    id: "star-daisy",
    name: "星星雏菊",
    tags: ["祝福", "梦幻"],
    stock: 2,
    description: "给新计划和好消息一点闪光。",
    bg: "linear-gradient(135deg, #ffd36a, #9b7cff)",
    main: "#ffd36a",
  },
  {
    id: "mint-hydrangea",
    name: "薄荷绣球",
    tags: ["清爽", "道歉"],
    stock: 2,
    description: "不沉重的真诚，带一点清凉。",
    bg: "linear-gradient(135deg, #44d8ef, #b8f7d4)",
    main: "#78e7d5",
  },
  {
    id: "pixel-sunflower",
    name: "像素向日葵",
    tags: ["元气", "鼓励"],
    stock: 2,
    description: "适合把低电量的一天重新点亮。",
    bg: "linear-gradient(135deg, #ffd36a, #ff9f6e)",
    main: "#ffd36a",
  },
];
const pixelOrders = [
  {
    title: "给熬夜画画的朋友一束温柔的花",
    copy: "希望它安静、治愈，还带一点夜里的梦幻感。",
    needs: ["治愈"],
  },
  {
    title: "想给新企划一个明亮开场",
    copy: "需要一束看起来元气、轻快、像片头曲一样的花。",
    needs: ["元气"],
  },
  {
    title: "想认真道歉，但不要太沉重",
    copy: "客人希望表达真诚，也希望对方不会感到压力。",
    needs: ["道歉"],
  },
];
const pixelStorageKey = "niya-pixel-shop";
let pixelState = null;

const createDefaultPixelState = () => ({
  stock: Object.fromEntries(pixelBouquets.map((bouquet) => [bouquet.id, bouquet.stock])),
  wishlist: [],
  orderIndex: 0,
  completed: 0,
  message: "阅读顾客需求，选择最合适的花束完成订单。",
});

const loadPixelShop = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(pixelStorageKey) || "null");

    if (saved && saved.stock && Array.isArray(saved.wishlist)) {
      pixelState = {
        ...createDefaultPixelState(),
        ...saved,
        stock: { ...createDefaultPixelState().stock, ...saved.stock },
      };
      return;
    }
  } catch {
    localStorage.removeItem(pixelStorageKey);
  }

  pixelState = createDefaultPixelState();
};

const savePixelShop = () => {
  localStorage.setItem(pixelStorageKey, JSON.stringify(pixelState));
};

const getCurrentPixelOrder = () => pixelOrders[pixelState.orderIndex % pixelOrders.length];

const renderPixelTags = (tags) => tags.map((tag) => {
  const item = document.createElement("span");
  item.className = "pixel-tag";
  item.textContent = tag;
  return item;
});

const renderPixelShop = () => {
  const order = getCurrentPixelOrder();
  const totalStock = pixelBouquets.reduce((sum, bouquet) => sum + Number(pixelState.stock[bouquet.id] || 0), 0);

  pixelStatus.textContent = pixelState.message;
  pixelFeedback.textContent = pixelState.message;
  pixelCompleted.textContent = String(pixelState.completed);
  pixelStock.textContent = String(totalStock);
  pixelWishlistCount.textContent = String(pixelState.wishlist.length);
  pixelOrderTitle.textContent = order.title;
  pixelOrderCopy.textContent = order.copy;
  pixelOrderTags.replaceChildren(...renderPixelTags(order.needs));

  pixelShelf.replaceChildren(
    ...pixelBouquets.map((bouquet) => {
      const stock = Number(pixelState.stock[bouquet.id] || 0);
      const wished = pixelState.wishlist.includes(bouquet.id);
      const card = document.createElement("article");
      card.className = `pixel-flower${stock <= 0 ? " is-sold-out" : ""}`;
      card.style.setProperty("--flower-bg", bouquet.bg);
      card.style.setProperty("--flower-main", bouquet.main);

      const art = document.createElement("div");
      art.className = "pixel-art";
      art.setAttribute("aria-hidden", "true");
      const sprite = document.createElement("span");
      sprite.className = "pixel-sprite";
      art.append(sprite);

      const title = document.createElement("h4");
      title.textContent = bouquet.name;

      const description = document.createElement("p");
      description.textContent = bouquet.description;

      const meta = document.createElement("div");
      meta.className = "pixel-flower-meta";
      const stockBadge = document.createElement("span");
      stockBadge.className = "pixel-stock";
      stockBadge.textContent = stock > 0 ? `库存 ${stock}` : "售罄";
      meta.append(stockBadge, ...renderPixelTags(bouquet.tags));

      const actions = document.createElement("div");
      actions.className = "pixel-actions";
      const choose = document.createElement("button");
      choose.type = "button";
      choose.textContent = stock > 0 ? "配这束" : "已售罄";
      choose.disabled = stock <= 0;
      choose.setAttribute("aria-label", `用${bouquet.name}完成当前订单`);
      choose.addEventListener("click", () => choosePixelBouquet(bouquet.id));

      const wish = document.createElement("button");
      wish.type = "button";
      wish.className = `pixel-wish-button${wished ? " is-active" : ""}`;
      wish.textContent = wished ? "已收藏" : "收藏";
      wish.setAttribute("aria-label", `${wished ? "移出" : "加入"}愿望清单：${bouquet.name}`);
      wish.addEventListener("click", () => togglePixelWishlist(bouquet.id));
      actions.append(choose, wish);

      card.append(art, title, description, meta, actions);
      return card;
    })
  );

  if (pixelState.wishlist.length === 0) {
    const empty = document.createElement("p");
    empty.className = "pixel-empty";
    empty.textContent = "还没有收藏花束。";
    pixelWishlistList.replaceChildren(empty);
  } else {
    pixelWishlistList.replaceChildren(
      ...pixelState.wishlist.map((id) => {
        const bouquet = pixelBouquets.find((item) => item.id === id);
        const item = document.createElement("span");
        item.textContent = bouquet?.name || "未知花束";
        return item;
      })
    );
  }
};

const choosePixelBouquet = (bouquetId) => {
  const bouquet = pixelBouquets.find((item) => item.id === bouquetId);
  const order = getCurrentPixelOrder();
  const stock = Number(pixelState.stock[bouquetId] || 0);

  if (!bouquet || stock <= 0) {
    pixelState.message = "这束花已经售罄，换一束试试看。";
    renderPixelShop();
    return;
  }

  const matched = order.needs.some((need) => bouquet.tags.includes(need));

  if (!matched) {
    pixelState.message = `${bouquet.name} 很可爱，但这位客人更想要 ${order.needs.join("、")} 的感觉，请换一束带对应标签的花。`;
    savePixelShop();
    renderPixelShop();
    return;
  }

  pixelState.stock[bouquetId] = stock - 1;
  pixelState.completed += 1;
  pixelState.orderIndex = (pixelState.orderIndex + 1) % pixelOrders.length;
  pixelState.message = `订单完成：${bouquet.name} 正好装进了客人的心情。`;
  savePixelShop();
  renderPixelShop();
};

const togglePixelWishlist = (bouquetId) => {
  if (pixelState.wishlist.includes(bouquetId)) {
    pixelState.wishlist = pixelState.wishlist.filter((id) => id !== bouquetId);
    pixelState.message = "已从愿望清单移除。";
  } else {
    pixelState.wishlist = [...pixelState.wishlist, bouquetId];
    pixelState.message = "已加入愿望清单。";
  }

  savePixelShop();
  renderPixelShop();
};

const resetPixelShop = () => {
  pixelState = createDefaultPixelState();
  savePixelShop();
  renderPixelShop();
};

const togglePixelShop = (isActive) => {
  pixelShop.classList.toggle("is-hidden", !isActive);
  pixelShop.setAttribute("aria-hidden", String(!isActive));
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
  toggleStarJournal(project === "星轨手帐");
  togglePixelShop(project === "像素花店");
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

loadStarJournal();
renderStarJournal();
toggleStarJournal(true);
loadPixelShop();
renderPixelShop();
togglePixelShop(false);
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

starTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = starTaskInput.value.trim();

  if (!title) return;

  starTasks = [{ id: createStarId("task"), title, done: false }, ...starTasks];
  starTaskInput.value = "";
  saveStarJournal();
  renderStarJournal();
});

pixelReset.addEventListener("click", resetPixelShop);

starNoteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = starNoteInput.value.trim();
  const tag = starNoteTag.value.trim() || "灵感";

  if (!text) return;

  starNotes = [{ id: createStarId("note"), text, tag }, ...starNotes];
  starNoteInput.value = "";
  starNoteTag.value = "";
  saveStarJournal();
  renderStarJournal();
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
