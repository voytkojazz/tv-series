export function parseHostAndPort(hostAndPort: string | undefined): { host: string; port: number; } | undefined {
    if (hostAndPort == undefined) { 
        console.log("do not know your host and port")
        return undefined; 
    }
    const pieces = hostAndPort.split(':');
    console.log(pieces)
    return {
        host: pieces[0],
        port: parseInt(pieces[1], 10),
    };
}

export function getFirestoreCoverageMeta(projectId: string, firebaseJsonPath: string) {
    const { emulators } = require(firebaseJsonPath);
    const hostAndPort = parseHostAndPort(process.env['FIRESTORE_EMULATOR_HOST']);
    const { host, port } = hostAndPort != undefined ? hostAndPort : emulators.firestore!;
    const coverageUrl = `http://${host}:${port}/emulator/v1/projects/${projectId}:ruleCoverage.html`;
    return {
      host,
      port,
      coverageUrl,
    }
  }