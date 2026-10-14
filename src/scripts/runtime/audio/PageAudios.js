import settings from "../core/Settings.js";
import audios from "./Audios.js";
import math from "../core/MathUtils.js";

let _brokenGlassStep = 0;
globalThis._brokenGlassStep = _brokenGlassStep;
/**
 * Page-Specific Audio Controllers
 */
class ProjectPageAudios {
  hasInit = !1;
  constructor() {}
  init() {
    settings.USE_AUDIO &&
      (audios.fadeBgMusic("generic", 1),
      !this.hasInit &&
        ((this.domProjectLaunchCta = document.getElementById(
          "project-details-launch-cta",
        )),
        audios.addHoverClickEvents(this.domProjectLaunchCta),
        (this.hasInit = !0)));
  }
  update() {
    settings.USE_AUDIO;
  }
}
const projectPageAudios = new ProjectPageAudios();

class HomePageAudios {
  hasInit = !1;
  constructor() {}
  init() {
    settings.USE_AUDIO &&
      (audios.fadeBgMusic("generic", 1, 0),
      !this.hasInit &&
        ((this.domHomeReelCta = document.getElementById("home-reel-cta")),
        (this.domHomeReelVideoWatchBtn = document.getElementById(
          "home-reel-video-watch-btn",
        )),
        (this.domHomeFeaturedCta =
          document.getElementById("home-featured-cta")),
        (this.domVideoOverlayPlayBtn = document.getElementById(
          "video-overlay__play-btn",
        )),
        (this.domVideoOverlayMuteBtn = document.getElementById(
          "video-overlay__mute-btn",
        )),
        (this.domProjectItems = Array.from(
          document.querySelectorAll("#home .project-item"),
        )),
        audios.addHoverClickEvents(this.domHomeReelCta),
        audios.addHoverClickEvents(this.domHomeReelVideoWatchBtn),
        audios.addHoverClickEvents(this.domHomeFeaturedCta),
        audios.addHoverClickEvents(this.domVideoOverlayPlayBtn),
        audios.addHoverClickEvents(this.domVideoOverlayMuteBtn),
        this.domProjectItems.forEach((e) => audios.addHoverClickEvents(e)),
        (this.hasInit = !0)));
  }
  update() {
    if (!settings.USE_AUDIO) return;
    const {
      astronautDropRatio: e,
      blackFrameInRatio: t,
      blackTunnelRatio: r,
      whiteTunnelRatio: n,
    } = goalTunnels;
    (t > 0.5 && r === 0
      ? ((_brokenGlassStep = 0),
        audios.fadeBgMusic("cinematic_2", 0.5),
        audios.items.cinematic_2.setFilterFrequencyViaRatio(0),
        (_brokenGlassStep = 0))
      : r > 0 && n === 0
        ? (audios.fadeBgMusic("cinematic_3", 0.5),
          (_brokenGlassStep = 0),
          audios.items.cinematic_3.setFilterFrequencyViaRatio(
            math.fit(goalTunnels.freezeRatio, 0.25, 1, 0, 0.5),
          ))
        : n > 0 && e === 0
          ? (audios.fadeBgMusic("cinematic_2", 0.5),
            audios.items.cinematic_2.setFilterFrequencyViaRatio(1))
          : n > 0 && e <= 0.8
            ? (audios.fadeBgMusic("cinematic_2", 0.5),
              audios.items.cinematic_2.setFilterFrequencyViaRatio(0))
            : n > 0 && e > 0.8
              ? audios.fadeBgMusic("generic_end", 1)
              : ((_brokenGlassStep = 0), audios.fadeBgMusic("generic", 1)),
      e === 0
        ? (_brokenGlassStep = 1)
        : (_brokenGlassStep == 1 && audios.items.glass_broken.play(),
          (_brokenGlassStep = 2)));
  }
}
const homePageAudios = new HomePageAudios();

class AboutPageAudios {
  hasInit = !1;
  bgFilterActive = !1;
  bgTrackName = "cinematic_0";
  constructor() {}
  init() {
    settings.USE_AUDIO && (this.hasInit || (this.hasInit = !0));
  }
  update(e) {
    if (!settings.USE_AUDIO) return;
    (e
      ? audios.fadeBgMusic(this.bgTrackName, 1)
      : audios.fadeBgMusic("generic", 1),
      audios.items[this.bgTrackName].setFilterFrequencyViaRatio(
        math.fit(aboutHero.freezeRatio, 0.25, 1, 0, 0.75),
      ));
  }
}
const aboutPageAudios = new AboutPageAudios();
let _c = new Color();

class ProjectsPageAudios {
  hasInit = !1;
  constructor() {}
  init() {
    settings.USE_AUDIO &&
      (audios.fadeBgMusic("generic", 1),
      !this.hasInit &&
        ((this.domProjectItems = Array.from(
          document.querySelectorAll("#projects .project-item"),
        )),
        this.domProjectItems.forEach((e) => {
          audios.addHoverClickEvents(e);
        }),
        (this.hasInit = !0)));
  }
  update() {
    settings.USE_AUDIO;
  }
}
const projectsPageAudios = new ProjectsPageAudios();

globalThis.homePageAudios = homePageAudios;
globalThis.aboutPageAudios = aboutPageAudios;
globalThis.projectsPageAudios = projectsPageAudios;


globalThis.homePageAudios = homePageAudios;
globalThis.aboutPageAudios = aboutPageAudios;
globalThis.projectsPageAudios = projectsPageAudios;
globalThis.projectPageAudios = projectPageAudios;

export { projectPageAudios,
  ProjectPageAudios,
  HomePageAudios,
  AboutPageAudios,
  ProjectsPageAudios,
  homePageAudios,
  aboutPageAudios,
  projectsPageAudios
};
export default homePageAudios;
