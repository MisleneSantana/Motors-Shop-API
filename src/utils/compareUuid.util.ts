// 1. Esta função se refere a comparação de um UUID através da biblioteca uuid-npm, com regex.
export const compareUuid = (uuid: string) => {
  const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(uuid);
};
