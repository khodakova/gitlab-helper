import * as fs from 'fs';
import axios from 'axios';
import 'dotenv/config'
import { GetRepositoryFile, SearchProjectsItem } from './types.ts';

const axiosInstance = axios.create({
  baseURL: process.env.GITLAB_URL,
  headers: {
    'PRIVATE-TOKEN': process.env.PRIVATE_TOKEN,
  },
});


async function getFrontProjects() {
  return axiosInstance.get<SearchProjectsItem[]>('/api/v4/search?search=front&scope=projects')
    .then((res) => res.data)
}

async function getFileContent<Res>(repoId: number, fileName: string): Promise<Res | null> {
  const res = await axiosInstance.get<GetRepositoryFile>(`/api/v4/projects/${repoId}/repository/files/${fileName}?ref=develop`)
    .then((res) => res.data.blob_id)
    .then((blobId: string) => {
      return axiosInstance.get(`/api/v4/projects/${repoId}/repository/blobs/${blobId}/raw`)
    })
    .then((res) => res.data)
    .catch(() => null);
  return res;
}

async function getDependenciesMap(projects: SearchProjectsItem[]) {
  const dependenciesMap = {};

  for await (const project of projects) {
    const packageJsonContent = await getFileContent<DepsMap>(project.id, 'package.json');
    dependenciesMap[project.name] = {
      dependencies: packageJsonContent?.dependencies || {},
      devDependencies: packageJsonContent?.devDependencies || {},
    }
  }

  return dependenciesMap;
}

type DepsMap = {
  dependencies: Record<string, string>,
  devDependencies: Record<string, string>,
}

async function run() {
  const projects = await getFrontProjects();
  const dependenciesMap = await getDependenciesMap(projects);

  fs.writeFileSync('deps.json', JSON.stringify(dependenciesMap));
}

run()
