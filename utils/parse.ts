/**
 *  Convert the product to a structure that's safe to send to the client
 *  Specifically, convert the _id ObjectId to a string
 */
export const serializeMongoObjectId = (data: any): any => {
  return JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === "object" && value?._bsontype === "ObjectID"
        ? value.toString()
        : value
    )
  );
};
