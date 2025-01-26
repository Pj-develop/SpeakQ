import Question from "../models/question.model.js";

export const getQuestions = async (call, callback) => {
  try {
    const { query, type } = call.request;
    const queryObject = {};

    if (query) {
      queryObject.$text = { $search: query };
    }

    if (type) {
      queryObject.type = type;
    }

    let result = Question.find(queryObject);

    const page = call.request.page || 1;
    const limit = call.request.limit || 10;
    const skip = (page - 1) * limit;
    result = await result.skip(skip).limit(limit);

    const count = await Question.countDocuments(queryObject);
    // console.log("CALLED ", call.request);

    // // Debug: Log the result and count
    // console.log("Questions retrieved from DB:", result);
    // console.log("Total count:", count);

    // Transform questions to plain objects and convert _id to string
    const questions = result.map((q) => ({
      ...q.toObject(),
      _id: q._id.toString(),
    }));

    callback(null, { questions, count });
  } catch (error) {
    console.error("Server error:", error);
    callback({
      code: grpc.status.INTERNAL,
      details: error.message,
    });
  }
};