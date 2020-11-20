export default (data: GenericObject): void => {
  if (data.errors) {
    data.errors.forEach(({ source, short_message }: GenericObject) =>
      alert(`${source}: ${short_message}`)
    );

    return;
  }

  alert(data.error);
};
