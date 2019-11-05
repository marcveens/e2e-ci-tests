const { spawn } = require('child_process');
const waitOn = require('wait-on');
const kill = require('tree-kill');

let activeProcesses = [];

const waitOnReactOpts = { resources: ['http://localhost:3000'] };

const runScript = (cmd, args, onSuccess) => {
  let errorMessage = '';
  const subprocess = spawn(cmd, args, { shell: true });

  activeProcesses.push(subprocess);

  subprocess.stdout.on('data', data => {
    console.log(data.toString());
  });

  subprocess.stderr.on('data', data => {
    errorMessage += data.toString();
  });

  subprocess.on('close', code => {
    if (code !== 0) {
      killProcesses(() => {
        throw new Error(`Process ${cmd} ${args} threw an error:\n ${errorMessage}`);
      });
    } else {
      if (onSuccess) {
        onSuccess();
      }
    }
  });

  subprocess.on('error', err => {
    killProcesses(() => {
      throw new Error(`Failed to start process ${cmd} ${args}. Error: ${err.toString()}`);
    });
  });

  return subprocess;
};

const initialize = cb => {
  console.log('Starting React host');
  runScript('npm', ['run', 'ci-start']);
};

const killProcesses = cb => {
  activeProcesses.forEach(process => {
    if (process) {
      kill(process.pid, cb);
    }
  });
};

initialize();

waitOn(waitOnReactOpts, err => {
  if (err) {
    console.err(err);
    process.exit(1);
  }
  console.log('Port 3000 ready');

  console.log('Start running e2e tests');
  runScript('npm', ['run', 'test-e2e-ci-exec'], () => {
    killProcesses(() => {
      console.log('Succesfully ran all e2e tests');
      process.exit(0);
    });
  });
});
