export type SearchProjectsItem = {
  id: number,
  description: string | null,
  name: string | null,
  name_with_namespace: string | null,
  path: string | null,
  path_with_namespace: string | null,
  created_at: string | null,
  default_branch: string | null,
  tag_list: unknown[],
  topics: unknown[],
  ssh_url_to_repo: string | null,
  http_url_to_repo: string | null,
  web_url: string | null,
  readme_url: string | null,
  forks_count: number,
  avatar_url: unknown,
  star_count: number,
  last_activity_at: string | null,
  namespace: {
    id: 4905,
    name: string | null,
    path: string | null,
    kind: string | null,
    full_path: string | null,
    parent_id: number,
    avatar_url: unknown,
    web_url: string | null,
  }
}

export type GetRepositoryFile = {
  file_name: string,
  file_path: string,
  size: number,
  encoding: string,
  content_sha256: string,
  ref: string,
  blob_id: string,
  commit_id: string,
  last_commit_id: string,
  execute_filemode: boolean,
  content: string
}
