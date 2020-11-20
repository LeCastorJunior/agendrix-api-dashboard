export default (errors: Array<{ [key: string]: any }>) => {
  return (
    errors &&
    errors.find(
      (error) =>
        error.source === "unauthorized" &&
        error.short_message.includes("Your token is expired.")
    )
  );
};
