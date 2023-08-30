import { generateSlug } from "../generateSlug";
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

export const getComments = async (args: svct.GetCommentsArgs) => {
  const response = await api.get<svct.GetComment[]>(
    `/public/v2/posts/${args.variables.postId}/comments`,
  );
  return response.data;
};

export const getPosts = async (args: svct.GetPostsArgs) => {
  const response = await api.get<svct.GetPost[]>(
    `/public/v2/posts?page=${args.variables.page}&per_page=${args.variables.take}`,
  );

  const posts = response.data;

  function removeDuplicatesUser(arr: svct.GetPost[]) {
    let unique: number[] = [];
    for (let i = 0; i < arr.length; i++) {
      if (!unique.includes(arr[i].user_id)) {
        unique.push(arr[i].user_id);
      }
    }
    return unique;
  }

  const users: svct.GetUser[] = await Promise.all(
    removeDuplicatesUser(posts).map(async (userId) => {
      try {
        const user = await getUser({ variables: { userId } });
        return !!user.id
          ? user
          : ({
              id: userId,
              name: "Anonymous",
            } as svct.GetUser);
      } catch (error) {
        return {
          id: userId,
          name: "Anonymous",
        } as svct.GetUser;
      }
    }),
  );

  const result = await Promise.all(
    posts.map(async (post) => {
      const user = users.find((user) => user.id === post.user_id);
      const comments = await getComments({ variables: { postId: post.id } });
      const slug = generateSlug({ title: post.title, user: user?.name! });
      return {
        ...post,
        user,
        slug,
        numberOfComments: comments.length ?? 0,
        numberOfPages: response.headers["x-pagination-pages"],
      } as svct.GetPosts;
    }),
  );

  return result;
};
