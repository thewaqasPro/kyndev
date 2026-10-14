/**
 * Frame task manager & queue
 */
class Task {
  _completeCount = 0;
  _completeTotal = 0;
  constructor(e) {
    Array.isArray(e)
      ? (this.run = this.createMultiCallbackFunc(e))
      : (this.run = this.createCallbackFunc(e));
  }
  get isCompleted() {
    return this._completeCount >= this._completeTotal;
  }
  run() {}
  createMultiCallbackFunc(e) {
    let t = [];
    for (let r = 0; r < e.length; r++) t.push(this.createCallbackFunc(e[r]));
    return function () {
      for (let r = 0; r < t.length; r++) t[r]();
    };
  }
  _onComplete() {
    this._completeCount++;
  }
  createCallbackFunc(e) {
    let t;
    return (
      this._completeTotal++,
      e.isRawShaderMaterial || e.isShaderMaterial
        ? (t = this.createShaderMaterialFunc(e))
        : e.isObject3D
          ? (t = this.createCompileSceneFunc(e))
          : e.isTexture
            ? (t = this.createInitTextureFunc(e))
            : (t = e.bind(this, this._onComplete)),
      t
    );
  }
  createShaderMaterialFunc(e) {
    return function () {
      let done = !1;
      const finish = () => {
        if (!done) {
          done = !0;
          this._onComplete();
        }
      };
      const timer = setTimeout(finish, 600);
      try {
        ((fboHelper._tri.material = e),
          properties.renderer
            .compileAsync(fboHelper._tri, properties.camera)
            .then(() => {
              (clearTimeout(timer), finish());
            })
            .catch(() => {
              (clearTimeout(timer), finish());
            }));
      } catch (err) {
        (clearTimeout(timer), finish());
      }
    };
  }
  createCompileSceneFunc(e) {
    return function () {
      let done = !1;
      let t = e.visible;
      const finish = () => {
        if (!done) {
          done = !0;
          try {
            (e.traverse((r) => {
              r.visible = r._tmpVisible;
            }),
              (e.visible = t));
          } catch (err) {}
          this._onComplete();
        }
      };
      const timer = setTimeout(finish, 600);
      try {
        (e.traverse((r) => {
          ((r._tmpVisible = r.visible), (r.visible = !0));
        }),
          (e.visible = !0),
          properties.renderer
            .compileAsync(e, properties.camera)
            .then(() => {
              (clearTimeout(timer), finish());
            })
            .catch(() => {
              (clearTimeout(timer), finish());
            }));
      } catch (err) {
        (clearTimeout(timer), finish());
      }
    };
  }
  createInitTextureFunc(e) {
    return function () {
      try {
        properties.renderer.initTexture(e);
      } catch (err) {}
      this._onComplete();
    };
  }
}
class TaskManager {
  percent = 1;
  taskList = [];
  _activeTaskList = [];
  _activeTaskIndex = 0;
  _needsStart = !1;
  onCompleted = new MinSignal$2();
  start() {
    ((this._needsStart = !0), (this.percent = 0));
    if (this._safetyTimer) clearTimeout(this._safetyTimer);
    this._safetyTimer = setTimeout(() => {
      if (
        this.percent < 1 ||
        this._activeTaskList.length > 0 ||
        this._needsStart
      ) {
        ((this._needsStart = !1),
          (this._activeTaskList = []),
          (this.percent = 1),
          this.onCompleted.dispatch());
      }
    }, 1000);
  }
  _start() {
    ((this._needsStart = !1),
      (this._activeTaskList = this.taskList.splice(0, this.taskList.length)),
      (this._activeTaskIndex = 0));
  }
  add(e) {
    if (!e) return;
    settings.SKIP_ANIMATION || this.taskList.push(new Task(e));
  }
  update() {
    if ((this._needsStart && this._start(), this._activeTaskList.length)) {
      if (this._activeTaskIndex < this._activeTaskList.length) {
        let e = this._activeTaskList[this._activeTaskIndex];
        e &&
          !e.isCompleted &&
          (this._activeTaskIndex++,
          (this.percent = this._activeTaskIndex / this._activeTaskList.length),
          e.run());
      } else {
        let allDone = this._activeTaskList.every((t) => !t || t.isCompleted);
        if (allDone) {
          ((this._activeTaskList = []),
            (this.percent = 1),
            this.onCompleted.dispatch());
        }
      }
    } else {
      let e = this.percent;
      ((this.percent = 1), e < 1 && this.onCompleted.dispatch());
    }
  }
}
const taskManager = new TaskManager();
globalThis.taskManager = taskManager;

export { Task, TaskManager, taskManager };
export default taskManager;
