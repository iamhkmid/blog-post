export const generateSlug = (args: { title: string; user: string }) => {
  return `${args.title.replace(/[^a-zA-Z0-9]/g, "-")}-${args.user.replace(
    /[^a-zA-Z0-9]/g,
    "-",
  )}`.replace(/-+/g, '-').toLocaleLowerCase();
};
