import { nscript } from 'nscript';
import axios from 'axios';
import { NPMMetadataResponse } from './npm-info';

const BETA_POSTFIX = '-beta';

let latestBetaVersion: number = -1;

async function fetchPoaNpmMetadata() {
  const response = await axios.get<NPMMetadataResponse>('https://registry.npmjs.org/poa');

  const betaVersions: string[] = [];

  Object.keys(response.data.time).forEach(version => {
    if (version.includes(BETA_POSTFIX)) {
      betaVersions.push(version);
    }
  });

  latestBetaVersion = Math.max(
    ...betaVersions.map(version => {
      const [semanticVersion, betaVersion] = version.split(BETA_POSTFIX);

      return parseInt(betaVersion, 10);
    })
  );

  nscript(releaseBeta);
}

function releaseBeta(shell: any, echo: any, yarn: any, git: any) {
  if (latestBetaVersion === -1) {
    throw new Error('Incorrect processing.');
  }

  const pkg = JSON.parse(shell.read('package.json'));

  let proposedVersion;

  if (pkg.version.includes(BETA_POSTFIX)) {
    const [semver] = pkg.version.split(BETA_POSTFIX);

    proposedVersion = semver + BETA_POSTFIX + (latestBetaVersion + 1);
  } else {
    proposedVersion = pkg.version + BETA_POSTFIX + (latestBetaVersion + 1);
  }

  const version = (pkg.version = shell.prompt(
    `Please specify the new BETA package version of '${pkg.name}' (Ctrl^C to abort)`,
    proposedVersion
  ));

  const [semver, betaver] = version.split(BETA_POSTFIX);

  if (!semver || !betaver) {
    shell.exit(1, 'Invalid beta version (not provided): ' + version);
  }

  if (!semver.match(/^\d+\.\d+\.\d+$/)) {
    shell.exit(1, 'Invalid semver version: ' + semver);
  }

  if (!betaver.match(/^(0|[1-9]\d*)$/)) {
    shell.exit(1, 'Invalid beta version: ' + betaver);
  }

  shell.write('package.json', JSON.stringify(pkg, null, 2));
  yarn('fmt');

  yarn('publish');
  yarn('clean');

  echo(`Commiting changes...`);

  git('commit', '-am', 'Published version ' + version);

  echo(`Tagging...`);
  // git('tag', version);

  echo(`Pushing...`);
  // git('push');
  // git('push', '--tags');
}

fetchPoaNpmMetadata();
