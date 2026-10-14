/**
 * WebAudio Group Bus
 */
class AudioGroup {
  id = "";
  children = [];
  volume = 1;
  init(e) {
    Object.assign(this, e);
  }
  update(e) {
    ((e *= this.volume),
      this.children.forEach((t) => {
        t.setFinalVolume(e);
      }));
  }
  add(e) {
    this.children.includes(e) || this.children.push(e);
  }
  remove(e) {
    this.children.includes(e) &&
      this.children.splice(this.children.indexOf(e), 1);
  }
  play() {
    this.children.forEach((e) => e.play());
  }
  stop() {
    this.children.forEach((e) => e.stop());
  }
}
const LOW_PASS_FREQ = 300,
  MAX_FREQ = 22050;

export { AudioGroup };
export default AudioGroup;
