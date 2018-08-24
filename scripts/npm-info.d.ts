export interface NPMMetadataResponse {
  _attachments: Attachments;
  _id: string;
  _rev: string;
  author: Author;
  description: string;
  'dist-tags': DistTags;
  license: string;
  maintainers: Author[];
  name: string;
  readme: string;
  readmeFilename: string;
  time: Time;
  versions: Versions;
}

export interface Attachments {}

export interface Author {
  email: string;
  name: string;
}

export interface DistTags {
  latest: string;
}

export interface Time {
  [key: string]: string;
  created: string;
  modified: string;
}

export interface Versions {
  [key: string]: VersionData;
}

export interface VersionData {
  _from: string;
  _id: string;
  _nodeVersion: string;
  _npmUser: Author;
  _npmVersion: string;
  _shasum: string;
  author: Author;
  description: string;
  directories: Attachments;
  dist: Dist;
  license: string;
  main: string;
  maintainers: Author[];
  name: string;
  scripts: Scripts;
  version: string;
}

export interface Dist {
  shasum: string;
  tarball: string;
}

export interface Scripts {
  test: string;
}
