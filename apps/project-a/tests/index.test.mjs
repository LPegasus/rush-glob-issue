import glob7 from "glob-v7";
import glob8 from "glob-v8";
import { test } from "node:test";
import * as path from "node:path";

const dirname = import.meta.dirname;

const options = {
  cwd: path.resolve(dirname, ".."),
  nocase: true,
};

test("glob v7 and v8 differences", async (t) => {
  const result7 = await new Promise((r, j) => {
    glob7.glob("./lib/index.js", options, (error, matches) => {
      if (error) {
        j(error);
        return;
      }
      r(matches);
    });
  });

  const result8 = await new Promise((r, j) => {
    glob8.glob("./lib/index.js", options, (error, matches) => {
      if (error) {
        j(error);
        return;
      }
      r(matches);
    });
  });

  console.log("result7", result7);
  console.log("result8", result8);

  t.assert.snapshot(result7);
  t.assert.snapshot(result8);
});
