import gulp from 'gulp';

import compileScripts from "./build/compileScripts.js";
import compileStyles from './build/compileStyles.js';
import compileTemplates from './build/compileTemplates.js';
import compileMaps from './build/compileMaps.js';
import {
  assetsDir,
  createDirectory,
  distDir, mapsCompileDir,
  outputDir,
  recursiveCopy,
  removePath, scriptCompileDir, staticDir,
  styleCompileDir,
  templateCompileDir
} from "./build/paths.js";
import path from "path";



export default gulp.series(
    gulp.series(removePath(outputDir), createDirectory(outputDir)),
    gulp.parallel(compileScripts, compileStyles, compileTemplates, compileMaps),
    createDirectory(distDir),
    gulp.parallel(
        recursiveCopy(scriptCompileDir, distDir),
        recursiveCopy(styleCompileDir, distDir),
        recursiveCopy(templateCompileDir, distDir),
        recursiveCopy(assetsDir, path.join(distDir, 'assets')),
        recursiveCopy(staticDir, distDir),
        recursiveCopy(mapsCompileDir, distDir)
    )
);