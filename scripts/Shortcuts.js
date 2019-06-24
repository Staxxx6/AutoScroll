class Shortcuts {
  static pressed = [];
  static sequences = new Map([]);
  static longestSequence = Array.from(Shortcuts.sequences.keys()).reduce(
    (a, b) => (a.length > b.length ? a : b),
    ""
  );
  static listeningHandler = e => {
    Shortcuts.pressed.push(e.key);
    Shortcuts.pressed.splice(
      -Shortcuts.longestSequence.length - 1,
      Shortcuts.pressed.length - Shortcuts.longestSequence.length
    );

    const currentStr = Shortcuts.pressed.join("");
    const currentStrSequence = Array.from(Shortcuts.sequences.keys()).find(s =>
      currentStr.includes(s)
    );

    if (Array.from(Shortcuts.sequences.keys()).includes(currentStrSequence)) {
      Shortcuts.sequences.get(currentStrSequence)();
      Shortcuts.pressed.length = 0;
    }
  };

  static set(...args) {
    if (args.length == 1 && args[0] instanceof Map) {
      Shortcuts.sequences = args[0];
    } else {
      Shortcuts.sequences = new Map([...args]);
    }

    Shortcuts.longestSequence = Array.from(Shortcuts.sequences.keys()).reduce(
      (a, b) => (a.length > b.length ? a : b),
      ""
    );
  }

  static listen() {
    window.addEventListener("keyup", Shortcuts.listeningHandler);
  }
  static stop() {
    window.removeEventListener("keyup", Shortcuts.listeningHandler);
  }
}
