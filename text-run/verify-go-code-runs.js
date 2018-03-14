// A Text-Runner step implementation
// to verify that a Go code block in the document
// compiles and executes without errors.

const fs = require("fs");
const ObservableProcess = require("observable-process");
const path = require("path");

module.exports = async function({ configuration, formatter, searcher }) {
  const content = searcher.tagContent("fence");
  const filepath = path.join(configuration.testDir, "code.go");
  await fs.writeFile(filepath, content);

  const processor = new ObservableProcess({
    commands: ["go", "run", "code.go"],
    cwd: configuration.testDir,
    stdout: formatter.stdout,
    stderr: formatter.stderr
  });
  const { exitCode, killed } = await processor.waitForEnd();

  await fs.unlink(filepath);

  if (exitCode != 0) {
    throw new Error("Error occurred:\n" + processor.fullOutput());
  }
};
