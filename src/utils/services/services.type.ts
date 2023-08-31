import { AxiosRequestConfig } from "axios";

export type RequestArgs<Vars = null> = {
  variables: Vars;
  config?: AxiosRequestConfig<any>;
};

export type GetPostArgs = RequestArgs<{ postId: number }>;

export type GetPost = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

export type GetPosts = {
  result: GetPost[];
  numberOfPages: number;
};

export type GetUserArgs = RequestArgs<{ userId: number }>;

export type GetUser = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
};

export type GetUsers = {
  result: GetUser[];
  numberOfPages: number;
};

export type GetCommentsArgs = RequestArgs<{ postId: number }>;

export type GetComment = {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
};

export type GetPostsArgs = RequestArgs<{ page: number; take: number }>;
export type GetUsersArgs = RequestArgs<{
  page: number;
  take: number;
  search: string;
}>;

export type UpdateUserArgs = RequestArgs<{
  userId: number;
  name: string;
  email: string;
  status: string;
}>;

export type CreateUserArgs = RequestArgs<{
  gender: string;
  name: string;
  email: string;
  status: string;
}>;

export type DeleteUserArgs = RequestArgs<{
  userId: number;
}>;
