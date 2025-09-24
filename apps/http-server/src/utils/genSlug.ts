export const genSlug = (name?: string) => {
  const slug = name
    ? name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]\s/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
    : "room";

  const randomChars = Math.random().toString(36).slice(2);
  const uniqueSlug = `${slug}-${randomChars}`;

  return uniqueSlug;
};
