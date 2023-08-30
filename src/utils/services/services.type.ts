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

export type GetUserArgs = RequestArgs<{ userId: number }>;

export type GetUser = {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
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

export type GetPosts = GetPost & {
  user: GetUser;
  slug: string;
  numberOfComments: number;
  numberOfPages: number;
};
