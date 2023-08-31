import { api } from "./config";
import * as svct from "./services.type";

export const getPost = async (args: svct.GetPostArgs) => {
  const response = await api.get<svct.GetPost>(
    `/public/v2/posts/${args.variables.postId}`,
  );
  return response.data;
};

export const getUser = async (args: svct.GetUserArgs) => {
  const response = await api.get<svct.GetUser>(
    `/public/v2/users/${args.variables.userId}`,
  );
  return response.data;
};

export const getUsers = async (
  args: svct.GetUsersArgs,
): Promise<svct.GetUsers> => {
  let pathname = `/public/v2/users?page=${args.variables.page}&per_page=${args.variables.take}`;
  if (args.variables.search?.length)
    pathname = `/public/v2/users?name=${args.variables.search}`;
  const response = await api.get<svct.GetUser[]>(pathname);
  return {
    numberOfPages: response.headers["x-pagination-pages"],
    result: response.data,
  };
};

export const getComments = async (args: svct.GetCommentsArgs) => {
  const response = await api.get<svct.GetComment[]>(
    `/public/v2/posts/${args.variables.postId}/comments`,
  );
  return response.data;
};

export const getPosts = async (
  args: svct.GetPostsArgs,
): Promise<svct.GetPosts> => {
  const response = await api.get<svct.GetPost[]>(
    `/public/v2/posts?page=${args.variables.page}&per_page=${args.variables.take}`,
  );
  return {
    numberOfPages: response.headers["x-pagination-pages"],
    result: response.data,
  };
};

export const createUser = async (args: svct.CreateUserArgs) => {
  const response = await api.post<svct.GetUser>(
    "/public/v2/users",
    args.variables,
  );
  return response.data;
};

export const updateUser = async (args: svct.UpdateUserArgs) => {
  const { userId, ...rest } = args.variables;
  const response = await api.patch<svct.GetUser>(
    `/public/v2/users/${userId}`,
    rest,
  );
  return response.data;
};

export const deleteUser = async (args: svct.DeleteUserArgs) => {
  const response = await api.delete<svct.GetUser>(
    `/public/v2/users/${args.variables.userId}`,
  );
  return response.data;
};
