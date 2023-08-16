import { exec } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { inc } from 'semver';

let mode = process.argv[2];
if (mode !== ('patch' || 'major' || 'minor')) {
	console.error('invalid mode: ', mode);
	process.abort(1);
}

let m = process.argv[3] || '.';

const pj_path = './package.json';
const pj = JSON.parse(readFileSync(pj_path));

pj.version = inc(pj.version, mode);

writeFileSync(pj_path, JSON.stringify(pj));

const execs = (commands) => {
	for (let i = 0; i < commands.length; i++) {
		console.log(commands[i])
		exec(commands[i], (err, stdout, stderr) => {
			console.log('std_out: ', stdout);
			console.log('stderr: ', stderr);
			if (err) {
				throw err;
			}
		});
	}
};

execs(['git add .', `git commit -m "${m}"`, 'git push', 'npm publish']);
